"use strict";

// DUMMY USER ACCOUNTS
const DUMMY_ACC1 = {
  name: "Tolgahan Tolu",
  movements: [200, 300, -750, 180, 45, -35, 1240, -250, 65],
  interestRate: 1.2,
  password: 1111,
};

const DUMMY_ACC2 = {
  name: "Aileen Lipps",
  movements: [552, -50, 3955, 300, -1050, 400, -75, -240, 300],
  interestRate: 1.4,
  password: 2222,
};

const DUMMY_ACC3 = {
  name: "James Luciano",
  movements: [9370, -200, 7200, 300, -2400, 640, -75, -145, 2400],
  interestRate: 1.7,
  password: 3333,
};

const DUMMY_ACC4 = {
  name: "Katherine Patterson",
  movements: [-590, 440, -680, 1275, -45, 75, 160, 850],
  interestRate: 1.0,
  password: 4444,
};

const accounts = [DUMMY_ACC1, DUMMY_ACC2, DUMMY_ACC3, DUMMY_ACC4];

// selecting elements
const inputUsername = document.querySelector(".navigation__input--login");
const inputPassword = document.querySelector(".navigation__input--password");
const inputTransferAmount = document.querySelector(
  ".form__input--amount-transfer"
);
const inputTransferTo = document.querySelector(".form__input--to");
const inputLoanAmount = document.querySelector(".form__input--amount-loan");

const labelBalance = document.querySelector(".balance__value");
const labelSummaryIn = document.querySelector(".summary__value--in");
const labelSummaryOut = document.querySelector(".summary__value--out");
const labelSummaryInt = document.querySelector(".summary__value--interest");

const btnLogin = document.querySelector(".navigation__icon");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");

const movementsContainer = document.querySelector(".movements");
const appContainer = document.querySelector(".app");

////////////////////////////////// FUNCTIONS
// create username
const createUsername = (accs) => {
  accs.forEach((acc) => {
    acc.username = acc.name
      .toLowerCase()
      .split(" ")
      .map((uname) => uname[0])
      .join("");
  });
};
createUsername(accounts);

const displayBalance = (account) => {
  account.balance = account.movements.reduce((acc, mov) => {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `$${account.balance}`;
};

const displayMovements = (movements) => {
  movementsContainer.innerHTML = "";

  movements.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
		<div class="movements__row">
			<div class="movements__type movements__type--${type}">
				${i + 1} ${type}
			</div>
			<div class="movements__date">
				28/06/2022
			</div>
			<div class="movements__value">$${mov}</div>
		</div>
	`;

    movementsContainer.insertAdjacentHTML("afterbegin", html);
  });
};

const displaySummary = (account) => {
  const incomes = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSummaryIn.textContent = `$${incomes}`;

  const out = account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSummaryOut.textContent = `$${Math.abs(out)}`;

  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((int) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSummaryInt.textContent = `$${interest}`;
};

////////////////////////////////// EVENT HANDLERS
let currentAcc;
btnLogin.addEventListener("click", () => {
  //find current account
  currentAcc = accounts.find((acc) => {
    return acc.username === inputUsername.value;
  });

  if (currentAcc?.password === +inputPassword.value) {
    // display ui
    appContainer.style.opacity = 1;

    //clear inputs
    inputUsername.value = inputPassword.value = "";
  }

  //  calc and display balance
  displayBalance(currentAcc);

  // display movements
  displayMovements(currentAcc.movements);

  //  calc and display summary
  displaySummary(currentAcc);
});

btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();

  const amount = +inputTransferAmount.value;
  const receiverAccount = accounts.find((acc) => {
    return acc.username === inputTransferTo.value;
  });

  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    receiverAccount &&
    amount > 0 &&
    currentAcc.balance >= amount &&
    receiverAccount?.username !== currentAcc.username
  ) {
    currentAcc.movements.push(-amount);
    receiverAccount.movements.push(amount);

    //  calc and display balance
    displayBalance(currentAcc);

    // display movements
    displayMovements(currentAcc.movements);

    //  calc and display summary
    displaySummary(currentAcc);
  }
});

btnLoan.addEventListener("click", (e) => {
  e.preventDefault();

  const loan = +inputLoanAmount.value;

  if (loan > 0 && currentAcc.movements.some((mov) => mov >= loan * 0.1)) {
    currentAcc.movements.push(loan);

    //  calc and display balance
    displayBalance(currentAcc);

    // display movements
    displayMovements(currentAcc.movements);

    //  calc and display summary
    displaySummary(currentAcc);
  }

  inputLoanAmount.value = "";
});
