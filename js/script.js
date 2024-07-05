// Importy (jeśli używasz modułów)
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let paletteView3D;

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('palette-form');
    const obliczButton = document.getElementById('oblicz');
    const view2DButton = document.getElementById('view-2d');
    const view3DButton = document.getElementById('view-3d');
    const exportPDFButton = document.getElementById('export-pdf');
    const exportExcelButton = document.getElementById('export-excel');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        obliczIloscPaczek();
    });

    view2DButton.addEventListener('click', function() {
        toggleView('2d');
    });

    view3DButton.addEventListener('click', function() {
        toggleView('3d');
    });

    exportPDFButton.addEventListener('click', exportToPDF);
    exportExcelButton.addEventListener('click', exportToExcel);
});

function obliczIloscPaczek() {
    // Twój istniejący kod obliczeniowy
    // ...

    // Dodaj obliczenia wagi
    const wagaPaczki = parseFloat(document.getElementById('paczka-waga').value);
    const calkowitaWaga = ile_paczek * wagaPaczki;

    // Aktualizacja wyników
    document.getElementById('wynik').innerHTML = wynik_tekst;
    document.getElementById('waga-wynik').innerHTML = `Całkowita waga: ${calkowitaWaga} kg`;

    // Aktualizacja wizualizacji
    updateVisualization(optymalny_uklad);
}

function updateVisualization(uklad) {
    // Aktualizacja canvas 2D
    // ...

    // Aktualizacja widoku 3D
    if (paletteView3D) {
        paletteView3D.updatePackages(uklad);
    }
}

function toggleView(view) {
    const canvas2D = document.getElementById('canvas-2d');
    const canvas3D = document.getElementById('canvas-3d');
    const view2DButton = document.getElementById('view-2d');
    const view3DButton = document.getElementById('view-3d');

    if (view === '3d') {
        canvas2D.style.display = 'none';
        canvas3D.style.display = 'block';
        view2DButton.classList.remove('active');
        view3DButton.classList.add('active');
        if (!paletteView3D) {
            paletteView3D = new PaletteView3D(canvas3D);
        }
    } else {
        canvas2D.style.display = 'block';
        canvas3D.style.display = 'none';
        view2DButton.classList.add('active');
        view3DButton.classList.remove('active');
    }
}

class PaletteView3D {
    constructor(container) {
        // Inicjalizacja Three.js
        // ...
    }

    updatePackages(uklad) {
        // Aktualizacja układu paczek w widoku 3D
        // ...
    }
}

function exportToPDF() {
    // Logika eksportu do PDF
    console.log('Eksport do PDF');
}

function exportToExcel() {
    // Logika eksportu do Excel
    console.log('Eksport do Excel');
}