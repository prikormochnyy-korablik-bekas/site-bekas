// ===== 1. Плавная прокрутка к якорям =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== 2. Обработка формы заказа =====
const orderForm = document.querySelector('.order-form');
if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('input[type="text"]').value.trim();
        const phone = this.querySelector('input[type="tel"]').value.trim();

        if (!name || !phone) {
            alert('Пожалуйста, заполните все поля.');
            return;
        }

        // Имитация отправки
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Отправка...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = '✅ Заявка отправлена!';
            btn.style.background = '#28a745';
            this.reset();
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// ===== 3. Кнопка "Бесплатная демонстрация" =====
const demoBtn = document.querySelector('.demo .btn');
if (demoBtn) {
    demoBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Прокрутка к форме заказа
        document.querySelector('#order').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        // Подсветка поля имени
        setTimeout(() => {
            const nameInput = document.querySelector('.order-form input[type="text"]');
            if (nameInput) {
                nameInput.style.borderColor = '#d4a84b';
                nameInput.style.boxShadow = '0 0 0 3px rgba(212,168,75,0.3)';
                setTimeout(() => {
                    nameInput.style.borderColor = '';
                    nameInput.style.boxShadow = '';
                }, 2000);
            }
        }, 500);
    });
}

// ===== 4. Кнопка "Подобрать модель за 1 минуту" (опросник) =====
const quizBtn = document.querySelector('.hero .btn--large');
if (quizBtn) {
    quizBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Имитация опроса из 3 вопросов
        const questions = [
            'Вопрос 1: На каком водоёме планируете рыбачить? (озеро/река/канал)',
            'Вопрос 2: Какая дистанция завоза вам нужна? (до 100м / 100-300м / более 300м)',
            'Вопрос 3: Какой бюджет вы рассматриваете?'
        ];

        let answers = [];
        for (let i = 0; i < questions.length; i++) {
            const answer = prompt(questions[i]);
            if (answer === null) return; // отмена
            answers.push(answer.trim() || 'не указано');
        }

        alert(`✅ Спасибо! На основе ваших ответов:\n1) ${answers[0]}\n2) ${answers[1]}\n3) ${answers[2]}\n\nМенеджер свяжется с вами для подбора модели.`);
        
        // Прокрутка к форме
        document.querySelector('#order').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    });
}

// ===== 5. Кнопка чата (имитация) =====
const chatBtn = document.querySelector('.chat-button');
if (chatBtn) {
    chatBtn.addEventListener('click', function() {
        alert('💬 Свяжитесь с нами:\nWhatsApp: +7 (XXX) XXX-XX-XX\nTelegram: @corved_support\n\nИли напишите в онлайн-чат на сайте.');
    });
}

// ===== 6. Анимация появления элементов при скролле (Intersection Observer) =====
const animateItems = document.querySelectorAll('.advantage-item, .option-item, .step, .model-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

animateItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(25px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(item);
});

// ===== 7. Обработка кликов по опциям (доп. интерактив) =====
document.querySelectorAll('.option-item').forEach(opt => {
    opt.addEventListener('click', function() {
        const text = this.textContent.trim();
        alert(`🔧 Вы выбрали опцию: "${text}"\nДобавьте её в заказ при оформлении.`);
    });
});

// ===== 8. Защита от случайного ухода со страницы =====
let formChanged = false;
document.querySelector('.order-form input[type="text"]')?.addEventListener('input', () => formChanged = true);
document.querySelector('.order-form input[type="tel"]')?.addEventListener('input', () => formChanged = true);

window.addEventListener('beforeunload', (e) => {
    if (formChanged) {
        e.preventDefault();
        e.returnValue = 'У вас есть незаполненная форма. Вы уверены, что хотите уйти?';
    }
});

console.log('✅ Сайт CorveD загружен успешно!');