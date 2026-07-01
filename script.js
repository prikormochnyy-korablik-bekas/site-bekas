// ===== 1. ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК =====
function openTab(tabName) {
    // Скрываем все вкладки
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Убираем активный класс у всех кнопок
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Показываем нужную вкладку
    const targetTab = document.getElementById('tab-' + tabName);
    if (targetTab) {
        targetTab.classList.add('active');
    }

    // Активируем кнопку
    buttons.forEach(btn => {
        if (btn.textContent.includes('Главная') && tabName === 'home') btn.classList.add('active');
        if (btn.textContent.includes('Заказать') && tabName === 'order') btn.classList.add('active');
        if (btn.textContent.includes('Контакты') && tabName === 'contacts') btn.classList.add('active');
    });

    // При переходе на вкладку заказа обновляем итог
    if (tabName === 'order') {
        updateTotal();
    }
}

// ===== 2. КАЛЬКУЛЯТОР КОМПЛЕКТАЦИИ =====
function updateTotal() {
    const checkboxes = document.querySelectorAll('.option-check');
    let total = 0;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            total += parseInt(checkbox.dataset.price);
        }
    });

    // Форматируем число с пробелами
    const formattedTotal = total.toLocaleString('ru-RU');
    document.getElementById('totalPrice').textContent = formattedTotal + ' ₽';
}

// ===== 3. ОТПРАВКА ЗАЯВКИ =====
function submitOrder() {
    const checkboxes = document.querySelectorAll('.option-check:checked');
    
    if (checkboxes.length === 0) {
        alert('⚠️ Выберите хотя бы одну опцию!');
        return;
    }

    // Собираем список выбранных опций
    let optionsList = [];
    let total = 0;
    checkboxes.forEach(checkbox => {
        const label = checkbox.closest('label');
        const name = label.querySelector('.option-name').textContent;
        const price = checkbox.dataset.price;
        optionsList.push(`${name} (${price}₽)`);
        total += parseInt(price);
    });

    // Формируем сообщение
    const message = `Здравствуйте! Хочу заказать кораблик со следующими опциями:\n\n${optionsList.join('\n')}\n\n💰 Итоговая цена: ${total.toLocaleString('ru-RU')} ₽\n\nМой номер: +7...`;

    // Отправляем через Telegram (если настроен бот) или просто показываем
    alert(`✅ Заявка отправлена!\n\n${message}\n\nСкопируйте это сообщение и отправьте нам в Telegram или WhatsApp.`);

    // Альтернатива: открыть WhatsApp с готовым сообщением
    // const phone = '79158706979';
    // const encodedMessage = encodeURIComponent(message);
    // window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
}

// ===== 4. ПРИВЕТСТВИЕ ПРИ ЗАГРУЗКЕ =====
window.onload = function() {
    console.log('🚤 КорабликPRO загружен!');
    
    // Если на странице есть видео — автозапуск не делаем, ждём клика пользователя
    // (браузеры блокируют автовоспроизведение)
};

// ===== 5. ДОПОЛНИТЕЛЬНО: ПАУЗА ДЛЯ СЛАЙДЕРА ПРИ НАВЕДЕНИИ =====
// Позволяет остановить слайдер при наведении мыши
const sliderTrack = document.getElementById('sliderTrack');
if (sliderTrack) {
    sliderTrack.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    sliderTrack.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
}