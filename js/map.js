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
// 2. 행정경계 비교 지도
//    강남구-대치4동 / 양산시-물금읍
// ==================================================


// 시군구 스타일
const sigunguStyle = {
  color: '#555555',
  weight: 2,
  fillColor: '#999999',
  fillOpacity: 0.08
};


// 읍면동 강조 스타일
const dongStyle = {
  color: '#d62728',
  weight: 3,
  fillColor: '#d62728',
  fillOpacity: 0.25
};



// --------------------------------------------------
// 2-1. 강남구 지도
// --------------------------------------------------

const gangnamMap = L.map('gangnam-map');

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }
).addTo(gangnamMap);


// 강남구 경계
fetch('data/gangnam_boundary.geojson')
  .then(response => response.json())
  .then(data => {
    const gangnamLayer = L.geoJSON(data, {
      style: sigunguStyle
    }).addTo(gangnamMap);

    // 강남구 전체가 화면에 들어오도록 자동 확대
    gangnamMap.fitBounds(
      gangnamLayer.getBounds(),
      { padding: [20, 20] }
    );

    gangnamLayer.bindPopup(
      '<b>서울특별시 강남구</b>'
    );
  })
  .catch(error => {
    console.error('강남구 GeoJSON 불러오기 오류:', error);
  });


// 대치4동 경계
fetch('data/daechi4_boundary.geojson')
  .then(response => response.json())
  .then(data => {
    const daechiLayer = L.geoJSON(data, {
      style: dongStyle
    }).addTo(gangnamMap);

    daechiLayer.bindPopup(
      '<b>서울특별시 강남구 대치4동</b>'
    );
  })
  .catch(error => {
    console.error('대치4동 GeoJSON 불러오기 오류:', error);
  });



// --------------------------------------------------
// 2-2. 양산시 지도
// --------------------------------------------------

const yangsanMap = L.map('yangsan-map');

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }
).addTo(yangsanMap);


// 양산시 경계
fetch('data/yangsan_boundary.geojson')
  .then(response => response.json())
  .then(data => {
    const yangsanLayer = L.geoJSON(data, {
      style: sigunguStyle
    }).addTo(yangsanMap);

    // 양산시 전체가 화면에 들어오도록 자동 확대
    yangsanMap.fitBounds(
      yangsanLayer.getBounds(),
      { padding: [20, 20] }
    );

    yangsanLayer.bindPopup(
      '<b>경상남도 양산시</b>'
    );
  })
  .catch(error => {
    console.error('양산시 GeoJSON 불러오기 오류:', error);
  });


// 물금읍 경계
fetch('data/mulgeum_boundary.geojson')
  .then(response => response.json())
  .then(data => {
    const mulgeumLayer = L.geoJSON(data, {
      style: dongStyle
    }).addTo(yangsanMap);

    mulgeumLayer.bindPopup(
      '<b>경상남도 양산시 물금읍</b>'
    );
  })
  .catch(error => {
    console.error('물금읍 GeoJSON 불러오기 오류:', error);
  });

  // ==================================================
// 3. 스크롤형 비교 스토리 지도
// ==================================================


// 대치4동
const storyDaechiMap = L.map('story-daechi-map', {
  zoomControl: false
});

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }
).addTo(storyDaechiMap);


// 물금읍
const storyMulgeumMap = L.map('story-mulgeum-map', {
  zoomControl: false
});

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }
).addTo(storyMulgeumMap);


// 대치4동 경계
fetch('data/daechi4_boundary.geojson')
  .then(response => response.json())
  .then(data => {

    const layer = L.geoJSON(data, {
      style: dongStyle
    }).addTo(storyDaechiMap);

    storyDaechiMap.fitBounds(
      layer.getBounds(),
      { padding: [20, 20] }
    );

  });


// 물금읍 경계
fetch('data/mulgeum_boundary.geojson')
  .then(response => response.json())
  .then(data => {

    const layer = L.geoJSON(data, {
      style: dongStyle
    }).addTo(storyMulgeumMap);

    storyMulgeumMap.fitBounds(
      layer.getBounds(),
      { padding: [20, 20] }
    );

  });

  // ==================================================
// 4. 스토리 단계 스크롤 감지
// ==================================================

const storySteps = document.querySelectorAll('.story-step');

const stepObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        storySteps.forEach(step => {
          step.classList.remove('active');
        });

        entry.target.classList.add('active');

        const stepName = entry.target.dataset.step;

        console.log('현재 단계:', stepName);
      }

    });

  },
  {
    threshold: 0.6
  }
);


storySteps.forEach(step => {
  stepObserver.observe(step);
});