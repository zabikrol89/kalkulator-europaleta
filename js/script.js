const SimpleCanvasVisualization = ({ boxCount, layout }) => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const boxWidth = 40;
    const boxHeight = 30;
    const paletteHeight = 20;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Rysowanie palety
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, canvas.height - paletteHeight, canvas.width, paletteHeight);

    // Rysowanie paczek
    ctx.fillStyle = '#90EE90';
    ctx.strokeStyle = '#2E8B57';

    for (let z = 0; z < layout.z; z++) {
      for (let x = 0; x < layout.x; x++) {
        if (x + z * layout.x < boxCount) {
          const xPos = x * boxWidth;
          const yPos = canvas.height - paletteHeight - (z + 1) * boxHeight;

          ctx.fillRect(xPos, yPos, boxWidth, boxHeight);
          ctx.strokeRect(xPos, yPos, boxWidth, boxHeight);
        }
      }
    }

    // Dodanie tekstu
    ctx.fillStyle = 'black';
    ctx.font = '14px Arial';
    ctx.fillText(`Układ: ${layout.x} x ${layout.y} x ${layout.z}`, 10, 20);
    ctx.fillText(`Liczba paczek: ${boxCount}`, 10, 40);
  }, [boxCount, layout]);

  return <canvas ref={canvasRef} width={400} height={300} />;
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
    <SimpleCanvasVisualization boxCount={ile_paczek} layout={layout} />,
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
  <SimpleCanvasVisualization boxCount={0} layout={{x: 1, y: 1, z: 1}} />,
  document.getElementById('svg-container')
);