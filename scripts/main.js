// мобильное меню

function mobileMenu(){
    const navTrigger = document.querySelector('.nav-trigger');
    const trigger = document.querySelector('.nav-trigger__link');
    const navMobile = document.querySelector('.nav-mobile');
    const navItems = document.querySelectorAll('.nav-mobile__item');

    trigger.addEventListener('click', toggleClass);

    for (const iterator of navItems){
        iterator.addEventListener('click', toggleClass)
    }

    function toggleClass(e){
        e.preventDefault();
        navTrigger.classList.toggle('is-active');
        navMobile.classList.toggle('is-active');
    }
}

mobileMenu();

//слайдер бургеров

function mySlider() {
    const next = document.querySelector('.scroll__btn--next');
    const prev = document.querySelector('.scroll__btn--prev');
    const list = document.querySelector('.slider__list');
    const items = list.querySelectorAll('.slider__item');

    let num = 2

    next.addEventListener('click', moveNext);
    prev.addEventListener('click', movePrev);

    function moveNext(){
        num++
        if (num > items.length){
            num = 1;
        }
        setOrder();
        list.classList.remove('is-reverse');
        moveItem();
    }

    function movePrev(){
        num--
        if (num === 0){
            num = items.length;
        }
        setOrder();
        list.classList.add('is-reverse');
        moveItem();
    }

    function setOrder(){
        let key = num
        for(const i of items){
            i.style.order = key
            key++
            if(key > items.length){
                key = 1;
            }
        }
    }

    function moveItem(){
        list.classList.remove('is-move');
        setTimeout(() => {
            list.classList.add('is-move');            
        }, 50);
    }
}

mySlider();

//выдвигашка профиля в команде

function accordeonTeam(){

    const workers = document.querySelectorAll(".team-acco__item");
    const teamAccord = document.querySelector(".team-acco");

    console.log();
    

    teamAccord.addEventListener('click', event => {
        event.preventDefault();        
        const target = event.target;

        if (target.classList.contains("team-acco__name")) {
            const worker = target.parentNode;
            const content = target.nextElementSibling;            
            const contentHeight = content.firstElementChild.clientHeight;

            for (const iterator of workers) {
                if (iterator !== worker) {
                    iterator.classList.remove('is-active');
                    iterator.lastElementChild.style.height = 0;
                }
            }

            if (worker.classList.contains('is-active')) {
                worker.classList.remove('is-active');
                content.style.height = 0;
            } else {
                worker.classList.add('is-active');
                content.style.height = contentHeight + 'px';
            }

            
        }
    })
}

accordeonTeam();

//выдвигашка описания в меню

function accordeonMenu(){
    const menuItems = document.querySelectorAll('.menu-acco__item');
    const menuAccord = document.querySelector('.menu-acco');

    menuAccord.addEventListener('click', event => {
        event.preventDefault();
        let target = event.target.parentNode;
        let content = target.nextElementSibling; 
        let item = target.parentNode;

        const tarWidth = target.clientWidth;
        const windowWidth = document.documentElement.clientWidth;
        const layoutContentWidth = 520;
        const breackpointPhone = 480;
        const closeMenuWidth = tarWidth * menuItems.length;
        const openMenuWidth = closeMenuWidth + layoutContentWidth;
        


        if (event.target.classList.contains('menu-acco__name-text')) {
            moveMenu();
        }
        target = event.target
        content = target.nextElementSibling
        item = target.parentNode
        
        if (target.classList.contains('menu-acco__name')) {
            moveMenu();
        }

        function moveMenu(){
            for (const iterator of menuItems){
                if (iterator != item) {
                    iterator.classList.remove('is-active')
                    iterator.lastElementChild.style.width = 0
                    menuAccord.style.transform = 'translateX(0)'                    
                }
            }

            if (item.classList.contains('is-active')) {
                item.classList.remove('is-active');
                content.style.width = 0;
            } else{
                item.classList.add('is-active');
                
                if (windowWidth > breackpointPhone && windowWidth < openMenuWidth) {

                    content.style.width = windowWidth - closeMenuWidth + 'px';
                } else if (windowWidth <= breackpointPhone) {
                let num;
                for (let i = 0; i < menuItems.length; i++) {
                    if (menuItems[i] === item) {
                    num = menuItems.length - (i + 1);
                    }
                    menuAccord.style.transform = `translateX(${tarWidth * num}px)`;
                    content.style.width = windowWidth - tarWidth + 'px';
                }
                } else {
                content.style.width = layoutContentWidth + 'px';
                }
            }
        }
    })
}

accordeonMenu();

//читать отзыв

const openButtons = document.querySelectorAll(".btn--review");
const template = document.querySelector("#overlayTemplate").innerHTML;
const overlay = createOverlay(template);
const reviewList = document.querySelector(".reviews__list");

reviewList.addEventListener("click", function(e) {
    if (e.target.classList.contains('btn--review')) {
        const head = e.target.parentNode.firstElementChild.textContent;
        const text = e.target.parentNode.firstElementChild.nextElementSibling.textContent;
        overlay.open();
        overlay.setContent(head, text);
    }
});

function createOverlay(template) {
    let fragment = document.createElement('div');

    fragment.innerHTML = template;

    const overlayElement = fragment.querySelector(".overlay");
    const headElement = fragment.querySelector(".details__head");
    const textElement = fragment.querySelector(".details__text");
    const closeElement = fragment.querySelector(".details__close");
    
    fragment = null;

    overlayElement.addEventListener("click", e => {
        if (e.target === overlayElement) {
          closeElement.click();
        }
      });
        
        closeElement.addEventListener("click", () => {
            event.preventDefault();    
            document.body.removeChild(overlayElement);
        });

        return {
            open() {
                document.body.appendChild(overlayElement);
            },
            close() {
                closeElement.click();
            },
            setContent(head, text) {
                headElement.innerHTML = head;
                textElement.innerHTML = text;
            }
        }
}


//карта

ymaps.ready(init);

var placemarks = [
    {
        latitude: 59.97,
        longitude: 30.31,
        hintContent: 'ул. Литераторов, д. 19',
    },
    {
        latitude: 59.97,
        longitude: 30.42,
        hintContent: 'ул. Литераторов, д. 19',
    },
    {
        latitude: 59.89,
        longitude: 30.31,
        hintContent: 'ул. Литераторов, д. 19',
    },
    {
        latitude: 59.91,
        longitude: 30.49,
        hintContent: 'ул. Литераторов, д. 19',
    },
];

function init(){
    var map = new ymaps.Map('mymap', {
        center: [59.94, 30.32],
        zoom: 12,
        controls: ['zoomControl'],
        behaviors: ['drag']
    });

    placemarks.forEach(function(obj) {
        var placemark = new ymaps.Placemark([obj.latitude, obj.longitude], {
            hintContent: obj.hintContent,
        },{
            iconLayout:'default#image',
            iconImageHref: './images/icons/map-marker.svg',
            iconImageSize: [46, 57],
            iconImageOffset: [-23, -27],
        });

        map.geoObjects.add(placemark);

    });

}

// заказ



function sendOrder() {
	const myForm = document.querySelector('#myForm');
    const sendButton = document.querySelector('#sendButton');

	sendButton.addEventListener('click', function (event) {
		event.preventDefault();

		let url = myForm.getAttribute('action');
		let method = myForm.getAttribute('method');
		let formData = new FormData(myForm);

		formData.append('name', myForm.elements.name.value);
		formData.append('phone', myForm.elements.phone.value);
		formData.append('comment', myForm.elements.comment.value);
		formData.append('to', 'anastasiia.kovrighina@mail.ru');

		const xhr = new XMLHttpRequest();
		xhr.responseType = 'json';
		xhr.open(method, url);
		xhr.send(formData);

		const overlay = createOverlay(document.querySelector('#overlayTemplate').innerHTML);
		xhr.addEventListener('load', () => {
			overlay.open();
			if (xhr.status === 200) {
				const message = xhr.response.message;
				overlay.setContent('', message);
			} else {
				const message = 'УПС! Ошибочка! Попробуйте снова!';
				overlay.setContent('', message);
			}
		});
	});
};
sendOrder();

// one page scroll

function onePageScroll() {
    const wrapper = document.querySelector('.wrapper');
    const content = wrapper.querySelector('.maincontent');
    const pages = content.querySelectorAll('.section');
    const points = document.querySelectorAll('.nav-points__item');
    const dataScrollto = document.querySelectorAll('[data-scroll-to]');
  
    let isScroll = false;
  
    addNavigation();
    wheel();
    keyPush();
  
    function moveToPage(numPage) {
      const position = `${numPage * -100}%`;
  
      if (isScroll) return;
  
      isScroll = true;
  
      addClass(pages);
  
      content.style.transform = `translateY(${position})`;
  
      setTimeout(() => {
        isScroll = false;
        addClass(points);
      }, 1000);
  
      function addClass(arr) {
        arr[numPage].classList.add('is-active');
        for (const iterator of arr) {
          if (iterator !== arr[numPage]) {
            iterator.classList.remove('is-active');
          }
        }
      }
    }
  
    function addNavigation() {
      for (const iterator of dataScrollto) {
        iterator.addEventListener('click', e => {
          e.preventDefault();
          moveToPage(iterator.dataset.scrollTo);
        });
      }
    }
  
    function wheel() {
      document.addEventListener('wheel', e => {
        const direct = e.deltaY > 0 ? 'up' : 'down';
  
        scrollToPage(direct);
      });
    }
  
    function definePage(arr) {
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if (element.classList.contains('is-active')) {
          return {
            elIndex: i,
            elActive: element,
            elNext: element.nextElementSibling,
            elPrev: element.previousElementSibling
          };
        }
      }
    }
  
    function scrollToPage(direct) {
      let page = definePage(pages);
  
      if (direct === 'up' && page.elNext) {
        let numPage = page.elIndex + 1;
        moveToPage(numPage);
      }
      if (direct === 'down' && page.elPrev) {
        let numPage = page.elIndex - 1;
        moveToPage(numPage);
      }
    }
  
    function keyPush() {
      document.addEventListener('keydown', e => {
        switch (e.keyCode) {
          case 40:
            scrollToPage('up');
            break;
          case 38:
            scrollToPage('down');
            break;
        }
      });
    }
  
    if (isMobileDevice()) swipe();
  
    function swipe() {
      let touchStartY = 0;
      let touchEndY = 0;
  
      document.addEventListener(
        'touchstart',
        e => {
          touchStartY = e.changedTouches[0].screenY;
        },
        false
      );
  
      wrapper.addEventListener('touchmove', e => e.preventDefault());
  
      document.addEventListener(
        'touchend',
        e => {
          touchEndY = e.changedTouches[0].screenY;
          let direct = swipeDirect();
          scrollToPage(direct);
        },
        false
      );
  
      function swipeDirect() {
        let dif = touchStartY - touchEndY;
        if (dif > 100) {
          return 'up';
        } else if (dif < -100) {
          return 'down';
        }
      }
    }
  
    function isMobileDevice() {
      return (
        typeof window.orientation !== 'undefined' ||
        navigator.userAgent.indexOf('IEMobile') !== -1
      );
    }
  }
  
  onePageScroll();