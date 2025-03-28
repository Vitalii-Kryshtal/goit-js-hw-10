import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'flatpickr/dist/flatpickr.min.css';

let userSelectedDate;
const dateInput = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('button[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
buttonStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topCenter',
        backgroundColor: '#ef4040',
        titleColor: 'white',
        messageColor: 'white',
        iconUrl: 'https://img.icons8.com/ios-filled/50/ffffff/delete-sign.png',
        progressBarColor: '#a94442',
        timeout: 10000,
        close: true,
        closeOnClick: true,
        transitionIn: 'fadeIn',
        transitionOut: 'fadeOut',
      });
    } else {
      buttonStart.disabled = false;
      userSelectedDate = selectedDates[0].getTime();
    }
  },
};

buttonStart.addEventListener('click', startTimer);
let timerInt = null;

function startTimer() {
  if (userSelectedDate > Date.now()) {
    buttonStart.disabled = true;
    dateInput.disabled = true;
    timerInt = setInterval(() => {
      const timeRemainingUnix = userSelectedDate - Date.now();
      if (timeRemainingUnix <= 0) {
        clearInterval(timerInt);
        dateInput.disabled = false;
        return;
      }
      const timeRemaining = convertMs(timeRemainingUnix);
      days.textContent = timeRemaining.days;
      hours.textContent = timeRemaining.hours;
      minutes.textContent = timeRemaining.minutes;
      seconds.textContent = timeRemaining.seconds;
    }, 1000);
  } else {
    clearInterval(timerInt);
    dateInput.disabled = false;
    days.textContent = '00';
    hours.textContent = '00';
    minutes.textContent = '00';
    seconds.textContent = '00';
    return;
  }
}

const getDate = new flatpickr(dateInput, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  // returning remaining time using function addLeadingZero to make XX format of value
  return {
    days: addLeadingZero(days),
    hours: addLeadingZero(hours),
    minutes: addLeadingZero(minutes),
    seconds: addLeadingZero(seconds),
  };
}

function addLeadingZero(value) {
  return (value = String(value).padStart(2, '0'));
}
