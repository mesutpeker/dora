// Mobil menü toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.createElement('div');
    hamburger.classList.add('hamburger');
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    
    const nav = document.querySelector('nav');
    nav.appendChild(hamburger);
    
    const navMenu = document.querySelector('nav ul');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Mobil görünümde menü öğelerini kapatma
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Pencere yeniden boyutlandırıldığında menüyü kapat
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // CSS ekle
    const style = document.createElement('style');
    style.textContent = `
        .hamburger {
            display: none;
            cursor: pointer;
            width: 30px;
            height: 20px;
            position: relative;
            z-index: 101;
        }
        
        .hamburger span {
            display: block;
            position: absolute;
            height: 3px;
            width: 100%;
            background: var(--primary);
            border-radius: 3px;
            opacity: 1;
            left: 0;
            transform: rotate(0deg);
            transition: .25s ease-in-out;
        }
        
        .hamburger span:nth-child(1) {
            top: 0px;
        }
        
        .hamburger span:nth-child(2) {
            top: 8px;
        }
        
        .hamburger span:nth-child(3) {
            top: 16px;
        }
        
        .hamburger.active span:nth-child(1) {
            top: 8px;
            transform: rotate(135deg);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
            left: -60px;
        }
        
        .hamburger.active span:nth-child(3) {
            top: 8px;
            transform: rotate(-135deg);
        }
        
        @media (max-width: 768px) {
            .hamburger {
                display: block;
            }
        }
    `;
    document.head.appendChild(style);

    // Sayfa yüklendiğinde animasyon efekti
    const animateElements = document.querySelectorAll('.product-card, .recipe-card');
    
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Mobil menü için hamburger düğmesi işlevselliği
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Menü simgesini değiştir (hamburger/çarpı)
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Pencere genişliği 768px üzerine çıktığında menüyü gizle
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            
            // Hamburger menü simgesini geri yükle
            const icon = menuToggle?.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Sayfa içi bağlantılara tıklandığında menüyü kapat
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                
                // Hamburger menü simgesini geri yükle
                const icon = menuToggle?.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
});

// Formlar için basit doğrulama (İletişim sayfası için)
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return true;
    
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            
            const errorMessage = document.createElement('small');
            errorMessage.classList.add('error-message');
            errorMessage.textContent = 'Bu alan zorunludur.';
            
            if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                input.parentNode.insertBefore(errorMessage, input.nextElementSibling);
            }
        } else {
            input.classList.remove('error');
            if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
                input.nextElementSibling.remove();
            }
        }
    });
    
    return isValid;
}

// Sayfa yukarı kaydırma butonu
window.addEventListener('scroll', function() {
    if (!document.querySelector('.back-to-top')) {
        const backToTop = document.createElement('button');
        backToTop.classList.add('back-to-top');
        backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(backToTop);
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        const style = document.createElement('style');
        style.textContent = `
            .back-to-top {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: var(--primary);
                color: white;
                border: none;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 99;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            }
            
            .back-to-top.visible {
                opacity: 1;
                visibility: visible;
            }
            
            .back-to-top:hover {
                background-color: #ff5252;
                transform: translateY(-3px);
            }
        `;
        document.head.appendChild(style);
    }
    
    const backToTop = document.querySelector('.back-to-top');
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}); 