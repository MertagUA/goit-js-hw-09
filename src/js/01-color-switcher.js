function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const DELAY = 1000;
let currentColor = null;
let timerId = null;

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
}
const {startBtn, stopBtn} = refs;

stopBtn.disabled = true;

startBtn.addEventListener('click', onStartBtnClick);

stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick(){
    startBtn.disabled = true;
    stopBtn.disabled = false;
    timerId = setInterval(() =>{
        isStarted = true;
        currentColor = getRandomHexColor();
        document.body.style.backgroundColor = currentColor;
    }, DELAY)
}

function onStopBtnClick(){
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(timerId);
}