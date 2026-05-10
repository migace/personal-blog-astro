import { useEffect, useRef } from "react";
import "./CacheAsidePlayground.css";
import {
  DB_LATENCY_MS,
  PRODUCT,
  useCacheAsideSimulation,
} from "./useCacheAsideSimulation";

export default function CacheAsidePlayground() {
  const {
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
  } = useCacheAsideSimulation();

  const logBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const box = logBoxRef.current;

    if (box) {
      box.scrollTop = box.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="cap">
      <div className="cap__controls">
        <div className="cap__request">
          <button
            type="button"
            className="cap__btn cap__btn--primary cap__btn--request"
            onClick={handleGet}
            disabled={busy}
          >
            <span className="cap__method">GET</span>
            <span className="cap__url">/products/{PRODUCT.id}</span>
          </button>
        </div>

        <button
          type="button"
          className="cap__btn"
          onClick={handleInvalidate}
          disabled={busy}
        >
          Invalidate cache
        </button>

        <button
          type="button"
          className="cap__btn cap__btn--ghost"
          onClick={handleReset}
          disabled={busy}
        >
          Reset
        </button>

        <label className="cap__ttl">
          TTL
          <input
            type="range"
            min={3}
            max={20}
            value={ttl}
            aria-label="Cache TTL in seconds"
            onChange={(event) => setTtl(Number(event.target.value))}
          />
          <span>{ttl}</span>s
        </label>
      </div>

      <div className="cap__stage">
        <div className="cap__node cap__node--client">
          <div className="cap__node-label">Client</div>
          <div className="cap__node-body">Hono route</div>
        </div>

        <div className={`cap__wire ${flowCache ? `is-${flowCache}` : ""}`} />

        <div
          className={`cap__node cap__node--cache ${
            cacheHot ? "is-hot" : "is-cold"
          }`}
        >
          <div className="cap__node-label">Redis</div>

          <div className="cap__node-body">
            <div>{cache ? `product:${cache.product.id}` : "empty"}</div>

            <div className="cap__ttl-bar">
              <span style={{ width: `${ttlInfo.pct}%` }} />
            </div>

            <div className="cap__ttl-text">
              {cache ? `TTL: ${(ttlInfo.remaining / 1000).toFixed(1)}s` : ""}
            </div>
          </div>
        </div>

        <div className={`cap__wire ${flowDb ? `is-${flowDb}` : ""}`} />

        <div className="cap__node cap__node--db">
          <div className="cap__node-label">PostgreSQL</div>
          <div className="cap__node-body">~{DB_LATENCY_MS} ms</div>
        </div>
      </div>

      <div className="cap__stats">
        <div>
          <span className="cap__stat-label">Requests</span>
          <span>{stats.req}</span>
        </div>

        <div>
          <span className="cap__stat-label">Hits</span>
          <span>{stats.hits}</span>
        </div>

        <div>
          <span className="cap__stat-label">Misses</span>
          <span>{stats.misses}</span>
        </div>

        <div>
          <span className="cap__stat-label">Avg latency</span>
          <span>{avgLatency} ms</span>
        </div>
      </div>

      <div className="cap__log" ref={logBoxRef} aria-live="polite">
        {logs.map((line) => (
          <div key={line.id} className={`log-${line.level}`}>
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
}
