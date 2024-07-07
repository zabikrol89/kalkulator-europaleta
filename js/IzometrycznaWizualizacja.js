const { ZoomIn, ZoomOut } = LucideReact;

const IzometrycznaWizualizacja = ({ szerPaczki, dlPaczki, wysPaczki, optymalnyUklad }) => {
  const [skala, setSkala] = React.useState(1);
  const [viewBox, setViewBox] = React.useState("-150 -100 300 200");

  const SZER_PALETY = 80 * skala;
  const DL_PALETY = 120 * skala;
  const WYS_PALETY = 14 * skala;

  React.useEffect(() => {
    dostosujWidok();
  }, [optymalnyUklad, skala]);

  const dostosujWidok = () => {
    const maxWymiar = Math.max(
      optymalnyUklad.x * szerPaczki,
      optymalnyUklad.y * dlPaczki, 
      optymalnyUklad.z * wysPaczki
    );
    const nowaSkala = 200 / maxWymiar;
    setSkala(nowaSkala);
    
    const szerokosc = Math.max(300, SZER_PALETY + DL_PALETY);
    const wysokosc = Math.max(200, SZER_PALETY + DL_PALETY + optymalnyUklad.z * wysPaczki * nowaSkala);
    setViewBox(`${-szerokosc/2} ${-wysokosc/2} ${szerokosc} ${wysokosc}`);
  };

  const isoX = (x, y) => (x - y) * Math.cos(Math.PI / 6);
  const isoY = (x, y, z) => (x + y) * Math.sin(Math.PI / 6) - z;

  const renderPaleta = () => (
    <g>
      <polygon
        points={`
          ${isoX(0, DL_PALETY)},${isoY(0, DL_PALETY, 0)}
          ${isoX(SZER_PALETY, DL_PALETY)},${isoY(SZER_PALETY, DL_PALETY, 0)}
          ${isoX(SZER_PALETY, 0)},${isoY(SZER_PALETY, 0, 0)}
          ${isoX(0, 0)},${isoY(0, 0, 0)}
        `}
        fill="#8B4513"
        stroke="#5D2E0D"
        strokeWidth="1"
      />
      <polygon
        points={`
          ${isoX(0, DL_PALETY)},${isoY(0, DL_PALETY, 0)}
          ${isoX(0, DL_PALETY)},${isoY(0, DL_PALETY, WYS_PALETY)}
          ${isoX(SZER_PALETY, DL_PALETY)},${isoY(SZER_PALETY, DL_PALETY, WYS_PALETY)}
          ${isoX(SZER_PALETY, DL_PALETY)},${isoY(SZER_PALETY, DL_PALETY, 0)}
        `}
        fill="#6B3E26"
        stroke="#5D2E0D"
        strokeWidth="1"
      />
      <polygon
        points={`
          ${isoX(SZER_PALETY, 0)},${isoY(SZER_PALETY, 0, 0)}
          ${isoX(SZER_PALETY, 0)},${isoY(SZER_PALETY, 0, WYS_PALETY)}
          ${isoX(SZER_PALETY, DL_PALETY)},${isoY(SZER_PALETY, DL_PALETY, WYS_PALETY)}
          ${isoX(SZER_PALETY, DL_PALETY)},${isoY(SZER_PALETY, DL_PALETY, 0)}
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
    for (let z = 0; z < optymalnyUklad.z; z++) {
      for (let y = 0; y < optymalnyUklad.y; y++) {
        for (let x = 0; x < optymalnyUklad.x; x++) {
          const posX = x * (szerPaczki * skala + GAP);
          const posY = y * (dlPaczki * skala + GAP);
          const posZ = z * (wysPaczki * skala + GAP) + WYS_PALETY;

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
      dostosujWidok();
      return nowaSkala;
    });
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Wizualizacja izometryczna paczek na palecie</h2>
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
    </div>
  );
};