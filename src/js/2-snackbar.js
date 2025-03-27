const head = document.querySelector('head');
const monseratFontLinks = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>;`;
head.insertAdjacentHTML('beforeEnd', monseratFontLinks);

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.classList.add('task2-form');
const input = form.elements.delay;
input.classList.add('task2-input');
const labels = document.querySelectorAll('label');
for (let label of labels) {
  label.classList.add('task2-label');
}
labels[0].classList.add('task2-delay-label');
const radioBtn = document.querySelectorAll('[type="radio"]');
for (let btn of radioBtn) {
  btn.classList.add('task2-radio-btn');
}
const legend = document.querySelector('legend');
legend.classList.add('task2-legend');
const fulfilled = document.querySelector('[value="fulfilled"]');
const rejected = document.querySelector('[value="rejected"]');
const btnCreate = document.querySelector('button');
btnCreate.classList.add('task2-create-btn', 'button');

const promiseParams = {
  delay: '',
  state: null,
};

input.addEventListener('input', () => {
  if (isNaN(input.value) || Number(input.value) < 0) {
    iziToast.warning({
      title: 'Caution',
      message: `Please enter a valid delay value`,
      position: 'topCenter',
    });
    promiseParams.delay = '';
    return;
  }
  promiseParams.delay = Number(input.value);
});

btnCreate.addEventListener('click', event => {
  event.preventDefault();
  if (fulfilled.checked && promiseParams.delay !== '') {
    promiseParams.state = true;
  } else if (rejected.checked && promiseParams.delay !== '') {
    promiseParams.state = false;
  } else {
    iziToast.warning({
      title: 'Caution',
      message: `You forgot to chose parameters`,
      position: 'topCenter',
    });
    return;
  }
  makePromise(promiseParams)
    .then(value =>
      iziToast.success({
        title: 'OK',
        message: `Fulfilled promise in ${value}ms`,
        position: 'topCenter',
        timeout: 20000,
      })
    )
    .catch(error =>
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${error}ms`,
        position: 'topCenter',
        timeout: 20000,
      })
    );
});

function makePromise({ delay, state }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
