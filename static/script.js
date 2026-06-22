// Генератор звуковых бипов (Web Audio API)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playBeep(freq, type = 'sine', duration = 0.08) {
    if (audioCtx.state === 'suspended') return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

document.body.addEventListener('click', () => {
    if (audioCtx.state === 'suspended') audioCtx.resume();
});

document.querySelectorAll('.nav-item, .project-card, .action-btn').forEach(el => {
    el.addEventListener('mouseenter', () => playBeep(500, 'triangle', 0.04));
    el.addEventListener('click', () => playBeep(900, 'square', 0.08));
});

// Навигация со ScrollSpy
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (pageYOffset >= sec.offsetTop - 180) {
            current = sec.getAttribute('id');
        }
    });
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) item.classList.add('active');
    });
});

// ИНТЕРАКТИВНЫЙ БРИФ-ТЕРМИНАЛ СТУДИИ
const input = document.getElementById('terminal-input');
const output = document.getElementById('terminal-output');

let step = 0; // Этапы опроса при вводе 'order'
let orderData = { type: '', email: '' };

function addLine(text, cssClass = '') {
    const p = document.createElement('p');
    if (cssClass) p.classList.add(cssClass);
    p.innerHTML = text;
    output.appendChild(p);
    output.scrollTop = output.scrollHeight;
}

input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const val = this.value.trim();
        const cmd = val.toLowerCase();

        // Отображаем ввод клиента
        addLine(`<span class="text-pink">client@core:~#</span> ${val}`);
        this.value = '';

        // Если запущен пошаговый опрос (сбор брифа)
        if (step > 0) {
            handleOrderWizard(val);
            return;
        }

        // Основное меню команд
        if (cmd === 'help') {
            addLine(`<span class="text-green">Доступные шлюзы терминала:</span><br>
            > <b class="text-pink">price</b> - моментальный калькулятор стоимости проектов<br>
            > <b class="text-pink">order</b> - инициализация защищенного лога заказа<br>
            > <b class="text-pink">clear</b> - деструктуризация логов (очистить экран)`);
            playBeep(600, 'sine');
        } else if (cmd === 'price') {
            addLine(`<span class="text-blue">[CALCULATOR]: Ориентировочные бюджеты разработки:</span><br>
            1. HighSpeed Landing (Одностраничник) -> от 45,000 руб. (Срок: 5-7 дней)<br>
            2. E-Commerce Core (Магазин/Система) -> от 120,000 руб. (Срок: 20-30 дней)<br>
            <span class="text-green">Введите команда 'order', чтобы начать сборка технического задания.</span>`);
            playBeep(700, 'sine', 0.2);
        } else if (cmd === 'order') {
            step = 1;
            addLine(`<span class="text-blue">[WIZARD]: Инициализация мастера бриф-заказа.</span>`);
            addLine("Шаг 1: Какой тип сайта вам необходим? Введите цифру (<b class='text-green'>1</b> - Лендинг, <b class='text-green'>2</b> - Магазин/Сложный сервис):");
            playBeep(500, 'triangle');
        } else if (cmd === 'clear') {
            output.innerHTML = '';
        } else if (cmd === '') {
            return;
        } else {
            addLine(`<span class="text-pink">[ERROR]: Неверный протокол '${val}'. Наберите 'help' для авторизации команд.</span>`);
            playBeep(200, 'sawtooth', 0.25);
        }
    }
});

// Мастер сбора контактов
function handleOrderWizard(value) {
    if (step === 1) {
        if (value === '1') {
            orderData.type = 'HighSpeed Landing';
            step = 2;
            addLine(`Выбран тариф: <b class="text-green">${orderData.type}</b>`);
            addLine("Шаг 2: Введите ваш контактный Email или Telegram для отправки логов архитектуры:");
            playBeep(500, 'sine');
        } else if (value === '2') {
            orderData.type = 'E-Commerce Core';
            step = 2;
            addLine(`Выбран тариф: <b class="text-green">${orderData.type}</b>`);
            addLine("Шаг 2: Введите ваш контактный Email или Telegram для отправки логов архитектуры:");
            playBeep(500, 'sine');
        } else {
            addLine("<span class="text-pink">[REJECTED]: Ошибка ввода. Введите строго цифру 1 или 2:</span>");
            playBeep(200, 'sawtooth', 0.1);
        }
    } else if (step === 2) {
        if (value.length > 3) {
            orderData.email = value;
            step = 0; // Сброс
            addLine(`<span class="text-green">[SUCCESS]: Пакет данных успешно упакован и отправлен на бэкэнд!</span>`);
            addLine(`[LOG]: Спецификация: ${orderData.type} | Контакт: ${orderData.email}`);
            addLine(`Наш архитектор свяжется с вами в течение 30 минут. Сессия закрыта.`);
            playBeep(880, 'square', 0.3);
        } else {
            addLine("<span class='text-pink'>Ошибка. Поле контакта не может быть пустым. Введите данные:</span>");
        }
    }
}
