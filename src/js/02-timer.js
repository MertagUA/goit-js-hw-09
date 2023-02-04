import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    changingBtnAvailability(false);
    if (selectedDates < Date.now()) {
      Notify.failure('Please choose a date in the future');
      changingBtnAvailability(true);
    }
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  
  const hours = Math.floor((ms % day) / hour);
  
  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const refs = {
  input: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  dataDays: document.querySelector('span[data-days]'),
  dataHours: document.querySelector('span[data-hours]'),
  dataMinutes: document.querySelector('span[data-minutes]'),
  dataSeconds: document.querySelector('span[data-seconds]'),
  timer: document.querySelector('.timer'),
}

const { input, startBtn, dataDays, dataHours, dataMinutes, dataSeconds, timer} = refs;

timer.style.display = 'flex';
timer.style.gap = '10px';

changingBtnAvailability(true);

startBtn.addEventListener('click', onStartBtnClick);

let flatpickrCalendar = flatpickr(input, options);
let timerId = null;

function onStartBtnClick() {
  changingBtnAvailability(true);

  timerId = setInterval(OnStartInterval, 1000)
}

function OnStartInterval() {
  const chosenDate = flatpickrCalendar.selectedDates[0];

    const currentDate = Date.now();

    const dateDifference = chosenDate - currentDate;
    
     if (dateDifference < 1000) {
      clearInterval(timerId);
    }
    
    const timeLeft = convertMs(dateDifference);
    changingTimerInterface(timeLeft);
}

function changingTimerInterface({days, hours, minutes, seconds}) {
    dataDays.textContent = addLeadingZero(days);
    dataHours.textContent = addLeadingZero(hours);
    dataMinutes.textContent = addLeadingZero(minutes);
    dataSeconds.textContent = addLeadingZero(seconds);
}
  
function changingBtnAvailability(boolean) {
  startBtn.disabled = boolean;
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}