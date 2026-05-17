import React from "react";

export default function LiveDataNotice({ source = "Live API", hint = "" }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
        Live Data • {source}
      </span>
      {hint ? <span className="text-xs text-emerald-100/80">{hint}</span> : null}
    </div>
  );
}

