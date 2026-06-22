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

document.body.addEventListener('click', () => {
    if (audioCtx.state === 'suspended') audioCtx.resume();
});

document.querySelectorAll('.nav-item, .project-card, .action-btn').forEach(element => {
    element.addEventListener('mouseenter', () => playBeep(440, 'triangle', 0.05));
    element.addEventListener('click', () => playBeep(880, 'square', 0.1));
});

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

// БЭКЕНД ПАРСЕР ДЛЯ ТЕРМИНАЛА
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

terminalInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const command = this.value.trim().toLowerCase();

        const userLine = document.createElement('p');
        userLine.innerHTML = `<span class="text-pink">root@backend:~#</span> ${this.value}`;
        terminalOutput.appendChild(userLine);

        const responseLine = document.createElement('p');
        responseLine.classList.add('output-line');

        if (command === 'help') {
            responseLine.innerHTML = `<span class="text-green">Консоль ядра сервера. Доступные команды:</span><br>
            > <b class="text-pink">stack</b> - вывести список технологий серверной части<br>
            > <b class="text-pink">db_status</b> - проверить статус баз данных<br>
            > <b class="text-pink">ping</b> - сделать эхо-запрос к API шлюзу<br>
            > <b class="text-pink">clear</b> - очистить экран логов`;
            playBeep(600, 'sine', 0.15);
        } else if (command === 'stack') {
            responseLine.innerHTML = "[DATA]: Основной стек: Node.js (TypeScript), Python, PostgreSQL, Redis, Docker, REST API, GraphQL, gRPC.";
        } else if (command === 'db_status') {
            responseLine.innerHTML = `<span class="text-green">[SUCCESS]: PostgreSQL: CONNECTED (Latency: 1.2ms)<br>[SUCCESS]: Redis Cache: ACTIVE (Hit Rate: 94.2%)</span>`;
        } else if (command === 'ping') {
            responseLine.innerHTML = "PING api.gateway.local (127.0.0.1) 56(84) bytes of data.<br>64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 <span class='text-green'>time=0.045 ms</span>";
        } else if (command === 'clear') {
            terminalOutput.innerHTML = '';
            this.value = '';
            return;
        } else if (command === '') {
            return;
        } else {
            responseLine.innerHTML = `<span class="text-pink">[ERROR]: Неизвестная системная директива '${command}'. Используйте 'help' для списка логических команд.</span>`;
            playBeep(150, 'sawtooth', 0.3);
        }

        terminalOutput.appendChild(responseLine);
        this.value = '';
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});
