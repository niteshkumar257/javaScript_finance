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
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
//All labels
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

// container dom
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

//all btns
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
// all input's
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


// Dates
const date=new Date();
const day=date.getDate();
const month=date.getMonth()+1;
const year =date.getFullYear();
const hour=date.getHours();
const mintues=date.getMinutes();
// Timer funtion
let time=300;
const setLogOutTime=(time)=>
{
  const countDown=setInterval(()=>
  {
    
    labelTimer.textContent=`${String(Math.floor(time/60)).padStart(2,0)}:${String(time%60).padStart(2,0)}`
    if(time===0)
    {
      clearInterval(countDown);
      containerApp.style.opacity = "0"; 
    }
    time--;
  },1000)
  return countDown;
 
}
labelDate.textContent=`${day}/${month}/${year},${hour}:${mintues}`;
// login 
let currentAccount;
btnLogin.addEventListener(('click'), (e) => {          
  e.preventDefault();   


    //This prevent from submiting the form
  currentAccount = accounts.find((acc) => acc.userName === inputLoginUsername.value)
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
     labelWelcome.textContent = ` Hi ,${currentAccount.owner}`;                       //Welcome message
     containerApp.style.opacity = "100";                                                                      // opacity is changed to 100
     updateUi(currentAccount);                                                                                // update the ui
   }
   if(setLogOutTime(time))
   {
     console.log("Enterd")
clearInterval(setLogOutTime(time));
setLogOutTime(time);
   }
  console.log(setLogOutTime(time));
})

//Transfer
btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();
  const amoutTansfer = Number(inputTransferAmount.value);
  const transferTo=inputTransferTo.value;
  const accountTransfer = accounts.find(acc => acc.userName === transferTo);
  displaytotalValue(currentAccount);
  
  if (amoutTansfer > 0 && Number(currentAccount.balance) > amoutTansfer && accountTransfer.userName !== currentAccount.userName) {
    console.log("Transfer valid");
    currentAccount.movements.push(-amoutTansfer);
    accountTransfer.movements.push(amoutTansfer);
    updateUi(currentAccount);
  }
  else   console.log("Invalid transfer");

 
  inputTransferAmount.value = ' ';
  inputTransferTo.value = ' ';
})


// request loan

btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  const loanAmout =Math.floor(inputLoanAmount.value)
  
  setTimeout(()=>
  {
    if (loanAmout > 0 && currentAccount.movements.some(arr => arr > 0.1 * loanAmout)) {
      console.log("Loan approved");
      currentAccount.movements.push(loanAmout);
    }
    else {
      console.log("Loan is not approved");
    }
  
    updateUi(currentAccount);
   
  },10000)
  
  inputLoanAmount.value ='';
})


// close account
btnClose.addEventListener('click', (e) => {
  e.preventDefault();
  const indexToclose = accounts.findIndex((acc) => acc.userName === currentAccount.userName); // findindes methid is used finally
  accounts.splice(indexToclose, 1);
  containerApp.style.opacity = "0";                                                            // log out command making opacity 0 agian
  inputCloseUsername.value = ' ';
  inputClosePin.value = ' ';

})


// sort array

btnSort.addEventListener('click', () => {

  console.log("sort button is  cliked");
  currentAccount.movements.sort((a, b) => a - b);
  displayMovements(currentAccount.movements);
})



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
function getuserName(user) {
  const userName = user.toLowerCase().split(' ').map((a) => a[0]).join('');
  return userName;
}

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//////////

/// find method in the array





/////////////////////////////////////////////////
////////////////////////////
const displayMovements = function (acc) {
  containerMovements.innerHTML = " ";
  
 acc. movements.forEach(function (movement, i) {
    const type = (movement > 0) ? 'deposit' : 'withdrawal';

    const date=new Date();
    // Important for this file
    const html = `
      <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          
      <div class="movements__date">${date.getMinutes()}</div>
      
      <div class="movements__value">${movement.toFixed(2)}💲</div>
    </div>
   
      `
    containerMovements.insertAdjacentHTML("afterbegin", html);
  })
}
////////
///////////////////////////////
////////////////////  geting user name and adding in to the real objects

accounts.forEach((account) => {
  account.userName = getuserName(account.owner); // This is thw way to create new in objects

})
////////////////////
//////////////////////////// Total value 
const displaytotalValue = function (ac) {
  ac.balance = ac.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${ac.balance.toFixed(2)}💲`
}

/////////////////////////
////////////////////////// Total income
const displaytotalIncome = (movements) => {
  const income = movements.filter((mov) => mov > 0).reduce((acc, arr) => acc + arr, 0)
  labelSumIn.textContent = `${income.toFixed(2)}💲`;
}
/////////////////
//////////////////////////// Total expense
const displaytotalExpense = (movements) => {
  const income = movements.filter((mov) => mov < 0).reduce((acc, arr) => acc + arr, 0);
  labelSumOut.textContent = `${income.toFixed(2)}💲`;
}

///////////////////////////
///////////////////      Total interest
const displaytotalIntesert = (movements) => {
  const interest = movements.filter((mov) => mov > 0).map((depo) => { return (depo * 1.2) / 100 }).reduce((acc, arr, i, a) => acc + arr, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}💲`
}

////////////////////////////////
///////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////

const updateUi = (acc) => {
  displayMovements(acc);
  //display balance

  displaytotalValue(acc);

  // dacc
  displaytotalExpense(acc.movements);
  displaytotalIncome(acc.movements);
  displaytotalIntesert(acc.movements);
}

// total balance of the  users;
const total = accounts.map(acc => acc.movements).flat().reduce((acc, arr) => arr + acc, 0);
console.log(total);
// flatMap
const Total = accounts.flatMap(acc => acc.movements).reduce((acc, arr) => arr + acc, 0);
console.log(Total);

// countdown








