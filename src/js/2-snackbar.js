import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const userDelay = event.target.elements.delay.value;
  const checked = form.querySelector('input[name="state"]:checked');
  makePromise({ delay: userDelay, state: checked })
    .then(value => {
      iziToast.success({
        title: 'OK',
        message: `Fulfilled promise in ${value}ms`,
        position: 'topCenter',
        timeout: 20000,
      });
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${error}ms`,
        position: 'topCenter',
        timeout: 20000,
      });
    });
});

function makePromise({ delay, state }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state.value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
