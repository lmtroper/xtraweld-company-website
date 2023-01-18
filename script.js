// Scroll Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            console.log('true!')
            entry.target.classList.add('show')
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


// Navbar
let resizeTimer;
window.addEventListener("resize", () => {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
    }, 400);
});


const primaryNav = document.querySelector(".navigation-links")
const navToggle = document.querySelector(".nav-toggle")

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

document.getElementById('mobile-header-title').innerHTML = 'WELDING SERVICES\nIN THE GTA <br><button onclick=window.location.href="#services-anchor" id="services-btn" class="btn px-3 py-2">OUR SERVICES</button><button id="contact-btn" class="btn px-3 py-2" onclick=window.location.href="#contact-anchor">CONTACT US</button>';


// Carousel
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')

const cardWidth = document.querySelector('.card-container').offsetWidth;

const track = document.querySelector('.track')
let carouselWidth = document.querySelector('.carousel-container').offsetWidth;

window.addEventListener('resize', () => {
    carouselWidth = document.querySelector('.carousel-container').offsetWidth;
})

let index = 0;

next.addEventListener('click', () => {
    index++;
    prev.classList.add('show');
    track.style.transform = `translateX(-${index*cardWidth}px)`;

    if (track.offsetWidth - (index * cardWidth) < carouselWidth) {
        next.classList.add('hide');
    }
})


prev.addEventListener('click', () => {
    index--;
    next.classList.remove('hide');
    if (index === 0) {
        prev.classList.remove('show');
    }
    track.style.transform = `translateX(-${index*cardWidth}px)`;

})



// SERVICES SECTION: ACCORDION RESPONSIVENESS

var windowSize = true; //value is true when window > 992px

window.addEventListener('load', function() {
    if (this.window.innerWidth < 992) {
        var active = document.querySelector('.accordion__button--active');
        active.classList.remove("accordion__button--active")
        windowSize = false;
    }
})

window.addEventListener("resize", function() {
    var active = document.querySelector('.accordion__button--active');
    // console.log(windowSize)

    if (window.innerWidth < 992) {
        if (windowSize) {
            console.log('proof 1')
                // console.log('window < 992 and it came from bigger')
            active.classList.remove("accordion__button--active")
            windowSize = false;
        }
    } else {
        if (!windowSize) {
            // Minimize all the open tabs opened in condensed screen
            document.querySelectorAll('.accordion__button').forEach(button => {
                const accordionContent = button.nextElementSibling;
                accordionContent.style.maxHeight = 0;
                button.classList.remove('accordion__button--active');
            });

            document.querySelector('[id="tab1"]').classList.add('accordion__button--active');
            document.querySelector(".service-card--active").classList.remove('service-card--active');
            document.querySelector("[id='card1']").classList.add('service-card--active')
        }
        windowSize = true;


    };

});

document.querySelectorAll('.accordion__button').forEach(button => {
    button.addEventListener('click', () => {
        var active = document.querySelector('.accordion__button--active');
        //console.log(button)
        if (window.innerWidth < 992) {
            console.log('window less than 992')
            const accordionContent = button.nextElementSibling;
            button.classList.toggle('accordion__button--active');

            if (button.classList.contains('accordion__button--active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {
                accordionContent.style.maxHeight = 0;
            }

        } else {
            console.log('clicking button in 992+ screen')
            let prevButton = document.querySelector(".accordion__button--active");
            prevButton.classList.remove('accordion__button--active');
            prevButton = button.classList.add('accordion__button--active');

            const id = button.id.slice(-1)

            let prevCard = document.querySelector(".service-card--active");
            prevCard.classList.toggle('service-card--active');
            const card = document.querySelector("[id='card" + id + "']")
            prevCard = card
            prevCard.classList.toggle('service-card--active');

        };
    })
})

function sendEmail() {
    var params = {
        name: document.getElementById('name-input ').value,
        email: document.getElementById('email-input ').value,
        message: document.getElementById('message-input ').value,
    }

    const serviceId = "service_ayawkcj";
    const templateId = "template_a83f8rt"

    emailjs.send(serviceId, templateId, params).then(
        res => {
            document.getElementById('name-input ').value = "";
            document.getElementById('email-input ').value = "";
            document.getElementById('message-input ').value = "";
            console.log(res);
            alert("Your message was sent successfully")
        }
    );

}