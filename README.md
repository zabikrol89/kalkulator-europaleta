# Kalkulator paczek na europalecie

Aplikacja internetowa do obliczania optymalnego układu paczek na europalecie.

## Opis
Aplikacja umożliwia użytkownikowi wprowadzenie wymiarów paczek (szerokość, długość, wysokość) oraz maksymalnej wysokości układania. Na podstawie tych danych, aplikacja oblicza optymalny układ paczek na europalecie (80 cm x 120 cm) i wyświetla liczbę możliwych do umieszczenia paczek oraz ich całkowitą wagę.

Dodatkowo, aplikacja generuje wizualizację SVG prezentującą optymalny układ paczek na palecie.

## Struktura projektu
Projekt składa się z następujących plików:

1. `index.html` - Główny plik HTML zawierający interfejs użytkownika.
2. `script.js` - Plik JavaScript implementujący logikę obliczeń i wizualizacji.
3. `style.css` - Plik CSS z stylami graficznymi aplikacji.

## Uruchamianie lokalnie
1. Upewnij się, że masz zainstalowane środowisko Node.js.
2. Otwórz terminal, przejdź do katalogu projektu i uruchom serwer HTTP:
   ```
   npx http-server
   ```
3. Otwórz przeglądarkę internetową i wejdź na adres `http://localhost:8080`.

## Cofanie zmian
Aby cofnąć wprowadzone zmiany, możesz użyć poleceń Git:

1. Wyświetl listę ostatnich commitów:
   ```
   git log --oneline
   ```
2. Cofnij się do poprzedniego commita:
   ```
   git reset HEAD~1
   ```
3. Cofnij się do wybranego commita:
   ```
   git reset <hash_commita>
   ```
4. Przywróć plik do stanu z commita:
   ```
   git checkout -- <nazwa_pliku>
   ```

Pamiętaj, aby przed cofaniem zmian dokładnie sprawdzić, co robisz, aby uniknąć utraty danych.
