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


// 스크롤형 스토리 지도용 행정동 경계 스타일
const storyBoundaryStyle = {
  color: '#666666',
  weight: 1.5,
  fillOpacity: 0
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
    opacity: 0.55,
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
    opacity: 0.55,
    attribution: '&copy; OpenStreetMap contributors'
  }
).addTo(storyMulgeumMap);


// 대치4동 경계
fetch('data/daechi4_boundary.geojson')
  .then(response => response.json())
  .then(data => {

    const layer = L.geoJSON(data, {
      style: storyBoundaryStyle
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
      style: storyBoundaryStyle
    }).addTo(storyMulgeumMap);

    storyMulgeumMap.fitBounds(
      layer.getBounds(),
      { padding: [20, 20] }
    );

  });

  // ==================================================
  // 스토리 지도 레이어 표시 순서 설정
  // ==================================================

  // 총인구: 아래쪽
  storyDaechiMap.createPane('populationPane');
  storyMulgeumMap.createPane('populationPane');

  storyDaechiMap.getPane('populationPane').style.zIndex = 410;
  storyMulgeumMap.getPane('populationPane').style.zIndex = 410;

  // 학령인구: 총인구 위
  storyDaechiMap.createPane('schoolAgePane');
  storyMulgeumMap.createPane('schoolAgePane');

  storyDaechiMap.getPane('schoolAgePane').style.zIndex = 420;
  storyMulgeumMap.getPane('schoolAgePane').style.zIndex = 420;

  // 학교: 가장 위
  storyDaechiMap.createPane('schoolPane');
  storyMulgeumMap.createPane('schoolPane');

  storyDaechiMap.getPane('schoolPane').style.zIndex = 430;
  storyMulgeumMap.getPane('schoolPane').style.zIndex = 430;

// ==================================================
// 3-1. 총인구 격자 레이어
// ==================================================


// 총인구 값에 따른 색상
function getPopulationColor(value) {
  return value > 500 ? '#2171B5' :
         value > 250 ? '#4292C6' :
         value > 100 ? '#6BAED6' :
         value > 50  ? '#9ECAE1' :
         value > 0   ? '#DEEBF7' :
                       'transparent';
}


// 총인구 격자 스타일
function populationStyle(feature) {
  const value = feature.properties.STAT_VAL || 0;

  return {
    fillColor: getPopulationColor(value),
    weight: 0.25,
    color: '#cccccc',
    fillOpacity: value === 0 ? 0 : 0.75
  };
}


// 대치4동 총인구
let daechiPopulationLayer;

fetch('data/daechi4_population.geojson')
  .then(response => response.json())
  .then(data => {

    daechiPopulationLayer = L.geoJSON(data, {
      pane: 'populationPane',
      style: populationStyle,

      onEachFeature: function(feature, layer) {
        const population = feature.properties.STAT_VAL;

        layer.bindPopup(
          `<b>총인구</b><br>${population}명`
        );
      }

    }).addTo(storyDaechiMap);

  })
  .catch(error => {
    console.error('대치4동 총인구 GeoJSON 불러오기 오류:', error);
  });


// 물금읍 총인구
let mulgeumPopulationLayer;

fetch('data/mulgeum_population.geojson')
  .then(response => response.json())
  .then(data => {

    mulgeumPopulationLayer = L.geoJSON(data, {
      pane: 'populationPane',
      style: populationStyle,

      onEachFeature: function(feature, layer) {
        const population = feature.properties.STAT_VAL;

        layer.bindPopup(
          `<b>총인구</b><br>${population}명`
        );
      }

    }).addTo(storyMulgeumMap);

  })
  .catch(error => {
    console.error('물금읍 총인구 GeoJSON 불러오기 오류:', error);
  });

// ==================================================
// 3-2. 학령인구 격자 레이어
// ==================================================


// 학령인구 값에 따른 색상
function getSchoolAgeColor(value) {
  return value > 120 ? '#CB181D' :
         value > 90  ? '#EF3B2C' :
         value > 60  ? '#FB6A4A' :
         value > 30  ? '#FC9272' :
         value > 0   ? '#FEE0D2' :
                       'transparent';
}


// 학령인구 격자 스타일
function schoolAgeStyle(feature) {
  const value = feature.properties.SCH_POP || 0;

  return {
    fillColor: getSchoolAgeColor(value),
    weight: 0.25,
    color: '#cccccc',
    fillOpacity: value === 0 ? 0 : 0.8
  };
}


// 대치4동 학령인구
let daechiSchoolAgeLayer;

fetch('data/daechi4_school_age.geojson')
  .then(response => response.json())
  .then(data => {

    daechiSchoolAgeLayer = L.geoJSON(data, {
      pane: 'schoolAgePane',
      style: schoolAgeStyle,

      onEachFeature: function(feature, layer) {
        const population = feature.properties.SCH_POP;

        layer.bindPopup(
          `<b>학령인구</b><br>${population.toFixed(1)}명`
        );
      }

    });

  })
  .catch(error => {
    console.error('대치4동 학령인구 GeoJSON 불러오기 오류:', error);
  });


// 물금읍 학령인구
let mulgeumSchoolAgeLayer;

fetch('data/mulgeum_school_age.geojson')
  .then(response => response.json())
  .then(data => {

    mulgeumSchoolAgeLayer = L.geoJSON(data, {
      pane: 'schoolAgePane',
      style: schoolAgeStyle,

      onEachFeature: function(feature, layer) {
        const population = feature.properties.SCH_POP;

        layer.bindPopup(
          `<b>학령인구</b><br>${population.toFixed(1)}명`
        );
      }

    });

  })
  .catch(error => {
    console.error('물금읍 학령인구 GeoJSON 불러오기 오류:', error);
  });

// ==================================================
// 3-3. 학교 위치 레이어
// ==================================================

const schoolColors = {
  elementary: '#F2C94C',
  middle: '#49A87A',
  high: '#F2994A'
};

const daechiSchoolLayers = L.layerGroup();
const mulgeumSchoolLayers = L.layerGroup();

// 학교 GeoJSON 불러오기
function loadSchoolLayer(file, schoolType, targetGroup) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error(file);
      return response.json();
    })
    .then(data => {
      L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, {
            pane: 'schoolPane',
            radius: 7,
            color: '#ffffff',
            weight: 1.5,
            fillColor: schoolColors[schoolType],
            fillOpacity: 0.95
          });
        },
        onEachFeature: function(feature, layer) {
          const name = feature.properties['학교명'] || '학교';
          const typeName = {
            elementary: '초등학교',
            middle: '중학교',
            high: '고등학교'
          }[schoolType];

          layer.bindPopup(
            `<b>${name}</b><br>학교급: ${typeName}`
          );

          // 학교명을 지도 위에 항상 표시 ---> 학교명 라벨 등록 (처음에는 숨김)
          layer.bindTooltip(name, {
            permanent: true,
            direction: 'right',
            offset: [8, 0],
            className: 'school-label',
            opacity: 0
          });
        }
      }).addTo(targetGroup);

      // 학교 데이터가 로드된 뒤에도 현재 확대 수준 반영
      const targetMap = targetGroup === daechiSchoolLayers
        ? storyDaechiMap
        : storyMulgeumMap;

      updateSchoolLabels(targetMap, targetGroup);
      })
    .catch(error => console.error('학교 데이터 오류:', error));
}

// 대치4동
loadSchoolLayer(
  'data/daechi4_elementary_school.geojson',
  'elementary',
  daechiSchoolLayers
);

// 물금읍
loadSchoolLayer(
  'data/mulgeum_elementary_school.geojson',
  'elementary',
  mulgeumSchoolLayers
);

loadSchoolLayer(
  'data/mulgeum_middle_school.geojson',
  'middle',
  mulgeumSchoolLayers
);

loadSchoolLayer(
  'data/mulgeum_high_school.geojson',
  'high',
  mulgeumSchoolLayers
);

// ==================================================
// 3-3-1. 지도 확대 수준에 따른 학교명 표시
// ==================================================

// 학교명을 표시할 최소 확대 수준
const SCHOOL_LABEL_MIN_ZOOM = 15;

// 학교명 표시 / 숨김
function updateSchoolLabels(map, schoolLayers) {

  const showLabels = map.getZoom() >= SCHOOL_LABEL_MIN_ZOOM;

  schoolLayers.eachLayer(function(geoJsonLayer) {

    geoJsonLayer.eachLayer(function(schoolMarker) {

      const tooltip = schoolMarker.getTooltip();

      if (tooltip) {
        tooltip.setOpacity(showLabels ? 1 : 0);
      }

    });

  });
}

// 대치4동 확대 시
storyDaechiMap.on('zoomend', function() {
  updateSchoolLabels(storyDaechiMap, daechiSchoolLayers);
});

// 물금읍 확대 시
storyMulgeumMap.on('zoomend', function() {
  updateSchoolLabels(storyMulgeumMap, mulgeumSchoolLayers);
});

// ==================================================
// 3-3-2. 학원·교습소 위치 레이어
// ==================================================

// // 대치4동과 물금읍 학원 레이어 그룹
// const daechiAcademyLayers = L.layerGroup();
// const mulgeumAcademyLayers = L.layerGroup();

// // 학원·교습소 GeoJSON 불러오기
// function loadAcademyLayer(file, targetGroup) {

//   fetch(file)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`${file} 불러오기 실패: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => {

//       L.geoJSON(data, {

//         // 학원 위치를 분홍색 원으로 표시
//         pointToLayer: function(feature, latlng) {

//           return L.circleMarker(latlng, {
//             radius: 3,
//             color: '#ffffff',
//             weight: 0.5,
//             fillColor: '#C64A99',
//             fillOpacity: 0.75
//           });

//         },

//         // 학원 클릭 시 정보 표시
//         onEachFeature: function(feature, layer) {

//           const properties = feature.properties || {};

//           const name =
//             properties['학원명'] ||
//             properties['교습소명'] ||
//             properties['시설명'] ||
//             '학원·교습소';

//           const category = properties['분야명'];

//           // HTML 특수문자 처리
//           function escapeHtml(value) {
//             return String(value).replace(/[&<>"']/g, function(char) {
//               return {
//                 '&': '&amp;',
//                 '<': '&lt;',
//                 '>': '&gt;',
//                 '"': '&quot;',
//                 "'": '&#39;'
//               }[char];
//             });
//           }

//           let popup = `<b>${escapeHtml(name)}</b>`;

//           if (category) {
//             popup += `<br>분야: ${escapeHtml(category)}`;
//           }

//           layer.bindPopup(popup);

//         }

//       }).addTo(targetGroup);

//     })
//     .catch(error => {
//       console.error('학원·교습소 데이터 오류:', error);
//     });

// }

// // 대치4동 학원·교습소
// loadAcademyLayer(
//   'data/daechi4_academy.geojson',
//   daechiAcademyLayers
// );

// // 물금읍 학원·교습소
// loadAcademyLayer(
//   'data/mulgeum_academy.geojson',
//   mulgeumAcademyLayers
// );
// ==================================================
// 3-3-2. 학원·교습소 위치 레이어
// ==================================================

const ACADEMY_LABEL_MIN_ZOOM = 17;

const daechiAcademyLayers = L.layerGroup();
const mulgeumAcademyLayers = L.layerGroup();

const gangnamAcademyLayers = L.layerGroup();
const yangsanAcademyLayers = L.layerGroup();

// 현재 선택된 표시 범위
const academyView = {
  daechi: 'local',
  mulgeum: 'local'
};

// 학원 전용 레이어 순서
[storyDaechiMap, storyMulgeumMap].forEach(map => {
  map.createPane('academyRegionPane');
  map.getPane('academyRegionPane').style.zIndex = 440;

  map.createPane('academyLocalPane');
  map.getPane('academyLocalPane').style.zIndex = 450;
});

// HTML 특수문자 처리
function academyEscape(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);
}

// 학원 데이터 불러오기
function loadAcademyLayer(file, group, isLocal, map) {

  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error(file);
      return response.json();
    })
    .then(data => {

      const layer = L.geoJSON(data, {

        pointToLayer: function(feature, latlng) {

          return L.circleMarker(latlng, {
            pane: isLocal
              ? 'academyLocalPane'
              : 'academyRegionPane',
            radius: isLocal ? 3.5 : 2.5,
            color: '#ffffff',
            weight: isLocal ? 0.6 : 0.3,
            fillColor: isLocal ? '#C64A99' : '#EAB4D3',
            fillOpacity: isLocal ? 0.9 : 0.65
          });
        },

        onEachFeature: function(feature, marker) {

          const p = feature.properties || {};
          const name = p['학원명'] || '학원·교습소';
          const category = p['분야명'] || '정보 없음';

          const address =
            p['도로명주소'] ||
            p['도로명�'] ||
            '';

          let popup =
            `<b>${academyEscape(name)}</b>` +
            `<br>분야: ${academyEscape(category)}`;

          if (address) {
            popup +=
              `<br>주소: ${academyEscape(address)}`;
          }

          marker.bindPopup(popup);

          marker.bindTooltip(academyEscape(name), {
            permanent: true,
            direction: 'right',
            offset: [5, 0],
            className: 'academy-label',
            opacity: 0
          });
        }

      });

      layer.addTo(group);
      updateAcademyLabels(map);

    })
    .catch(error => {
      console.error('학원 데이터 오류:', file, error);
    });
}

// 대치4동과 강남구
loadAcademyLayer(
  'data/daechi4_academy.geojson',
  daechiAcademyLayers,
  true,
  storyDaechiMap
);

loadAcademyLayer(
  'data/gangnam_academy.geojson',
  gangnamAcademyLayers,
  false,
  storyDaechiMap
);

// 물금읍과 양산시
loadAcademyLayer(
  'data/mulgeum_academy.geojson',
  mulgeumAcademyLayers,
  true,
  storyMulgeumMap
);

loadAcademyLayer(
  'data/yangsan_academy.geojson',
  yangsanAcademyLayers,
  false,
  storyMulgeumMap
);

// 확대 수준에 따라 학원명 표시
function updateAcademyLabels(map) {

  const show =
    map.getZoom() >= ACADEMY_LABEL_MIN_ZOOM;

  const groups = map === storyDaechiMap
    ? [daechiAcademyLayers, gangnamAcademyLayers]
    : [mulgeumAcademyLayers, yangsanAcademyLayers];

  groups.forEach(group => {

    group.eachLayer(geojson => {

      geojson.eachLayer(marker => {

        const tooltip = marker.getTooltip();

        if (tooltip) {
          tooltip.setOpacity(show ? 1 : 0);
        }

      });

    });

  });
}

storyDaechiMap.on('zoomend', () => {
  updateAcademyLabels(storyDaechiMap);
});

storyMulgeumMap.on('zoomend', () => {
  updateAcademyLabels(storyMulgeumMap);
});

// 지역별 학원 레이어 표시
function applyAcademyView(region) {

  const isDaechi = region === 'daechi';

  const map = isDaechi
    ? storyDaechiMap
    : storyMulgeumMap;

  const localGroup = isDaechi
    ? daechiAcademyLayers
    : mulgeumAcademyLayers;

  const regionGroup = isDaechi
    ? gangnamAcademyLayers
    : yangsanAcademyLayers;

  const mode = academyView[region];

  // 두 레이어를 먼저 제거
  map.removeLayer(localGroup);
  map.removeLayer(regionGroup);

  // 전체 지역은 아래, 핵심 지역은 위
  if (mode === 'all') {
    regionGroup.addTo(map);
  }

  localGroup.addTo(map);

  // 선택 범위에 맞춰 지도 이동
  const boundaryFile = isDaechi
    ? (mode === 'all'
        ? 'data/gangnam_boundary.geojson'
        : 'data/daechi4_boundary.geojson')
    : (mode === 'all'
        ? 'data/yangsan_boundary.geojson'
        : 'data/mulgeum_boundary.geojson');

  fetch(boundaryFile)
    .then(response => response.json())
    .then(data => {
      if (!document.querySelector(
        '.story-step[data-step="academy"].active'
      )) return;

      const bounds = L.geoJSON(data).getBounds();

      if (bounds.isValid()) {
        map.fitBounds(bounds, {
          padding: [20, 20]
        });
      }
    });

  updateAcademyLabels(map);
}

// 지도 내부 버튼 생성
function createAcademyControl(map, region) {

  const control = L.control({
    position: 'topright'
  });

  control.onAdd = function() {

    const container = L.DomUtil.create(
      'div',
      'academy-map-control'
    );

    const isDaechi = region === 'daechi';

    const localName = isDaechi
      ? '대치4동'
      : '물금읍';

    const regionName = isDaechi
      ? '강남구 전체'
      : '양산시 전체';

    container.innerHTML = `
      <button type="button" data-mode="local"
        class="selected">${localName}</button>
      <button type="button" data-mode="all">
        ${regionName}</button>
    `;

    L.DomEvent.disableClickPropagation(container);
    L.DomEvent.disableScrollPropagation(container);

    container.querySelectorAll('button').forEach(button => {

      button.addEventListener('click', () => {

        const mode = button.dataset.mode;

        academyView[region] = mode;

        container.querySelectorAll('button').forEach(b => {
          b.classList.toggle(
            'selected',
            b.dataset.mode === mode
          );
        });

        applyAcademyView(region);
      });

    });

    return container;
  };

  control.addTo(map);
  return control.getContainer();
}

const daechiAcademyControl = createAcademyControl(
  storyDaechiMap,
  'daechi'
);

const mulgeumAcademyControl = createAcademyControl(
  storyMulgeumMap,
  'mulgeum'
);

// 최초에는 버튼 숨김
daechiAcademyControl.style.display = 'none';
mulgeumAcademyControl.style.display = 'none';


// ==================================================
// 3-4. 스토리 지도 범례
// ==================================================

const storyLegend = document.getElementById('story-legend');


function updateLegend(type) {

  // 총인구
  if (type === 'population') {

    storyLegend.innerHTML = `
      <span class="legend-title">총인구(명)</span>

      <span class="legend-item">
        <span class="legend-color" style="background:#DEEBF7;"></span>
        1~50
      </span>

      <span class="legend-item">
        <span class="legend-color" style="background:#9ECAE1;"></span>
        51~100
      </span>

      <span class="legend-item">
        <span class="legend-color" style="background:#6BAED6;"></span>
        101~250
      </span>

      <span class="legend-item">
        <span class="legend-color" style="background:#4292C6;"></span>
        251~500
      </span>

      <span class="legend-item">
        <span class="legend-color" style="background:#2171B5;"></span>
        501 이상
      </span>
    `;
  }


  // 학령인구
  if (type === 'school-age') {

    storyLegend.innerHTML = `
      <span class="legend-title">학령인구(명)</span>

      <span class="legend-item">
        <span class="legend-color" style="background:#FEE0D2;"></span>
        1~30
      </span>

      <span class="legend-item">
        <span class="legend-color" style="background:#FC9272;"></span>
        31~60
      </span>

      <span class="legend-item">
        <span class="legend-color" style="background:#FB6A4A;"></span>
        61~90
      </span>

      <span class="legend-item">
        <span class="legend-color" style="background:#EF3B2C;"></span>
        91~120
      </span>

      <span class="legend-item">
        <span class="legend-color" style="background:#CB181D;"></span>
        121 이상
      </span>
    `;

  }

  // 학교
  if (type === 'school') {
      storyLegend.innerHTML = `
        <span class="legend-title">학교 구분</span>

        <span class="legend-item">
          <span class="legend-color"
                style="background:#F2C94C;"></span>
          초등학교
        </span>

        <span class="legend-item">
          <span class="legend-color"
                style="background:#49A87A;"></span>
          중학교
        </span>

        <span class="legend-item">
          <span class="legend-color"
                style="background:#F2994A;"></span>
          고등학교
        </span>
      `;
  }

  // 학원·교습소 범례
  if (type === 'academy') {

    storyLegend.innerHTML = `
      <span class="legend-title">학원·교습소</span>

      <span class="legend-item">
        <span class="legend-color"
              style="background:#EAB4D3;"></span>
        강남구·양산시
      </span>

      <span class="legend-item">
        <span class="legend-color"
              style="background:#C64A99;"></span>
        대치4동·물금읍
      </span>
    `;

  }
}


// 최초 화면은 총인구 범례
updateLegend('population');

// ==================================================
// 4. 스토리 단계 전환
//    스크롤 + 카드 클릭
// ==================================================

const storySteps = document.querySelectorAll('.story-step');


// --------------------------------------------------
// 단계에 따라 지도 레이어 변경
// --------------------------------------------------

function showStoryStep(stepName) {

  // 04번 카드에서만 학원 버튼 표시
  const isAcademy = stepName === 'academy';

  daechiAcademyControl.style.display =
    isAcademy ? 'flex' : 'none';

  mulgeumAcademyControl.style.display =
    isAcademy ? 'flex' : 'none';

  // 다른 단계로 이동할 때 학원 레이어 제거
  storyDaechiMap.removeLayer(daechiAcademyLayers);
  storyDaechiMap.removeLayer(gangnamAcademyLayers);

  storyMulgeumMap.removeLayer(mulgeumAcademyLayers);
  storyMulgeumMap.removeLayer(yangsanAcademyLayers);

  // 모든 카드 강조 해제
  storySteps.forEach(step => {
    step.classList.remove('active');
  });

  // 현재 카드 강조
  const activeStep = document.querySelector(
    `.story-step[data-step="${stepName}"]`
  );

  if (activeStep) {
    activeStep.classList.add('active');
  }


  // ------------------------------------------
  // 01. 총인구
  // ------------------------------------------

  if (stepName === 'population') {

    // 학교 레이어 제거
    storyDaechiMap.removeLayer(daechiSchoolLayers);
    storyMulgeumMap.removeLayer(mulgeumSchoolLayers);

    // 학령인구 제거
    if (
      daechiSchoolAgeLayer &&
      storyDaechiMap.hasLayer(daechiSchoolAgeLayer)
    ) {
      storyDaechiMap.removeLayer(daechiSchoolAgeLayer);
    }

    if (
      mulgeumSchoolAgeLayer &&
      storyMulgeumMap.hasLayer(mulgeumSchoolAgeLayer)
    ) {
      storyMulgeumMap.removeLayer(mulgeumSchoolAgeLayer);
    }


    // 총인구 표시
    if (
      daechiPopulationLayer &&
      !storyDaechiMap.hasLayer(daechiPopulationLayer)
    ) {
      daechiPopulationLayer.addTo(storyDaechiMap);
    }

    if (
      mulgeumPopulationLayer &&
      !storyMulgeumMap.hasLayer(mulgeumPopulationLayer)
    ) {
      mulgeumPopulationLayer.addTo(storyMulgeumMap);
    }


    updateLegend('population');
  }


  // ------------------------------------------
  // 02. 학령인구
  // ------------------------------------------

  if (stepName === 'school-age') {

    // 학교 레이어 제거
    storyDaechiMap.removeLayer(daechiSchoolLayers);
    storyMulgeumMap.removeLayer(mulgeumSchoolLayers);

    // 총인구 제거
    if (
      daechiPopulationLayer &&
      storyDaechiMap.hasLayer(daechiPopulationLayer)
    ) {
      storyDaechiMap.removeLayer(daechiPopulationLayer);
    }

    if (
      mulgeumPopulationLayer &&
      storyMulgeumMap.hasLayer(mulgeumPopulationLayer)
    ) {
      storyMulgeumMap.removeLayer(mulgeumPopulationLayer);
    }


    // 학령인구 표시
    if (
      daechiSchoolAgeLayer &&
      !storyDaechiMap.hasLayer(daechiSchoolAgeLayer)
    ) {
      daechiSchoolAgeLayer.addTo(storyDaechiMap);
    }

    if (
      mulgeumSchoolAgeLayer &&
      !storyMulgeumMap.hasLayer(mulgeumSchoolAgeLayer)
    ) {
      mulgeumSchoolAgeLayer.addTo(storyMulgeumMap);
    }


    updateLegend('school-age');
  }

  
  // ------------------------------------------
  // 03. 학교
  // ------------------------------------------
  if (stepName === 'school') {
    // 총인구 제거
    if (daechiPopulationLayer) {
      storyDaechiMap.removeLayer(daechiPopulationLayer);
    }
    if (mulgeumPopulationLayer) {
      storyMulgeumMap.removeLayer(mulgeumPopulationLayer);
    }

    // 학령인구 제거
    if (daechiSchoolAgeLayer) {
      storyDaechiMap.removeLayer(daechiSchoolAgeLayer);
    }
    if (mulgeumSchoolAgeLayer) {
      storyMulgeumMap.removeLayer(mulgeumSchoolAgeLayer);
    }

    // 학교 표시
    daechiSchoolLayers.addTo(storyDaechiMap);
    mulgeumSchoolLayers.addTo(storyMulgeumMap);

    updateLegend('school');
  }

  // ------------------------------------------
  // 04. 학원·교습소
  // ------------------------------------------
  if (stepName === 'academy') {

    // 총인구 레이어 제거
    if (daechiPopulationLayer) {
      storyDaechiMap.removeLayer(daechiPopulationLayer);
    }

    if (mulgeumPopulationLayer) {
      storyMulgeumMap.removeLayer(mulgeumPopulationLayer);
    }

    // 학령인구 레이어 제거
    if (daechiSchoolAgeLayer) {
      storyDaechiMap.removeLayer(daechiSchoolAgeLayer);
    }

    if (mulgeumSchoolAgeLayer) {
      storyMulgeumMap.removeLayer(mulgeumSchoolAgeLayer);
    }

    // 초·중·고 학교 레이어 제거
    storyDaechiMap.removeLayer(daechiSchoolLayers);
    storyMulgeumMap.removeLayer(mulgeumSchoolLayers);

    // 학원·교습소 레이어 표시
    // daechiAcademyLayers.addTo(storyDaechiMap);
    // mulgeumAcademyLayers.addTo(storyMulgeumMap);

    // 선택된 표시 범위에 따라 학원 표시
    if (academyView.daechi === 'all') {
      gangnamAcademyLayers.addTo(storyDaechiMap);
    }
    daechiAcademyLayers.addTo(storyDaechiMap);

    if (academyView.mulgeum === 'all') {
      yangsanAcademyLayers.addTo(storyMulgeumMap);
    }
    mulgeumAcademyLayers.addTo(storyMulgeumMap);

    // 범례 변경
    updateLegend('academy');

  }
}


// ==================================================
// 4-1. 스크롤로 단계 변경
// ==================================================
let isClickScrolling = false;

const stepObserver = new IntersectionObserver(
  entries => {

    // 카드 클릭으로 이동 중이면
    // 스크롤 감지에 의한 단계 변경을 잠시 막음
    if (isClickScrolling) {
      return;
    }

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const stepName = entry.target.dataset.step;

        showStoryStep(stepName);
      }

    });

  },
  {
    threshold: 0.8
  }
);


storySteps.forEach(step => {
  stepObserver.observe(step);
});


// ==================================================
// 4-2. 카드 클릭으로 단계 변경
// ==================================================

storySteps.forEach(step => {

  step.addEventListener('click', () => {

    const stepName = step.dataset.step;

    // 클릭 이동 중에는 IntersectionObserver 잠시 중지
    isClickScrolling = true;

    // 해당 단계 지도 표시
    showStoryStep(stepName);

    // 클릭한 카드를 화면 중앙으로 부드럽게 이동
    step.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

    // 이동이 끝난 뒤 다시 스크롤 감지 허용
    setTimeout(() => {
      isClickScrolling = false;
    }, 700);

  });

});