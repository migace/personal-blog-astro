import { useCallback, useMemo, useRef, useState } from "react";

// Simulated cost model - illustrative numbers, not benchmarks.
export const BASE_LATENCY_MS = 4;
export const JOIN_COST_MS = 7;
export const PIVOT_COST_PER_ROW_MS = 0.5;
// Animation runs slower than the "measured" latency so the reader sees it.
const RUN_ANIMATION_SCALE = 20;

export type SchemaKind = "columns" | "eav";
export type QueryKind = "fetch" | "filter" | "add";

export const QUERY_LABELS: Record<QueryKind, string> = {
  fetch: "Load configuration #4102 with all attributes",
  filter: "Filter: voltage = 400 AND ip_rating = 'IP54'",
  add: "Add a new attribute: max_torque",
};

export interface QueryPlan {
  sql: string;
  joins: number;
  rowsRead: number;
  migration: boolean;
  latencyMs: number;
  note: string;
}

interface LogLine {
  id: number;
  level: "info" | "ok" | "warn";
  text: string;
}

function buildPlan(
  schema: SchemaKind,
  query: QueryKind,
  attrCount: number,
): QueryPlan {
  if (schema === "columns") {
    if (query === "fetch") {
      return {
        sql: `SELECT *\nFROM configurations\nWHERE id = 4102;`,
        joins: 0,
        rowsRead: 1,
        migration: false,
        latencyMs: BASE_LATENCY_MS,
        note: "One row - every attribute is already a column.",
      };
    }
    if (query === "filter") {
      return {
        sql: `SELECT id, name\nFROM configurations\nWHERE voltage = 400\n  AND ip_rating = 'IP54';`,
        joins: 0,
        rowsRead: 12,
        migration: false,
        latencyMs: BASE_LATENCY_MS,
        note: "Plain WHERE on real columns - ordinary B-tree indexes apply.",
      };
    }
    return {
      sql: `ALTER TABLE configurations\n  ADD COLUMN max_torque numeric;\n\n-- then: code change, review, deploy`,
      joins: 0,
      rowsRead: 0,
      migration: true,
      latencyMs: BASE_LATENCY_MS,
      note: "The attribute does not exist until a migration ships.",
    };
  }

  if (query === "fetch") {
    return {
      sql: `SELECT d.code, v.value_text, v.value_number, v.value_bool\nFROM attribute_values v\nJOIN attribute_definitions d ON d.id = v.attribute_id\nWHERE v.configuration_id = 4102;\n\n-- ${attrCount} rows come back; the app pivots them into one object`,
      joins: 1,
      rowsRead: attrCount,
      migration: false,
      latencyMs: Math.round(
        BASE_LATENCY_MS + JOIN_COST_MS + attrCount * PIVOT_COST_PER_ROW_MS,
      ),
      note: "One row per attribute - the object is reassembled in the app.",
    };
  }
  if (query === "filter") {
    return {
      sql: `SELECT c.id, c.name\nFROM configurations c\nJOIN attribute_values v1\n  ON v1.configuration_id = c.id\n AND v1.attribute_id = (SELECT id FROM attribute_definitions\n                        WHERE code = 'voltage')\n AND v1.value_number = 400\nJOIN attribute_values v2\n  ON v2.configuration_id = c.id\n AND v2.attribute_id = (SELECT id FROM attribute_definitions\n                        WHERE code = 'ip_rating')\n AND v2.value_text = 'IP54';`,
      joins: 2,
      rowsRead: 24,
      migration: false,
      latencyMs: BASE_LATENCY_MS + 2 * JOIN_COST_MS,
      note: "One extra join for every attribute you filter on.",
    };
  }
  return {
    sql: `INSERT INTO attribute_definitions\n  (family_id, code, data_type, required)\nVALUES\n  (7, 'max_torque', 'number', false);\n\n-- live immediately: no migration, no deploy`,
    joins: 0,
    rowsRead: 0,
    migration: false,
    latencyMs: BASE_LATENCY_MS,
    note: "New attribute is a data row, not a schema change.",
  };
}

export function useEavExplorer() {
  const [schema, setSchema] = useState<SchemaKind>("columns");
  const [query, setQuery] = useState<QueryKind>("fetch");
  const [attrCount, setAttrCount] = useState(8);
  const [busy, setBusy] = useState(false);
  const [runs, setRuns] = useState(0);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const logId = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const plan = useMemo(
    () => buildPlan(schema, query, attrCount),
    [schema, query, attrCount],
  );

  const pushLog = useCallback((level: LogLine["level"], text: string) => {
    logId.current += 1;
    const id = logId.current;
    setLogs((prev) => [...prev.slice(-30), { id, level, text }]);
  }, []);

  const handleRun = useCallback(() => {
    if (busy) return;
    setBusy(true);
    pushLog("info", `→ ${schema === "columns" ? "typed columns" : "EAV"}: ${QUERY_LABELS[query]}`);

    timer.current = setTimeout(() => {
      if (query === "add") {
        if (plan.migration) {
          pushLog("warn", "✗ ALTER TABLE - attribute exists only after migration + deploy");
        } else {
          pushLog("ok", "✓ one INSERT - attribute is live, nothing to deploy");
        }
      } else {
        pushLog(
          "ok",
          `✓ ${plan.joins} join${plan.joins === 1 ? "" : "s"}, ${plan.rowsRead} row${plan.rowsRead === 1 ? "" : "s"} read, ~${plan.latencyMs} ms`,
        );
        if (schema === "eav" && query === "fetch") {
          pushLog("info", `· app pivots ${attrCount} value rows into one object`);
        }
      }
      setRuns((prev) => prev + 1);
      setBusy(false);
    }, plan.latencyMs * RUN_ANIMATION_SCALE);
  }, [busy, schema, query, plan, attrCount, pushLog]);

  const handleReset = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setBusy(false);
    setRuns(0);
    setLogs([]);
    setSchema("columns");
    setQuery("fetch");
    setAttrCount(8);
  }, []);

  return {
    schema,
    setSchema,
    query,
    setQuery,
    attrCount,
    setAttrCount,
    plan,
    busy,
    runs,
    logs,
    handleRun,
    handleReset,
  };
}
