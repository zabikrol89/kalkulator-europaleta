function obliczIloscPaczek() {
  const szer_paczki = parseInt(document.getElementById('paczka-szer').value);
  const dl_paczki = parseInt(document.getElementById('paczka-dl').value);
  const wys_paczki = parseInt(document.getElementById('paczka-wys').value);
  const waga_paczki = parseFloat(document.getElementById('paczka-waga').value);
  const wys_max = parseInt(document.getElementById('paleta-wys-max').value);
  const szer_palety = 80;
  const dl_palety = 120;

  if (isNaN(szer_paczki) || isNaN(dl_paczki) || isNaN(wys_paczki) || isNaN(waga_paczki) || isNaN(wys_max)) {
      document.getElementById('wyniki').innerHTML = 'Proszę wprowadzić poprawne wartości liczbowe dla wszystkich pól.';
      return;
  }

  const uklady = [
      { szer: Math.floor(szer_palety / szer_paczki), dl: Math.floor(dl_palety / dl_paczki), wys: Math.floor(wys_max / wys_paczki) },
      { szer: Math.floor(szer_palety / dl_paczki), dl: Math.floor(dl_palety / szer_paczki), wys: Math.floor(wys_max / wys_paczki) }
  ];

  let optymalny_uklad = null;
  let ile_paczek = 0;

  for (const uklad of uklady) {
      const ilosc = uklad.szer * uklad.dl * uklad.wys;
      if (ilosc > ile_paczek) {
          ile_paczek = ilosc;
          optymalny_uklad = uklad;
      }
  }

  const calkowita_waga = ile_paczek * waga_paczki;

  let wynik_tekst = `Na paletę zmieści się ${ile_paczek} paczek (${optymalny_uklad.szer} x ${optymalny_uklad.dl} x ${optymalny_uklad.wys}).`;
  wynik_tekst += `<br>Całkowita waga: ${calkowita_waga.toFixed(2)} kg`;

  document.getElementById('wyniki').innerHTML = wynik_tekst;

  aktualizujWizualizacje(optymalny_uklad, szer_paczki, dl_paczki, wys_paczki);
}

function aktualizujWizualizacje(uklad, szer_paczki, dl_paczki, wys_paczki) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = 'burlywood';
  ctx.fillRect(10, 10, 380, 200);
  
  ctx.fillStyle = 'steelblue';
  for (let i = 0; i < uklad.szer; i++) {
      for (let j = 0; j < uklad.dl; j++) {
          ctx.fillRect(
              10 + i * (380 / uklad.szer),
              10 + j * (200 / uklad.dl),
              380 / uklad.szer - 2,
              200 / uklad.dl - 2
          );
      }
  }
}

document.getElementById('paleta-form').addEventListener('submit', function(e) {
  e.preventDefault();
  obliczIloscPaczek();
});