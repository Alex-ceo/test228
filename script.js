// Инициализация карты
const map = L.map('map').setView([48.3794, 31.1656], 6); // Центр Украины

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Функция для добавления маркера
function addMarker(lat, lng, description) {
  const marker = L.marker([lat, lng]).addTo(map);
  marker.bindPopup(description).openPopup();

  // Сохранение маркера на сервере
  fetch('/add_marker', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lat, lng, description })
  }).then(response => response.json())
    .then(data => console.log(data));
}

// Загрузка всех маркеров с сервера
fetch('/get_markers')
  .then(response => response.json())
  .then(markers => {
    markers.forEach(marker => {
      L.marker([marker.lat, marker.lng])
        .addTo(map)
        .bindPopup(marker.description);
    });
  });

// Пример добавления маркера при клике на карту
map.on('click', function(e) {
  const lat = e.latlng.lat;
  const lng = e.latlng.lng;
  const description = prompt("Введите описание для этого места:");
  if (description) {
    addMarker(lat, lng, description);
  }
});

// Пример маршрута (Киев -> Львов)
L.Routing.control({
  waypoints: [
    L.latLng(50.4501, 30.5234), // Киев
    L.latLng(49.8397, 24.0297)  // Львов
  ],
  routeWhileDragging: true
}).addTo(map);
