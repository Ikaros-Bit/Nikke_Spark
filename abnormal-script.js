// abnormal-script.js - Scripts específicos para la página Abnormal

// Funcionalidad de zoom para imágenes
function initImageZoom() {
    const modal = document.getElementById('imageModal');
    const zoomedImage = document.getElementById('zoomedImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.close-btn');
    
    // Agregar evento de clic a todas las imágenes de la galería
    document.querySelectorAll('.nikke-image').forEach(image => {
        image.addEventListener('click', function() {
            modal.classList.add('show');
            zoomedImage.src = this.src;
            zoomedImage.alt = this.alt;
            modalCaption.textContent = this.alt;
            document.body.style.overflow = 'hidden'; // Prevenir scroll
        });
    });
    
    // Cerrar modal al hacer clic en la X
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restaurar scroll
    });
    
    // Cerrar modal al hacer clic fuera de la imagen
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Restaurar scroll
        }
    });
    
    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Restaurar scroll
        }
    });
}

// Inicializar funcionalidad de zoom para imágenes
document.addEventListener('DOMContentLoaded', function() {
    initImageZoom();
});