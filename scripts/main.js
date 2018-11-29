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

/*function accordeonTeam(){

    const workers = document.querySelectorAll(".team__acco__item");
    const teamAccord = document.querySelector(".team__acco");

    teamAccord.addEventListener('click', event => {
        
        const target = event.target;

        if (target.classList.contains("team__acco__name")) {
            const worker = target.parentNode;
            const content = target.nextElementsSibling;
            const contentHeight = content.firstElementChild.clientHeight;

            worker.classList.add('is-active');
            content.style.height = contentHeight + 'px';
        }
    })
}

accordeonTeam();*/

function accordeonMenu(){
    const menuItems = document.querySelectorAll('.menu-acco__item');
    const menuAccord = document.querySelector('.menu-acco');

    menuAccord.addEventListener('click', event => {
        event.preventDefault();
        let target = event.target.parentNode;
        let content = target.nextElementsSibling; 
        let item = target.parentNode;

        const tarWidth = item.contentWidth;
        const windowWidth = document.documentElement.clientWidth;
        const layoutContentWidth = 520;
        const breackpointPhone = 480;
        const closeMenuWidth = tarWidth * menuItems.length;
        const openMenuWidth = closeMenuWidth + layoutContentWidth;

        if (event.target.classList.contains('menu-acco__name-text')) {
            moveMenu();
        }
        target = event.target
        content = target.nextElementsSibling
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
                content.style.width = layoutContentWidth + 'px';
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