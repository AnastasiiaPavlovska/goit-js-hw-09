import { Notify } from 'notiflix/build/notiflix-notify-aio';

const optNotiflx = {
  timeout: 3000,
  useIcon: false,
};

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function onSubmit(ev) {
  ev.preventDefault();

  if (form.delay.value < 0) {
    Notify.failure('Please enter a number greater than zero for delay.', optNotiflx);
    return; // Зупиняємо виконання функції у разі неправильного значення delay
  }

  if (form.step.value < 0) {
    Notify.failure('Please enter a number greater than zero for step.', optNotiflx);
    return; // Зупиняємо виконання функції у разі неправильного значення step
  }

  if (form.amount.value <= 0) {
    Notify.failure('Please enter a number greater than zero for amount.', optNotiflx);
    return; // Зупиняємо виконання функції у разі неправильного значення amount
  }

  for (
    let i = 1, timeout = Number(form.delay.value);
    i <= Number(form.amount.value);
    i++, timeout += Number(form.step.value)
  ) {
    createPromise(i, timeout)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, optNotiflx);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, optNotiflx);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ position, delay });
      }, delay);
    });
  } else {
    return new Promise(reject => {
      setTimeout(() => {
        reject({ position, delay });
      }, delay);
    });
  }
}
