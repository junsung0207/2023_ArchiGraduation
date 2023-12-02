var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

//window의 width, height 값 저장 변수
var winwidth;
var winheight;

var scrollWeight = 1;
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
  if(winwidth>1024){ //패드류라면
    baseRadius = 6;
  }
  console.log("baseRadius: "+baseRadius);
  padding = baseRadius; //원 사이의 간격

  placeCircles(rows, columns, scrollPosition);

  console.log("canvasWidth, canvasHeight : ", canvas.width, canvas.height);
  console.log("scrollpos : " + scrollPosition);
}

//-- 알파벳 모양으로 그리는 부분(18x18) --
var Pattern = [
[1, 0, 1, 2, 3, 4, , 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
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

var M_pattern = [
  [3, 3, 4, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 4, 3, 3],
  [4, 3, 3, 3, 4, 3, 0, 0, 0, 0, 0, 0, 3, 4, 3, 3, 3, 4],
  [3, 2, 3, 2, 3, 4, 3, 0, 0, 0, 0, 3, 4, 3, 2, 3, 2, 3],
  [0, 2, 3, 0, 2, 3, 4, 0, 0, 0, 0, 4, 3, 2, 0, 3, 2, 0],
  [0, 2, 3, 1, 0, 2, 3, 2, 0, 0, 2, 3, 2, 0, 1, 3, 2, 0],
  [0, 2, 3, 2, 0, 0, 2, 3, 0, 0, 3, 2, 0, 0, 2, 3, 2, 0],
  [0, 2, 3, 2, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 2, 3, 2, 0],
  [0, 2, 3, 2, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 2, 3, 2, 0],
  [0, 2, 3, 2, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 2, 3, 2, 0],
  [0, 2, 3, 2, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 2, 3, 2, 0],
  [0, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2, 0],
  [0, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2, 0],
  [0, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2, 0],
  [0, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2, 0],
  [0, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2, 0],
  [0, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2, 0],
  [0, 2, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 2, 0],
  [2, 3, 4, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 4, 3, 2]
];

var O_pattern = [
[0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0],
[0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0],
[0, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 0],
[1, 4, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 4, 1],
[1, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 1],
[1, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 1],
[1, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 1],
[1, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 1],
[1, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 1],
[1, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 1],
[1, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 1],
[1, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 1],
[1, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 1],
[1, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 1],
[1, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 1],
[0, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 0],
[0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0],
[0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0]
];

var E_pattern = [
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 0],
[0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 0],
[0, 0, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 0],
[0, 0, 2, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 2, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 2, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 2, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 0],
[0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 0],
[0, 0, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 0],
[0, 0, 2, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 2, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 2, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 2, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 0],
[0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 0],
[0, 0, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 0]];

var N_pattern = [
[0, 3, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 3, 4, 0],
[0, 4, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 4, 0],
[0, 3, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 4, 0],
[0, 3, 4, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 4, 0],
[0, 3, 4, 3, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 4, 0],
[0, 3, 4, 3, 3, 4, 3, 0, 0, 0, 0, 0, 0, 0, 3, 3, 4, 0],
[0, 3, 4, 3, 0, 3, 4, 3, 0, 0, 0, 0, 0, 0, 3, 3, 4, 0],
[0, 3, 4, 3, 0, 0, 3, 4, 3, 0, 0, 0, 0, 0, 3, 3, 4, 0],
[0, 3, 4, 3, 0, 0, 0, 3, 4, 3, 0, 0, 0, 0, 3, 3, 4, 0],
[0, 3, 4, 3, 0, 0, 0, 0, 3, 4, 3, 0, 0, 0, 3, 3, 4, 0],
[0, 3, 4, 3, 0, 0, 0, 0, 0, 3, 4, 3, 0, 0, 3, 3, 4, 0],
[0, 3, 4, 3, 0, 0, 0, 0, 0, 0, 3, 4, 3, 0, 3, 3, 4, 0],
[0, 3, 4, 3, 0, 0, 0, 0, 0, 0, 0, 3, 4, 3, 3, 3, 4, 0],
[0, 3, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 3, 3, 4, 0],
[0, 3, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 3, 4, 0],
[0, 3, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 4, 0],
[0, 3, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 4, 0],
[0, 4, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 4, 0]];

var T_pattern = [
[0, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 0],
[0, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 0],
[0, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 0],
[0, 0, 0, 0, 0, 1, 2, 3, 4, 4, 3, 2, 1, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 1, 3, 4, 4, 3, 1, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0]
];

// 'M' 형태를 만드는 원들의 위치를 정의
function isPartOfM(row, col, rows, cols) {
  //1 : 커지는 부분, 0 : 작아지는 부분
  return M_pattern[row][col];
}

function isPartOfO(row, col, rows, cols) {
  //1 : 커지는 부분, 0 : 작아지는 부분
  return O_pattern[row][col];
}

function isPartOfE(row, col, rows, cols) {
  //1 : 커지는 부분, 0 : 작아지는 부분
  return E_pattern[row][col];
}
function isPartOfN(row, col, rows, cols) {
  //1 : 커지는 부분, 0 : 작아지는 부분
  return N_pattern[row][col];
}

function isPartOfT(row, col, rows, cols) {
  //1 : 커지는 부분, 0 : 작아지는 부분
  return T_pattern[row][col];
}

function adjustCircleSize(row, col, rows, cols, scrollPosition) {
  if (isPartOfM(row, col, rows, cols) === 1) {
    // 줄어드는 크기
     return Math.max(3, baseRadius - scrollPosition / 100);
  }
  else if (isPartOfM(row, col, rows, cols) === 2){
    return Math.max(5, baseRadius - scrollPosition / 100);
  } 
  else if (isPartOfM(row, col, rows, cols) === 3){ 
    // 늘어나는 크기
    return Math.min(6.5, baseRadius + scrollPosition / 100);
  } 
  else if (isPartOfM(row, col, rows, cols) === 4){ 
    return Math.min(7, baseRadius + scrollPosition / 100);
  } 
  else {
    return Math.max(2, baseRadius - scrollPosition / 100); // 예시 크기 계산
  }
}

function adjustCircleSize2(row, col, rows, cols, scrollPosition) {
  if (isPartOfO(row, col, rows, cols) === 1) {
    // 줄어드는 크기
     return Math.max(3, baseRadius - scrollPosition / 100);
  }
  else if (isPartOfO(row, col, rows, cols) === 2){
    return Math.max(5, baseRadius - scrollPosition / 100);
  } 
  else if (isPartOfO(row, col, rows, cols) === 3){ 
    // 늘어나는 크기
    return Math.min(6.5, baseRadius + scrollPosition / 100);
  } 
  else if (isPartOfO(row, col, rows, cols) === 4){ 
    return Math.min(7, baseRadius + scrollPosition / 100);
  } 
  else {
    return Math.max(2, baseRadius - scrollPosition / 100); // 예시 크기 계산
  }
}

function adjustCircleSize3(row, col, rows, cols, scrollPosition) {
  if (isPartOfE(row, col, rows, cols) === 1) {
    // 줄어드는 크기
     return Math.max(3, baseRadius - scrollPosition / 100);
  }
  else if (isPartOfE(row, col, rows, cols) === 2){
    return Math.max(5, baseRadius - scrollPosition / 100);
  } 
  else if (isPartOfE(row, col, rows, cols) === 3){ 
    // 늘어나는 크기
    return Math.min(6.5, baseRadius + scrollPosition / 100);
  } 
  else if (isPartOfE(row, col, rows, cols) === 4){ 
    return Math.min(7, baseRadius + scrollPosition / 100);
  } 
  else {
    return Math.max(2, baseRadius - scrollPosition / 100); // 예시 크기 계산
  }
}

function adjustCircleSize4(row, col, rows, cols, scrollPosition) {
  if (isPartOfN(row, col, rows, cols) === 1) {
    // 줄어드는 크기
     return Math.max(3, baseRadius - scrollPosition / 100);
  }
  else if (isPartOfN(row, col, rows, cols) === 2){
    return Math.max(5, baseRadius - scrollPosition / 100);
  } 
  else if (isPartOfN(row, col, rows, cols) === 3){ 
    // 늘어나는 크기
    return Math.min(6.5, baseRadius + scrollPosition / 100);
  } 
  else if (isPartOfN(row, col, rows, cols) === 4){ 
    return Math.min(7, baseRadius + scrollPosition / 100);
  } 
  else {
    return Math.max(2, baseRadius - scrollPosition / 100); // 예시 크기 계산
  }
}

function adjustCircleSize5(row, col, rows, cols, scrollPosition) {
  if (isPartOfT(row, col, rows, cols) === 1) {
    // 줄어드는 크기
     return Math.max(3, baseRadius - scrollPosition / 100);
  }
  else if (isPartOfT(row, col, rows, cols) === 2){
    return Math.max(5, baseRadius - scrollPosition / 100);
  } 
  else if (isPartOfT(row, col, rows, cols) === 3){ 
    // 늘어나는 크기
    return Math.min(6.5, baseRadius + scrollPosition / 100);
  } 
  else if (isPartOfT(row, col, rows, cols) === 4){ 
    return Math.min(7, baseRadius + scrollPosition / 100);
  } 
  else {
    return Math.max(2, baseRadius - scrollPosition / 100); // 예시 크기 계산
  }
}



var momentTextFlag1 = 0;
var momentTextFlag2 = 0;

window.addEventListener('scroll', function() {
  scrollPosition = window.scrollY*scrollWeight; // 현재 스크롤 위치
  placeCircles(18, 18, scrollPosition); // 원들을 재배치
  if(scrollPosition > 280){
    momentTextOn(0);
    momentTextFlag1 = 1;
  }
  else if(momentTextFlag1 === 0){
    momentTextOff(0);
  }
  if(scrollPosition > 700){
    momentTextOn(1);
    momentTextFlag2 = 1;
  }
  else if(momentTextFlag2 === 0){
    momentTextOff(1);
  }

  // 첫글귀 종료
  if(scrollPosition > 1500){
    momentTextOff(0);
    momentTextOff(1);
  }

  if(scrollPosition > 1700){
    momentText2On(0)
  }
  else{
    momentText2Off(0)
  }
  if(scrollPosition > 1900){
    momentText2On(1)
  }
  else{
    momentText2Off(1)
  }
  if(scrollPosition >2100){
    momentText2On(2)
  }
  else{
    momentText2Off(2)
  }

  // 두번쨰글귀 종료
  if(scrollPosition > 2900){
    momentText2Off(0);
    momentText2Off(1);
    momentText2Off(2);
  }

  if(scrollPosition > 3100){
    momentText3On(0);
    momentText3On(1);
  }
  else{
    momentText3Off(0);
    momentText3Off(1);
  }
  if(scrollPosition > 3300){
    momentText3On(2);
  }
  else{
    momentText3Off(2);
  }
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
      var currentRadius = 3;
      if(scrollPosition>0){
        currentRadius = adjustCircleSize(row, col, rows, columns, scrollPosition);
      }
      //400~ : M소멸
      if(scrollPosition>400){
        currentRadius = adjustCircleSize(row, col, rows, columns, 600-scrollPosition);
      }
      //600~ : O생성
      if(scrollPosition >600){
        currentRadius = adjustCircleSize2(row, col, rows, columns, scrollPosition-600);
      }
      // 1000~ O소멸
      if(scrollPosition >1000){
        currentRadius = adjustCircleSize2(row, col, rows, columns, 1200-scrollPosition);
      }
      // 1200~ M생성
      if(scrollPosition >1200){
        currentRadius = adjustCircleSize(row, col, rows, columns, scrollPosition-1200);
      }
      // M소멸
      if(scrollPosition >1600){
        currentRadius = adjustCircleSize(row, col, rows, columns, 1800-scrollPosition);
      }
      // E생성
      if(scrollPosition >1800){
        currentRadius = adjustCircleSize3(row, col, rows, columns, scrollPosition-1800);
      }
      // E소멸
      if(scrollPosition >2200){
        currentRadius = adjustCircleSize3(row, col, rows, columns, 2400-scrollPosition);
      }
      // N생성
      if(scrollPosition >2400){
        currentRadius = adjustCircleSize4(row, col, rows, columns, scrollPosition-2400);
      }
      // N소멸
      if(scrollPosition >2800){
        currentRadius = adjustCircleSize4(row, col, rows, columns, 3200-scrollPosition);
      }
      // T생성
      if(scrollPosition >3200){
        currentRadius = adjustCircleSize5(row, col, rows, columns, scrollPosition-3200);
      }
      // T소멸
      if(scrollPosition >3400){
        currentRadius = adjustCircleSize5(row, col, rows, columns, 3600-scrollPosition);
      }
      if(scrollPosition >3600){
        currentRadius = 4;
      }
      // 크기에 따라 원의 중심이 변하지 않도록 좌표 조정
      var x = startX + (currentRadius-baseRadius) + col * (2 * baseRadius + padding) + baseRadius - currentRadius;
      var y = startY + (currentRadius-baseRadius) + row * (2 * baseRadius + padding) + baseRadius - currentRadius;
      
      drawCircle(x, y, currentRadius, '#29201f');
    }
  }
}

var spans = document.querySelectorAll('.momentText-container span');
var spans2 = document.querySelectorAll('.momentText2-container span');
var spans3 = document.querySelectorAll('.momentText3-container span');

function momentTextOn(num){
  spans[num].classList.add('visible');
}
function momentTextOff(num){
  spans[num].classList.remove('visible');
}

function momentText2On(num){
  spans2[num].classList.add('visible');
}
function momentText2Off(num){
  spans2[num].classList.remove('visible');
}

function momentText3On(num){
  spans3[num].classList.add('visible');
}
function momentText3Off(num){
  spans3[num].classList.remove('visible');
}




// 초기 캔버스 크기 설정
resizeCanvas();


var body = document.body;
var bodytag = document.querySelector('body');
var html = document.documentElement;
var winheight = Math.max( body.scrollHeight) - 844;
var nexthandler = document.querySelector('.next-page-handler');
var visibleflag = 0;

window.addEventListener('scroll', function() {
  scrollPosition = window.scrollY; // 현재 스크롤 위치
  // console.log("scrollpos : " + scrollPosition);
  // console.log("winheight: " + winheight);
  
  if(scrollPosition > winheight-200){
    visible();
    visibleflag = 1;
  }
  else{
    invisible();
  }
});

function visible(){
  nexthandler.classList.add('visible');
}
function invisible(){
  if(visibleflag === 0){
    nexthandler.classList.remove('visible');
  }
}



