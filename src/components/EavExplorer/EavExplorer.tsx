import { useEffect, useRef } from "react";
import "./EavExplorer.css";
import {
  QUERY_LABELS,
  useEavExplorer,
  type QueryKind,
  type SchemaKind,
} from "./useEavExplorer";

const SCHEMAS: { id: SchemaKind; label: string }[] = [
  { id: "columns", label: "Typed columns" },
  { id: "eav", label: "EAV" },
];

const QUERIES: QueryKind[] = ["fetch", "filter", "add"];

const EXTRA_COLUMNS = ["voltage", "ip_rating", "power_kw", "housing"];

export default function EavExplorer() {
  const {
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
  } = useEavExplorer();

  const logBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const box = logBoxRef.current;
    if (box) {
      box.scrollTop = box.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="eav">
      <div className="eav__controls">
        <div className="eav__seg" role="group" aria-label="Storage model">
          {SCHEMAS.map((s) => (
            <button
              key={s.id}
              type="button"
              className="eav__seg-btn"
              aria-pressed={schema === s.id}
              onClick={() => setSchema(s.id)}
              disabled={busy}
            >
              {s.label}
            </button>
          ))}
        </div>

        <label className="eav__slider">
          Attributes
          <input
            type="range"
            min={4}
            max={16}
            value={attrCount}
            aria-label="Number of attributes in the product family"
            onChange={(event) => setAttrCount(Number(event.target.value))}
            disabled={busy}
          />
          <span>{attrCount}</span>
        </label>

        <button
          type="button"
          className="eav__btn eav__btn--ghost"
          onClick={handleReset}
          disabled={busy}
        >
          Reset
        </button>
      </div>

      <div className="eav__queries" role="group" aria-label="Query to run">
        {QUERIES.map((q) => (
          <button
            key={q}
            type="button"
            className="eav__query-btn"
            aria-pressed={query === q}
            onClick={() => setQuery(q)}
            disabled={busy}
          >
            {QUERY_LABELS[q]}
          </button>
        ))}
      </div>

      <div className="eav__stage">
        <div className="eav__tables">
          {schema === "columns" ? (
            <div className="eav__table is-active">
              <div className="eav__table-name">configurations</div>
              <ul className="eav__cols">
                <li>id</li>
                <li>name</li>
                {EXTRA_COLUMNS.map((c) => (
                  <li key={c}>{c}</li>
                ))}
                {attrCount > EXTRA_COLUMNS.length && (
                  <li className="eav__more">
                    +{attrCount - EXTRA_COLUMNS.length} more columns
                  </li>
                )}
              </ul>
            </div>
          ) : (
            <>
              <div className="eav__table">
                <div className="eav__table-name">configurations</div>
                <ul className="eav__cols">
                  <li>id</li>
                  <li>name</li>
                  <li>family_id</li>
                </ul>
              </div>
              <div className="eav__table">
                <div className="eav__table-name">attribute_definitions</div>
                <ul className="eav__cols">
                  <li>id</li>
                  <li>family_id</li>
                  <li>code</li>
                  <li>data_type</li>
                </ul>
              </div>
              <div className="eav__table is-active">
                <div className="eav__table-name">attribute_values</div>
                <ul className="eav__cols">
                  <li>configuration_id</li>
                  <li>attribute_id</li>
                  <li>value_text</li>
                  <li>value_number</li>
                  <li>value_bool</li>
                </ul>
              </div>
            </>
          )}
        </div>

        <div className="eav__sql-pane">
          <div className="eav__sql" aria-label="Generated SQL">
            <code>{plan.sql}</code>
          </div>
          <div className="eav__note">{plan.note}</div>
        </div>
      </div>

      <div className="eav__actions">
        <button
          type="button"
          className="eav__btn eav__btn--primary"
          onClick={handleRun}
          disabled={busy}
        >
          {busy ? "Running…" : "Run it"}
        </button>

        <div className="eav__stats">
          <div>
            <span className="eav__stat-label">Joins</span>
            <span>{plan.joins}</span>
          </div>
          <div>
            <span className="eav__stat-label">Rows read</span>
            <span>{plan.rowsRead}</span>
          </div>
          <div>
            <span className="eav__stat-label">Latency</span>
            <span>~{plan.latencyMs} ms</span>
          </div>
          <div>
            <span className="eav__stat-label">Migration</span>
            <span className={plan.migration ? "is-warn" : ""}>
              {plan.migration ? "required" : "none"}
            </span>
          </div>
          <div>
            <span className="eav__stat-label">Runs</span>
            <span>{runs}</span>
          </div>
        </div>
      </div>

      <div className="eav__log" ref={logBoxRef} aria-live="polite">
        {logs.length === 0 ? (
          <div className="log-info">
            Pick a storage model and a query, then run it.
          </div>
        ) : (
          logs.map((line) => (
            <div key={line.id} className={`log-${line.level}`}>
              {line.text}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
