function mobileMenu(){
    const navTrigger = document querySelector('.nav-trigger');
    const trigger = document querySelector('.nav-trigger__link');
    const navMobile = document querySelector('.nav-mobile');
    const navItems = document querySelectorAll('.nav-mobile__item');

    trigger.addEventListener('click', toggleClass);

    for (const iterator of navItems){
        iterator.addEventListener('click', toggleClass)
    }

    function toggleClass(e){
        e.preveventDefault();
        navTrigger.classList.toggle('is-active');
        navMobile.classList.toggle('is-active');
    }
}

mobileMenu();