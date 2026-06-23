// Массив данных из 15 разнообразных услуг веб-студии
const services = [
    { id: "landing_promo", title: "Промо-лендинг", desc: "Одностраничный сайт для быстрого старта продаж одного товара.", price: "15 000 ₽" },
    { id: "landing_premium", title: "Премиум-лендинг", desc: "Эксклюзивный дизайн, интерактивные анимации и копирайтинг текста.", price: "25 000 ₽" },
    { id: "corp_start", title: "Сайт-визитка", desc: "До 3 страниц: о компании, услуги, контакты. Для малого бизнеса.", price: "20 000 ₽" },
    { id: "corp_standard", title: "Корпоративный стандарт", desc: "До 10 страниц, блог, базовая SEO-оптимизация и интеграция карт.", price: "35 000 ₽" },
    { id: "corp_business", title: "Бизнес-портал", desc: "Многостраничный сайт с личным кабинетом клиента и каталогом.", price: "55 000 ₽" },
    { id: "shop_mini", title: "Мини-маркет", desc: "Интернет-магазин до 50 товаров. Корзина и простая форма заказа.", price: "40 000 ₽" },
    { id: "shop_pro", title: "Интернет-магазин PRO", desc: "Синхронизация с 1С/МойСклад, фильтры товаров, онлайн-оплата.", price: "75 000 ₽" },
    { id: "portfolio_creative", title: "Портфолио для автора", desc: "Галерея работ для фотографов, дизайнеров, архитекторов.", price: "18 000 ₽" },
    { id: "catalog_no_pay", title: "Сайт-каталог", desc: "Витрина товаров без онлайн-оплаты, с кнопкой «Узнать цену».", price: "30 000 ₽" },
    { id: "seo_pack", title: "Пакет «SEO-Старт»", desc: "Сбор семантического ядра, пропись тегов, регистрация в поисковиках.", price: "12 000 ₽" },
    { id: "speed_opt", title: "Ускорение сайта", desc: "Оптимизация кода и изображений для зеленой зоны Google PageSpeed.", price: "8 000 ₽" },
    { id: "design_redesign", title: "Редезайн интерфейса", desc: "Обновление внешнего вида текущего сайта под современные тренды.", price: "22 000 ₽" },
    { id: "quiz_site", title: "Сайт-квиз", desc: "Интерактивный опросник для генерации горячих лидов и заявок.", price: "10 000 ₽" },
    { id: "crm_connect", title: "Интеграция CRM", desc: "Связь форм сайта с AmoCRM, Bitrix24 или отправка в Telegram.", price: "7 000 ₽" },
    { id: "support_month", title: "Поддержка (1 месяц)", desc: "Мониторинг стабильности, исправление ошибок, мелкие правки контента.", price: "10 000 ₽" }
];

// Ждем полной загрузки DOM-дерева, чтобы элементы гарантированно существовали
document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById('services-grid');
    if (!grid) return;

    // Генерация карточек услуг
    services.forEach(service => {
        const card = document.createElement('div');
        card.className = "service-card";
        card.id = `card-${service.id}`;

        card.innerHTML = `
            <div>
                <div class="flex justify-between items-start mb-3">
                    <h3 class="text-lg font-bold text-gray-900">${service.title}</h3>
                    <input type="checkbox" name="selected_services" value="${service.id}" id="check-${service.id}" class="hidden">
                </div>
                <p class="text-gray-500 text-sm mb-6 leading-relaxed">${service.desc}</p>
            </div>

            <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                <span class="text-lg font-extrabold text-blue-600">${service.price}</span>
                <button type="button" onclick="toggleService('${service.id}')" id="btn-${service.id}" class="select-btn">
                    Выбрать
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
});

// Функция переключения состояния карточки при клике
function toggleService(id) {
    const checkbox = document.getElementById(`check-${id}`);
    const card = document.getElementById(`card-${id}`);
    const btn = document.getElementById(`btn-${id}`);
    const countLabel = document.getElementById('selected-count');

    if (!checkbox || !card || !btn || !countLabel) return;

    checkbox.checked = !checkbox.checked;

    if (checkbox.checked) {
        card.classList.add('is-active');
        btn.classList.add('is-selected');
        btn.innerText = "Выбрано ✓";
    } else {
        card.classList.remove('is-active');
        btn.classList.remove('is-selected');
        btn.innerText = "Выбрать";
    }

    // Подсчет количества выбранных элементов
    const checkedCount = document.querySelectorAll('input[name="selected_services"]:checked').length;
    countLabel.innerText = checkedCount;
}
