
//intro 고양이 움직임 모션
document.addEventListener("DOMContentLoaded", function () {
    const cat = document.querySelector('.cat');
    const body = document.querySelector('.body');
    const head = document.querySelector('.head');
    const eyes = document.querySelectorAll('.eyes circle');
    const eyel = document.querySelectorAll('.eyes_l');
    const eyer = document.querySelectorAll('.eyes_r');
    const ears = document.querySelectorAll('.ears');
    const earsl = document.querySelector('.ears_l');
    const earsr = document.querySelector('.ears_r');
    const tail = document.querySelector('.tail');
    const backlegs = document.querySelector('.backlegs');
    const frontlegs = document.querySelector('.frontlegs');
    const frontlegs1 = document.querySelector('.frontlegs1');
    const backcircle = document.querySelector('.body_backcircle');
    const frontcircle = document.querySelector('.body_frontcircle');
    const bodybetween = document.querySelector('.body_between');
    const logo = document.querySelector('.logoani');
    // const logofix = document.querySelector('.logo');
    // const resetbutton = document.querySelector('.restart');
    const ani = document.querySelector('.catani_wrapper');
    const layout = document.querySelector('.layout');

    //start-animation
    function initAni() {
        const tl = new TimelineMax({ delay: 0.5, onComplete: logoVisible });
        const tl_eye = new TimelineMax({ delay: 1.5, repeat: 3, repeatDelay: 1 });
        resetit();
        logonotVisible();
        tl.to([head, eyes, ears], 0.2, { y: 45, x: 30 })

            .addLabel("twink")
            .to(eyel, 0.1, { scaleY: 1, y: 45 }, "twink-=0.1")
            .to(eyel, 0.1, { scaleY: 0.1, y: 55 }, "twink")
            .to(eyel, 0.1, { scaleY: 1, y: 45 }, "twink +=0.1")
            .to(eyer, 0.1, { scaleY: 0.1, y: 55 }, "twink")
            .to(eyer, 0.1, { scaleY: 1, y: 45 }, "twink +=0.1")
            .to(earsl, 0.1, { y: 8, x: -5, rotation: -20 }, "twink +=0.1")
            .to(earsr, 0.1, { y: 16, x: -15, rotation: -60 }, "twink +=0.1")

            .set(frontlegs, { opacity: 1 }, "+=0.5")

            .addLabel("wiggle")
            .to([head, eyes, ears], 0.1, { y: 48 }, "wiggle")
            .to(earsl, 0.1, { y: 10, x: -5, rotation: -20 }, "wiggle")
            .to(earsr, 0.1, { y: 18, x: -15, rotation: -60 }, "wiggle")
            .to(backcircle, 0.1, { y: 30, x: 40 }, "wiggle =-0.2")
            .to(backcircle, 0.1, { y: 30, x: 37 }, "wiggle =-0.1")
            .to(backcircle, 0.1, { y: 35, x: 40 }, "wiggle")
            .to(backcircle, 0.1, { y: 30, x: 40 })
            .to(backcircle, 0.1, { y: 30, x: 37 })
            .to(backcircle, 0.1, { y: 35, x: 40 })
            .to(backcircle, 0.1, { y: 30, x: 40 })
            .to(backcircle, 0.1, { y: 30, x: 37 })
            .to(backcircle, 0.1, { y: 35, x: 40 })

            .addLabel("jump")
            .to([head, eyes, ears], 0.1, { y: 5 }, "jump")
            .to(frontcircle, 0.1, { y: 15, x: 5 }, "jump")
            .to(bodybetween, 0.1, { rotation: -25, x: 25, y: 38 }, "jump")
            .to(frontlegs1, 0.1, { y: 0, x: 0, rotation: 0 }, "jump")
            .to(tail, 0.1, { y: 115, x: 20, rotation: -10 }, "jump")
            .to(frontlegs, 0.1, { y: -20 }, "jump+=0.1")

            .to([head, eyes, ears, frontcircle], 0.1, { x: 75, y: 5 }, "jump+=0.2")
            .to(frontcircle, 0.1, { x: 55, y: 5 }, "jump+=0.2")
            .to(bodybetween, 0.1, { scaleX: 1, x: 45, y: 25, rotation: -15 }, "jump+=0.2")
            .to(backcircle, 0.1, { x: 50, y: 25 }, "jump+=0.2")
            .to(backlegs, 0.1, { x: 70 }, "jump+=0.2")

            .to(frontlegs, 0.1, { x: 250, y: 5, rotation: -45 }, "jump+=0.3")
            .to(frontcircle, 0.1, { x: 250 }, "jump+=0.3")
            .to(backcircle, 0.1, { y: 0, x: 250 }, "jump+=0.3")
            .to(bodybetween, 0.1, { y: 0, x: 255, scaleX: 1, rotation: 4 }, "jump+=0.3")
            .to([head, eyes, ears], 0.1, { x: 275 }, "jump+=0.3")
            .to(tail, 0.1, { y: 25, x: 230, rotation: 15 }, "jump+=0.3")
            .to(backlegs, 0.1, { rotation: 45, x: 250, y: -25 }, "jump+=0.3")

            .to(frontlegs, 0.1, { x: 340, y: 105, rotation: -15 }, "jump+=0.4")
            .to(frontcircle, 0.1, { x: 340, y: 105 }, "jump+=0.4")
            .to(backcircle, 0.1, { y: 60, x: 350 }, "jump+=0.4")
            .to(bodybetween, 0.1, { y: 70, x: 380, scaleX: 1, rotation: 35 }, "jump+=0.4")
            .to([head, eyes, ears], 0.1, { x: 385, y: 125 }, "jump+=0.4")
            .to(tail, 0.1, { y: 50, x: 370, rotation: 35 }, "jump+=0.4")
            .to(backlegs, 0.1, { rotation: 95, x: 350, y: 5 }, "jump+=0.4")

            .to(frontlegs, 0.1, { x: 420, y: 205, rotation: -15 }, "jump+=0.5")
            .to(frontcircle, 0.1, { x: 420, y: 205 }, "jump+=0.5")
            .to(backcircle, 0.1, { y: 160, x: 430 }, "jump+=0.5")
            .to(bodybetween, 0.1, { y: 170, x: 460, scaleX: 1, rotation: 35 }, "jump+=0.5")
            .to([head, eyes, ears], 0.1, { x: 465, y: 225 }, "jump+=0.5")
            .to(tail, 0.1, { y: 150, x: 450, rotation: 35 }, "jump+=0.5")
            .to(backlegs, 0.1, { rotation: 95, x: 430, y: 95 }, "jump+=0.5")

            .to(cat, 0.5, { opacity: 1 }, "jump+=0.3");

    }
    function logoVisible() {
        ani.classList.add("notvisible");
        layout.classList.remove("notvisible");
    }
    function logonotVisible() {

        ani.classList.remove("notvisible");
        layout.classList.add("notvisible");
    }
    function resetit() {
        TweenMax.set([head, eyes, ears], { y: 20, x: 30 });
        TweenMax.set(backcircle, { y: 35, x: 40 });
        TweenMax.set(cat, { opacity: 1 });
        TweenMax.set(bodybetween, { scaleX: 0.5, y: 35, x: 45, rotation: 0 });
        TweenMax.set(frontcircle, { y: 35, x: 10 });
        TweenMax.set(head, { y: 20 });
        TweenMax.set(eyel, { scaleY: 1 });
        TweenMax.set(eyer, { scaleY: 1 });
        TweenMax.set(ears, { y: 20 });
        TweenMax.set(tail, { y: 110, x: 30, rotation: 0 });
        TweenMax.set(backlegs, { rotation: -100, y: 55, x: 50 });
        TweenMax.set(frontlegs, { y: 0, x: 0, rotation: 0 });
        TweenMax.set(logo, { opacity: 1, x: 0, y: 0, rotation: 0 });
        TweenMax.set(earsl, { x: 0, y: 0, rotation: 0 });
        TweenMax.set(earsr, { x: 0, y: 0, rotation: 0 });
    }
    initAni();
    //   resetbutton.addEventListener("click", initAni);

    ScrollTrigger.create({
        trigger: '.cat_section',
        start: "top bottom", // 스크롤이 해당 요소에 도달했을 때
        end: "bottom top", // 요소가 화면에서 벗어날 때
        onEnter: initAni,  // 애니메이션을 시작
        onLeaveBack: resetit,  // 스크롤이 위로 돌아올 때 애니메이션 초기화
        once: false,  // 반복 실행 가능하도록 설정
    });


    setTimeout(() => {
        $('.cat_section .scroll-down').addClass('on');
        setTimeout(() => {
          window.addEventListener("wheel", function (event) {
            if (event.deltaY > 0) { // 휠을 아래로 내리는 경우
              // Step 1: header에 'on' 클래스 추가
              if (!headerScrolled) {
                headerScrolled = true;
                $('body,html').animate({ scrollTop: catsectionTop }, 500, function () {
                  $('body').removeClass('no-scroll');
                });
              }
            }
          });
        }, 500)
      }, 3000);
});