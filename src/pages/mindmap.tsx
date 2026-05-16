import { useEffect, useRef, useState } from "react";

const FONT = "'IBM Plex Mono', monospace";

const NODES = [
  // Center
  { id: "center", label: "Your App", x: 0, y: 0, r: 46, color: "#f8fafc", textColor: "#0f172a", ring: "#e2e8f0", tier: 0 },

  // Primary tools
  { id: "ts",   label: "TypeScript", x: -320, y: -160, r: 40, color: "#3178c6", textColor: "#fff", ring: "#60a5fa", tier: 1 },
  { id: "react",label: "React",      x:  320, y: -160, r: 40, color: "#61dafb", textColor: "#0f172a", ring: "#7dd3fc", tier: 1 },
  { id: "vite", label: "Vite",       x:    0, y:  240, r: 40, color: "#a855f7", textColor: "#fff", ring: "#d946ef", tier: 1 },

  // TypeScript children
  { id: "ts-types",   label: "Type Safety",     x: -530, y: -280, r: 28, color: "#1e3a5f", textColor: "#93c5fd", ring: "#3178c6", tier: 2 },
  { id: "ts-jsx",     label: ".tsx files",      x: -430, y: -10,  r: 28, color: "#1e3a5f", textColor: "#93c5fd", ring: "#3178c6", tier: 2 },
  { id: "ts-infer",   label: "Inference",       x: -600, y: -100, r: 28, color: "#1e3a5f", textColor: "#93c5fd", ring: "#3178c6", tier: 2 },
  { id: "ts-strict",  label: "Strict Mode",     x: -570, y: -390, r: 28, color: "#1e3a5f", textColor: "#93c5fd", ring: "#3178c6", tier: 2 },

  // React children
  { id: "react-comp", label: "Components",      x:  530, y: -280, r: 28, color: "#083344", textColor: "#67e8f9", ring: "#61dafb", tier: 2 },
  { id: "react-hook", label: "Hooks",           x:  430, y: -10,  r: 28, color: "#083344", textColor: "#67e8f9", ring: "#61dafb", tier: 2 },
  { id: "react-dom",  label: "ReactDOM",        x:  600, y: -100, r: 28, color: "#083344", textColor: "#67e8f9", ring: "#61dafb", tier: 2 },
  { id: "react-ctx",  label: "Context API",     x:  560, y: -390, r: 28, color: "#083344", textColor: "#67e8f9", ring: "#61dafb", tier: 2 },

  // Vite children
  { id: "vite-hmr",   label: "HMR",             x: -180, y:  420, r: 28, color: "#2e1065", textColor: "#e879f9", ring: "#a855f7", tier: 2 },
  { id: "vite-esm",   label: "ESM Bundling",    x:  180, y:  420, r: 28, color: "#2e1065", textColor: "#e879f9", ring: "#a855f7", tier: 2 },
  { id: "vite-plugin",label: "@vitejs/plugin\n-react", x: -80, y: 380, r: 28, color: "#2e1065", textColor: "#e879f9", ring: "#a855f7", tier: 2 },
  { id: "vite-build", label: "Rollup Build",    x:  80,  y: 385, r: 28, color: "#2e1065", textColor: "#e879f9", ring: "#a855f7", tier: 2 },

  // Cross-cutting
  { id: "tsconfig",   label: "tsconfig.json",  x: -140, y: -320, r: 26, color: "#1c1917", textColor: "#fbbf24", ring: "#f59e0b", tier: 3 },
  { id: "vite-cfg",   label: "vite.config.ts", x:  140, y: -320, r: 26, color: "#1c1917", textColor: "#fbbf24", ring: "#f59e0b", tier: 3 },
  { id: "types-react",label: "@types/react",   x:  240, y:  80,  r: 26, color: "#1c1917", textColor: "#fbbf24", ring: "#f59e0b", tier: 3 },
  { id: "jsx-trans",  label: "JSX Transform",  x: -240, y:  80,  r: 26, color: "#1c1917", textColor: "#fbbf24", ring: "#f59e0b", tier: 3 },
];

const EDGES = [
  // Center connections
  { from: "center", to: "ts",    label: "typed with" },
  { from: "center", to: "react", label: "rendered by" },
  { from: "center", to: "vite",  label: "built by" },

  // TS children
  { from: "ts", to: "ts-types",  label: "" },
  { from: "ts", to: "ts-jsx",    label: "" },
  { from: "ts", to: "ts-infer",  label: "" },
  { from: "ts", to: "ts-strict", label: "" },

  // React children
  { from: "react", to: "react-comp", label: "" },
  { from: "react", to: "react-hook", label: "" },
  { from: "react", to: "react-dom",  label: "" },
  { from: "react", to: "react-ctx",  label: "" },

  // Vite children
  { from: "vite", to: "vite-hmr",    label: "" },
  { from: "vite", to: "vite-esm",    label: "" },
  { from: "vite", to: "vite-plugin", label: "" },
  { from: "vite", to: "vite-build",  label: "" },

  // Cross-cutting bridges
  { from: "ts",    to: "tsconfig",    label: "configured by", cross: true },
  { from: "vite",  to: "tsconfig",    label: "reads",         cross: true },
  { from: "vite",  to: "vite-cfg",    label: "configured by", cross: true },
  { from: "ts",    to: "vite-cfg",    label: "typed as .ts",  cross: true },
  { from: "react", to: "types-react", label: "typed by",      cross: true },
  { from: "ts",    to: "types-react", label: "uses",          cross: true },
  { from: "vite",  to: "jsx-trans",   label: "handles",       cross: true },
  { from: "react", to: "jsx-trans",   label: "output of",     cross: true },
  { from: "ts",    to: "ts-jsx",      label: "",              cross: false },
];

function getNode(id) { return NODES.find(n => n.id === id); }

function lerp(a, b, t) { return a + (b - a) * t; }

export default function MindMap() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    offset: { x: 0, y: 0 },
    scale: 1,
    drag: null,
    hover: null,
    selected: null,
    positions: Object.fromEntries(NODES.map(n => [n.id, { x: n.x, y: n.y }])),
    animT: 0,
    pulse: {},
    mounted: false,
  });
  const rafRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const [infoNode, setInfoNode] = useState(null);

  const INFO = {
    center:      "Your application — the product of TypeScript, React, and Vite working in concert.",
    ts:          "TypeScript adds static typing to JavaScript. It compiles away at build time, leaving pure JS for the browser.",
    react:       "React is a UI library for building component trees. It manages the DOM through a virtual diffing algorithm.",
    vite:        "Vite is the build tool and dev server. It uses native ESM in dev for near-instant startup, and Rollup for production builds.",
    "ts-types":  "TypeScript catches type errors before runtime — wrong props, missing keys, bad function signatures.",
    "ts-jsx":    ".tsx is the TypeScript-flavored JSX file extension. Vite's plugin-react handles transpilation.",
    "ts-infer":  "TypeScript infers types from context — useState<number>() gives you typed state without explicit annotations.",
    "ts-strict": "strict: true enables the strictest checks: strictNullChecks, noImplicitAny, strictFunctionTypes, and more.",
    "react-comp":"Functional components are plain TypeScript functions that return JSX. React.FC<Props> adds prop typing.",
    "react-hook":"useState, useEffect, useRef, useMemo — React's built-in hooks manage state and side-effects.",
    "react-dom": "ReactDOM.createRoot mounts your component tree into the real DOM. Only called once in main.tsx.",
    "react-ctx": "Context lets you pass data through the tree without prop-drilling. Pair with useReducer for state management.",
    "vite-hmr":  "Hot Module Replacement swaps updated modules in the browser without a full reload — state is preserved.",
    "vite-esm":  "Vite serves source files as native ES Modules in dev, skipping bundling entirely for ultra-fast startup.",
    "vite-plugin":"@vitejs/plugin-react transforms JSX and enables React Fast Refresh (component-level HMR).",
    "vite-build":"Production builds use Rollup under the hood — tree-shaking, code splitting, and minification included.",
    tsconfig:    "tsconfig.json tells TypeScript how to compile. Vite reads it for path aliases and JSX settings.",
    "vite-cfg":  "vite.config.ts is itself a TypeScript file — plugins, build options, and aliases live here.",
    "types-react":"@types/react ships type definitions for React APIs — JSX elements, hooks, event handlers, and more.",
    "jsx-trans": "JSX is syntactic sugar. Vite + plugin-react transform <Component /> into React.createElement() calls.",
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const s = stateRef.current;

    // Center the map
    s.offset = { x: canvas.offsetWidth / 2, y: canvas.offsetHeight / 2 };
    s.scale = Math.min(canvas.offsetWidth / 1400, canvas.offsetHeight / 1000, 1);
    s.mounted = true;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      s.offset = { x: canvas.offsetWidth / 2, y: canvas.offsetHeight / 2 };
    };
    window.addEventListener("resize", resize);
    resize();

    // Mouse events
    const toWorld = (cx, cy) => ({
      x: (cx - s.offset.x) / s.scale,
      y: (cy - s.offset.y) / s.scale,
    });
    const hitTest = (wx, wy) =>
      NODES.find(n => {
        const p = s.positions[n.id];
        const dx = p.x - wx, dy = p.y - wy;
        return Math.sqrt(dx * dx + dy * dy) < n.r + 4;
      });

    const onDown = e => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left, cy = e.clientY - rect.top;
      const w = toWorld(cx, cy);
      const hit = hitTest(w.x, w.y);
      if (hit) {
        s.drag = { nodeId: hit.id, ox: w.x - s.positions[hit.id].x, oy: w.y - s.positions[hit.id].y };
      } else {
        s.drag = { pan: true, sx: cx - s.offset.x, sy: cy - s.offset.y };
      }
    };
    const onMove = e => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left, cy = e.clientY - rect.top;
      const w = toWorld(cx, cy);
      const hit = hitTest(w.x, w.y);
      s.hover = hit ? hit.id : null;
      canvas.style.cursor = s.drag ? (s.drag.pan ? "grabbing" : "grab") : (hit ? "pointer" : "grab");
      if (s.drag) {
        if (s.drag.pan) {
          s.offset.x = cx - s.drag.sx;
          s.offset.y = cy - s.drag.sy;
        } else {
          s.positions[s.drag.nodeId] = { x: w.x - s.drag.ox, y: w.y - s.drag.oy };
        }
      }
      if (hit) {
        setTooltip({ id: hit.id, cx: e.clientX, cy: e.clientY });
      } else {
        setTooltip(null);
      }
    };
    const onUp = e => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left, cy = e.clientY - rect.top;
      const w = toWorld(cx, cy);
      const hit = hitTest(w.x, w.y);
      if (s.drag && !s.drag.pan && hit) {
        setInfoNode(n => n?.id === hit.id ? null : hit);
      }
      s.drag = null;
    };
    const onWheel = e => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.1 : 0.9;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left, cy = e.clientY - rect.top;
      const wx = (cx - s.offset.x) / s.scale;
      const wy = (cy - s.offset.y) / s.scale;
      s.scale = Math.min(Math.max(s.scale * factor, 0.25), 3);
      s.offset.x = cx - wx * s.scale;
      s.offset.y = cy - wy * s.scale;
    };

    canvas.addEventListener("mousedown", onDown);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseup", onUp);
    canvas.addEventListener("mouseleave", () => { s.drag = null; s.hover = null; setTooltip(null); });
    canvas.addEventListener("wheel", onWheel, { passive: false });

    // Draw loop
    const draw = (ts) => {
      s.animT = ts / 1000;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(s.offset.x, s.offset.y);
      ctx.scale(s.scale, s.scale);

      // Draw edges
      for (const edge of EDGES) {
        const a = s.positions[edge.from];
        const b = s.positions[edge.to];
        const na = getNode(edge.from);
        const nb = getNode(edge.to);
        if (!a || !b) continue;

        const dx = b.x - a.x, dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        // Offset start/end to node edge
        const sx = a.x + (dx / dist) * na.r;
        const sy = a.y + (dy / dist) * na.r;
        const ex = b.x - (dx / dist) * nb.r;
        const ey = b.y - (dy / dist) * nb.r;

        const isHighlighted =
          s.hover === edge.from || s.hover === edge.to ||
          (infoNode && (infoNode.id === edge.from || infoNode.id === edge.to));

        // Animated dash for cross edges
        if (edge.cross) {
          ctx.setLineDash([6, 6]);
          ctx.lineDashOffset = -(s.animT * 18) % 12;
        } else {
          ctx.setLineDash([]);
        }

        const alpha = isHighlighted ? 0.85 : edge.cross ? 0.25 : 0.4;
        ctx.beginPath();
        ctx.moveTo(sx, sy);

        // Slight curve
        const mx = (sx + ex) / 2 - dy * 0.12;
        const my = (sy + ey) / 2 + dx * 0.12;
        ctx.quadraticCurveTo(mx, my, ex, ey);

        ctx.strokeStyle = edge.cross
          ? `rgba(251,191,36,${alpha})`
          : `rgba(148,163,184,${alpha})`;
        ctx.lineWidth = isHighlighted ? 2 : 1.2;
        ctx.stroke();
        ctx.setLineDash([]);

        // Edge label
        if (edge.label && isHighlighted) {
          ctx.font = `10px ${FONT}`;
          ctx.fillStyle = "rgba(203,213,225,0.85)";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(edge.label, mx, my);
        }
      }

      // Draw nodes
      for (const node of NODES) {
        const p = s.positions[node.id];
        const isHov = s.hover === node.id;
        const isSel = infoNode?.id === node.id;
        const pulse = Math.sin(s.animT * 1.8 + node.x * 0.01) * 0.5 + 0.5;

        // Outer glow
        if (isHov || isSel) {
          const grd = ctx.createRadialGradient(p.x, p.y, node.r * 0.5, p.x, p.y, node.r * 2.2);
          grd.addColorStop(0, node.ring + "55");
          grd.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(p.x, p.y, node.r * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        // Ring pulse for tier-1
        if (node.tier === 1) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, node.r + 6 + pulse * 4, 0, Math.PI * 2);
          ctx.strokeStyle = node.ring + "40";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Node circle
        const grad = ctx.createRadialGradient(p.x - node.r * 0.3, p.y - node.r * 0.3, 1, p.x, p.y, node.r);
        grad.addColorStop(0, node.color + "ff");
        grad.addColorStop(1, node.color + "bb");
        ctx.beginPath();
        ctx.arc(p.x, p.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = isHov || isSel ? node.ring : node.ring + "60";
        ctx.lineWidth = isHov || isSel ? 2.5 : 1.5;
        ctx.stroke();

        // Label
        const lines = node.label.split("\n");
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const fs = node.tier === 0 ? 13 : node.tier === 1 ? 12 : 9.5;
        ctx.font = `bold ${fs}px ${FONT}`;
        ctx.fillStyle = node.textColor;
        const lh = fs + 3;
        lines.forEach((line, i) => {
          ctx.fillText(line, p.x, p.y + (i - (lines.length - 1) / 2) * lh);
        });
      }

      ctx.restore();
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousedown", onDown);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, [infoNode]);

  return (
    <div style={{ width: "100%", height: "100vh", background: "#070b14", position: "relative", fontFamily: FONT, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ position: "absolute", top: 18, left: 24, zIndex: 10, pointerEvents: "none" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          TypeScript · React · Vite
        </div>
        <div style={{ fontSize: 10, color: "#475569", marginTop: 2, letterSpacing: "0.12em" }}>
          INTERACTION MAP — click nodes to explore
        </div>
      </div>

      {/* Legend */}
      <div style={{ position: "absolute", bottom: 18, left: 24, zIndex: 10, display: "flex", flexDirection: "column", gap: 6 }}>
        {[
          { color: "#94a3b8", dash: false, label: "Direct relationship" },
          { color: "#fbbf24", dash: true,  label: "Cross-tool bridge" },
        ].map(l => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="28" height="10">
              <line x1="0" y1="5" x2="28" y2="5"
                stroke={l.color} strokeWidth="1.5"
                strokeDasharray={l.dash ? "4 3" : "none"} />
            </svg>
            <span style={{ fontSize: 9, color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase" }}>{l.label}</span>
          </div>
        ))}
        <div style={{ marginTop: 2, fontSize: 9, color: "#334155", letterSpacing: "0.1em" }}>
          SCROLL TO ZOOM · DRAG TO PAN
        </div>
      </div>

      {/* Color legend */}
      <div style={{ position: "absolute", bottom: 18, right: 24, zIndex: 10, display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
        {[
          { color: "#3178c6", label: "TypeScript" },
          { color: "#61dafb", label: "React" },
          { color: "#a855f7", label: "Vite" },
          { color: "#f59e0b", label: "Config / Bridge" },
        ].map(l => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 9, color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase" }}>{l.label}</span>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: l.color }} />
          </div>
        ))}
      </div>

      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />

      {/* Tooltip */}
      {tooltip && (
        <div style={{
          position: "fixed",
          left: tooltip.cx + 14,
          top: tooltip.cy - 10,
          background: "#0f172a",
          border: "1px solid #1e293b",
          borderRadius: 6,
          padding: "5px 10px",
          fontSize: 10,
          color: "#94a3b8",
          pointerEvents: "none",
          letterSpacing: "0.06em",
          zIndex: 20,
          maxWidth: 180,
          lineHeight: 1.5,
        }}>
          {INFO[tooltip.id] ? INFO[tooltip.id].slice(0, 60) + (INFO[tooltip.id].length > 60 ? "…" : "") : tooltip.id}
        </div>
      )}

      {/* Info panel */}
      {infoNode && (
        <div style={{
          position: "absolute",
          top: "50%",
          right: 24,
          transform: "translateY(-50%)",
          width: 260,
          background: "#0d1117",
          border: `1px solid ${infoNode.ring}40`,
          borderRadius: 12,
          padding: "18px 20px",
          zIndex: 20,
          boxShadow: `0 0 32px ${infoNode.ring}25`,
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: infoNode.color, boxShadow: `0 0 8px ${infoNode.ring}` }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#e2e8f0", letterSpacing: "0.04em" }}>
                {infoNode.label.replace("\n", " ")}
              </span>
            </div>
            <button onClick={() => setInfoNode(null)} style={{
              cursor: "pointer", background: "none", border: "none", color: "#475569",
              fontSize: 14, lineHeight: 1, padding: 2,
            }}>×</button>
          </div>
          <p style={{ fontSize: 11, color: "#64748b", lineHeight: 1.7, margin: 0 }}>
            {INFO[infoNode.id]}
          </p>
          <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid #1e293b" }}>
            <div style={{ fontSize: 9, color: "#334155", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>
              Connected to
            </div>
            {EDGES
              .filter(e => e.from === infoNode.id || e.to === infoNode.id)
              .map(e => {
                const otherId = e.from === infoNode.id ? e.to : e.from;
                const other = getNode(otherId);
                return (
                  <div key={otherId} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4, cursor: "pointer" }}
                    onClick={() => setInfoNode(other)}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: other.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 10, color: "#475569" }}>{other.label.replace("\n", " ")}</span>
                    {e.label && <span style={{ fontSize: 9, color: "#334155", marginLeft: "auto" }}>{e.label}</span>}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
