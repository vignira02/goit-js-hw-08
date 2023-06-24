// Імпорт функції "throttle" з бібліотеки lodash. Функція "throttle" забезпечує обмеження
// виконання функції не більше ніж раз в заданий проміжок часу.
import throttle from 'lodash.throttle';

// Знаходимо на сторінці форму, її елементи та кнопку відправки за допомогою селекторів
const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;
const submitButton = document.querySelector('button');

// Зчитуємо збережений стан форми з localStorage та перетворюємо його з JSON формату в об'єкт
const savedFeedback = JSON.parse(localStorage.getItem('feedback-form-state'));

// Якщо в localStorage було збережено стан форми, то заповнюємо поля форми збереженими даними
if (savedFeedback) {
  emailInput.value = savedFeedback.email;
  messageInput.value = savedFeedback.message;
  // Якщо обидва поля форми заповнені, то кнопка відправки стане активною
  submitButton.disabled = !(emailInput.value && messageInput.value);
}

// Прослуховуємо зміни в полях форми
form.addEventListener(
  'input',
  // Використовуємо "throttle", щоб зменшити кількість запитів до localStorage.
  // Зберігаємо в localStorage поточний стан форми щоразу коли користувач вносить зміни в поля форми.
  // Якщо хоч одне поле порожнє, кнопка відправки форми буде відключена.
  throttle(() => {
    localStorage.setItem(
      'feedback-form-state',
      JSON.stringify({
        email: emailInput.value,
        message: messageInput.value,
      })
    );

    submitButton.disabled = !(emailInput.value && messageInput.value);
  }, 500)
);

// Прослуховуємо подію "submit" форми
form.addEventListener('submit', event => {
  // Попереджаємо перезавантаження сторінки
  event.preventDefault();

  // Виводимо в консоль дані форми
  console.log({
    email: emailInput.value,
    message: messageInput.value,
  });

  // Очищаємо форму
  form.reset();
  // Видаляємо стан форми з localStorage
  localStorage.removeItem('feedback-form-state');
  // Відключаємо кнопку відправки
  submitButton.disabled = true;
});




