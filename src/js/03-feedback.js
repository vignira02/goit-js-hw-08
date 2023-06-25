import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;
const submitButton = document.querySelector('button');
const savedFeedback = JSON.parse(localStorage.getItem('feedback-form-state'));

if (savedFeedback) {
  emailInput.value = savedFeedback.email;
  messageInput.value = savedFeedback.message;
  submitButton.disabled = !(emailInput.value && messageInput.value);
}

form.addEventListener(
  'input',
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

form.addEventListener('submit', event => {
  event.preventDefault();

  console.log({
    email: emailInput.value,
    message: messageInput.value,
  });

  form.reset();
  localStorage.removeItem('feedback-form-state');
  submitButton.disabled = true;
});




