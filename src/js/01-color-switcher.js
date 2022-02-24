function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyEl = document.body;
const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
buttonStop.setAttribute('disabled', 'disabled');
let timerId = null;

buttonStart.addEventListener('click', onClickStartButton);
buttonStop.addEventListener('click', onClickStopButton);

function onClickStartButton() {
  timerId = setInterval(changeColor, 1000);
  buttonStart.setAttribute('disabled', 'disabled');
  buttonStop.removeAttribute('disabled', 'disabled');
}

function onClickStopButton() {
  buttonStop.setAttribute('disabled', 'disabled');
  buttonStart.removeAttribute('disabled', 'actived');
  clearInterval(timerId);
}
const changeColor = () => {
  bodyEl.style.backgroundColor = getRandomHexColor();
};
