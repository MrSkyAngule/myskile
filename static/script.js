document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('open-modal-btn');
    const closeBtn = document.getElementById('close-modal-btn');
    const modal = document.getElementById('modal-container');
    const form = document.getElementById('order-form');

    // Открыть окно при клике на кнопку
    openBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Отменяем переход по ссылке #
        modal.classList.add('active');
    });

    // Закрыть окно при клике на крестик
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Закрыть окно при клике на темную область вокруг окна
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Логика отправки формы
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Запрещаем перезагрузку страницы

        const selectedService = document.getElementById('service-select').value;
        const userName = document.getElementById('user-name').value;

        // Имитация отправки на сервер
        alert(`Спасибо, ${userName}! Ваша заявка на услугу "${selectedService}" успешно принята. Мы свяжемся с вами.`);

        // Сбрасываем форму и закрываем окно
        form.reset();
        modal.classList.remove('active');
    });
});
