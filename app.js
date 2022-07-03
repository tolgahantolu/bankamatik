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

const btnLogin = document.querySelector(".navigation__icon");

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

////////////////////////////////// EVENT HANDLERS
let currentAcc;
btnLogin.addEventListener("click", () => {
  //find current account
  currentAcc = accounts.find((acc) => {
    return acc.username === inputUsername.value;
  });

  if (currentAcc?.password === Number(inputPassword.value)) {
    // display ui
    appContainer.style.opacity = 1;

    //clear inputs
    inputUsername.value = inputPassword.value = "";
  }
});
