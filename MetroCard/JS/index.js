"use strict";
let staticCardNumber = 1001;
let staticTicketID = 3001;
let staticTravelID = 2001;
class UserDetails {
    constructor(paramUserName, paramPhoneNumber, paramBalance, paramPassword) {
        this.CardNumber = "CMRL" + (staticCardNumber++);
        this.UserName = paramUserName;
        this.UserPhoneNumber = paramPhoneNumber;
        this.Balance = paramBalance;
        this.Password = paramPassword;
    }
}
let CurrentLoggedInUser;
let userArrayList = new Array();
userArrayList.push(new UserDetails("Ravi", 9848812345, 1000, "Ravi"));
userArrayList.push(new UserDetails("Baskaran", 994884321, 1000, "Baskaran"));
class TicketFairDetails {
    constructor(paramfromLocation, paramtoLocation, paramprice) {
        this.TicketID = "TID" + (staticTicketID++);
        this.FromLocation = paramfromLocation;
        this.ToLocation = paramtoLocation;
        this.FairPrice = paramprice;
    }
}
let ticketList = new Array();
ticketList.push(new TicketFairDetails("Airport", "Egmore", 55));
ticketList.push(new TicketFairDetails("Airport", "Koyambedu", 25));
ticketList.push(new TicketFairDetails("Alandur", "Koyambedu", 25));
ticketList.push(new TicketFairDetails("Koyambedu", "Egmore", 32));
ticketList.push(new TicketFairDetails("Vadapalani", "Egmore", 45));
ticketList.push(new TicketFairDetails("Arumbakkam", "Egmore", 25));
ticketList.push(new TicketFairDetails("Vadapalani", "Koyambedu", 25));
ticketList.push(new TicketFairDetails("Arumbakkam", "Koyambedu", 16));
class TravelDetails {
    constructor(paramcard, paramfrom, paramto, paramdate, paramPrice) {
        this.TravelID = "TID" + (staticTravelID++);
        this.CardNumber = paramcard;
        this.FromLocation = paramfrom;
        this.ToLocation = paramto;
        this.TravelDate = paramdate;
        this.Price = paramPrice;
    }
}
let travelList = new Array();
travelList.push(new TravelDetails("CMRL1001", "Airport", "Egmore", new Date(2023, 10, 10), 55));
travelList.push(new TravelDetails("CMRL1001", "Egmore", "Koyambedu", new Date(2023, 10, 10), 32));
travelList.push(new TravelDetails("CMRL1002", "Alandur", "Koyambedu", new Date(2023, 11, 10), 25));
travelList.push(new TravelDetails("CMRL1002", "Egmore", "Thirumanagalam", new Date(2023, 11, 10), 25));
function homesignin() {
    document.getElementById("signinpage").style.display = "block";
    document.getElementById("homepage").style.display = "none";
}
function homesignup() {
    document.getElementById("signuppage").style.display = "block";
    document.getElementById("homepage").style.display = "none";
}
function signUp() {
    let username = document.getElementById("signUpUserName").value;
    let phoneNumber = parseInt(document.getElementById("signUpUserName").value);
    let balance = parseInt(document.getElementById("userBalance").value);
    let user = new UserDetails(username, phoneNumber, balance, ""); //to fill
    alert(`Saved Successfully and your Card Number is ${user.CardNumber}`);
    userArrayList.push();
    document.getElementById("signuppage").style.display = "none";
    document.getElementById("homepage").style.display = "block";
}
function signIn() {
    let userID = document.getElementById("signInUserID").value.toUpperCase();
    let flag = true;
    userArrayList.forEach(element => {
        if (element.CardNumber === userID) {
            CurrentLoggedInUser = element;
            flag = false;
            alert("You Have successfully logged in ! ");
            document.getElementById("loggedInPage").style.display = "flex";
            document.getElementById("signinpage").style.display = "none";
            WelcomePage();
        }
    });
    if (flag) {
        alert("Enter valid Card Number !");
    }
}
function WelcomePage() {
    document.getElementById("WelcomePage").style.display = "block";
    document.getElementById("BalanceCheckPage").style.display = "none";
    document.getElementById("RechargePage").style.display = "none";
    document.getElementById("TravelHistoryPage").style.display = "none";
    document.getElementById("TravelPage").style.display = "none";
    let welcomepage = document.getElementById("WelcomePage");
    welcomepage.innerHTML = `<h1>Welcome ${CurrentLoggedInUser.UserName} !</h1>`;
}
function BalanceCheckPage() {
    document.getElementById("WelcomePage").style.display = "none";
    document.getElementById("BalanceCheckPage").style.display = "block";
    document.getElementById("RechargePage").style.display = "none";
    document.getElementById("TravelHistoryPage").style.display = "none";
    document.getElementById("TravelPage").style.display = "none";
    let balancedetail = document.getElementById("balance");
    balancedetail.innerHTML = `<h2>Your Balance : ${CurrentLoggedInUser.Balance}</h2>`;
}
function RechargePage() {
    document.getElementById("WelcomePage").style.display = "none";
    document.getElementById("BalanceCheckPage").style.display = "none";
    document.getElementById("RechargePage").style.display = "block";
    document.getElementById("TravelHistoryPage").style.display = "none";
    document.getElementById("TravelPage").style.display = "none";
}
function walletrecharge() {
    let amount = parseInt(document.getElementById("rechargeAmount").value);
    if (amount > 0) {
        CurrentLoggedInUser.Balance += amount;
        alert("your recharge has been successfull ! ");
        BalanceCheckPage();
    }
    else {
        alert("enter valid amount ");
    }
}
