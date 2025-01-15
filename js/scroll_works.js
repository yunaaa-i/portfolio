
//custom cursor 시작
const cursor = document.querySelector('.custom_cursor');
const works = document.querySelector('.works');
const clips = document.querySelectorAll('.clip');
works.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    cursor.style.display = 'flex';
})

// works 영역에서 커서 숨기기
works.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';

});

// clip 요소에 마우스 오버 및 아웃 이벤트 추가
clips.forEach(clip => {
    clip.addEventListener('mouseenter', () => {
        cursor.classList.add('on');
    });
    clip.addEventListener('mouseleave', () => {
        cursor.classList.remove('on');
    });
});
//custom cursor 끝


//works 배경 전환되면서 갤러리 모션 까지 시작
// englare circle
gsap.to(".circle", {
    width: "600vmax",
    height: "600vmax",
    ease: Power1.easeInOut,

    scrollTrigger: {
        // pin: true,
        trigger: ".works",
        start: "top 150%",
        end: "bottom top",
        scrub: 0.5,
        // markers: true
    }
});

// text animation

const textLines = document.querySelectorAll(".text_line");

const textLineAnim = gsap.timeline({

    defaults: {
        duration: 0.2,
        ease: 'none'
    },
    scrollTrigger: {
        start: 0,
        end: 'max',
        scrub: 0.5
    }

})

textLineAnim
    .fromTo(textLines, {
        x: (index) => index % 2 ? window.innerWidth : -window.innerWidth
    }, {
        x: 0
    }, 0)
    .fromTo(textLines, {
        x: 0
    }, {
        x: (index) => index % 2 ? -window.innerWidth : window.innerWidth,
        immediateRender: false
    }, 2.5)


// text reveal up
gsap.utils.toArray(".up").forEach(element => {

    gsap.fromTo(element,
        {
            yPercent: 50,
            opacity: .2,
        },
        {
            duration: 0.8,
            delay: 1,
            opacity: 1,
            yPercent: -50,
            ease: "power",
            stagger: 0.02,

            scrollTrigger: {
                trigger: element,
                start: "top 100%",
                end: "bottom top",
                scrub: 0.5,
                // markers: true
            }
        });
});



// Parallax mask
const photos = gsap.utils.toArray('.clip img');

photos.forEach(photo => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: photo,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.75,
            toggleActions: 'play none none none',
        },
    });

    tl.fromTo(
        photo,
        { y: '-20%' },
        { y: '0%' }
    );
});

//works 배경 전환되면서 갤러리 모션 까지 끝


//bg text 모션 시작
let to = document.querySelector('.row_3').offsetTop - 200;
let etc_wrapto = document.querySelector('.etc_wrap').offsetTop;
let ht = $(window).height();


document.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const bgText = document.querySelector('.bg_txt');
    if (scrollY >= to && scrollY < etc_wrapto) { bgText.style.opacity = '1' } else {
        bgText.style.opacity = '0'
    }
    // 스크롤 값에 따라 Y축 변화를 적용
    bgText.style.top = `${scrollY * 0.5}px)`;
    //console.log(!document.body.classList.contains('fix'));


    if (!document.body.classList.contains('fix')) {
        if (scrollY > 0 && scrollY <= 200) {
            $('html, body').animate({ scrollTop: 0 }, 'slow', function () {
                location.reload();
            });
        }
    }
    if (scrollY >= works.offsetTop) {
        document.querySelector('header').classList.add('active');
    } else {
        document.querySelector('header').classList.remove('active');
    }

    /*  bgText.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.5}px))`; */
});
//bg text 모션 끝


//etc works scroll 이벤트 시작
gsap.registerPlugin("ScrollTrigger");

let wheel = document.querySelector(".wheel");
let images = gsap.utils.toArray(".wheel_card");

function setup() {
    // 휠의 반지름 계산 (휠 요소의 너비를 2로 나눔)
    let radius = wheel.offsetWidth / 2.5;

    // 휠의 중심 위치 (반지름과 동일)
    let center = wheel.offsetWidth / 2;

    // 이미지의 총 개수
    let total = images.length;

    // 각 이미지가 차지하는 각도 (2π를 이미지 개수로 나눔)
    let slice = (2 * Math.PI) / total;

    // 모든 이미지에 대해 위치와 회전 설정
    images.forEach((item, i) => {
        // 현재 이미지의 각도 (인덱스 i에 따라 계산)
        let angle = i * slice;

        // 삼각 함수를 사용해 원형 경로의 x, y 좌표 계산
        let x = center + radius * Math.sin(angle); // x 좌표 계산
        let y = center + radius * Math.cos(angle); // y 좌표 계산

        // GSAP를 사용해 이미지 설정
        gsap.set(item, {
            duration: 1,                // 애니메이션 지속 시간 (1초)
            rotation: -angle + "-rad", // 이미지가 각도에 맞게 회전하도록 설정 (라디안 단위)
            xPercent: -50,             // x축 중심 정렬 (이미지의 중심이 지정된 x 좌표에 위치)
            yPercent: -50,             // y축 중심 정렬 (이미지의 중심이 지정된 y 좌표에 위치)
            x: x,                      // 계산된 x 좌표로 이동
            y: y,                      // 계산된 y 좌표로 이동
        });
    });
}

// GSAP 및 ScrollTrigger를 사용한 애니메이션
gsap.to(".wheel", {
    rotate: () => -360,  // 회전 값을 100도로 설정. 화살표 함수로 값을 반환하여 동적으로 적용 가능.
    ease: "none",       // 애니메이션의 속도 조절을 없앰 (초기부터 끝까지 일정한 속도로 진행).
    duration: images.length, // 애니메이션 지속 시간 (images 배열 길이에 따라 결정)
    scrollTrigger: {
        trigger: ".etc_wrap", // 트리거 요소 설정
        start: "top top", // 트리거가 화면 상단에 닿으면 시작
        end: "+=1000", // 애니메이션 지속 범위
        scrub: true, // 스크롤과 애니메이션 동기화
        pin: true, // 트리거를 화면에 고정
        invalidateOnRefresh: true, // 리프레시 시 새로 계산
        onUpdate: () => {
            // 스크롤이 움직일 때마다 모달 닫기
            document.querySelector('.modal').classList.remove('active');
        },
        onLeave: () => {
            // 사용자가 etc_wrap 섹션을 완전히 벗어났을 때 모달 닫기
            document.querySelector('.modal').classList.remove('active');
        },
        onEnterBack: () => {
            // 뒤로 스크롤 시에도 모달 닫기
            document.querySelector('.modal').classList.remove('active');
        }
    }
});


setup();
window.addEventListener("resize", setup);
//etc works scroll 이벤트 끝



// card 클릭했을때 modal 생성 시작
// 모든 wheel_card 요소를 선택
const wheelCards = document.querySelectorAll('.wheel_card');

// modal 요소 선택
const modal = document.querySelector('.modal');

// modal 내부의 이미지 요소 선택
const modalImage = modal.querySelector('img');



// wheel_card 클릭 이벤트 등록
let chk = 0;
$('.wheel_card').click(function (e) {
    e.preventDefault();
    let currentModalImageSrc = $(this).find('img').attr('src');
    currentModalImageSrc = currentModalImageSrc.replace('etc_list', 'etc_list_on');
    $('.modal').addClass('active');
    $('.modal img').attr('src', currentModalImageSrc);
})
$('.modal').click(function () {
    $(this).removeClass('active');
});


// card 클릭했을때 modal 생성 끝


