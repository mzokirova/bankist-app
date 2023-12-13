'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
  ],
  currency: 'EUR',
  locale:'pt-PT',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2019-11-18T21:31:17.178Z',
  ],
  currency: 'USD',
  locale: 'en-US'
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
  ],
  currency: 'USD',
  locale: 'en-US'
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT'
};

const account5 = {
  owner: 'Mashhura Zokirova',
  movements: [400, 2000, 500, 20, 890,349],
  interestRate: 2,
  pin: 7777,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
  ],
  currency: 'UZS',
  locale: 'uz-UZ',
};

const accounts = [account1, account2, account3, account4,account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formatMovementsDate = function (date,locale) {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  
  return new Intl.DateTimeFormat(locale).format(date);
  
}
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
}
const displayMovements = function (acc,sort= false) {
  containerMovements.innerHTML = ''
  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;


  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
 

    const displayDate = formatMovementsDate(date,acc.locale);

    // const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);
 

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
               <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov}</div>
    </div>
        `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  })
}
// displayMovements(account1.movements);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const createUsernames = function (accs) {

  accs.forEach(function (acc) {
     acc.username= acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0]).join("");
    
  })
  
};
createUsernames(accounts);

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
      
    }
    time--;
  }
  
  
  let time = 300;
  
  tick();
  const timer = setInterval(tick, 1000);
  return timer;

  };

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
let currentAccount,timer;

const updateUI = function (acc) {
  displayMovements(acc);

  // disply balance
  calcDisplayBalance(acc);


  // display summary
  calcDisplaySummary(acc);
}
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
}

const calcDisplaySummary = function (acc) {
  acc.incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(acc.incomes,acc.locale,acc.currency);
  
  const out = acc.movements.filter(mov => mov < 0)
  .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);
  
  const interest = acc.movements.filter(mov => mov > 0)
  .map(deposit => deposit * acc.interestRate / 100)
  .filter((int, i, arr) => {
    return int >= 1;
  })
  .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
}

// Fake Always logged In
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;
// const now = new Date();

// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'long',
//   year: 'numeric',
//   weekday:'long',
// }
// const locale = navigator.language;
// labelDate.textContent = new Intl.DateTimeFormat(locale,options).format(now);


// event handler
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  if (currentAccount?.pin === +inputLoginPin.value) {
    // display ui message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;


    // create curren date
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      
    }
    
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);
    // clear input fiels
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    if (timer) clearInterval(timer);
    timer=startLogOutTimer();

    // update ui
    updateUI(currentAccount);
  
  }
});


btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Math.floor(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value='';

    if (amount > 0 &&
      receiverAcc &&
      currentAccount.balance >= amount &&
      receiverAcc?.username !== currentAccount.username)
    {
      // transfer
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);

       
      // add transfer date
      currentAccount.movementsDates.push(new Date().toISOString());
      receiverAcc.movementsDates.push(new Date().toISOString());
      updateUI(currentAccount);
      // reset timer
      clearInterval(timer);
      timer = startLogOutTimer();

    }
  
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      
      //add movement
      currentAccount.movements.push(amount);
      // add transfer dtae
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUI(currentAccount);
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});


btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  
  if (inputCloseUsername.value === currentAccount.username && +(inputClosePin.value) === currentAccount.pin) {
    
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    // delete
    accounts.splice(index, 1);
    // hide ui
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
})

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);



/////////////////////////////////////////////////
const eurToUsd = 1.1;

const movementsUSD = movements.map(mov=>mov*eurToUsd);

const movementsUSDfor = []
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);

const movementsDescriptions = movements.map(
  (mov, i) =>
  `Movement ${i+1}: You ${mov>0 ? 'deposited' :'withdrew'} ${Math.abs(mov)}`
);


const deposits = movements.filter(function (mov) {
  return mov > 0;
});
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);

const withdrawals = movements.filter(mov => mov < 0);

// accumulator -> SNOWBALL

// maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov)
    return acc;
  else
    return mov;
}, movements[0]);
// pipeline
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    return mov * eurToUsd;
})
  // .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);




