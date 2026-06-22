// Ждем полную загрузку DOM-дерева
document.addEventListener('DOMContentLoaded', () => {

    // Элементы формы
    const siteTypeSelect = document.getElementById('site-type');
    const checkboxes = document.querySelectorAll('.checkboxes input');
    const totalPriceElement = document.getElementById('total-price');

    // Функция динамического расчета
    function calculateTotal() {
        // Получаем базовую цену из выбранного типа сайта
        let total = parseInt(siteTypeSelect.value);

        // Прибавляем стоимость каждой выбранной галочки
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                total += parseInt(checkbox.value);
            }
        });

        // Обновляем текст на странице с красивым разделением тысяч
        totalPriceElement.textContent = total.toLocaleString('ru-RU');
    }

    // Слушаем изменения в выпадающем списке
    siteTypeSelect.addEventListener('change', calculateTotal);

    // Слушаем изменения на каждом чекбоксе
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotal);
    });

    // Первичный расчет при открытии страницы
    calculateTotal();
});
