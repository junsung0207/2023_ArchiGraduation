var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

//window의 width, height 값 저장 변수
var winwidth;
var winheight;
var scrollPosition = window.scrollY;

//각 원의 반지름과 간격 계산
//var totalPadding = gridWidth - (columns * 2 * radius); //총 여백
var baseRadius;
var padding;

// 브라우저 창 크기에 맞춰 캔버스 크기 조정
function resizeCanvas() {
  winwidth = window.innerWidth;
  winheight = window.innerHeight;

  canvas.width = winwidth;
  canvas.height = winheight;

  //바둑판 구역이 화면 너비의 75%가 되도록 설정
  var gridWidth = canvas.width * 0.55;
  var rows = 18;
  var columns = 18;

  baseRadius = (gridWidth / columns) / 2; //원의 반지름
  padding = baseRadius; //원 사이의 간격

  placeCircles(rows, columns, scrollPosition);

  console.log("window.innerWidth, window.innerHeight : ", canvas.width , canvas.height);
  console.log("scrollpos : " + scrollPosition);
}

//-- 알파벳 모양으로 그리는 부분 --

// 'M' 형태를 만드는 원들의 위치를 정의
function isPartOfM(row, col, rows, cols) {
  // 여기에 'M' 형태를 정의하는 로직을 추가
  // 예: 특정 row와 col 값이 'M'에 해당하는지 여부를 반환
  if(row % 2 === 0){
    return 0;
  }
  else {
    return 1;
  }
}

function adjustCircleSize(row, col, rows, cols, scrollPosition) {
  if (isPartOfM(row, col, rows, cols) === 0) {
    // 'M'의 일부인 경우 크기를 늘림
    return Math.min(10, baseRadius + scrollPosition / 100); // 예시 크기 계산
  } else {
    // 'M'이 아닌 경우 크기를 줄임
    return Math.max(2, baseRadius - scrollPosition / 100); // 예시 크기 계산
  }
}

window.addEventListener('scroll', function() {
  scrollPosition = window.scrollY; // 현재 스크롤 위치
  placeCircles(18, 18, scrollPosition); // 원들을 재배치
});



function drawCircle(x, y, radius, color) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
}

function placeCircles(rows, columns, scrollPosition) { //row가 가로 길쭉, col은 세로 길쭉
  var gridHeight = rows * (2 * baseRadius + padding) - padding; // 전체 그리드의 높이

  // 페이지 중앙에서 시작되도록 시작 X, Y 좌표 조정
  var startX = (canvas.width - columns * (2*baseRadius + padding) + padding) / 2;
  var startY = (canvas.height - gridHeight) / 2;

  for (var row = 0; row < rows; row++) {
    for (var col = 0; col < columns; col++) {
      var currentRadius = adjustCircleSize(row,col, rows, columns, scrollPosition);
      var x = startX + col * (2 * currentRadius + padding);
      var y = startY + row * (2 * currentRadius + padding);
      drawCircle(x, y, currentRadius, '#FB8B89'); // 원의 색상은 파란색으로 설정
    }
  }
}

// 초기 캔버스 크기 설정
resizeCanvas();
