// 1. Приветствие при загрузке страницы
alert('Добро пожаловать на мой первый сайт! 🎉');

// 2. Кнопка, которая что-то делает
document.getElementById('showAlert').addEventListener('click', function() {
    alert('Спасибо, что нажали! Я обязательно отвечу на ваше письмо 😊');
});

// 3. Плавная прокрутка по ссылкам в меню (для красоты)
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // отключаем стандартный переход
        const targetId = this.getAttribute('href'); // получаем #about
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 4. Эффект печати текста в заголовке (дополнительная фишка)
const heroTitle = document.querySelector('.hero h1');
const originalText = heroTitle.textContent;
heroTitle.textContent = '';

let index = 0;
function typeWriter() {
    if (index < originalText.length) {
        heroTitle.textContent += originalText.charAt(index);
        index++;
        setTimeout(typeWriter, 100); // скорость печати
    }
}
// Запускаем эффект через 1 секунду после загрузки
setTimeout(typeWriter, 1000);