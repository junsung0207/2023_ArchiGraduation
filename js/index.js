var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

//window의 width, height 값 저장 변수
var winwidth;
var winheight;

var scrollWeight = 0.5;
var scrollPosition = (window.scrollY*scrollWeight);

//각 원의 반지름과 간격 계산
//var totalPadding = gridWidth - (columns * 2 * radius); //총 여백
var baseRadius;
var padding;

// 브라우저 창 크기에 맞춰 캔버스 크기 조정
function resizeCanvas() {

  var devicePixelRatio = window.devicePixelRatio || 1; //디바이스의 픽셀 비율 값(고해상도면 3,2)

  winwidth = window.innerWidth;
  winheight = window.innerHeight;

  canvas.width = winwidth * devicePixelRatio;
  canvas.height = winheight * devicePixelRatio;

  canvas.style.width = winwidth + 'px';
  canvas.style.height = winheight + 'px';

  context.scale(devicePixelRatio,devicePixelRatio);

  //바둑판 구역이 화면 너비의 75%가 되도록 설정
  var gridWidth = canvas.width * 0.55;
  var rows = 18;
  var columns = 18;

  baseRadius = canvas.width*0.004; //원의 반지름
  padding = baseRadius; //원 사이의 간격

  placeCircles(rows, columns, scrollPosition);

  console.log("canvasWidth, canvasHeight : ", canvas.width, canvas.height);
  console.log("scrollpos : " + scrollPosition);
}

//-- 알파벳 모양으로 그리는 부분(18x18) --
var MShape = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

var Pattern = [
[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
[0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
[0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
[0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
[0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
[0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
[0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
[0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
[0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
[0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]];

// 'M' 형태를 만드는 원들의 위치를 정의
function isPartOfM(row, col, rows, cols) {
  //1 : 커지는 부분, 0 : 작아지는 부분
  return Pattern[row][col];
}

function adjustCircleSize(row, col, rows, cols, scrollPosition) {
  if (isPartOfM(row, col, rows, cols) === 1) {
    // 'M'의 일부인 경우 크기를 늘림
    return Math.min(6, baseRadius + scrollPosition / 100); // 예시 크기 계산
  } else {
    // 'M'이 아닌 경우 크기를 줄임
    return Math.max(4, baseRadius - scrollPosition / 100); // 예시 크기 계산
  }
}

window.addEventListener('scroll', function() {
  scrollPosition = window.scrollY*scrollWeight; // 현재 스크롤 위치
  placeCircles(18, 18, scrollPosition); // 원들을 재배치
});



function drawCircle(x, y, radius, color) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
}

function placeCircles(rows, columns, scrollPosition) { //row가 가로 길쭉, col은 세로 길쭉
  var gridWidth = columns * (2 * baseRadius + padding) - padding;
  var gridHeight = rows * (2 * baseRadius + padding) - padding; //바둑판구역의 높이
  
  // 캔버스 중앙에 바둑판 구역을 배치하기 위한 시작점 계산
  var startX = (canvas.width / devicePixelRatio - gridWidth) / 2;
  var startY = (canvas.height / devicePixelRatio - gridHeight) / 2;

  context.clearRect(0, 0, canvas.width, canvas.height);


  for (var row = 0; row < rows; row++) {
    for (var col = 0; col < columns; col++) {
      var currentRadius = adjustCircleSize(row, col, rows, columns, scrollPosition);
      
      // 크기에 따라 원의 중심이 변하지 않도록 좌표 조정
      var x = startX + (currentRadius-baseRadius) + col * (2 * baseRadius + padding) + baseRadius - currentRadius;
      var y = startY + (currentRadius-baseRadius) + row * (2 * baseRadius + padding) + baseRadius - currentRadius;
      
      drawCircle(x, y, currentRadius, '#FB8B89');
    }
  }
}

// 초기 캔버스 크기 설정
resizeCanvas();
