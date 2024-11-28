$(function () {
  let headerScrolled = false;

  // scroll에 따른 상단 gnb 모션 시작
  $('section').on('wheel', function (e) {
    if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
      $('header').removeClass('on');
    } else {
      $('header').addClass('on')
    }
  });


  // gnb를 클릭했을때 해당 섹션으로 넘어갈때 모션
  document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // 기본 동작 방지
      const targetId = this.getAttribute('href'); // 클릭한 앵커의 href 값
      const targetSection = document.querySelector(targetId); // 대상 섹션 선택

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth', // 스무스 스크롤 효과
          block: 'start'      // 섹션 시작 부분으로 이동
        });
      }
    });
  });
  // scroll에 따른 상단 gnb 모션 끝


  //skill_text 떨어짐 시작
  (function () {
    const WALL_THICKNESS = 80;
    const MATTER_CONTAINER = document.querySelector("#skill_all");
    const MATTER_HELPER = document.querySelector("#helper");
  
    let Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      World = Matter.World,
      Composite = Matter.Composite;
  
    let engine = Engine.create();
    let render = Render.create({
      element: MATTER_HELPER,
      engine: engine,
      background: "black",
      options: {
        width: MATTER_CONTAINER.offsetWidth,
        height: MATTER_CONTAINER.offsetHeight,
      },
    });
  
    let domBodies = document.querySelectorAll(".menu_item");
    let matterBodies = {};
    let runner;
    let leftWall, rightWall, ground;
  
    // 해당 섹션 도달 시 모션 초기화 여부를 확인하는 플래그 변수
    let isInitialized = false;
  
    // Intersection Observer로 특정 섹션 감지
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isInitialized) {
            isInitialized = true;
            init(); // 뷰포트에 노출된 상태 확인 및 애니메이션 실행
          }
        });
      },
      { threshold: 0.5 } // 섹션이 뷰포트에 얼마나 보여야 실행할지 설정
    );
  
    // #skill_all 섹션 감시 시작
    observer.observe(MATTER_CONTAINER);
  
    function init() {
      createBounds();
      // 애니메이션 초기화 함수
      Composite.add(engine.world, [leftWall, rightWall, ground]);
      // 렌더링 시작
      Render.run(render);
      // 엔진 실행 준비 및 시작
      runner = Runner.create();
      // Run the engine
      Runner.run(runner, engine);
      // HTML 요소를 물리 엔진 객체로 변환 및 추가
      createMatterBodies();
      World.add(engine.world, Object.values(matterBodies));
      window.requestAnimationFrame(updateElementPositions);
      window.addEventListener("resize", () => handleResize());
    }
  

    function createBounds() {
      ground = Bodies.rectangle(
        MATTER_CONTAINER.offsetWidth / 2,
        MATTER_CONTAINER.offsetHeight + WALL_THICKNESS / 2,
        6000,
        WALL_THICKNESS,
        { isStatic: true }
      );
  
      leftWall = Bodies.rectangle(
        0 - WALL_THICKNESS / 2,
        MATTER_CONTAINER.offsetHeight / 2,
        WALL_THICKNESS,
        MATTER_CONTAINER.offsetHeight * 5,
        { isStatic: true }
      );
  
      rightWall = Bodies.rectangle(
        MATTER_CONTAINER.offsetWidth + WALL_THICKNESS / 2,
        MATTER_CONTAINER.offsetHeight / 2,
        WALL_THICKNESS,
        MATTER_CONTAINER.offsetHeight * 5,
        { isStatic: true }
      );
    }
  
    function createMatterBodies() {
      domBodies.forEach(function (domBody, index) {
        let matterBody = Bodies.rectangle(
          MATTER_CONTAINER.offsetWidth / 2,
          -MATTER_CONTAINER.offsetHeight,
          domBody.offsetWidth,
          domBody.offsetHeight,
          {
            chamfer: {
              radius: domBody.offsetHeight / 2,
            },
  
            restitution: 0.925,
            density: Math.random() * 15,
            angle: Math.random() * 10,
            friction: Math.random() * 50,
            frictionAir: Math.random() / 150,
          }
        );
  
        domBody.id = matterBody.id;
        matterBodies[matterBody.id] = matterBody;
      });
    }
  
    function updateElementPositions() {
      domBodies.forEach((domBody, index) => {
        let matterBody = matterBodies[domBody.id];
  
        if (matterBody) {
          domBody.style.transform =
            "translate( " +
            (-domBody.offsetWidth +
              matterBody.position.x +
              domBody.offsetWidth / 2) +
            "px, " +
            (-domBody.offsetHeight +
              matterBody.position.y +
              domBody.offsetHeight / 2) +
            "px )";
          domBody.style.transform += "rotate( " + matterBody.angle + "rad )";
        }
      });
  
      window.requestAnimationFrame(updateElementPositions);
    }
  
    function handleResize() {
      render.canvas.width = MATTER_CONTAINER.offsetWidth;
      render.canvas.height = MATTER_CONTAINER.offsetHeight;
  
      Matter.Render.setPixelRatio(render, window.devicePixelRatio);
  
      Matter.Body.setPosition(
        ground,
        Matter.Vector.create(
          MATTER_CONTAINER.offsetWidth / 2,
          MATTER_CONTAINER.offsetHeight + WALL_THICKNESS / 2
        )
      );
  
      Matter.Body.setPosition(
        leftWall,
        Matter.Vector.create(0 - WALL_THICKNESS / 2, MATTER_CONTAINER.offsetHeight / 2)
      );
  
      Matter.Body.setPosition(
        rightWall,
        Matter.Vector.create(
          MATTER_CONTAINER.offsetWidth + WALL_THICKNESS / 2,
          MATTER_CONTAINER.offsetHeight / 2
        )
      );
    }
  })();

  //skill_text 떨어짐 끝
  

  //performance 모션 시작
  class CardFlipOnScroll {
    constructor(wrapper, sticky) {
      this.wrapper = wrapper
      this.sticky = sticky
      this.cards = sticky.querySelectorAll('.card')
      this.length = this.cards.length

      this.start = 0
      this.end = 0
      this.step = 0
    }

    init() {
      this.start = this.wrapper.offsetTop - 100
      this.end = this.wrapper.offsetTop + this.wrapper.offsetHeight - innerHeight * 1.2
      this.step = (this.end - this.start) / (this.length * 2)
    }

    animate() {
      this.cards.forEach((card, i) => {
        const s = this.start + this.step * i
        const e = s + this.step * (this.length + 1)

        if (scrollY <= s) {
          card.style.transform = `
      perspective(100vw)
      translateX(100vw) 
      rotateY(180deg)
    `
        } else if (scrollY > s && scrollY <= e - this.step) {
          card.style.transform = `
      perspective(100vw)
      translateX(${100 + (scrollY - s) / (e - s) * -100}vw)
      rotateY(180deg)
    `
        } else if (scrollY > e - this.step && scrollY <= e) {
          card.style.transform = `
      perspective(100vw)
      translateX(${100 + (scrollY - s) / (e - s) * -100}vw)
      rotateY(${180 + -(scrollY - (e - this.step)) / this.step * 180}deg)
    `
        } else if (scrollY > e) {
          card.style.transform = `
      perspective(100vw)
      translateX(0vw) 
      rotateY(0deg)
    `
        }
      })
    }
  }

  const mainContent1 = document.querySelector('.performance')
  const sticky = document.querySelector('.sticky')
  const cardFlipOnScroll = new CardFlipOnScroll(mainContent1, sticky)
  cardFlipOnScroll.init()

  window.addEventListener('scroll', () => {
    cardFlipOnScroll.animate()
  })

  window.addEventListener('resize', () => {
    cardFlipOnScroll.init()
  })
  //performance 모션 끝


  AOS.init();

});