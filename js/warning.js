
  function gotoPage(){
    // location.href='https://hyuare.com/';
    localStorage.setItem('noRedirect', 'true');
    location.href='../index.html';
  }

  // 데탑 접속시 다른 페이지로 리다이렉션
  window.addEventListener('load', function() {
    var minWidth = 1024; // 데스크탑으로 간주되는 최소 너비
    var redirectUrl = './desktop_warning.html'; // 리다이렉션할 URL

    // 로컬 스토리지에서 플래그 확인
    var noRedirect = localStorage.getItem('noRedirect');

    if (window.innerWidth > minWidth && !noRedirect && !document.body.classList.contains('no-redirect')) {
        console.log('리다이렉');
        window.location.href = redirectUrl;
    } else {
        // 리다이렉션 플래그 삭제
        localStorage.removeItem('noRedirect');
    }
});