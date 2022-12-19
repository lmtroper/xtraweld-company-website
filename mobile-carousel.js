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