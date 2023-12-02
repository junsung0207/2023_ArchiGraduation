var detail_isopen = 0;

var students = document.querySelectorAll('.st-student');
var details = document.querySelectorAll('.st-detail');

        // 클릭 이벤트 리스너 추가
document.querySelector('.stlist').addEventListener('click', function(e) {
    // 클릭된 요소가 .st-student 클래스를 가지고 있는지 확인
    if (e.target && e.target.matches('.st-student')) {
        // 클릭된 요소의 인덱스 찾기
        var index = Array.prototype.indexOf.call(students, e.target);
        deopen(index + 1);
    }
    if (e.target && e.target.matches('.st-detail')) {
        // 클릭된 요소의 인덱스 찾기
        var index = Array.prototype.indexOf.call(details, e.target);
        declose(index + 1);
    }
});

document.querySelector('.ctlist').addEventListener('click', function(e) {
    // 클릭된 요소가 .st-student 클래스를 가지고 있는지 확인
    if (e.target && e.target.matches('.st-student')) {
        // 클릭된 요소의 인덱스 찾기
        var index = Array.prototype.indexOf.call(students, e.target);
        deopen(index + 1);
    }
    if (e.target && e.target.matches('.st-detail')) {
        // 클릭된 요소의 인덱스 찾기
        var index = Array.prototype.indexOf.call(details, e.target);
        declose(index + 1);
    }
});

function deopen(n){
    var nthDetail = details[n - 1];
    if(detail_isopen == 0){
        nthDetail.style.display = 'flex';
        nthDetail.style.opacity = '1';
    }
    detail_isopen = 1;
    document.body.classList.add('no-scroll'); // 스크롤 방지
}

function declose(n){
    var nthDetail = details[n - 1];
    nthDetail.style.display = 'none';
    nthDetail.style.opacity = '0';
    detail_isopen = 0;
    document.body.classList.remove('no-scroll');
}

function upper_clicked(){
  window.scrollTo(0, 3150);
}

var movingrec = document.querySelectorAll('.moving-rec');
var scrollWeight = 1;

window.addEventListener('scroll', function() {
    scrollPosition = window.scrollY*scrollWeight; // 현재 스크롤 위치
    // console.log("scrollpos : " + scrollPosition);
    if(scrollPosition>0 && scrollPosition < 500){
      var leftdata = 6 + (scrollPosition)/60;
      movingrec[0].style.left = leftdata+"%";
      var rightdata1 = 9 + (scrollPosition)/60;
      movingrec[1].style.right = rightdata1+"%";
      var rightdata2 = 13 - (scrollPosition)/60;
      movingrec[2].style.right = rightdata2+"%";
    }
  });

