/**
 * Apex Motors - Premium Light Showroom Landing Page Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initVehicleFilterMatrix();
    initContactFormMatrix();
});

function initNavbarScroll() {
    const navbar = document.querySelector('.main-navbar');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
}

function initVehicleFilterMatrix() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const carCards = document.querySelectorAll('.car-card-wrapper');

    if (filterButtons.length === 0 || carCards.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            const selectedFilterValue = e.target.getAttribute('data-filter');

            carCards.forEach(card => {
                const targetCategory = card.getAttribute('data-category');
                
                if (selectedFilterValue === 'all' || targetCategory === selectedFilterValue) {
                    card.classList.remove('hide-item');
                    card.classList.add('fade-animation');
                } else {
                    card.classList.add('hide-item');
                    card.classList.remove('fade-animation');
                }
            });
        });
    });
}

function initContactFormMatrix() {
    const contactForm = document.getElementById("apexContactForm");
    const successBadge = document.getElementById("formSuccessBadge");
    const submitBtn = document.getElementById("submitFormBtn");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            
            if (!contactForm.checkValidity()) {
                contactForm.classList.add('was-validated');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Securing Connection...`;

            setTimeout(() => {
                successBadge.classList.remove("d-none");
                contactForm.reset();
                contactForm.classList.remove('was-validated');
                submitBtn.disabled = false;
                submitBtn.innerHTML = `Transmit Secure Request <i class="fa-solid fa-paper-plane ms-2 small"></i>`;
            }, 1500);
        });
    }
}