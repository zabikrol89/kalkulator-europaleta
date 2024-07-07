console.log("Script loaded");

const PaletteVisualization = ({ boxCount, layout }) => {
  console.log("PaletteVisualization rendered", { boxCount, layout });
  const boxSize = 30;
  const paletteWidth = layout.x * boxSize;
  const paletteHeight = layout.y * boxSize;
  const paletteDepth = layout.z * boxSize;

  const drawBox = (x, y, z) => {
    const xPos = x * boxSize - y * boxSize / 2 + paletteWidth / 2;
    const yPos = y * (boxSize / 2) + (layout.z - z - 1) * boxSize * 0.8;

    return (
      <g key={`box-${x}-${y}-${z}`}>
        <polygon
          points={`${xPos},${yPos} ${xPos + boxSize},${yPos - boxSize / 2} ${xPos + boxSize * 1.5},${yPos} ${xPos + boxSize / 2},${yPos + boxSize / 2}`}
          fill="#90EE90"
          stroke="#2E8B57"
          strokeWidth="1"
        />
        <polygon
          points={`${xPos + boxSize * 1.5},${yPos} ${xPos + boxSize / 2},${yPos + boxSize / 2} ${xPos + boxSize / 2},${yPos + boxSize * 1.3} ${xPos + boxSize * 1.5},${yPos + boxSize * 0.8}`}
          fill="#32CD32"
          stroke="#2E8B57"
          strokeWidth="1"
        />
        <polygon
          points={`${xPos},${yPos} ${xPos},${yPos + boxSize * 0.8} ${xPos + boxSize / 2},${yPos + boxSize * 1.3} ${xPos + boxSize / 2},${yPos + boxSize / 2}`}
          fill="#7CFC00"
          stroke="#2E8B57"
          strokeWidth="1"
        />
      </g>
    );
  };

  const svgWidth = paletteWidth * 2;
  const svgHeight = (paletteHeight + paletteDepth) * 1.5;

  return (
    <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
      <rect x={0} y={svgHeight - boxSize} width={paletteWidth * 1.5} height={boxSize / 2} fill="#8B4513" />
      
      {[...Array(layout.z)].map((_, z) =>
        [...Array(layout.y)].map((_, y) =>
          [...Array(layout.x)].map((_, x) => {
            if (x + y * layout.x + z * layout.x * layout.y < boxCount) {
              return drawBox(x, y, z);
            }
            return null;
          })
        )
      )}

      <text x={10} y={20} fill="black" fontSize="14">Układ: {layout.x} x {layout.y} x {layout.z}</text>
      <text x={10} y={40} fill="black" fontSize="14">Liczba paczek: {boxCount}</text>
    </svg>
  );
};

// Reszta kodu pozostaje bez zmian

// Inicjalne renderowanie pustej wizualizacji
ReactDOM.render(
  <PaletteVisualization boxCount={0} layout={{x: 1, y: 1, z: 1}} />,
  document.getElementById('svg-container')
);