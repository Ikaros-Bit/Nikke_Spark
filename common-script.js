// common-script.js - Scripts comunes para todas las páginas

document.addEventListener('DOMContentLoaded', function() {
    // Efectos interactivos para los botones
    document.querySelectorAll('.menu-btn, .footer-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Solo aplicar efecto si no es un enlace externo
            if (!this.hasAttribute('onclick') || !this.getAttribute('onclick').includes('window.open')) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            }
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Transición suave al cargar la página
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 50);
    
    // Ajustar padding del container según el footer
    function adjustContainerPadding() {
        const footer = document.querySelector('footer');
        const container = document.querySelector('.container');
        
        if (footer && container) {
            const footerHeight = footer.offsetHeight;
            container.style.paddingBottom = (footerHeight + 20) + 'px';
        }
    }
    
    // Ajustar padding en carga y redimensionamiento
    adjustContainerPadding();
    window.addEventListener('resize', adjustContainerPadding);
});