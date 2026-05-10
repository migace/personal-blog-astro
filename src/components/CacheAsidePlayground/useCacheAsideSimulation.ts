import {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

export type LogLevel = "hit" | "miss" | "info" | "muted";

export type LogEntry = {
  id: number;
  level: LogLevel;
  text: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
};

export type CacheValue = {
  product: Product;
  expiresAt: number;
};

export type Stats = {
  req: number;
  hits: number;
  misses: number;
  totalLatency: number;
};

export type FlowDirection = "" | "fwd" | "back";

export const DB_LATENCY_MS = 400;
export const REDIS_LATENCY_MS = 8;
export const FLOW_MS = 450;

export const PRODUCT: Product = {
  id: "sku-42",
  name: "Walnut Desk",
  price: 489,
};

export const INITIAL_STATS: Stats = {
  req: 0,
  hits: 0,
  misses: 0,
  totalLatency: 0,
};

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });

export function useCacheAsideSimulation() {
  const [ttl, setTtl] = useState(8);
  const [cache, setCache] = useState<CacheValue | null>(null);
  const [stats, setStats] = useState<Stats>(INITIAL_STATS);
  const [busy, setBusy] = useState(false);

  const [flowCache, setFlowCache] = useState<FlowDirection>("");
  const [flowDb, setFlowDb] = useState<FlowDirection>("");

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 0,
      level: "muted",
      text: "· ready — click GET to send a request",
    },
  ]);

  const logIdRef = useRef(1);
  const [, forceTick] = useReducer((x: number) => x + 1, 0);

  const pushLog = useCallback((level: LogLevel, text: string) => {
    setLogs((prev) => [
      ...prev,
      {
        id: logIdRef.current++,
        level,
        text,
      },
    ]);
  }, []);

  const animateWire = useCallback(
    async (which: "cache" | "db", dir: "fwd" | "back") => {
      const setter = which === "cache" ? setFlowCache : setFlowDb;

      setter("");

      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
      });

      setter(dir);
      await sleep(FLOW_MS);
      setter("");
    },
    [],
  );

  // Live TTL countdown
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      forceTick();
    }, 200);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  // Cache auto-eviction
  useEffect(() => {
    if (!cache) return;

    const remainingMs = Math.max(0, cache.expiresAt - Date.now());

    const timeoutId = window.setTimeout(() => {
      setCache(null);
      pushLog("muted", "⏱  TTL expired — key evicted from Redis");
    }, remainingMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [cache, pushLog]);

  // NOTE: intentionally not memoized — must recompute on every forceTick
  // re-render so the TTL bar and countdown text update live.
  const ttlInfo = (() => {
    if (!cache) {
      return {
        pct: 0,
        remaining: 0,
      };
    }

    const remaining = Math.max(0, cache.expiresAt - Date.now());
    const pct = Math.max(0, Math.min(100, (remaining / (ttl * 1000)) * 100));

    return {
      pct,
      remaining,
    };
  })();

  const cacheHot = Boolean(cache && cache.expiresAt > Date.now());

  const handleGet = useCallback(async () => {
    if (busy) return;

    setBusy(true);
    const started = Date.now();

    try {
      pushLog("info", `→ GET /products/${PRODUCT.id}`);

      await animateWire("cache", "fwd");
      await sleep(REDIS_LATENCY_MS);

      const isHit =
        cache &&
        cache.expiresAt > Date.now() &&
        cache.product.id === PRODUCT.id;

      if (isHit) {
        await animateWire("cache", "back");

        const latency = Date.now() - started;

        setStats((current) => ({
          ...current,
          req: current.req + 1,
          hits: current.hits + 1,
          totalLatency: current.totalLatency + latency,
        }));

        pushLog("hit", `✓ cache HIT  (${latency} ms)  meta: { cache: "hit" }`);

        return;
      }

      pushLog("miss", "✗ cache MISS — falling through to DB");

      await animateWire("db", "fwd");
      await sleep(DB_LATENCY_MS);
      await animateWire("db", "back");

      const nextCache: CacheValue = {
        product: PRODUCT,
        expiresAt: Date.now() + ttl * 1000,
      };

      setCache(nextCache);
      pushLog("info", `  SET product:${PRODUCT.id} EX ${ttl}`);

      await animateWire("cache", "back");

      const latency = Date.now() - started;

      setStats((current) => ({
        ...current,
        req: current.req + 1,
        misses: current.misses + 1,
        totalLatency: current.totalLatency + latency,
      }));

      pushLog("info", `✓ DB hit  (${latency} ms)  meta: { cache: "miss" }`);
    } finally {
      setBusy(false);
    }
  }, [animateWire, busy, cache, pushLog, ttl]);

  const handleInvalidate = useCallback(() => {
    if (!cache) {
      pushLog("muted", `· DEL product:${PRODUCT.id} — already empty`);
      return;
    }

    setCache(null);
    pushLog("info", `· DEL product:${PRODUCT.id} — cache invalidated`);
  }, [cache, pushLog]);

  const handleReset = useCallback(() => {
    setCache(null);
    setStats(INITIAL_STATS);
    setLogs([
      {
        id: logIdRef.current++,
        level: "muted",
        text: "· playground reset",
      },
    ]);
  }, []);

  const avgLatency = stats.req ? Math.round(stats.totalLatency / stats.req) : 0;

  return {
    ttl,
    setTtl,
    cache,
    stats,
    avgLatency,
    busy,
    flowCache,
    flowDb,
    logs,
    ttlInfo,
    cacheHot,
    handleGet,
    handleInvalidate,
    handleReset,
  };
}
