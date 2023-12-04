document.addEventListener('DOMContentLoaded', function() {
    var imageCards = document.querySelectorAll('.image-card');
    var totalImages = 67; // 가지고 있는 총 이미지 수
    var availableImages = [];

    // 사용 가능한 이미지 번호들의 배열 생성
    for (var i = 1; i <= totalImages; i++) {
        availableImages.push(i);
    }

    imageCards.forEach(function(card) {
        if (availableImages.length === 0) return; // 모든 이미지가 사용된 경우

        // 랜덤 번호 선택 및 배열에서 제거
        var randomIndex = Math.floor(Math.random() * availableImages.length);
        var imageNumber = availableImages[randomIndex];
        availableImages.splice(randomIndex, 1);

        // 이미지 설정
        card.style.backgroundImage = 'url("../im/photo/' + imageNumber + '.jpg")';
        card.style.backgroundSize = 'contain';

        // 클릭 이벤트 리스너 추가
        card.addEventListener('click', function() {
            if(card.classList.contains('enlarged')) {
                card.classList.remove('enlarged');
            } else {
                card.classList.add('enlarged');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var refreshButton = document.querySelector('.photo-event-refresh');

    refreshButton.addEventListener('click', function() {
        // 현재 스크롤 위치 저장
        localStorage.setItem('scrollPosition', window.scrollY || document.documentElement.scrollTop);

        // 페이지 새로고침
        location.reload();
    });

    // 페이지 로드 시 이전 스크롤 위치로 이동
    var savedScrollPosition = localStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
        window.scrollTo(0, parseInt(savedScrollPosition));
        localStorage.removeItem('scrollPosition'); // 위치 복원 후 저장된 값 삭제
    }
});


var eventname = document.querySelectorAll(".event-name");

window.addEventListener('scroll', function() {
    scrollPosition = window.scrollY; // 현재 스크롤 위치
    // console.log("scrollpos : " + scrollPosition);
    // console.log("winheight: " + winheight);
    
    if(scrollPosition > 300){
      visible(0);
    }
    else{
      invisible(0);
    }
    if(scrollPosition > 1000){
        visible(1);
      }
      else{
        invisible(1);
      }
      if(scrollPosition > 1700){
        visible(2);
      }
      else{
        invisible(2);
      }
  });

  function visible(num){
    eventname[num].classList.add('visible');
  }
  function invisible(num){
    eventname[num].classList.remove('visible');
  }