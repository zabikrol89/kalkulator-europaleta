let draw;
let skala = 1;

function inicjalizujSVG() {
  draw = SVG().addTo('#canvas').size(600, 400);
  dostosujWidok();
}

function dostosujWidok() {
  const viewBox = draw.viewbox();
  draw.viewbox(viewBox.x, viewBox.y, viewBox.width / skala, viewBox.height / skala);
}

function isoX(x, y) {
  return (x - y) * Math.cos(Math.PI / 6);
}

function isoY(x, y, z) {
  return (x + y) * Math.sin(Math.PI / 6) - z;
}

function rysujPalete(szer, dl, wys) {
  const grupa = draw.group();

  grupa.polygon(`
    ${isoX(0, dl)},${isoY(0, dl, 0)}
    ${isoX(szer, dl)},${isoY(szer, dl, 0)}
    ${isoX(szer, 0)},${isoY(szer, 0, 0)}
    ${isoX(0, 0)},${isoY(0, 0, 0)}
  `).fill('#8B4513').stroke({ color: '#5D2E0D', width: 1 });

  grupa.polygon(`
    ${isoX(0, dl)},${isoY(0, dl, 0)}
    ${isoX(0, dl)},${isoY(0, dl, wys)}
    ${isoX(szer, dl)},${isoY(szer, dl, wys)}
    ${isoX(szer, dl)},${isoY(szer, dl, 0)}
  `).fill('#6B3E26').stroke({ color: '#5D2E0D', width: 1 });

  grupa.polygon(`
    ${isoX(szer, 0)},${isoY(szer, 0, 0)}
    ${isoX(szer, 0)},${isoY(szer, 0, wys)}
    ${isoX(szer, dl)},${isoY(szer, dl, wys)}
    ${isoX(szer, dl)},${isoY(szer, dl, 0)}
  `).fill('#5D2E0D').stroke({ color: '#4A2508', width: 1 });

  return grupa;
}

function rysujPaczke(x, y, z, szer, dl, wys) {
  const grupa = draw.group();

  grupa.polygon(`
    ${isoX(x, y)},${isoY(x, y, z + wys)}
    ${isoX(x + szer, y)},${isoY(x + szer, y, z + wys)}
    ${isoX(x + szer, y + dl)},${isoY(x + szer, y + dl, z + wys)}
    ${isoX(x, y + dl)},${isoY(x, y + dl, z + wys)}
  `).fill('#4A90E2').stroke({ color: '#1E3A8A', width: 1 });

  grupa.polygon(`
    ${isoX(x + szer, y)},${isoY(x + szer, y, z)}
    ${isoX(x + szer, y)},${isoY(x + szer, y, z + wys)}
    ${isoX(x + szer, y + dl)},${isoY(x + szer, y + dl, z + wys)}
    ${isoX(x + szer, y + dl)},${isoY(x + szer, y + dl, z)}
  `).fill('#3A7BC8').stroke({ color: '#1E3A8A', width: 1 });

  grupa.polygon(`
    ${isoX(x, y + dl)},${isoY(x, y + dl, z)}
    ${isoX(x, y + dl)},${isoY(x, y + dl, z + wys)}
    ${isoX(x + szer, y + dl)},${isoY(x + szer, y + dl, z + wys)}
    ${isoX(x + szer, y + dl)},${isoY(x + szer, y + dl, z)}
  `).fill('#2A6DB8').stroke({ color: '#1E3A8A', width: 1 });

  return grupa;
}

function obliczIloscPaczek() {
  const szer_paczki = parseInt(document.getElementById('paczka-szer').value);
  const dl_paczki = parseInt(document.getElementById('paczka-dl').value);
  const wys_paczki = parseInt(document.getElementById('paczka-wys').value);
  const wys_max = parseInt(document.getElementById('paleta-wys-max').value);
  const szer_palety = 80;
  const dl_palety = 120;
  const wys_palety = 14;

  if (isNaN(szer_paczki) || isNaN(dl_paczki) || isNaN(wys_paczki) || isNaN(wys_max)) {
    document.getElementById('wynik').innerHTML = 'Proszę wprowadzić poprawne wartości liczbowe dla wszystkich pól.';
    return;
  }

  const uklady = [
    { szer: Math.floor(szer_palety / szer_paczki), dl: Math.floor(dl_palety / dl_paczki), wys: Math.floor((wys_max - wys_palety) / wys_paczki) },
    { szer: Math.floor(szer_palety / dl_paczki), dl: Math.floor(dl_palety / szer_paczki), wys: Math.floor((wys_max - wys_palety) / wys_paczki) }
  ];

  let optymalny_uklad = null;
  for (const uklad of uklady) {
    const ile_paczek = uklad.szer * uklad.dl * uklad.wys;
    const szerokosc_paczki = uklad.szer === Math.floor(szer_palety / szer_paczki) ? szer_paczki : dl_paczki;
    const dlugosc_paczki = uklad.dl === Math.floor(dl_palety / dl_paczki) ? dl_paczki : szer_paczki;

    if (uklad.szer * szerokosc_paczki <= szer_palety && uklad.dl * dlugosc_paczki <= dl_palety) {
      if (!optymalny_uklad || ile_paczek > optymalny_uklad.szer * optymalny_uklad.dl * optymalny_uklad.wys) {
        optymalny_uklad = uklad;
      }
    }
  }

  if (!optymalny_uklad) {
    document.getElementById('wynik').innerHTML = 'Podane wymiary paczki nie pozwalają na optymalne ułożenie na europalecie bez przekraczania jej krawędzi. Proszę zweryfikować wprowadzone dane.';
    return;
  }

  const ile_paczek = optymalny_uklad.szer * optymalny_uklad.dl * optymalny_uklad.wys;

  document.getElementById('wynik').innerHTML = `Na paletę zmieści się ${ile_paczek} paczek (${optymalny_uklad.szer} x ${optymalny_uklad.dl} x ${optymalny_uklad.wys}).`;

  rysujWizualizacje(optymalny_uklad, szer_paczki, dl_paczki, wys_paczki, szer_palety, dl_palety, wys_palety);
}

function rysujWizualizacje(uklad, szer_paczki, dl_paczki, wys_paczki, szer_palety, dl_palety, wys_palety) {
  draw.clear();

  rysujPalete(szer_palety, dl_palety, wys_palety);

  const GAP = 0.5;
  for (let z = 0; z < uklad.wys; z++) {
    for (let y = 0; y < uklad.dl; y++) {
      for (let x = 0; x < uklad.szer; x++) {
        const posX = x * (szer_paczki + GAP);
        const posY = y * (dl_paczki + GAP);
        const posZ = z * (wys_paczki + GAP) + wys_palety;
        rysujPaczke(posX, posY, posZ, szer_paczki, dl_paczki, wys_paczki);
      }
    }
  }

  dostosujWidok();
}

function zmienSkale(delta) {
  skala = Math.max(0.5, Math.min(skala + delta, 3));
  dostosujWidok();
}

document.addEventListener('DOMContentLoaded', () => {
  inicjalizujSVG();
  document.getElementById('oblicz').addEventListener('click', obliczIloscPaczek);
  document.getElementById('zoom-in').addEventListener('click', () => zmienSkale(0.1));
  document.getElementById('zoom-out').addEventListener('click', () => zmienSkale(-0.1));
});