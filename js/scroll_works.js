
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
    }, 2)


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


//etc works scroll 이벤트 시작
gsap.registerPlugin("ScrollTrigger");

let wheel = document.querySelector(".wheel");
let images = gsap.utils.toArray(".wheel_card");

function setup() {
    let radius = wheel.offsetWidth / 2;
    let center = wheel.offsetWidth / 2;
    let total = images.length;
    let slice = (2 * Math.PI) / total;

    images.forEach((item, i) => {
        let angle = i * slice;

        let x = center + radius * Math.sin(angle);
        let y = center + radius * Math.cos(angle);

        gsap.set(item, {
            duration: 1,
            rotation: -angle + "-rad",
            //rotation: (i) => i * (360 / items.length),
            xPercent: -50,
            yPercent: -50,
            x: x,
            y: y,
        });
    });
}

gsap.to(".wheel", {
    rotate: () => 180,
    ease: "none",
    // duration : 1,
    duration: images.length,
    scrollTrigger: {
        trigger: ".etc_wrap", // wrap이 트리거
        start: "top top", // wrap이 화면 상단에 닿으면 시작
        end: "+=1000", // 애니메이션 지속 범위
        scrub: true, // 스크롤에 따라 애니메이션 동기화
        pin: true, // wrap을 화면에 고정
        invalidateOnRefresh: true,
        onUpdate: (self) => {
            // 애니메이션이 끝났을 때 모달 닫기
            if (self.progress === 1) {
                $('.modal').removeClass('on');
            }
        }
    },
});




setup();
window.addEventListener("resize", setup);
$('.wheel_card').hover(function () {
    let src = $(this).find('img').attr('src');
    src = src.replace('./img/eunwoo', './img/eunwoo_on');
    console.log(src);
    $('.modal').addClass('on').find('img').attr('src', src);
}, function () {
    $('.modal').removeClass('on')
})
//etc works scroll 이벤트 끝


