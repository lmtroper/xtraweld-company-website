let resizeTimer;
window.addEventListener("resize", () => {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
    }, 400);
});


const primaryNav = document.querySelector(".mobile-navigation")
const navToggle = document.querySelector(".mobile-nav-toggle")

navToggle.addEventListener('click', () => {
    const visibility = primaryNav.getAttribute('data-visible');

    if (visibility === 'false') {
        primaryNav.setAttribute('data-visible', true);
        navToggle.setAttribute('aria-expanded', true);
    } else {
        primaryNav.setAttribute('data-visible', false);
        navToggle.setAttribute('aria-expanded', false);
    }

})

document.getElementById('mobile-header-title').innerHTML = 'WELDING SERVICES\nIN THE GTA <br><button id="services-btn" class="btn px-3 py-2">OUR SERVICES</button><button id="contact-btn" class="btn px-3 py-2">CONTACT US</button>';

// // SERVICE CARD DROPDOWNS

// const serviceCard = document.getElementById("services-btn-weld");
// // console.log(serviceCard)

// serviceCard.addEventListener('click', () => {
//     const dropdown = document.getElementById('services-dropdown-weld')
//     const arrow = document.getElementById('arrow-1')
//         // console.log(dropdown);
//     visibility = dropdown.getAttribute('data-visible')
//     direction = arrow.getAttribute('value')

//     if (visibility === 'false') {
//         dropdown.setAttribute('data-visible', true);
//         serviceCard.setAttribute('value', true);
//         arrow.setAttribute('value', true);
//     } else {
//         dropdown.setAttribute('data-visible', false);
//         serviceCard.setAttribute('value', false);
//         arrow.setAttribute('value', false);

//     }
// })

//CAROUSEL
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')

const track = document.querySelector('.track')
let carouselWidth = document.querySelector('.carousel-container').offsetWidth;

window.addEventListener('resize', () => {
    carouselWidth = document.querySelector('.carousel-container').offsetWidth;
})

let index = 0;

next.addEventListener('click', () => {
    index++;
    prev.classList.add('show');
    track.style.transform = `translateX(-${index*carouselWidth}px)`;

    if (track.offsetWidth - (index * carouselWidth) < carouselWidth) {
        next.classList.add('hide');
    }
})


prev.addEventListener('click', () => {
    index--;
    next.classList.remove('hide');
    if (index === 0) {
        prev.classList.remove('show');
    }
    track.style.transform = `translateX(-${index*carouselWidth}px)`;

})

// MOBILE CAROUSEL
const trackMobile = document.querySelector('.track-mb');
let moving = false;
let lastPosition = 0;
let transform = 0;
let lastPageX = 0;
let transformValue = 0;

const gestureStart = (e) => {
    moving = true;
    lastPosition = e.pageX;
    transform = window.getComputedStyle(trackMobile)
        .getPropertyValue('transform') != 'none' ?
        window.getComputedStyle(trackMobile)
        .getPropertyValue('transform').split(',')[4].trim() : 0;
};

const gestureMove = (e) => {
    if (moving) {
        const diffX = e.pageX - lastPosition;

        //Moving from left to right
        if (e.pageX - lastPageX > 0) {
            if (transformValue > 0) {
                return;
            }
        } else {
            if (Math.abs(transformValue) > trackMobile.offsetWidth - 340) {
                console.log(transformValue);
                console.log(trackMobile.offsetWidth - 50);
                return;
            }
        }
        transformValue = parseInt(transform) + diffX;
        trackMobile.style.transform = `translateX(${transformValue}px)`;
    }
    lastPageX = e.pageX; //Track last pages value when mouse moves
};

const gestureEnd = (e) => {
    moving = false;
};

if (window.PointerEvent) {
    window.addEventListener('pointerdown', gestureStart);

    window.addEventListener('pointermove', gestureMove);

    window.addEventListener('pointerup', gestureEnd);
} else {
    window.addEventListener('touchstart', gestureStart);
    window.addEventListener('touchmove', gestureMove);
    window.addEventListener('touchend', gestureEnd);

    window.addEventListener('mousedown', gestureStart);
    window.addEventListener('mousemove', gestureMove);
    window.addEventListener('mouseup', gestureEnd);

}

// SERVICES
const welding = document.querySelector("[id='welding-service']");
const consulting = document.querySelector("[id='consult-service']");
const equipRepair = document.querySelector("[id='equip-service']");
const masonry = document.querySelector("[id='masonry-service']");

const servicesText = document.querySelector("[id='services-text']");

const img = document.querySelector("[id='services-img']");

let activeTab = welding;

welding.addEventListener('click', () => {
    img.classList = 'welding';
    servicesText.classList = 'col-5 welding';

    activeTab.style.backgroundColor = '#1E1E23';
    activeTab = welding;
    activeTab.style.backgroundColor = '#3b3b45'
})

consulting.addEventListener('click', () => {
    img.classList = 'consult';
    servicesText.classList = 'col-5 consulting'

    activeTab.style.backgroundColor = '#1E1E23';
    activeTab = consulting;
    activeTab.style.backgroundColor = '#3b3b45'
})

equipRepair.addEventListener('click', () => {
    img.classList = 'equip';
    servicesText.classList = 'col-5 equipment';

    activeTab.style.backgroundColor = '#1E1E23';
    activeTab = equipRepair;
    activeTab.style.backgroundColor = '#3b3b45'
})

masonry.addEventListener('click', () => {
    img.classList = 'masonry';
    servicesText.classList = 'col-5 masonry';

    activeTab.style.backgroundColor = '#1E1E23';
    activeTab = masonry;
    activeTab.style.backgroundColor = '#3b3b45'
})