// Контекст для генерации звуков (Web Audio API)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playBeep(freq, type = 'sine', duration = 0.08) {
    if (audioCtx.state === 'suspended') return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

// Активируем аудио-контекст при первом клике пользователя по сайту
document.body.addEventListener('click', () => {
    if (audioCtx.state === 'suspended') audioCtx.resume();
});

// 1. Озвучка навигации и элементов интерфейса
document.querySelectorAll('.nav-item, .project-card, .action-btn').forEach(element => {
    element.addEventListener('mouseenter', () => playBeep(440, 'triangle', 0.05));
    element.addEventListener('click', () => playBeep(880, 'square', 0.1));
});

// 2. Логика подсветки пунктов меню при скролле (ScrollSpy)
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// 3. Интерактивный терминал (Парсер команд)
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

terminalInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const command = this.value.trim().toLowerCase();

        // Дублируем введенную команду на экран терминала
        const userLine = document.createElement('p');
        userLine.innerHTML = `<span class="text-pink">guest@sys:~#</span> ${this.value}`;
        terminalOutput.appendChild(userLine);

        // Логика обработки команд
        const responseLine = document.createElement('p');
        responseLine.classList.add('output-line');

        if (command === 'help') {
            responseLine.innerHTML = `<span class="text-green">Доступные директивы:</span><br>
            > <b class="text-pink">about</b> - информация о владельце терминала<br>
            > <b class="text-pink">skills</b> - текущий стек технологий<br>
            > <b class="text-pink">clear</b> - очистить экран консоли`;
            playBeep(600, 'sine', 0.15);
        } else if (command === 'about') {
            responseLine.innerText = "[DATA]: Net_Runner — цифровой архитектор, специализирующийся на кибер-дизайне и реактивных скриптах.";
        } else if (command === 'skills') {
            responseLine.innerText = "[DATA]: Эксперт в HTML5, CSS3 (анимации, гриды), JavaScript (ES6+), Web Audio API.";
        } else if (command === 'clear') {
            terminalOutput.innerHTML = '';
            this.value = '';
            return;
        } else if (command === '') {
            return;
        } else {
            responseLine.innerHTML = `<span class="text-pink">[ERROR]: Команда '${command}' не найдена. Введите 'help'</span>`;
            playBeep(150, 'sawtooth', 0.3); // Звук ошибки
        }

        terminalOutput.appendChild(responseLine);

        // Очищаем инпут и автоскроллим терминал вниз
        this.value = '';
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});
