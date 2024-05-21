// $(function(){})
// $(document).ready(function(){})
$(function () {
  // all-menu modal
  const all_menu = $(".all-menu"),
    all_menu_wrapper = $(".all-menu-wrapper"),
    all_menu_mask = $(".all-menu-mask"),
    all_menu_close = $(".all-menu-close");

  // all-menu 버튼이 클릭되면(click event)
  // 전체메뉴 모달창과 mask layer가 나타난다.
  all_menu.click(function () {
    all_menu_wrapper.addClass("active");
    all_menu_mask.addClass("active");
  });
  // all-menu-close 버튼이 클릭되면
  // 전체메뉴 모달창과 mask layer가 사라진다.
  all_menu_close.click(function () {
    all_menu_wrapper.removeClass("active");
    all_menu_mask.removeClass("active");
  });

  // 모바일 메뉴 기능
  const mb_bt = $(".mb-bt"),
    mb_nav = $(".mb-nav"),
    mb_menu_mask = $(".mb-menu-mask");

  // 모바일 버튼이 클릭되면
  // 모바일 메뉴가 생기고
  // 모바일버튼이 X로 변환됨
  mb_bt.click(function (e) {
    e.preventDefault(); // 클릭했을 때 링크를 막아준다.(a태그 버튼사용 시)
    mb_bt.toggleClass("active");
    mb_nav.toggleClass("active");
    mb_menu_mask.toggleClass("active");
    mb_menu_li.height(54);
  });

  // 화면 사이즈체크
  $(window).resize(function () {
    // 화면 너비를 계산한다.
    let temp = $(window).width();
    // 1200px 보다 크면 할 일
    // 1. 모바일 메뉴와 마스크 레이어 제거(removeClass)
    // 2. 모바일 버튼 제거(removeClass)
    // 3. 모든 모바일 메뉴의 서브메뉴를 접는다
    // 1200px 보다 작으면 할 일
    // 1. 전체 메뉴 제거(removeClass)
    if (temp > 1200) {
      mb_bt.removeClass("active"); // 2
      mb_nav.removeClass("active"); // 1
      mb_menu_mask.removeClass("active"); // 1
      mb_menu_li.height(54); // 3
    } else {
      all_menu_wrapper.removeClass("active");
      all_menu_mask.removeClass("active");
    }
  });

  // 모바일 서브 메뉴 펼치기(아코디언) 기능
  const mb_menu_li = $(".mb-menu > li"),
    mb_submenu = $(".mb-submenu"),
    mb_mainMenu = $(".mb-mainMenu");
  // 펼쳐질 서브 메뉴의 높이값 저장
  let mb_submenu_height = [];

  // 서브 메뉴의 높이값을 계산하여 배열값으로 저장
  mb_submenu.each(function (index) {
    // 각각의 .mb_submenu로 가서
    // li의 갯수를 파악
    let count = $(this).find("li").length;
    mb_submenu_height[index] = 52 * count + 22;
  });
  // console.log(mb_submenu_height);

  // 모바일 메뉴 (li > a(.mb-mainMenu)) 클릭했을 때
  mb_mainMenu.each(function (index) {
    $(this).click(function (e) {
      e.preventDefault();
      $(this).toggleClass("open");
      let isOpen = $(this).hasClass("open");
      if (isOpen) {
        mb_menu_li.height(54);
        let temp = mb_submenu_height[index];
        mb_menu_li.eq(index).height(temp + 54);
      } else {
        mb_menu_li.eq(index).height(54);
      }
    });
  });
  mb_menu_mask.click(function () {
    mb_bt.removeClass("active");
    mb_nav.removeClass("active");
    mb_menu_mask.removeClass("active");
    mb_menu_li.height(54);
  });

  // 화면위로 이동
  $(".gotop").click(function () {
    $("html").animate(
      {
        scrollTop: 0,
      },
      1000
    );
  });

  // 비주얼 슬라이드
  let sw_visual = new Swiper(".sw-visual", {
    autoplay: true,
    loop: true,
    effect: "fade",
    speed: 3000,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // 비주얼 슬라이드 재생 / 정지 버튼
  const swiper_start = $(".swiper-start");
  swiper_start.click(function (e) {
    e.preventDefault();
    $(this).toggleClass("play");
    let temp = $(this).hasClass("play");
    if (temp) {
      // 슬라이드 멈춤
      sw_visual.autoplay.stop();
    } else {
      // 슬라이드 재생
      sw_visual.autoplay.start();
    }
  });

  // 배너 슬라이드
  let sw_banner = new Swiper(".sw-banner", {
    autoplay: true,
    loop: true,
    slidesPerView: "auto",
    navigation: {
      prevEl: ".banner-back",
      nextEl: ".banner-forward",
    },
  });
  // 배너 슬라이드 일시 정지 버튼
  $(".banner-play").click(function () {
    let temp = $(this).find("span").text();
    if (temp == "play_arrow") {
      $(this).find("span").text("pause");
      sw_banner.autoplay.start();
    } else {
      $(this).find("span").text("play_arrow");
      sw_banner.autoplay.stop();
    }
  });
});
