function obliczIloscPaczek() {
  const szer_paczki = parseInt(document.getElementById('paczka-szer').value);
  const dl_paczki = parseInt(document.getElementById('paczka-dl').value);
  const wys_paczki = parseInt(document.getElementById('paczka-wys').value);
  const wys_max = parseInt(document.getElementById('paleta-wys-max').value);
  const szer_palety = 80;
  const dl_palety = 120;

  // Sprawdź, czy wszystkie wartości są poprawne
  if (isNaN(szer_paczki) || isNaN(dl_paczki) || isNaN(wys_paczki) || isNaN(wys_max)) {
    document.getElementById('wynik').innerHTML = 'Proszę wprowadzić poprawne wartości liczbowe dla wszystkich pól.';
    return;
  }

  // Oblicz możliwe ułożenia paczek
  const uklady = [
    { szer: Math.floor(szer_palety / szer_paczki), dl: Math.floor(dl_palety / dl_paczki), wys: Math.floor(wys_max / wys_paczki) },
    { szer: Math.floor(szer_palety / dl_paczki), dl: Math.floor(dl_palety / szer_paczki), wys: Math.floor(wys_max / wys_paczki) }
  ];

  // Znajdź optymalne ułożenie
  let optymalny_uklad = null;
  for (const uklad of uklady) {
    const ile_paczek = uklad.szer * uklad.dl * uklad.wys;
    const szerokosc_paczki = uklad.szer === Math.floor(szer_palety / szer_paczki) ? szer_paczki : dl_paczki;
    const dlugosc_paczki = uklad.dl === Math.floor(dl_palety / dl_paczki) ? dl_paczki : szer_paczki;

    // Sprawdź, czy paczki nie wychodzą poza paletę
    if (uklad.szer * szerokosc_paczki <= szer_palety && uklad.dl * dlugosc_paczki <= dl_palety) {
      if (!optymalny_uklad || ile_paczek > optymalny_uklad.szer * optymalny_uklad.dl * optymalny_uklad.wys) {
        optymalny_uklad = uklad;
      }
    }
  }

  // Weryfikacja realności wyniku
  if (!optymalny_uklad) {
    document.getElementById('wynik').innerHTML = 'Podane wymiary paczki nie pozwalają na optymalne ułożenie na europalecie bez przekraczania jej krawędzi. Proszę zweryfikować wprowadzone dane.';
    return;
  }

  const ile_paczek = optymalny_uklad.szer * optymalny_uklad.dl * optymalny_uklad.wys;

  // Sprawdź, czy układ jest na styk
  const szerokosc_paczki = optymalny_uklad.szer === Math.floor(szer_palety / szer_paczki) ? szer_paczki : dl_paczki;
  const dlugosc_paczki = optymalny_uklad.dl === Math.floor(dl_palety / dl_paczki) ? dl_paczki : szer_paczki;
  const na_styk = (optymalny_uklad.szer * szerokosc_paczki === szer_palety &&
                   optymalny_uklad.dl * dlugosc_paczki === dl_palety &&
                   optymalny_uklad.wys * wys_paczki === wys_max);

  let wynik_tekst = `Na paletę zmieści się ${ile_paczek} paczek (${optymalny_uklad.szer} x ${optymalny_uklad.dl} x ${optymalny_uklad.wys}).`;

  if (na_styk) {
    const bezpieczny_uklad = { szer: optymalny_uklad.szer, dl: optymalny_uklad.dl, wys: optymalny_uklad.wys - 1 };
    const ile_paczek_bezpiecznie = bezpieczny_uklad.szer * bezpieczny_uklad.dl * bezpieczny_uklad.wys;
    wynik_tekst += ` Układ jest na styk, co zwiększa ryzyko uszkodzenia paczek. Sugerujemy bezpieczniejszy wariant: ${ile_paczek_bezpiecznie} paczek (${bezpieczny_uklad.szer} x ${bezpieczny_uklad.dl} x ${bezpieczny_uklad.wys}).`;
  }

  document.getElementById('wynik').innerHTML = wynik_tekst;

  // Wizualizacja 2D optymalnego ułożenia
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  // Wyczyść canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Narysuj paletę
  ctx.fillStyle = 'peru';
  ctx.fillRect(50, 50, 400, 200);
  
  // Narysuj paczki zgodnie z optymalnym ułożeniem
  ctx.fillStyle = 'steelblue';
  const szer_paczki_vis = optymalny_uklad.szer === Math.floor(szer_palety / szer_paczki) ? szer_paczki : dl_paczki;
  const dl_paczki_vis = optymalny_uklad.dl === Math.floor(dl_palety / dl_paczki) ? dl_paczki : szer_paczki;
  
  for (let i = 0; i < optymalny_uklad.dl; i++) {
    for (let j = 0; j < optymalny_uklad.szer; j++) {
      ctx.fillRect(
        60 + j * (380 / optymalny_uklad.szer),
        60 + i * (180 / optymalny_uklad.dl),
        380 / optymalny_uklad.szer - 10,
        180 / optymalny_uklad.dl - 10
      );
    }
  }
  
  // Dodaj etykietę z wymiarami paczki
  ctx.fillStyle = 'black';
  ctx.font = '12px Arial';
  ctx.fillText(
    `Paczka: ${szer_paczki_vis} x ${dl_paczki_vis} x ${wys_paczki} cm`,
    60,
    40
  );
}

// Pobierz przycisk i dodaj nasłuchiwacz zdarzeń
document.addEventListener('DOMContentLoaded', function() {
  const przycisk = document.getElementById('oblicz');
  przycisk.addEventListener('click', obliczIloscPaczek);
});