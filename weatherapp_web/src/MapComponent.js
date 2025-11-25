import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
// Note: Acestea vor funcționa doar după ce ai instalat pachetele 'leaflet' și 'react-leaflet'.
// Asigură-te că rulezi `npm install leaflet react-leaflet` în mediul tău local.
// Pentru mediul de lucru actual, se presupune că bibliotecile sunt disponibile global prin <link> în index.html.

// Componenta custom care actualizează centrul hărții atunci când se schimbă locația
const ChangeView = ({ center }) => {
  const map = useMap();
  // Animația face tranziția mai fină când se schimbă orașul
  map.setView(center, map.getZoom(), { animate: true, duration: 1 });
  return null;
};

const MapComponent = ({ lat, lon, city }) => {
  // Coordonatele folosite pentru centrul hărții
  const position = useMemo(() => [lat, lon], [lat, lon]);

  // Se folosește 'key' pe MapContainer pentru a forța re-randarea completă
  // când se schimbă orașul, prevenind problemele de afișare.
  // De asemenea, asigură că se re-centrează corect.
  return (
    <div className="map-container-wrapper">
        <h3 className="map-title">Location: {city}</h3>
        <MapContainer 
          key={`${lat}-${lon}`} // Cheie unică pentru a forța re-randarea
          center={position} 
          zoom={10} // Nivel de zoom standard
          scrollWheelZoom={false} // Dezactivează zoom-ul cu rotița pentru o mai bună experiență mobilă
          className="map-container"
        >
          {/* Componenta pentru a schimba vizualizarea când se schimbă props-urile */}
          <ChangeView center={position} />

          {/* Stratul de bază al hărții (OpenStreetMap) */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Markerul care arată locația orașului */}
          <Marker position={position}>
            {/* Pop-up simplu la click */}
            {/* <Popup>
              {city}
            </Popup> */}
          </Marker>
        </MapContainer>
    </div>
  );
};

export default MapComponent;