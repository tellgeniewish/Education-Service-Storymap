// ==================================================
// 1. 첫 번째 지도
//    물금읍 / 대치4동 위치
// ==================================================

const map = L.map('map').setView([36.3, 127.8], 7);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }
).addTo(map);


// 물금읍 위치
const mulgeum = L.marker([35.31, 129.01])
  .addTo(map)
  .bindPopup('<b>경상남도 양산시 물금읍</b>');


// 대치4동 위치
const daechi = L.marker([37.50, 127.06])
  .addTo(map)
  .bindPopup('<b>서울특별시 강남구 대치4동</b>');



// ==================================================
// 2. 두 번째 지도
//    강남구 / 양산시 / 대치4동 / 물금읍 경계
// ==================================================

const boundaryMap = L.map('boundary-map').setView([36.2, 127.8], 7);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }
).addTo(boundaryMap);


// 시군구 스타일
const sigunguStyle = {
  color: '#333333',
  weight: 3,
  fillColor: '#999999',
  fillOpacity: 0.08
};


// 읍면동 스타일
const dongStyle = {
  color: '#d62728',
  weight: 4,
  fillColor: '#d62728',
  fillOpacity: 0.12
};


// 강남구
fetch('data/gangnam_boundary.geojson')
  .then(response => response.json())
  .then(data => {
    const gangnamLayer = L.geoJSON(data, {
      style: sigunguStyle
    }).addTo(boundaryMap);

    gangnamLayer.bindPopup(
      '<b>서울특별시 강남구</b>'
    );
  })
  .catch(error => {
    console.error('강남구 GeoJSON 불러오기 오류:', error);
  });


// 양산시
fetch('data/yangsan_boundary.geojson')
  .then(response => response.json())
  .then(data => {
    const yangsanLayer = L.geoJSON(data, {
      style: sigunguStyle
    }).addTo(boundaryMap);

    yangsanLayer.bindPopup(
      '<b>경상남도 양산시</b>'
    );
  })
  .catch(error => {
    console.error('양산시 GeoJSON 불러오기 오류:', error);
  });


// 대치4동
fetch('data/daechi4_boundary.geojson')
  .then(response => response.json())
  .then(data => {
    const daechiLayer = L.geoJSON(data, {
      style: dongStyle
    }).addTo(boundaryMap);

    daechiLayer.bindPopup(
      '<b>서울특별시 강남구 대치4동</b>'
    );
  })
  .catch(error => {
    console.error('대치4동 GeoJSON 불러오기 오류:', error);
  });


// 물금읍
fetch('data/mulgeum_boundary.geojson')
  .then(response => response.json())
  .then(data => {
    const mulgeumLayer = L.geoJSON(data, {
      style: dongStyle
    }).addTo(boundaryMap);

    mulgeumLayer.bindPopup(
      '<b>경상남도 양산시 물금읍</b>'
    );
  })
  .catch(error => {
    console.error('물금읍 GeoJSON 불러오기 오류:', error);
  });