document.addEventListener('DOMContentLoaded', function() {

    // --- Smooth scrolling for navigation links and mobile menu closing ---
    const navLinks = document.querySelectorAll('.navbar-nav a.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });

            // Close the mobile navbar if open
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }

            // Update active nav link (handled by scroll spy for better accuracy)
            // This is removed here to prevent conflicts with the scroll spy
        });
    });

    // --- Service category tabs functionality ---
    const serviceButtons = document.querySelectorAll('.service-btn');
    const serviceContents = document.querySelectorAll('.service-content');
    const serviceDetailsSection = document.querySelector('.service-details');

    // Initially hide all service content and the service details section
    serviceContents.forEach(content => content.classList.remove('active'));
    if (serviceDetailsSection) {
        serviceDetailsSection.style.display = 'none';
    }

    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.closest('.service-category').dataset.target;

            // Show the service details section
            if (serviceDetailsSection) {
                serviceDetailsSection.style.display = 'block';
            }

            // Hide all service contents
            serviceContents.forEach(content => {
                content.classList.remove('active');
            });

            // Show the selected service content
            const targetContent = document.getElementById(target);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // Scroll to the service details section
            serviceDetailsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // --- Quote form submission ---
    const quoteForm = document.getElementById('quoteForm');
    const quoteSuccessMessage = document.getElementById('quoteSuccess');

    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const formData = {
                fullName: document.getElementById('fullName').value,
                company: document.getElementById('company').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };

            // In a real application, you would send this data to a server
            console.log(formData);

            // Show success message
            if (quoteSuccessMessage) {
                quoteSuccessMessage.classList.remove('d-none');
            }

            // Reset the form
            this.reset();

            // Hide success message after 5 seconds
            setTimeout(function() {
                if (quoteSuccessMessage) {
                    quoteSuccessMessage.classList.add('d-none');
                }
            }, 5000);
        });
    }

    // --- Scroll spy functionality ---
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const sections = document.querySelectorAll('section, header'); // Include header if it's a target for nav links

        sections.forEach(section => {
            // Adjust offset to trigger active state a bit before the section reaches the very top
            const sectionTop = section.offsetTop - 150; 
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.navbar-nav a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });

        // Add box shadow to navbar when scrolled
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (scrollPosition > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }
    });

    // --- Animation on scroll for benefits cards ---
    const benefitCards = document.querySelectorAll('.benefit-card');

    const benefitObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                benefitObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    benefitCards.forEach(card => {
        benefitObserver.observe(card);
    });

    // --- Smooth scroll and display service details from footer/contact links ---
    document.querySelectorAll('.service-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').replace('#', '');
            const targetContent = document.getElementById(targetId);

            if (targetContent && serviceDetailsSection) {
                serviceDetailsSection.style.display = 'block'; // Show the service details container
                serviceContents.forEach(content => content.classList.remove('active')); // Hide all others
                targetContent.classList.add('active'); // Show the specific content
                serviceDetailsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});