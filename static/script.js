document.addEventListener('DOMContentLoaded', () => {
    const ctaButton = document.getElementById('cta-button');

    // Обработка клика на главную кнопку
    ctaButton.addEventListener('click', () => {
        // Эффект пульсации перед действием
        ctaButton.style.transform = 'scale(0.95)';

        setTimeout(() => {
            ctaButton.style.transform = 'none';
            // Плавный скролл к блоку "О нас" при клике
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
        }, 150);
    });

    // Изменение прозрачности шапки при скролле
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(15, 23, 42, 0.8)';
            header.style.boxShadow = 'none';
        }
    });
});
