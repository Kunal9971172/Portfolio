// Architecture of WorkflowAI: planning, execution and validation agents, with recovery, monitoring and an orchestration layer.

export default function WorkflowDiagram() {
  const nodes = [
    { x: 30, label: "Planning Agent", sub: "Decomposes Goal & Steps", stroke: "rgba(56,189,248,0.5)" },
    { x: 250, label: "Execution Agent", sub: "Dispatches API Integrations", stroke: "rgba(96,165,250,0.5)" },
    { x: 470, label: "Validation Agent", sub: "Verifies Integrity & Outputs", stroke: "rgba(168,85,247,0.5)" },
  ];

  return (
    <figure className="w-full overflow-x-auto py-2">
      <svg
        viewBox="0 0 700 310"
        className="w-full min-w-[620px]"
        role="img"
        aria-label="WorkflowAI architecture: orchestration layer containing planning, execution and validation agents, with recovery loop and monitoring"
      >
        <defs>
          <marker id="arr-cyan" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" fill="#38bdf8" />
          </marker>
          <marker id="arr-violet" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" fill="#a855f7" />
          </marker>
          <linearGradient id="node-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
          </linearGradient>
        </defs>

        {/* Outer Orchestration Boundary */}
        <rect
          x="10"
          y="10"
          width="680"
          height="215"
          rx="18"
          fill="none"
          stroke="rgba(56,189,248,0.3)"
          strokeDasharray="6 6"
        />
        <text x="28" y="34" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="600" letterSpacing="0.1em">
          ORCHESTRATION PIPELINE · STATE MACHINE
        </text>

        {/* Pipeline Nodes */}
        {nodes.map((n) => (
          <g key={n.label}>
            <rect
              x={n.x}
              y="70"
              width="200"
              height="80"
              rx="14"
              fill="url(#node-grad)"
              stroke={n.stroke}
              strokeWidth="1.5"
            />
            <text
              x={n.x + 100}
              y="104"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="14"
              fontWeight="600"
              fontFamily="sans-serif"
            >
              {n.label}
            </text>
            <text
              x={n.x + 100}
              y="126"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="11"
              fontFamily="sans-serif"
            >
              {n.sub}
            </text>
          </g>
        ))}

        {/* Inter-node forward arrows */}
        <line x1="230" y1="110" x2="248" y2="110" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arr-cyan)" />
        <line x1="450" y1="110" x2="468" y2="110" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arr-cyan)" />

        {/* Self-Healing Recovery Loop from validation back to execution */}
        <path
          d="M570 150 L570 192 L350 192 L350 152"
          fill="none"
          stroke="#a855f7"
          strokeWidth="2"
          markerEnd="url(#arr-violet)"
        />
        <text
          x="460"
          y="184"
          textAnchor="middle"
          fill="#c084fc"
          fontSize="11"
          fontFamily="monospace"
          fontWeight="600"
        >
          Self-Healing Recovery on Validation Failure
        </text>

        {/* Integrations & Monitoring Shelf */}
        <rect
          x="10"
          y="245"
          width="680"
          height="48"
          rx="12"
          fill="url(#node-grad)"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
        />
        <text
          x="350"
          y="274"
          textAnchor="middle"
          fill="#cbd5e1"
          fontSize="12"
          fontFamily="monospace"
        >
          Tools: Google Sheets · Gmail · Sarvam AI · Jimp · Execution Monitoring
        </text>
      </svg>
    </figure>
  );
}
