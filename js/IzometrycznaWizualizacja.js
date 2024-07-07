import React, { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

const IzometrycznaWizualizacja = ({ szerPaczki, dlPaczki, wysPaczki, maxWysokosc = 190 }) => {
  const [skala, setSkala] = useState(1);
  const [viewBox, setViewBox] = useState("-150 -100 300 200");

  const SZER_PALETY = 80;
  const DL_PALETY = 120;
  const WYS_PALETY = 14;

  const optymalnyUklad = {
    szer: Math.floor(SZER_PALETY / szerPaczki),
    dl: Math.floor(DL_PALETY / dlPaczki),
    wys: Math.floor((maxWysokosc - WYS_PALETY) / wysPaczki)
  };

  useEffect(() => {
    dostosujWidok();
  }, [szerPaczki, dlPaczki, wysPaczki, skala, maxWysokosc]);

  const dostosujWidok = () => {
    const maxWymiar = Math.max(
      SZER_PALETY,
      DL_PALETY,
      optymalnyUklad.wys * wysPaczki + WYS_PALETY
    );
    const nowaSkala = 200 / maxWymiar;
    setSkala(nowaSkala);
    
    const szerokosc = Math.max(300, (SZER_PALETY + DL_PALETY) * nowaSkala);
    const wysokosc = Math.max(200, (SZER_PALETY + DL_PALETY + optymalnyUklad.wys * wysPaczki + WYS_PALETY) * nowaSkala);
    setViewBox(`${-szerokosc/2} ${-wysokosc/2} ${szerokosc} ${wysokosc}`);
  };

  const isoX = (x, y) => (x - y) * Math.cos(Math.PI / 6);
  const isoY = (x, y, z) => (x + y) * Math.sin(Math.PI / 6) - z;

  const renderPaleta = () => (
    <g>
      <polygon
        points={`
          ${isoX(0, DL_PALETY * skala)},${isoY(0, DL_PALETY * skala, 0)}
          ${isoX(SZER_PALETY * skala, DL_PALETY * skala)},${isoY(SZER_PALETY * skala, DL_PALETY * skala, 0)}
          ${isoX(SZER_PALETY * skala, 0)},${isoY(SZER_PALETY * skala, 0, 0)}
          ${isoX(0, 0)},${isoY(0, 0, 0)}
        `}
        fill="#8B4513"
        stroke="#5D2E0D"
        strokeWidth="1"
      />
      <polygon
        points={`
          ${isoX(0, DL_PALETY * skala)},${isoY(0, DL_PALETY * skala, 0)}
          ${isoX(0, DL_PALETY * skala)},${isoY(0, DL_PALETY * skala, WYS_PALETY * skala)}
          ${isoX(SZER_PALETY * skala, DL_PALETY * skala)},${isoY(SZER_PALETY * skala, DL_PALETY * skala, WYS_PALETY * skala)}
          ${isoX(SZER_PALETY * skala, DL_PALETY * skala)},${isoY(SZER_PALETY * skala, DL_PALETY * skala, 0)}
        `}
        fill="#6B3E26"
        stroke="#5D2E0D"
        strokeWidth="1"
      />
      <polygon
        points={`
          ${isoX(SZER_PALETY * skala, 0)},${isoY(SZER_PALETY * skala, 0, 0)}
          ${isoX(SZER_PALETY * skala, 0)},${isoY(SZER_PALETY * skala, 0, WYS_PALETY * skala)}
          ${isoX(SZER_PALETY * skala, DL_PALETY * skala)},${isoY(SZER_PALETY * skala, DL_PALETY * skala, WYS_PALETY * skala)}
          ${isoX(SZER_PALETY * skala, DL_PALETY * skala)},${isoY(SZER_PALETY * skala, DL_PALETY * skala, 0)}
        `}
        fill="#5D2E0D"
        stroke="#4A2508"
        strokeWidth="1"
      />
    </g>
  );

  const renderPaczki = () => {
    const paczki = [];
    const GAP = 0.5;
    for (let z = 0; z < optymalnyUklad.wys; z++) {
      for (let y = 0; y < optymalnyUklad.dl; y++) {
        for (let x = 0; x < optymalnyUklad.szer; x++) {
          const posX = x * (szerPaczki * skala + GAP);
          const posY = y * (dlPaczki * skala + GAP);
          const posZ = z * (wysPaczki * skala + GAP) + WYS_PALETY * skala;

          paczki.push(
            <g key={`paczka-${x}-${y}-${z}`}>
              <polygon
                points={`
                  ${isoX(posX, posY)},${isoY(posX, posY, posZ + wysPaczki * skala)}
                  ${isoX(posX + szerPaczki * skala, posY)},${isoY(posX + szerPaczki * skala, posY, posZ + wysPaczki * skala)}
                  ${isoX(posX + szerPaczki * skala, posY + dlPaczki * skala)},${isoY(posX + szerPaczki * skala, posY + dlPaczki * skala, posZ + wysPaczki * skala)}
                  ${isoX(posX, posY + dlPaczki * skala)},${isoY(posX, posY + dlPaczki * skala, posZ + wysPaczki * skala)}
                `}
                fill="#4A90E2"
                stroke="#1E3A8A"
                strokeWidth="1"
              />
              <polygon
                points={`
                  ${isoX(posX + szerPaczki * skala, posY)},${isoY(posX + szerPaczki * skala, posY, posZ)}
                  ${isoX(posX + szerPaczki * skala, posY)},${isoY(posX + szerPaczki * skala, posY, posZ + wysPaczki * skala)}
                  ${isoX(posX + szerPaczki * skala, posY + dlPaczki * skala)},${isoY(posX + szerPaczki * skala, posY + dlPaczki * skala, posZ + wysPaczki * skala)}
                  ${isoX(posX + szerPaczki * skala, posY + dlPaczki * skala)},${isoY(posX + szerPaczki * skala, posY + dlPaczki * skala, posZ)}
                `}
                fill="#3A7BC8"
                stroke="#1E3A8A"
                strokeWidth="1"
              />
              <polygon
                points={`
                  ${isoX(posX, posY + dlPaczki * skala)},${isoY(posX, posY + dlPaczki * skala, posZ)}
                  ${isoX(posX, posY + dlPaczki * skala)},${isoY(posX, posY + dlPaczki * skala, posZ + wysPaczki * skala)}
                  ${isoX(posX + szerPaczki * skala, posY + dlPaczki * skala)},${isoY(posX + szerPaczki * skala, posY + dlPaczki * skala, posZ + wysPaczki * skala)}
                  ${isoX(posX + szerPaczki * skala, posY + dlPaczki * skala)},${isoY(posX + szerPaczki * skala, posY + dlPaczki * skala, posZ)}
                `}
                fill="#2A6DB8"
                stroke="#1E3A8A"
                strokeWidth="1"
              />
            </g>
          );
        }
      }
    }
    return paczki;
  };

  const zmienSkale = (delta) => {
    setSkala(prevSkala => {
      const nowaSkala = Math.max(0.5, Math.min(prevSkala + delta, 3));
      return nowaSkala;
    });
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex items-center space-x-2 mb-2">
        <button onClick={() => zmienSkale(-0.1)} className="p-1 border rounded">
          <ZoomOut size={24} />
        </button>
        <button onClick={() => zmienSkale(0.1)} className="p-1 border rounded">
          <ZoomIn size={24} />
        </button>
      </div>
      <svg width="600" height="400" viewBox={viewBox}>
        <g>
          {renderPaleta()}
          {renderPaczki()}
        </g>
      </svg>
      <p className="mt-4">
        Optymalne ułożenie: {optymalnyUklad.szer} x {optymalnyUklad.dl} x {optymalnyUklad.wys} paczek
      </p>
      <p>
        Łączna ilość paczek: {optymalnyUklad.szer * optymalnyUklad.dl * optymalnyUklad.wys}
      </p>
    </div>
  );
};

export default IzometrycznaWizualizacja;