"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var CurrentUser;
var CurrentTicketID;
var CurrentTicket;
var container = document.getElementById("container");
var clickregister = document.getElementById("register");
var clicklogin = document.getElementById("login");
var navbar = document.getElementById("nav");
let home = document.getElementById("home");
let balance = document.getElementById("showbalance");
let recharge = document.getElementById("recharge");
let travelhistory = document.getElementById("travelhistory");
let travel = document.getElementById("travel");
let travellocation = document.getElementById("travellocation");
let noOfTickets = document.getElementById("noOfTickets");
function ClickRegister() {
    clickregister.style.display = "block";
    clicklogin.style.display = "none";
}
function ClickLogIn() {
    clicklogin.style.display = "block";
    clickregister.style.display = "none";
}
function SubRegister() {
    return __awaiter(this, void 0, void 0, function* () {
        var flag = true;
        var name = document.getElementById("name");
        var pass = document.getElementById("pass");
        var mail = document.getElementById("mail");
        var mobile = Number(document.getElementById("mobile").value);
        let registerinput = yield fetchUserDetails();
        for (var i = 0; i < registerinput.length; i++) {
            if (registerinput[i].emailID == mail.value) {
                flag = false;
                alert("This mail is already exists");
                break;
            }
        }
        if (flag) {
            var user = { cardID: 0, userName: name.value, emailID: mail.value, password: pass.value, phoneNumber: mobile, balance: 0 };
            addUserDetails(user);
            CurrentUser = user;
            alert("Registered Successfully");
            ClickLogIn();
        }
    });
}
function SubLogIn() {
    return __awaiter(this, void 0, void 0, function* () {
        var flag = true;
        var mail2 = document.getElementById("mail2");
        var pass2 = document.getElementById("pass2");
        let logininput = yield fetchUserDetails();
        for (var i = 0; i < logininput.length; i++) {
            if ((logininput[i].emailID == mail2.value) && (logininput[i].password == pass2.value)) {
                flag = false;
                navbar.style.display = "block";
                alert("Logged Successfully");
                container.style.display = "none";
                CurrentUser = logininput[i];
            }
        }
        if (flag) {
            alert("Invalid EmailID and Password");
        }
    });
}
function DisplayNone() {
    home.style.display = "none";
    balance.style.display = "none";
    recharge.style.display = "none";
    travelhistory.style.display = "none";
    travel.style.display = "none";
    travellocation.style.display = "none";
}
function Home() {
    DisplayNone();
    home.style.display = "block";
    home.innerHTML = "Welcome " + CurrentUser.userName;
}
function ShowBalance() {
    return __awaiter(this, void 0, void 0, function* () {
        DisplayNone();
        balance.style.display = "block";
        let userinput = yield fetchUserDetails();
        for (var i = 0; i < userinput.length; i++) {
            if (userinput[i].emailID == CurrentUser.emailID) {
                balance.innerHTML = "Balance: " + CurrentUser.balance;
            }
        }
    });
}
function Recharge() {
    DisplayNone();
    recharge.style.display = "block";
}
function TopUp() {
    return __awaiter(this, void 0, void 0, function* () {
        var amount = document.getElementById("amount");
        let userinput = yield fetchUserDetails();
        for (var i = 0; i < userinput.length; i++) {
            if (userinput[i].emailID == CurrentUser.emailID) {
                balance.innerHTML = "Balance: " + CurrentUser.balance;
                CurrentUser.balance += Number(amount.value);
                updateUser(userinput[i].cardID, CurrentUser);
                alert("Recharged Successfully");
                document.getElementById("amount").value = "";
                ShowBalance();
            }
        }
    });
}
function TravelHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        DisplayNone();
        travelhistory.style.display = "block";
        var table = document.getElementById("table");
        table.innerHTML = "";
        var row = document.createElement("tr");
        row.innerHTML = `<th>TravelID</th>
    <th>CardNumber</th>
    <th>FromLocation</th>
    <th>ToLocation</th>
    <th>Date</th>
    <th>TravelCost</th>`;
        table.appendChild(row);
        let travelinput = yield fetchTravelDetails();
        for (var i = 0; i < travelinput.length; i++) {
            if (travelinput[i].cardID == CurrentUser.cardID) {
                var row1 = document.createElement("tr");
                row1.innerHTML = `<td>${travelinput[i].travelID}</td>
                    <td>${travelinput[i].cardID}</td>
                    <td>${travelinput[i].fromLocation}</td>
                    <td>${travelinput[i].toLocation}</td>
                    <td>${travelinput[i].travelDate.split("T")[0].split("-").reverse().join("/")}</td>
                    <td>${travelinput[i].travelCost}</td>`;
                table.appendChild(row1);
            }
        }
    });
}
function Ticket() {
    return __awaiter(this, void 0, void 0, function* () {
        DisplayNone();
        travel.style.display = "block";
        var table = document.getElementById("table1");
        table.innerHTML = "";
        var row = document.createElement("tr");
        row.innerHTML = `<th>TicketID</th>
    <th>FromLocation</th>
    <th>ToLocation</th>
    <th>Fair</th>
    <th>Book</th>`;
        table.appendChild(row);
        let bookinginput = yield fetchTicketDetails();
        for (var i = 0; i < bookinginput.length; i++) {
            var row1 = document.createElement("tr");
            row1.innerHTML = `<td>${bookinginput[i].ticketID}</td>
            <td>${bookinginput[i].fromLocation}</td>
            <td>${bookinginput[i].toLocation}</td>
            <td>${bookinginput[i].ticketPrice}</td>
            <td><button onclick="Booking(${bookinginput[i].ticketID})">Book</button></td>`;
            table.appendChild(row1);
        }
    });
}
function Booking(TicketID) {
    travellocation.style.display = "block";
    CurrentTicketID = TicketID;
    alert("your id is selected ");
}
function Book() {
    return __awaiter(this, void 0, void 0, function* () {
        var flag = true;
        let bookinginput = yield fetchTicketDetails();
        for (var i = 0; i < bookinginput.length; i++) {
            if ((bookinginput[i].ticketID == CurrentTicketID)) {
                flag = false;
                if ((bookinginput[i].ticketPrice * Number(noOfTickets.value)) <= CurrentUser.balance) {
                    CurrentUser.balance -= ((bookinginput[i].ticketPrice) * Number(noOfTickets.value));
                    var book = {
                        travelID: 0,
                        cardID: CurrentUser.cardID,
                        fromLocation: bookinginput[i].fromLocation,
                        toLocation: bookinginput[i].toLocation,
                        travelDate: new Date(),
                        travelCost: ((bookinginput[i].ticketPrice) * Number(noOfTickets.value))
                    };
                    addTravelDetails(book);
                    updateUser(CurrentUser.cardID, CurrentUser);
                    alert("Ticket Booked Successfully");
                }
                else {
                    alert("Balance is insufficient");
                }
            }
        }
        if (flag) {
            alert("Location doesn't exists");
        }
    });
}
//for API
function fetchUserDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5269/api/userdetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }
        return yield response.json();
    });
}
function fetchTravelDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5269/api/traveldetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch travel');
        }
        return yield response.json();
    });
}
function fetchTicketDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5269/api/ticketdetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch ticket');
        }
        return yield response.json();
    });
}
//for adding
function addUserDetails(User) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5269/api/userdetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(User)
        });
        if (!response.ok) {
            throw new Error('Failed to add User');
        }
    });
}
function addTravelDetails(Travel) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5269/api/traveldetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Travel)
        });
        if (!response.ok) {
            throw new Error('Failed to add Travel');
        }
    });
}
// async function addTicketDetails(Ticket: TicketDetails): Promise<void> {
//   const response = await fetch('http://localhost:5269/api/ticketdetails', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(Ticket)
//   });
//   if (!response.ok) {
//     throw new Error('Failed to add Ticket');
//   }
// }
//for updating
function updateUser(id, User) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5269/api/userdetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(User)
        });
        if (!response.ok) {
            throw new Error('Failed to update contact');
        }
    });
}
