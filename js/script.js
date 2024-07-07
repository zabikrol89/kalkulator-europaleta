// Komponent React do wizualizacji palety
const PaletteVisualization = ({ boxCount, layout }) => {
  const boxSize = 20;
  const paletteWidth = layout.x * boxSize;
  const paletteHeight = layout.y * boxSize;
  const paletteDepth = layout.z * boxSize;

  const drawBox = (x, y, z) => {
    const xPos = x * boxSize - y * boxSize / 2 + paletteWidth / 2;
    const yPos = y * (boxSize / 2) + (layout.z - z - 1) * boxSize * 0.8;

    return (
      <g key={`box-${x}-${y}-${z}`}>
        {/* Górna ściana */}
        <polygon
          points={`${xPos},${yPos} ${xPos + boxSize},${yPos - boxSize / 2} ${xPos + boxSize * 1.5},${yPos} ${xPos + boxSize / 2},${yPos + boxSize / 2}`}
          fill="#90EE90"
          stroke="#2E8B57"
          strokeWidth="1"
        />
        {/* Prawa ściana */}
        <polygon
          points={`${xPos + boxSize * 1.5},${yPos} ${xPos + boxSize / 2},${yPos + boxSize / 2} ${xPos + boxSize / 2},${yPos + boxSize * 1.3} ${xPos + boxSize * 1.5},${yPos + boxSize * 0.8}`}
          fill="#32CD32"
          stroke="#2E8B57"
          strokeWidth="1"
        />
        {/* Lewa ściana */}
        <polygon
          points={`${xPos},${yPos} ${xPos},${yPos + boxSize * 0.8} ${xPos + boxSize / 2},${yPos + boxSize * 1.3} ${xPos + boxSize / 2},${yPos + boxSize / 2}`}
          fill="#7CFC00"
          stroke="#2E8B57"
          strokeWidth="1"
        />
      </g>
    );
  };

  return (
    <svg width={paletteWidth * 2} height={(paletteHeight + paletteDepth) * 1.5} viewBox={`0 0 ${paletteWidth * 2} ${(paletteHeight + paletteDepth) * 1.5}`}>
      {/* Paleta */}
      <rect x={paletteWidth / 4} y={(paletteHeight + paletteDepth) * 1.4} width={paletteWidth * 1.5} height={paletteHeight / 4} fill="#8B4513" />
      
      {/* Paczki */}
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
    </svg>
  );
};

// Funkcja do obliczania optymalnego układu
function calculateOptimalLayout(szer_paczki, dl_paczki, wys_paczki, szer_palety, dl_palety, wys_max) {
  const x = Math.floor(szer_palety / szer_paczki);
  const y = Math.floor(dl_palety / dl_paczki);
  const z = Math.floor(wys_max / wys_paczki);
  return { x, y, z };
}

// Główna funkcja kalkulatora
function obliczIloscPaczek() {
  const szer_paczki = parseInt(document.getElementById('paczka-szer').value);
  const dl_paczki = parseInt(document.getElementById('paczka-dl').value);
  const wys_paczki = parseInt(document.getElementById('paczka-wys').value);
  const waga_paczki = parseFloat(document.getElementById('paczka-waga').value);
  const wys_max = parseInt(document.getElementById('paleta-wys-max').value);
  const szer_palety = 80;
  const dl_palety = 120;

  if (isNaN(szer_paczki) || isNaN(dl_paczki) || isNaN(wys_paczki) || isNaN(waga_paczki) || isNaN(wys_max)) {
    document.getElementById('wyniki-content').innerHTML = 'Proszę wprowadzić poprawne wartości liczbowe dla wszystkich pól.';
    return;
  }

  const layout = calculateOptimalLayout(szer_paczki, dl_paczki, wys_paczki, szer_palety, dl_palety, wys_max);
  const ile_paczek = layout.x * layout.y * layout.z;
  const calkowita_waga = ile_paczek * waga_paczki;

  let wynik_tekst = `Na paletę zmieści się ${ile_paczek} paczek (${layout.x} x ${layout.y} x ${layout.z}).`;
  wynik_tekst += `<br>Całkowita waga: ${calkowita_waga.toFixed(2)} kg`;

  document.getElementById('wyniki-content').innerHTML = wynik_tekst;

  // Renderowanie wizualizacji
  ReactDOM.render(
    <PaletteVisualization boxCount={ile_paczek} layout={layout} />,
    document.getElementById('svg-container')
  );
}

// Nasłuchiwanie na submit formularza
document.getElementById('paleta-form').addEventListener('submit', function(e) {
  e.preventDefault();
  obliczIloscPaczek();
});

// Inicjalne renderowanie pustej wizualizacji
ReactDOM.render(
  <PaletteVisualization boxCount={0} layout={{x: 1, y: 1, z: 1}} />,
  document.getElementById('svg-container')
);