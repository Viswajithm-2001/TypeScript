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
let emailStatus = false;
let passwordStatus = false;
let phonenumberStatus = false;
let nameStatus = false;
let currentUser;
let currentBook;
let editingBookID;
let fineAmount = 0;
//Validating form
function validateUser() {
    let name = document.getElementById("username-field");
    let show = document.getElementById("username-error");
    let regx = /^[a-zA-z]/;
    if (regx.test(name.value)) {
        show.innerHTML = "valid";
        show.style.color = "green";
        nameStatus = true;
    }
    else {
        show.innerHTML = "Please enter a valid email";
        show.style.color = "red";
    }
}
function validateEmail() {
    let email = document.getElementById("email-field");
    let show = document.getElementById("email-error");
    let regx = /^([\w\.-]+)@([\w-]+)\.([a-z])/;
    if (regx.test(email.value)) {
        show.innerHTML = "valid";
        show.style.color = "green";
        emailStatus = true;
    }
    else {
        show.innerHTML = "Please enter a valid email";
        show.style.color = "red";
    }
}
function validatePassword() {
    let password = document.getElementById("password-field");
    let show = document.getElementById("password-error");
    let regx = /\d{5,10}/;
    if (regx.test(password.value)) {
        show.innerHTML = "valid";
        show.style.color = "green";
    }
    else {
        show.innerHTML = "Please enter a valid password";
        show.style.color = "red";
    }
}
function validateConfirmPwd() {
    let confirmpwd = document.getElementById("confirm-password-field");
    let show = document.getElementById("confirm-password-error");
    let password = document.getElementById("password-field");
    if (password.value === confirmpwd.value) {
        show.innerHTML = "valid";
        show.style.color = "green";
        passwordStatus = true;
    }
    else {
        show.innerHTML = "Please enter a valid password";
        show.style.color = "red";
    }
}
function validatePhone() {
    let phone = document.getElementById("phonenumber-field");
    let show = document.getElementById("phonenumber-error");
    let regx = /^[8-9]\d{9}/;
    if (regx.test(phone.value)) {
        show.innerHTML = "valid";
        show.style.color = "green";
        phonenumberStatus = true;
    }
    else {
        show.innerHTML = "Please enter a valid phonenumber";
        show.style.color = "red";
    }
}
function homepage() {
    let homePage = document.getElementById("homepage");
    homePage.style.display = "block";
    let signUpPage = document.getElementById("sign-up");
    signUpPage.style.display = "none";
}
function SignUp() {
    let homePage = document.getElementById("homepage");
    homePage.style.display = "none";
    let signUpPage = document.getElementById("sign-up");
    signUpPage.style.display = "block";
}
function SignIn() {
    let homePage = document.getElementById("homepage");
    homePage.style.display = "none";
    // let signInPage=document.getElementById("sign-in") as HTMLDivElement;
    // signInPage.style.display="block";
    document.getElementById("sign-in").style.display = "block";
    renderUser();
}
function renderUser() {
    return __awaiter(this, void 0, void 0, function* () {
        let userTable = document.getElementById("user-table");
        userTable.innerHTML = "";
        const users = yield fetchUser();
        users.forEach((list) => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${list.userName}</td>
            <td>${list.mailID}</td>
            <td>${list.mobileNumber}</td>
            <td>${list.gender}</td>
            <td>${list.department}</td>
            `;
            userTable.appendChild(row);
        });
    });
}
//Adding NEW USER in Sign in
function SignUpSubmit() {
    if (emailStatus == true && phonenumberStatus == true && passwordStatus == true && nameStatus == true) {
        let genderValue;
        let UserName = document.getElementById("username-field");
        let email = document.getElementById("email-field");
        let phoneNumber = document.getElementById("phonenumber-field");
        let pwd = document.getElementById("confirm-password-field");
        let male = document.getElementById("male");
        let female = document.getElementById("male");
        if (male.checked == true) {
            genderValue = male.value;
            console.log(genderValue);
        }
        if (female.checked == true) {
            genderValue = female.value;
        }
        let department = document.getElementById("department");
        let select = department.selectedIndex;
        let opt = department.options[select];
        const newuser = {
            userID: undefined,
            userName: UserName.value,
            gender: genderValue,
            department: opt.value,
            mobileNumber: phoneNumber.value,
            mailID: email.value,
            balance: 0,
            password: pwd.value
        };
        addUser(newuser);
        homepage();
    }
}
//SIGNIN page
function SignInSubmit() {
    return __awaiter(this, void 0, void 0, function* () {
        let userEmail = document.getElementById("useremail-field1");
        let userpwd = document.getElementById("password-field1");
        let flag = true;
        const users = yield fetchUser();
        users.forEach(list => {
            if (list.mailID == userEmail.value && list.password == userpwd.value) {
                flag = false;
                currentUser = list;
                navbar();
                alert("Successfully Sign-in");
            }
        });
        if (flag) {
            alert("Invalid Data");
        }
    });
}
function navbar() {
    let signInPage = document.getElementById("sign-in");
    signInPage.style.display = "none";
    document.getElementById("navbar").style.display = "block";
    let showUser = document.getElementById("showUser");
    showUser.innerHTML = `Welcome ${currentUser.userName} to menu page`;
}
function bookDetails() {
    document.getElementById("book-details").style.display = "block";
    document.getElementById("borrow-book").style.display = "none";
    document.getElementById("borrow-histroy").style.display = "none";
    document.getElementById("return-book").style.display = "none";
    document.getElementById("recharge").style.display = "none";
    document.getElementById("top-up").style.display = "none";
    renderBook();
}
function adds() {
    document.getElementById("add-book").style.display = "block";
}
function addsBook() {
    let BookName = document.getElementById("book-name");
    let AuthorName = document.getElementById("author-name");
    let BookCount = document.getElementById("book-count");
    const newBook = {
        bookID: undefined,
        bookName: BookName.value,
        authorName: AuthorName.value,
        bookCount: Number(BookCount.value),
    };
    BookName.value = "";
    AuthorName.value = "";
    BookCount.value = "";
    addBook(newBook);
}
function borrowBook() {
    document.getElementById("book-details").style.display = "none";
    document.getElementById("borrow-book").style.display = "block";
    document.getElementById("borrow-histroy").style.display = "none";
    document.getElementById("return-book").style.display = "none";
    document.getElementById("recharge").style.display = "none";
    document.getElementById("top-up").style.display = "none";
    renderBookDetails();
}
function renderBookDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        document.getElementById("show-count").style.display = "none";
        const bookTable = document.getElementById("book-details-table");
        bookTable.innerHTML = "";
        const books = yield fetchBook();
        books.forEach(list => {
            const row = document.createElement('tr');
            row.innerHTML = `
               <td>${list.bookID}</td>
               <td>${list.bookName}</td>
               <td>${list.authorName}</td>
               <td>${list.bookCount}</td>
               <td><button onclick="book('${list.bookID}')">Book</button></td>
            `;
            bookTable.appendChild(row);
        });
    });
}
function book(id) {
    document.getElementById("show-count").style.display = "block";
    editingBookID = id;
}
function enter() {
    return __awaiter(this, void 0, void 0, function* () {
        let flag = true;
        let bookCount = document.getElementById("book-count");
        const books = yield fetchBook();
        const borrows = yield fetchBorrow();
        books.forEach(bookList => {
            if (bookList.bookID == editingBookID) {
                currentBook = bookList;
                if (bookList.bookCount >= Number(bookCount.value)) {
                    borrows.forEach(list => {
                        if (list.userID == currentUser.userID) {
                            if (list.borrowedCount == 3) {
                                alert("You have borrowed 3 books already");
                                flag = false;
                            }
                            else if (Number(bookCount.value) > 3 && list.borrowedCount > 3) {
                                alert(`You can have maximum of 3 borrowed books.Your already borrowed books count is ${list.borrowedCount} and requested Count ${bookCount.value}, which exceed 3`);
                                flag = false;
                            }
                        }
                    });
                    if (flag) {
                        const newBorrow = {
                            borrowID: undefined,
                            bookID: editingBookID,
                            userID: currentUser.userID,
                            borrowedDate: new Date(),
                            borrowedCount: Number(bookCount.value),
                            status: "Borrowed",
                            fineAmount: 0
                        };
                        addBorrow(newBorrow);
                        bookList.bookCount -= Number(bookCount.value);
                        updateBook(bookList.bookID, bookList);
                        alert("Book Borrow Successfully..");
                        renderBookDetails();
                    }
                }
                else {
                    alert("Book are not avaiable for selected count");
                    borrows.forEach(borrowList => {
                        if (borrowList.bookID == editingBookID) {
                            let result = new Date(borrowList.borrowedDate);
                            result.setDate(result.getDate() + 15);
                            const strDate = String(result);
                            const avaiableDate = strDate.split("T")[0].split("-").reverse().join("/");
                            alert(`The book will be aviable on ${avaiableDate}`);
                        }
                    });
                }
            }
        });
    });
}
function BorrwedHistroy() {
    document.getElementById("book-details").style.display = "none";
    document.getElementById("borrow-book").style.display = "none";
    document.getElementById("borrow-histroy").style.display = "block";
    document.getElementById("return-book").style.display = "none";
    document.getElementById("recharge").style.display = "none";
    document.getElementById("top-up").style.display = "none";
    renderBorrowHistroy();
}
function renderBorrowHistroy() {
    return __awaiter(this, void 0, void 0, function* () {
        const borrowtable = document.getElementById("borrow-histroy-table");
        borrowtable.innerHTML = "";
        const borrows = yield fetchBorrow();
        borrows.forEach(list => {
            const row = document.createElement('tr');
            row.innerHTML = `
               <td>${list.borrowID}</td>
               <td>${list.bookID}</td>
               <td>${list.userID}</td>
               <td>${list.borrowedDate.split("T")[0].split("-").reverse().join("/")}</td>
               <td>${list.borrowedCount}</td>
               <td>${list.status}</td>
               <td>${list.fineAmount}</td>
                  `;
            borrowtable.appendChild(row);
        });
    });
}
function returnBook() {
    document.getElementById("book-details").style.display = "none";
    document.getElementById("borrow-book").style.display = "none";
    document.getElementById("borrow-histroy").style.display = "none";
    document.getElementById("return-book").style.display = "block";
    document.getElementById("recharge").style.display = "none";
    document.getElementById("top-up").style.display = "none";
    renderBorrow();
}
function renderBorrow() {
    return __awaiter(this, void 0, void 0, function* () {
        const borrowedtable = document.getElementById("borrowed-histroy-table");
        borrowedtable.innerHTML = "";
        const borrows = yield fetchBorrow();
        borrows.forEach(list => {
            if (currentUser.userID == list.userID && list.status == "Borrowed") {
                let currentDate = new Date();
                let borrowDate = new Date(list.borrowedDate);
                let result = new Date(list.borrowedDate);
                result.setDate(result.getDate() + 15);
                let diff = Math.abs(currentDate.getTime() - borrowDate.getTime());
                let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
                //console.log(diffDays);
                if (diffDays > 15) {
                    fineAmount = (diffDays * 1) - 15;
                }
                const year = result.getFullYear();
                const month = result.getMonth() + 1;
                const date = result.getDate();
                const returnDate = `${date}/${month}/${year}`;
                console.log(returnDate);
                const row = document.createElement('tr');
                row.innerHTML = `
               <td>${list.borrowID}</td>
               <td>${list.bookID}</td>
               <td>${list.userID}</td>
               <td>${list.borrowedDate.split("T")[0].split("-").reverse().join("/")}</td>
               <td>${list.borrowedCount}</td>
               <td>${list.status}</td>
               <td>${list.fineAmount}</td>
               <td>${returnDate}</td>
               <td>${fineAmount}</td>
               <td><button onclick="returnBorrow('${list.borrowID}')">Return</button></td>
                `;
                borrowedtable.appendChild(row);
            }
        });
    });
}
function returnBorrow(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let userBorrowID = id;
        let newdiffDays = 0;
        const borrows = yield fetchBorrow();
        borrows.forEach(list => {
            if (currentUser.userID == list.userID && list.status == "Borrowed") {
                let currentDate = new Date();
                let borrowDate = new Date(list.borrowedDate);
                let result = new Date(list.borrowedDate);
                result.setDate(result.getDate() + 15);
                let diff = Math.abs(currentDate.getTime() - borrowDate.getTime());
                newdiffDays = Math.ceil(diff / (1000 * 3600 * 24));
            }
        });
        if (newdiffDays > 15) {
            if (currentUser.balance >= fineAmount) {
                borrows.forEach(list => {
                    if (list.borrowID == userBorrowID) {
                        let borrowUpdate = {
                            borrowID: userBorrowID,
                            bookID: list.bookID,
                            userID: currentUser.userID,
                            borrowedDate: list.borrowedDate,
                            borrowedCount: list.borrowedCount,
                            status: "Returned",
                            fineAmount: fineAmount
                        };
                        updateBorrow(userBorrowID, borrowUpdate);
                        alert("Book Returned successfully after paid fine amount..");
                        renderBorrow();
                        currentUser.balance -= fineAmount;
                        updateUser(currentUser.userID, currentUser);
                        currentBook.bookCount += list.borrowedCount;
                        updateBook(editingBookID, currentBook);
                    }
                });
            }
            else {
                alert("Insufficient balance to pay amount");
            }
        }
        else {
            borrows.forEach(list => {
                if (list.borrowID == userBorrowID) {
                    let borrowUpdate = {
                        borrowID: userBorrowID,
                        bookID: list.bookID,
                        userID: currentUser.userID,
                        borrowedDate: list.borrowedDate,
                        borrowedCount: list.borrowedCount,
                        status: "Returned",
                        fineAmount: 0
                    };
                    updateBorrow(userBorrowID, borrowUpdate);
                    alert("Book Returned successfully ..");
                    renderBorrow();
                    currentBook.bookCount += list.borrowedCount;
                    updateBook(editingBookID, currentBook);
                }
            });
        }
    });
}
function recharge() {
    document.getElementById("book-details").style.display = "none";
    document.getElementById("borrow-book").style.display = "none";
    document.getElementById("borrow-histroy").style.display = "none";
    document.getElementById("return-book").style.display = "none";
    document.getElementById("recharge").style.display = "block";
    document.getElementById("top-up").style.display = "none";
}
function amount() {
    let rechargeAmount = document.getElementById("recharge-amount");
    currentUser.balance += Number(rechargeAmount.value);
    alert(`Amount ${rechargeAmount.value} added to your balance`);
    updateUser(currentUser.userID, currentUser);
}
function showBalance() {
    document.getElementById("book-details").style.display = "none";
    document.getElementById("borrow-book").style.display = "none";
    document.getElementById("borrow-histroy").style.display = "none";
    document.getElementById("return-book").style.display = "none";
    document.getElementById("recharge").style.display = "none";
    document.getElementById("top-up").style.display = "block";
    let wallentBalance = document.getElementById("walletBalance");
    wallentBalance.innerHTML = `The User ${currentUser.userName}'s current balance is ${currentUser.balance} `;
}
//Adding Details
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const respone = yield fetch('http://localhost:5269/api/userdetails', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!respone.ok) {
            throw new Error('Failed to add UserDetails ');
        }
    });
}
function addBook(book) {
    return __awaiter(this, void 0, void 0, function* () {
        const respone = yield fetch('http://localhost:5269/api/bookdetails', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        if (!respone.ok) {
            throw new Error('Failed to add bookDetails ');
        }
        renderBook();
    });
}
function addBorrow(borrow) {
    return __awaiter(this, void 0, void 0, function* () {
        const respone = yield fetch('http://localhost:5269/api/borrowdetails', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(borrow)
        });
        if (!respone.ok) {
            throw new Error('Failed to add borrowDetails ');
        }
    });
}
function fetchUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiURL = `http://localhost:5269/api/userdetails`;
        const response = yield fetch(apiURL);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return yield response.json();
    });
}
function fetchBook() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiURL = `http://localhost:5269/api/bookdetails`;
        const response = yield fetch(apiURL);
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        return yield response.json();
    });
}
function fetchBorrow() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiURL = `http://localhost:5269/api/borrowdetails`;
        const response = yield fetch(apiURL);
        if (!response.ok) {
            throw new Error('Failed to fetch borrow');
        }
        return yield response.json();
    });
}
function updateBook(id, book) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5269/api/bookdetails/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        if (!response.ok) {
            throw new Error('Failed to Update bookDetails ');
        }
    });
}
function updateBorrow(id, borrow) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5269/api/borrowdetails/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(borrow)
        });
        if (!response.ok) {
            throw new Error('Failed to Update borrowDetails ');
        }
    });
}
function updateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5269/api/userdetails/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to Update borrowDetails ');
        }
    });
}
function renderBook() {
    return __awaiter(this, void 0, void 0, function* () {
        document.getElementById("add-book").style.display = "none";
        const bookTable = document.getElementById("book-table");
        bookTable.innerHTML = "";
        const books = yield fetchBook();
        books.forEach(list => {
            const row = document.createElement('tr');
            row.innerHTML = `
               <td>${list.bookID}</td>
               <td>${list.bookName}</td>
               <td>${list.authorName}</td>
               <td>${list.bookCount}</td>
            `;
            bookTable.appendChild(row);
        });
    });
}
