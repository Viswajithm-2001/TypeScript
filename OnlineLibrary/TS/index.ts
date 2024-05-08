let emailStatus: boolean = false;
let passwordStatus: boolean = false;
let phonenumberStatus: boolean = false;
let nameStatus: boolean = false;

let currentUser: UserDetails;
let currentBook: BookDetails;
let editingBookID: number;

let fineAmount:number=0;

//Creating Interface

interface UserDetails {
    userID: any;
    userName: string;
    gender: string;
    department: string;
    mobileNumber: string;
    mailID: string;
    balance: number;
    password: string;
}



interface BookDetails {
    bookID: any;
    bookName: string;
    authorName: string;
    bookCount: number;
}



interface BorrowDetails {
    borrowID: any;
    bookID: number;
    userID: number;
    borrowedDate: any;
    borrowedCount: number;
    status: string;
    fineAmount: number;
}



//Validating form
function validateUser() {
    let name = document.getElementById("username-field") as HTMLInputElement;
    let show = document.getElementById("username-error") as HTMLInputElement;
    let regx = /^[a-zA-z]/;
    if (regx.test(name.value)) {
        show.innerHTML = "valid";
        show.style.color = "green"
        nameStatus = true;
    }
    else {
        show.innerHTML = "Please enter a valid email"
        show.style.color = "red";
    }
}

function validateEmail() {
    let email = document.getElementById("email-field") as HTMLInputElement;
    let show = document.getElementById("email-error") as HTMLInputElement;
    let regx = /^([\w\.-]+)@([\w-]+)\.([a-z])/;
    if (regx.test(email.value)) {
        show.innerHTML = "valid";
        show.style.color = "green"
        emailStatus = true;
    }
    else {
        show.innerHTML = "Please enter a valid email"
        show.style.color = "red";
    }
}

function validatePassword() {
    let password = document.getElementById("password-field") as HTMLInputElement;
    let show = document.getElementById("password-error") as HTMLInputElement;
    let regx = /\d{5,10}/;
    if (regx.test(password.value)) {
        show.innerHTML = "valid";
        show.style.color = "green"

    }
    else {
        show.innerHTML = "Please enter a valid password"
        show.style.color = "red";
    }
}

function validateConfirmPwd() {
    let confirmpwd = document.getElementById("confirm-password-field") as HTMLInputElement
    let show = document.getElementById("confirm-password-error") as HTMLInputElement
    let password = document.getElementById("password-field") as HTMLInputElement;

    if (password.value === confirmpwd.value) {
        show.innerHTML = "valid";
        show.style.color = "green"
        passwordStatus = true
    }
    else {
        show.innerHTML = "Please enter a valid password"
        show.style.color = "red";
    }
}

function validatePhone() {
    let phone = document.getElementById("phonenumber-field") as HTMLInputElement;
    let show = document.getElementById("phonenumber-error") as HTMLInputElement;
    let regx = /^[8-9]\d{9}/;
    if (regx.test(phone.value)) {
        show.innerHTML = "valid";
        show.style.color = "green"
        phonenumberStatus = true;
    }
    else {
        show.innerHTML = "Please enter a valid phonenumber"
        show.style.color = "red";
    }
}

function homepage() {
    let homePage = document.getElementById("homepage") as HTMLDivElement;
    homePage.style.display = "block";
    let signUpPage = document.getElementById("sign-up") as HTMLDivElement;
    signUpPage.style.display = "none";
}

function SignUp() {
    let homePage = document.getElementById("homepage") as HTMLDivElement;
    homePage.style.display = "none";
    let signUpPage = document.getElementById("sign-up") as HTMLDivElement;
    signUpPage.style.display = "block";

}

function SignIn() {
    let homePage = document.getElementById("homepage") as HTMLDivElement;
    homePage.style.display = "none";
    // let signInPage=document.getElementById("sign-in") as HTMLDivElement;
    // signInPage.style.display="block";
    (document.getElementById("sign-in") as HTMLDivElement).style.display = "block";
    renderUser();
}

async function renderUser() {
    let userTable = document.getElementById("user-table") as HTMLTableSectionElement;
    userTable.innerHTML = "";
    const users = await fetchUser();
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
    }
    );
}

//Adding NEW USER in Sign in

function SignUpSubmit() {
    if (emailStatus == true && phonenumberStatus == true && passwordStatus == true && nameStatus == true) {
        let genderValue: any;
        let UserName = document.getElementById("username-field") as HTMLInputElement;
        let email = document.getElementById("email-field") as HTMLInputElement;
        let phoneNumber = document.getElementById("phonenumber-field") as HTMLInputElement;
        let pwd = document.getElementById("confirm-password-field") as HTMLInputElement;
        let male = document.getElementById("male") as HTMLInputElement;
        let female = document.getElementById("male") as HTMLInputElement;

        if (male.checked == true) {
            genderValue = male.value;
            console.log(genderValue);
        }
        if (female.checked == true) {
            genderValue = female.value;
        }
        let department = document.getElementById("department") as HTMLSelectElement;
        let select = department.selectedIndex;
        let opt = department.options[select];
        const newuser: UserDetails =
        {
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
async function SignInSubmit() {
    let userEmail = document.getElementById("useremail-field1") as HTMLInputElement;
    let userpwd = document.getElementById("password-field1") as HTMLInputElement;
    let flag: boolean = true;
    const users = await fetchUser();
    users.forEach(list => {
        if (list.mailID == userEmail.value && list.password == userpwd.value) {
            flag = false;
            currentUser = list;
            navbar();
            alert("Successfully Sign-in");
        }
    }
    )
    if (flag) {
        alert("Invalid Data")
    }
}

function navbar() {
    let signInPage = document.getElementById("sign-in") as HTMLDivElement;
    signInPage.style.display = "none";
    (document.getElementById("navbar") as HTMLDivElement).style.display = "block";
    let showUser = document.getElementById("showUser") as HTMLLabelElement;
    showUser.innerHTML = `Welcome ${currentUser.userName} to menu page`;
}


function bookDetails() {
    (document.getElementById("book-details") as HTMLDivElement).style.display = "block";
    (document.getElementById("borrow-book") as HTMLDivElement).style.display = "none";
    (document.getElementById("borrow-histroy") as HTMLDivElement).style.display = "none";
    (document.getElementById("return-book") as HTMLDivElement).style.display = "none";
    (document.getElementById("recharge") as HTMLDivElement).style.display = "none";
    (document.getElementById("top-up") as HTMLDivElement).style.display = "none";
    renderBook();
}


function adds()
{
    (document.getElementById("add-book") as HTMLDivElement).style.display="block"
}
function addsBook()
{
    let BookName=document.getElementById("book-name") as HTMLInputElement;
    let AuthorName=document.getElementById("author-name") as HTMLInputElement;
    let BookCount=document.getElementById("book-count") as HTMLInputElement;
    const newBook:BookDetails=
    {
        bookID:undefined,
        bookName:BookName.value,
        authorName:AuthorName.value,
        bookCount:Number(BookCount.value),

    }
    BookName.value="";
    AuthorName.value="";
    BookCount.value="";
    addBook(newBook);
    

}

function borrowBook() {
    (document.getElementById("book-details") as HTMLDivElement).style.display = "none";
    (document.getElementById("borrow-book") as HTMLDivElement).style.display = "block";
    (document.getElementById("borrow-histroy") as HTMLDivElement).style.display = "none";
    (document.getElementById("return-book") as HTMLDivElement).style.display = "none";
    (document.getElementById("recharge") as HTMLDivElement).style.display = "none";
    (document.getElementById("top-up") as HTMLDivElement).style.display = "none";
    renderBookDetails();
}

async function renderBookDetails() {
    (document.getElementById("show-count") as HTMLDivElement).style.display = "none";
    
    const bookTable = document.getElementById("book-details-table") as HTMLTableSectionElement;
    bookTable.innerHTML = "";
    const books = await fetchBook();
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
    }
    )

}

function book(id: number) {
    (document.getElementById("show-count") as HTMLDivElement).style.display = "block";
    editingBookID = id;
}

async function enter() {
    let flag: boolean = true;
    let bookCount = document.getElementById("book-count") as HTMLInputElement;
    const books = await fetchBook();
    const borrows = await fetchBorrow();
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
                            alert(`You can have maximum of 3 borrowed books.Your already borrowed books count is ${list.borrowedCount} and requested Count ${bookCount.value}, which exceed 3`)
                            flag = false;
                        }

                    }
                }
                )
                if (flag) {
                    const newBorrow: BorrowDetails = {
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
                    alert("Book Borrow Successfully..")
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
                }
                )
            }
        }
    }
    )
}

function BorrwedHistroy() {
    (document.getElementById("book-details") as HTMLDivElement).style.display = "none";
    (document.getElementById("borrow-book") as HTMLDivElement).style.display = "none";
    (document.getElementById("borrow-histroy") as HTMLDivElement).style.display = "block";
    (document.getElementById("return-book") as HTMLDivElement).style.display = "none";
    (document.getElementById("recharge") as HTMLDivElement).style.display = "none";
    (document.getElementById("top-up") as HTMLDivElement).style.display = "none";
    renderBorrowHistroy();
}
async function renderBorrowHistroy() {
    const borrowtable = document.getElementById("borrow-histroy-table") as HTMLTableSectionElement;
    borrowtable.innerHTML = "";
    const borrows = await fetchBorrow();
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
    }
    )
}

function returnBook() {
    (document.getElementById("book-details") as HTMLDivElement).style.display = "none";
    (document.getElementById("borrow-book") as HTMLDivElement).style.display = "none";
    (document.getElementById("borrow-histroy") as HTMLDivElement).style.display = "none";
    (document.getElementById("return-book") as HTMLDivElement).style.display = "block";
    (document.getElementById("recharge") as HTMLDivElement).style.display = "none";
    (document.getElementById("top-up") as HTMLDivElement).style.display = "none";
    renderBorrow();
}

async function renderBorrow() 
{
    
    const borrowedtable = document.getElementById("borrowed-histroy-table") as HTMLTableSectionElement;
    borrowedtable.innerHTML = "";
    const borrows = await fetchBorrow();
    borrows.forEach(list => {
        if (currentUser.userID == list.userID && list.status == "Borrowed") {
             let currentDate=new Date();
             let borrowDate=new Date(list.borrowedDate);
             let result= new Date(list.borrowedDate);
             result.setDate(result.getDate() + 15);
             let diff=Math.abs(currentDate.getTime()-borrowDate.getTime());
             let diffDays=Math.ceil(diff/(1000*3600*24));
             //console.log(diffDays);
             
             if(diffDays>15)
                {
                 fineAmount=(diffDays*1)-15;
                }
             const year=result.getFullYear();
             const month=result.getMonth()+1;
             const date=result.getDate();
             const returnDate=`${date}/${month}/${year}`;
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
    }
    )
}

async function returnBorrow(id:number)
{
    let userBorrowID=id;
    let newdiffDays:number=0;
    const borrows=await fetchBorrow();
    borrows.forEach(list => {
        if (currentUser.userID == list.userID && list.status == "Borrowed") {
             let currentDate=new Date();
             let borrowDate=new Date(list.borrowedDate);
             let result= new Date(list.borrowedDate);
             result.setDate(result.getDate() + 15);
             let diff=Math.abs(currentDate.getTime()-borrowDate.getTime());
             newdiffDays=Math.ceil(diff/(1000*3600*24));
             
        }
    }
    )

      if(newdiffDays>15)
        {
             if(currentUser.balance>=fineAmount)
                {
                    borrows.forEach(list=>
                        {
                            if(list.borrowID==userBorrowID)
                                {
                                    let borrowUpdate:BorrowDetails={
                                        borrowID:userBorrowID,
                                        bookID:list.bookID,
                                        userID:currentUser.userID,
                                        borrowedDate:list.borrowedDate,
                                        borrowedCount:list.borrowedCount,
                                        status:"Returned",
                                        fineAmount:fineAmount
                                    };
                                    updateBorrow(userBorrowID,borrowUpdate);
                                    alert("Book Returned successfully after paid fine amount..")
                                    renderBorrow();
                                    currentUser.balance-=fineAmount;
                                    updateUser(currentUser.userID,currentUser);
                                    currentBook.bookCount+=list.borrowedCount;
                                    updateBook(editingBookID,currentBook);
                                  


                                }
                        }
                    )
                }
                else{
                    alert("Insufficient balance to pay amount")
                }
        }
        else{
            borrows.forEach(list=>
                {
                    if(list.borrowID==userBorrowID)
                        {
                            let borrowUpdate:BorrowDetails={
                                borrowID:userBorrowID,
                                bookID:list.bookID,
                                userID:currentUser.userID,
                                borrowedDate:list.borrowedDate,
                                borrowedCount:list.borrowedCount,
                                status:"Returned",
                                fineAmount:0
                            };
                            updateBorrow(userBorrowID,borrowUpdate);
                            alert("Book Returned successfully ..")
                            renderBorrow();
                            currentBook.bookCount+=list.borrowedCount;
                            updateBook(editingBookID,currentBook);
                           

                        }
                }
            )
        }
}

function recharge()
{
    (document.getElementById("book-details") as HTMLDivElement).style.display = "none";
    (document.getElementById("borrow-book") as HTMLDivElement).style.display = "none";
    (document.getElementById("borrow-histroy") as HTMLDivElement).style.display = "none";
    (document.getElementById("return-book") as HTMLDivElement).style.display = "none";
    (document.getElementById("recharge") as HTMLDivElement).style.display = "block";
    (document.getElementById("top-up") as HTMLDivElement).style.display = "none";
   
}
function amount()
{
    let rechargeAmount=document.getElementById("recharge-amount") as HTMLInputElement;
    currentUser.balance+=Number(rechargeAmount.value);
    alert(`Amount ${rechargeAmount.value} added to your balance`);
    updateUser(currentUser.userID,currentUser);
}

function showBalance()
{
    (document.getElementById("book-details") as HTMLDivElement).style.display = "none";
    (document.getElementById("borrow-book") as HTMLDivElement).style.display = "none";
    (document.getElementById("borrow-histroy") as HTMLDivElement).style.display = "none";
    (document.getElementById("return-book") as HTMLDivElement).style.display = "none";
    (document.getElementById("recharge") as HTMLDivElement).style.display = "none";
    (document.getElementById("top-up") as HTMLDivElement).style.display = "block";
    let wallentBalance=document.getElementById("walletBalance") as HTMLLabelElement;
    wallentBalance.innerHTML=`The User ${currentUser.userName}'s current balance is ${currentUser.balance} `;
   
}


//Adding Details
async function addUser(user: UserDetails): Promise<void> {
    const respone = await fetch('http://localhost:5269/api/userdetails', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (!respone.ok) {
        throw new Error('Failed to add UserDetails ');
    }
}

async function addBook(book: BookDetails): Promise<void> {
    const respone = await fetch('http://localhost:5269/api/bookdetails', {
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
}

async function addBorrow(borrow: BorrowDetails): Promise<void> {
    const respone = await fetch('http://localhost:5269/api/borrowdetails', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(borrow)
    });
    if (!respone.ok) {
        throw new Error('Failed to add borrowDetails ');
    }
}


async function fetchUser(): Promise<UserDetails[]> {
    const apiURL = `http://localhost:5269/api/userdetails`;
    const response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return await response.json();

}

async function fetchBook(): Promise<BookDetails[]> {
    const apiURL = `http://localhost:5269/api/bookdetails`;
    const response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error('Failed to fetch books');
    }
    return await response.json();

}

async function fetchBorrow(): Promise<BorrowDetails[]> {
    const apiURL = `http://localhost:5269/api/borrowdetails`;
    const response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error('Failed to fetch borrow');
    }
    return await response.json();

}
async function updateBook(id: number, book: BookDetails): Promise<void> {
    const response = await fetch(`http://localhost:5269/api/bookdetails/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(book)
    });
    if (!response.ok) {
        throw new Error('Failed to Update bookDetails ');
    }
    

}

async function updateBorrow(id: number, borrow: BorrowDetails): Promise<void> {
    const response = await fetch(`http://localhost:5269/api/borrowdetails/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(borrow)
    });
    if (!response.ok) {
        throw new Error('Failed to Update borrowDetails ');
    }
    

}

async function updateUser(id: number, user: UserDetails): Promise<void> {
    const response = await fetch(`http://localhost:5269/api/userdetails/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (!response.ok) {
        throw new Error('Failed to Update borrowDetails ');
    }
    

}

async function renderBook() {
    (document.getElementById("add-book") as HTMLDivElement).style.display="none";

    const bookTable = document.getElementById("book-table") as HTMLTableSectionElement;
    bookTable.innerHTML = "";
    const books = await fetchBook();
    books.forEach(list => {
        const row = document.createElement('tr');
        row.innerHTML = `
               <td>${list.bookID}</td>
               <td>${list.bookName}</td>
               <td>${list.authorName}</td>
               <td>${list.bookCount}</td>
            `;
        bookTable.appendChild(row);
    }
    )
}



