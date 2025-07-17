const map = L.map('map').setView([-6.6, 106.8], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

// Load GeoJSON data
fetch('data/rumah_sakit_bogor.geojson')
  .then((response) => response.json())
  .then((data) => {
    let totalRS = data.features.length;
    document.getElementById('jumlah-rs').textContent = `Total: ${totalRS} Rumah Sakit`;

    L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        const props = feature.properties;
        const popupContent = `
  <div class="popup-content">
    <div class="popup-title">${props.nama}</div>
    <div><span class="popup-label">Jenis:</span> ${props.jenis ?? '-'}</div>
    <div><span class="popup-label">Alamat:</span> ${props.alamat}</div>
    <div><span class="popup-label">Telepon:</span> ${props.telepon ?? '-'}</div>
  </div>
`;

        layer.bindPopup(popupContent);
      },
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
          icon: L.icon({
            iconUrl: 'hospital.png',
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            popupAnchor: [0, -30],
          }),
        });
      },
    }).addTo(map);
  });
