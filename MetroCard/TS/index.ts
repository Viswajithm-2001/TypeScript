let staticCardNumber: number = 1001;
let staticTicketID : number = 3001;
let staticTravelID: number = 2001;

class UserDetails {
    readonly CardNumber: string;
    UserName: string;
    UserPhoneNumber: number;
    Balance: number;
    Password : string
    constructor(paramUserName: string, paramPhoneNumber: number, paramBalance: number, paramPassword:string) {
        this.CardNumber = "CMRL" + (staticCardNumber++);
        this.UserName = paramUserName;
        this.UserPhoneNumber = paramPhoneNumber;
        this.Balance = paramBalance;
        this.Password=paramPassword;
    }
}
let CurrentLoggedInUser : UserDetails;
let userArrayList: Array<UserDetails> = new Array<UserDetails>();
userArrayList.push(new UserDetails("Ravi", 9848812345, 1000,"Ravi"));
userArrayList.push(new UserDetails("Baskaran", 994884321, 1000,"Baskaran"));

class TicketFairDetails{
    TicketID : string;
    FromLocation : string;
    ToLocation:string;
    FairPrice:number;
    constructor(paramfromLocation:string, paramtoLocation:string,paramprice:number){
        this.TicketID = "TID"+(staticTicketID++);
        this.FromLocation = paramfromLocation;
        this.ToLocation = paramtoLocation;
        this.FairPrice=paramprice;
    }
}
let ticketList : Array<TicketFairDetails> = new Array<TicketFairDetails>();
ticketList.push(new TicketFairDetails("Airport","Egmore",55));
ticketList.push(new TicketFairDetails("Airport","Koyambedu",25));
ticketList.push(new TicketFairDetails("Alandur","Koyambedu",25));
ticketList.push(new TicketFairDetails("Koyambedu","Egmore",32));
ticketList.push(new TicketFairDetails("Vadapalani","Egmore",45));
ticketList.push(new TicketFairDetails("Arumbakkam","Egmore",25));
ticketList.push(new TicketFairDetails("Vadapalani","Koyambedu",25));
ticketList.push(new TicketFairDetails("Arumbakkam","Koyambedu",16));

class TravelDetails{
    TravelID : string
    readonly CardNumber : string;
    FromLocation:string;
    ToLocation:string;
    TravelDate : Date;
    Price:number
    constructor(paramcard:string,paramfrom:string,paramto:string,paramdate:Date,paramPrice: number){
        this.TravelID = "TID"+(staticTravelID++);
        this.CardNumber=paramcard;
        this.FromLocation=paramfrom;
        this.ToLocation=paramto;
        this.TravelDate = paramdate;
        this.Price = paramPrice;
    }
}
let travelList : Array<TravelDetails> = new Array<TravelDetails>();

travelList.push(new TravelDetails("CMRL1001","Airport","Egmore",new Date(2023,10,10),55));
travelList.push(new TravelDetails("CMRL1001","Egmore","Koyambedu",new Date(2023,10,10),32));
travelList.push(new TravelDetails("CMRL1002","Alandur","Koyambedu",new Date(2023,11,10),25));
travelList.push(new TravelDetails("CMRL1002","Egmore","Thirumanagalam",new Date(2023,11,10),25));

function homesignin() {
    (document.getElementById("signinpage") as HTMLDivElement).style.display = "block";
    (document.getElementById("homepage") as HTMLDivElement).style.display = "none";
}
function homesignup() {
    (document.getElementById("signuppage") as HTMLDivElement).style.display = "block";
    (document.getElementById("homepage") as HTMLDivElement).style.display = "none";
}
function signUp() {
    let username: string = (document.getElementById("signUpUserName") as HTMLInputElement).value;
    let phoneNumber: number = parseInt((document.getElementById("signUpUserName") as HTMLInputElement).value);
    let balance: number = parseInt((document.getElementById("userBalance") as HTMLInputElement).value)

    let user : UserDetails = new UserDetails(username, phoneNumber, balance,"");//to fill
    alert(`Saved Successfully and your Card Number is ${user.CardNumber}`);
    userArrayList.push();
    (document.getElementById("signuppage") as HTMLDivElement).style.display = "none";
    (document.getElementById("homepage") as HTMLDivElement).style.display = "block";
}

function signIn() {
    let userID: string = (document.getElementById("signInUserID") as HTMLInputElement).value.toUpperCase();
    let flag: boolean = true;
    userArrayList.forEach(element => {
        if (element.CardNumber === userID) {
            CurrentLoggedInUser = element;
            flag = false;
            alert("You Have successfully logged in ! ");
            (document.getElementById("loggedInPage") as HTMLDivElement).style.display = "flex";
            (document.getElementById("signinpage") as HTMLDivElement).style.display = "none";
            WelcomePage();

        }
    });
    if (flag) {
        alert("Enter valid Card Number !");
    }
}

function WelcomePage(){
    (document.getElementById("WelcomePage") as HTMLDivElement).style.display = "block";
    (document.getElementById("BalanceCheckPage") as HTMLDivElement).style.display = "none";
    (document.getElementById("RechargePage") as HTMLDivElement).style.display = "none";
    (document.getElementById("TravelHistoryPage") as HTMLDivElement).style.display = "none";
    (document.getElementById("TravelPage") as HTMLDivElement).style.display = "none";
    
    let welcomepage=(document.getElementById("WelcomePage") as HTMLDivElement);
    welcomepage.innerHTML = `<h1>Welcome ${CurrentLoggedInUser.UserName} !</h1>`;
}

function BalanceCheckPage(){
    (document.getElementById("WelcomePage") as HTMLDivElement).style.display = "none";
    (document.getElementById("BalanceCheckPage") as HTMLDivElement).style.display = "block";
    (document.getElementById("RechargePage") as HTMLDivElement).style.display = "none";
    (document.getElementById("TravelHistoryPage") as HTMLDivElement).style.display = "none";
    (document.getElementById("TravelPage") as HTMLDivElement).style.display = "none";
    
    let balancedetail = (document.getElementById("balance") as HTMLDivElement);
    balancedetail.innerHTML = `<h2>Your Balance : ${CurrentLoggedInUser.Balance}</h2>`;
}



function RechargePage(){
    (document.getElementById("WelcomePage") as HTMLDivElement).style.display = "none";
    (document.getElementById("BalanceCheckPage") as HTMLDivElement).style.display = "none";
    (document.getElementById("RechargePage") as HTMLDivElement).style.display = "block";
    (document.getElementById("TravelHistoryPage") as HTMLDivElement).style.display = "none";
    (document.getElementById("TravelPage") as HTMLDivElement).style.display = "none";
    
}

function walletrecharge(){
    let amount = parseInt((document.getElementById("rechargeAmount") as HTMLInputElement).value);
    if (amount > 0) {
        CurrentLoggedInUser.Balance += amount;
        alert("your recharge has been successfull ! ");
        BalanceCheckPage();
    }
    else {
        alert("enter valid amount ")
    }
}
