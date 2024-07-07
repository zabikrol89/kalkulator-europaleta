import IzometrycznaWizualizacja from './IzometrycznaWizualizacja.js';

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

  const optymalnyUklad = {
    x: Math.floor(szer_palety / szer_paczki),
    y: Math.floor(dl_palety / dl_paczki),
    z: Math.floor(wys_max / wys_paczki)
  };
  const ile_paczek = optymalnyUklad.x * optymalnyUklad.y * optymalnyUklad.z;
  const calkowita_waga = ile_paczek * waga_paczki;

  let wynik_tekst = `Na paletę zmieści się ${ile_paczek} paczek (${optymalnyUklad.x} x ${optymalnyUklad.y} x ${optymalnyUklad.z}).`;
  wynik_tekst += `<br>Całkowita waga: ${calkowita_waga.toFixed(2)} kg`;

  document.getElementById('wyniki-content').innerHTML = wynik_tekst;

  ReactDOM.render(
    <IzometrycznaWizualizacja 
      szerPaczki={szer_paczki}
      dlPaczki={dl_paczki}
      wysPaczki={wys_paczki}
      maxWysokosc={wys_max}
    />,
    document.getElementById('svg-container')
  );
}

document.getElementById('paleta-form').addEventListener('submit', function(e) {
  e.preventDefault();
  obliczIloscPaczek();
});

// Inicjalne renderowanie pustej wizualizacji
ReactDOM.render(
  <IzometrycznaWizualizacja szerPaczki={40} dlPaczki={60} wysPaczki={40} />,
  document.getElementById('svg-container')
);