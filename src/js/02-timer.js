import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  seconds: document.querySelector('[data-seconds]'),
  minutes: document.querySelector('[data-minutes]'),
  hours: document.querySelector('[data-hours]'),
  days: document.querySelector('[data-days]'),
  buttonStart: document.querySelector('[data-start]'),
  inputEl: document.querySelector('#datetime-picker'),
};

let selectedDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate.getTime() >= options.defaultDate.getTime()) {
      refs.buttonStart.removeAttribute('disabled', 'disabled');
    } else {
      Notify.failure('Please choose a date in the future');
      refs.buttonStart.setAttribute('disabled', 'disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

refs.buttonStart.setAttribute('disabled', 'disabled');
refs.buttonStart.addEventListener('click', onClickBtnStart);

function onClickBtnStart(e) {
  refs.buttonStart.setAttribute('disabled', 'disabled');
  refs.inputEl.setAttribute('disabled', 'disabled');
  const timerId = setInterval(() => {
    const currentDate = new Date();
    if (selectedDate.getTime() <= currentDate.getTime()) return clearInterval(timerId);
    const dt = convertMs(selectedDate.getTime() - currentDate.getTime());
    refs.seconds.textContent = addLeadingZero(dt.seconds);
    refs.minutes.textContent = addLeadingZero(dt.minutes);
    refs.hours.textContent = addLeadingZero(dt.hours);
    refs.days.textContent = addLeadingZero(dt.days);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

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

  return { days, hours, minutes, seconds };
}
