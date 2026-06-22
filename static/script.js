// Находим нужные элементы на странице
const card = document.getElementById('card');
const errorText = document.getElementById('error-text');
const rebootBtn = document.getElementById('reboot-btn');

// Синтезатор звука (Web Audio API) — генерирует кибер-звуки без аудиофайлов
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playGlitchSound(frequency, duration, type = 'sawtooth') {
    // Браузеры блокируют звук до первого клика пользователя по экрану
    if (audioCtx.state === 'suspended') return;

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    // Добавляем искажение частоты для эффекта глитча
    oscillator.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + duration);

    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
}

// 1. Эффект при наведении мыши на карточку (короткий глитч-звук)
card.addEventListener('mouseenter', () => {
    playGlitchSound(120, 0.15, 'square');
});

// 2. Логика клика по кнопке «Перезапустить систему»
let isRebooting = false;

rebootBtn.addEventListener('click', () => {
    // Включаем аудиоконтекст, если он был «спящим»
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    if (isRebooting) return; // Защита от повторных кликов
    isRebooting = true;

    // Включаем дикую тряску карточки через CSS класс
    card.classList.add('hacking');

    // Играем жесткий аналоговый звук ошибки
    playGlitchSound(350, 0.8, 'sawtooth');

    // Эффект бегущих матричных цифр вместо "404"
    const chars = "010101#$@%&?";
    let duration = 0;
    const matrixInterval = setInterval(() => {
        let scrambled = "";
        for (let i = 0; i < 3; i++) {
            scrambled += chars[Math.floor(Math.random() * chars.length)];
        }
        errorText.innerText = scrambled;
        errorText.setAttribute('data-text', scrambled); // Обновляем CSS-глитч слои

        // Каждые 100мс подмигиваем звуком
        if (Math.random() > 0.5) playGlitchSound(600, 0.05, 'triangle');
    }, 70);

    // Обратный отсчет на кнопке
    let timeLeft = 3;
    rebootBtn.innerText = `ПЕРЕЗАГРУЗКА ЯДРА (${timeLeft})`;

    const countdownInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            rebootBtn.innerText = `ПЕРЕЗАГРУЗКА ЯДРА (${timeLeft})`;
            playGlitchSound(150, 0.1, 'square');
        } else {
            clearInterval(countdownInterval);
            clearInterval(matrixInterval);

            // Финал: возвращаем всё в норму и мягко обновляем страницу
            rebootBtn.innerText = "СИСТЕМА ВОССТАНОВЛЕНА!";
            errorText.innerText = "200";
            errorText.setAttribute('data-text', "200");
            card.classList.remove('hacking');

            setTimeout(() => {
                location.reload(); // Перезагрузка вкладки
            }, 800);
        }
    }, 1000);
});
