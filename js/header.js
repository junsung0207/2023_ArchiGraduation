document.querySelector('.menubar').addEventListener('click', function() {
    var headerOpen = document.querySelector('.header-open');
    headerOpen.classList.add('visible'); // .header-open에 'visible' 클래스 추가
    document.body.classList.add('no-scroll'); // 스크롤 방지
  });

  
  document.querySelector('.header-menu-closeButton').addEventListener('click', function() {
    document.querySelector('.header-open').classList.remove('visible');
    document.body.classList.remove('no-scroll');
  });


//   window.addEventListener('load', function() {
//     var minWidth = 1024; // 데스크탑으로 간주되는 최소 너비

//     if (window.innerWidth > minWidth) {
//         alert('이 웹사이트는 모바일에 최적화되어 있습니다. 데스크탑에서는 디스플레이가 제대로 되지 않을 수 있습니다.');
//     }
// });

