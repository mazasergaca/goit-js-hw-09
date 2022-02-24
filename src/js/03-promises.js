import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onClickCreateButton);

function onClickCreateButton(e) {
  e.preventDefault();
  const delayValue = Number(formEl.delay.value);
  const stepValue = Number(formEl.step.value);
  let countPosition = 1;
  let countTotalDelay = delayValue;

  setTimeout(() => {
    createPromise(countPosition, countTotalDelay).then(onMakeOrderSuccess).catch(onMakeOrderError);
    countPosition++;
    countTotalDelay += stepValue;

    const timerId = setInterval(() => {
      if (Number(formEl.amount.value) === countPosition - 1) return clearInterval(timerId);
      createPromise(countPosition, countTotalDelay)
        .then(onMakeOrderSuccess)
        .catch(onMakeOrderError);
      countPosition++;
      countTotalDelay += stepValue;
    }, formEl.step.value);
  }, delayValue);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

function onMakeOrderSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onMakeOrderError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
