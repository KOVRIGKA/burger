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
    const item = list.querySelectorAll('.slider__item');

    let num = 2

    next.addEventListener('click', moveNext);
    prev.addEventListener('click', movePrev);

    function moveNext(){
        num++
        if (num > item.length){
            num = 1;
        }
        setOrder();
        list.classList.remove('is-reverse');
        moveItem();
    }

    function moveNext(){
        num--
        if (num === 0){
            num = item.length;
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
            if(key > item.length){
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