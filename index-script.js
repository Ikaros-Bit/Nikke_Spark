// index-script.js - Scripts específicos para la página principal

document.addEventListener('DOMContentLoaded', function() {
    // Efecto hover para las imágenes (solo efecto visual, sin clic)
    document.querySelectorAll('.image-container').forEach(container => {
        container.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 12px 24px rgba(147, 112, 219, 0.4)';
        });
        
        container.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
        });
        
        // QUITADO: El evento de clic que abría la imagen
        
        // Asegurar que la imagen no tenga cursor pointer
        const img = this.querySelector('.featured-image');
        if (img) {
            img.style.cursor = 'default';
            img.style.pointerEvents = 'none';
        }
    });
    
    // Mejorar la carga de imágenes grandes
    function optimizeLargeImages() {
        const images = document.querySelectorAll('.featured-image');
        images.forEach(img => {
            // Añadir loading lazy para imágenes grandes
            img.loading = 'lazy';
            
            // Asegurar que no tenga eventos de clic
            img.onclick = null;
            img.style.cursor = 'default';
            img.style.pointerEvents = 'none';
            
            // Añadir mensaje de carga
            img.addEventListener('load', function() {
                this.style.opacity = '1';
                this.parentElement.style.backgroundColor = 'transparent';
            });
            
            img.addEventListener('error', function() {
                console.error('Error al cargar imagen:', this.src);
                this.style.opacity = '0.5';
            });
        });
    }
    
    optimizeLargeImages();
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Función global para ver imagen completa (solo se llama desde botones)
function viewFullImage(imageUrl, caption) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('modalImageCaption');
    
    if (modal && modalImg) {
        // Mostrar spinner de carga
        modalImg.style.opacity = '0';
        
        // Precargar imagen
        const tempImage = new Image();
        tempImage.onload = function() {
            modalImg.src = imageUrl;
            modalImg.alt = caption;
            modalImg.style.opacity = '1';
        };
        tempImage.src = imageUrl;
        
        captionText.textContent = caption;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// Función global para cerrar modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Función global para descargar imagen
function downloadImage(imageUrl, fileName) {
    try {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = fileName + '.png'; // Cambiado a .png
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Notificación visual
        showNotification('Descarga iniciada: ' + fileName);
    } catch (error) {
        console.error('Error al descargar:', error);
        showNotification('Error al descargar la imagen', 'error');
    }
}

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `image-notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ff4444' : '#4CAF50'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 2000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
    
    // Añadir estilos de animación si no existen
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}