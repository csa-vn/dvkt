// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-nav a.nav-link');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section id
            const targetId = this.getAttribute('href');
            
            // Scroll to the target section smoothly
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close the mobile navbar if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
            
            // Update active nav link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Service category tabs functionality
    const serviceButtons = document.querySelectorAll('.service-btn');
    const serviceContents = document.querySelectorAll('.service-content');
    
    // Show the first service content by default
    document.getElementById('audit-services').classList.add('active');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.closest('.service-category').dataset.target;
            
            // Hide all service contents
            serviceContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show the selected service content
            document.getElementById(target).classList.add('active');
            
            // Scroll to the service details
            document.querySelector('.service-details').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // Quote form submission
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const fullName = document.getElementById('fullName').value;
            const company = document.getElementById('company').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            console.log({
                fullName: fullName,
                company: company,
                phone: phone,
                email: email,
                service: service,
                message: message
            });
            
            // Show success message
            document.getElementById('quoteSuccess').classList.remove('d-none');
            
            // Reset the form
            this.reset();
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                document.getElementById('quoteSuccess').classList.add('d-none');
            }, 5000);
        });
    }
    
    // Scroll spy functionality
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Get all sections
        const sections = document.querySelectorAll('section, header');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to the corresponding nav link
                const activeLink = document.querySelector(`.navbar-nav a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
        
        // Add box shadow to navbar when scrolled
        const navbar = document.querySelector('.navbar');
        if (scrollPosition > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // Animation on scroll for benefits cards
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    const benefitObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                benefitObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    benefitCards.forEach(card => {
        benefitObserver.observe(card);
    });
});
