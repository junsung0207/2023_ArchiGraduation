var scrollWeight = 1;
var scrollPosition = (window.scrollY*scrollWeight);
var winwidth = window.innerWidth;
var ball = document.querySelector('.faculty-ball');
var movingcir = document.querySelector('.moving-cir');

window.addEventListener('scroll', function() {
    scrollPosition = window.scrollY*scrollWeight; // 현재 스크롤 위치
    // console.log("scrollpos : " + scrollPosition);
    if(scrollPosition>0 && scrollPosition < 500){
      var leftdata = 18 + (scrollPosition)/30;
      movingcir.style.left = leftdata+"%";
    }
  });

