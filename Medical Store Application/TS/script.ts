let staticUserID: number = 1001;
let staticMedicineID: number = 101;
let staticOrderID: number = 101;
let currentLoggedInUser: UserDetails;
enum OrderStatus {
    Purchased = "Purchased",
    Cancelled = "Cancelled"
};

class UserDetails {
    userId: string;
    userName: string;
    userAge: number;
    userPhoneNumber: number;
    balance: number;
    constructor(paramUserName: string, paramuserAge: number, paramuserPhoneNumber: number,parambal : number) {
        this.userId = "UI" + (staticUserID++);
        this.userName = paramUserName;
        this.userAge = paramuserAge;
        this.userPhoneNumber = paramuserPhoneNumber;
        this.balance = parambal;
    }
}
let userArrayList: Array<UserDetails> = new Array<UserDetails>();
userArrayList.push(new UserDetails("Hemanth", 23, 9789011226,500));
userArrayList.push(new UserDetails("Harish", 23, 9445153060,500));

class MedicineDetails {
    medicineID: string;
    medicineName: string;
    medicineCount: number
    price: number
    constructor(paramMedicinename: string, paramMedicineCount: number, paramPrice: number) {
        this.medicineID = "MID" + (staticMedicineID++);
        this.medicineName = paramMedicinename;
        this.medicineCount = paramMedicineCount;
        this.price = paramPrice;
    }

}
let medicineList: Array<MedicineDetails> = new Array<MedicineDetails>();
medicineList.push(new MedicineDetails("Paracetomol", 5, 50));
medicineList.push(new MedicineDetails("Colpal", 5, 60));
medicineList.push(new MedicineDetails("Stepsil", 5, 70));
medicineList.push(new MedicineDetails("Iodex", 5, 80));
medicineList.push(new MedicineDetails("Acetherol", 5, 100));

class OrderDetails {
    orderID: string;
    medicineID: string;
    medicineName: string
    quantity: number;
    price: number;
    orderStatus: OrderStatus;
    constructor(parammedcineID: string, parammedicineName: string, paramQuantity: number, paramprice: number, paramorderstatus: OrderStatus) {
        this.orderID = "OID" + (staticOrderID++);
        this.medicineID = parammedcineID;
        this.medicineName = parammedicineName
        this.quantity = paramQuantity;
        this.price = paramprice;
        this.orderStatus = paramorderstatus;
    }

}
let orderList: Array<OrderDetails> = new Array<OrderDetails>();


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
    let age: number = parseInt((document.getElementById("signUpUserName") as HTMLInputElement).value);
    let phoneNumber: number = parseInt((document.getElementById("signUpUserName") as HTMLInputElement).value);
    userArrayList.push(new UserDetails(username, age, phoneNumber,500));
    alert("Saved Successfully !");
    (document.getElementById("signuppage") as HTMLDivElement).style.display = "none";
    (document.getElementById("homepage") as HTMLDivElement).style.display = "block";
}

function signIn() {
    let userID: string = (document.getElementById("signInUserID") as HTMLInputElement).value.toUpperCase();
    let flag: boolean = true;
    userArrayList.forEach(element => {
        if (element.userId === userID) {
            currentLoggedInUser = element;
            flag = false;
            alert("You Have successfully logged in ! ");
            (document.getElementById("loggedInPage") as HTMLDivElement).style.display = "flex";
            (document.getElementById("signinpage") as HTMLDivElement).style.display = "none";

        }
    });
    if (flag) {
        alert("Enter valid User ID !");
    }
}

function showMedicinePage() {
    (document.getElementById("medicinePage") as HTMLTableElement).style.display = "block";
    (document.getElementById("orderHistorypage") as HTMLTableElement).style.display = "none";
    (document.getElementById("takeOrderPage") as HTMLTableElement).style.display = "none";
    (document.getElementById("cancelOrderPage") as HTMLDivElement).style.display = "none";
    (document.getElementById("walletBalancePage") as HTMLDivElement).style.display = "none";
    (document.getElementById("topupPage") as HTMLDivElement).style.display = "none";
    let medicinedet = document.getElementById("medicineList1") as HTMLTableElement;
    medicinedet.innerHTML = `<tr>
    <th>Medicine Name</th>
    <th>Quantity</th>
    <th>Price</th>
    <th>Action</th>
</tr>`
    medicineList.forEach(medicine => {
        if (medicine.medicineCount > 0) {
            medicinedet.innerHTML += `<tr><td>${medicine.medicineName}</td><td>${medicine.medicineCount}</td><td>${medicine.price}</td><td><button>Edit</button><button onclick="DeleteMedicine('${medicine.medicineID}')">Delete</button></td></tr>`
        }
    });
}
function AddMedicine(){
    let mName = (document.getElementById("mName") as HTMLInputElement).value;
    let mQuantity = parseInt((document.getElementById("mQuantity") as HTMLInputElement).value);
    let mPrice = parseInt((document.getElementById("mPrice") as HTMLInputElement).value);
    medicineList.push(new MedicineDetails(mName,mQuantity,mPrice));
    alert("Medicine Added Successfully !")
    showMedicinePage();
}
function DeleteMedicine(mID: string)
{
    let count: number;
    medicineList.forEach(medicine => {
        if(mID==medicine.medicineID){
            delete medicineList[count];
            alert("Medicine Deleted Successfully ! ")
            showMedicinePage();
        }
        count+=1;
    });
}
function AddQuantity(medID : string){
    
    medicineList.forEach(medicine => {
        if(medID==medicine.medicineID){

        }
    });
}
function takeOrderPage() {
    (document.getElementById("medicinePage") as HTMLTableElement).style.display = "none";
    (document.getElementById("orderHistorypage") as HTMLTableElement).style.display = "none";
    (document.getElementById("takeOrderPage") as HTMLTableElement).style.display = "block";
    (document.getElementById("topupPage") as HTMLDivElement).style.display = "none";
    (document.getElementById("cancelOrderPage") as HTMLDivElement).style.display = "none";
    (document.getElementById("walletBalancePage") as HTMLDivElement).style.display = "none";


    let takeorder = (document.getElementById("takeorder") as HTMLDivElement);
    takeorder.style.display = "flex";
    let medicinedet = document.getElementById("takeOrderMedicineList") as HTMLTableElement;
    medicinedet.innerHTML = `<tr>
    <th>Medicine Name</th>
    <th>Quantity</th>
    <th>Price</th>
    <th>Action</th>
</tr>`
    medicineList.forEach(medicine => {
        if (medicine.medicineCount > 0) {
            medicinedet.innerHTML += `<tr><td>${medicine.medicineName}</td><td>${medicine.medicineCount}</td><td>${medicine.price}</td><td><button onclick ="takeOrder('${medicine.medicineID}')">Buy</button></td></tr>`
        }
    });

}

function takeOrder(mID : string) {

    let mcount: number = parseInt((document.getElementById("medicineCount") as HTMLInputElement).value);
    let flag: boolean = true;
    medicineList.forEach(medicine => {
        if (mID === medicine.medicineID) {
            flag = false;
            if (mcount > medicine.medicineCount) {
                alert("Your count exceeds the medicine Count !");
            }
            else {
                let tempprice: number = (mcount * medicine.price);
                if (currentLoggedInUser.balance > tempprice) {
                    medicine.medicineCount -= mcount;
                    currentLoggedInUser.balance-=tempprice;
                    alert("You have successfully bought the Medicine !");
                    orderList.push(new OrderDetails(medicine.medicineID, medicine.medicineName, mcount, tempprice, OrderStatus.Purchased));
                    (document.getElementById("medicineList1") as HTMLTableElement).style.display = "block";
                    takeOrderPage();

                }
                else {
                    alert("kindly Check your Balance ! ");
                }
            }
        }
    });
    if (flag) {
        alert("enter valid Quantity!");
    }

}

function CancelOrderPage() {
    (document.getElementById("medicinePage") as HTMLTableElement).style.display = "none";
    (document.getElementById("orderHistorypage") as HTMLTableElement).style.display = "none";
    (document.getElementById("takeOrderPage") as HTMLTableElement).style.display = "none";
    (document.getElementById("topupPage") as HTMLDivElement).style.display = "none";
    (document.getElementById("walletBalancePage") as HTMLDivElement).style.display = "none";
    (document.getElementById("cancelOrderPage") as HTMLDivElement).style.display = "block";

    let cancelorderdet = document.getElementById("ordered") as HTMLTableElement;
    cancelorderdet.style.display = "block";
    cancelorderdet.innerHTML = `<tr>
                <th>Order ID</th>
                <th>Medicine ID</th>
                <th>Medicine Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Order Status</th>
                <th>Action</th>
            </tr>`;
            cancelorderdet.style.width = "fit-content";
    orderList.forEach(order => {
        if (order.orderStatus == OrderStatus.Purchased) {
                cancelorderdet.innerHTML += `<tr><td>${order.orderID}</td><td>${order.medicineID}</td><td>${order.medicineName}</td><td>${order.quantity}</td><td>${order.price}</td><td>${order.orderStatus}</td><td><button onclick="CancelOrder('${order.orderID}')">Cancel</button></td></tr>`;
        }
    });

}
function CancelOrder(orderID: string) {
    orderList.forEach(order => {
        if (orderID == order.orderID) {
            if (order.orderStatus == OrderStatus.Purchased) {
                order.orderStatus = OrderStatus.Cancelled;
                currentLoggedInUser.balance += order.price;
                medicineList.forEach(medicine => {
                    if(medicine.medicineID == order.medicineID)
                        {
                            medicine.medicineCount+=order.quantity;
                        }
                });
                alert("Order is now Cancelled ! ");
            }
        }
    });
    CancelOrderPage();

}

function orderHistory() {
    (document.getElementById("medicinePage") as HTMLTableElement).style.display = "none";
    (document.getElementById("orderHistorypage") as HTMLTableElement).style.display = "block";
    (document.getElementById("takeOrderPage") as HTMLTableElement).style.display = "none";
    (document.getElementById("cancelOrderPage") as HTMLDivElement).style.display = "none";
    (document.getElementById("walletBalancePage") as HTMLDivElement).style.display = "none";
    (document.getElementById("topupPage") as HTMLDivElement).style.display = "none";
    let orderdet = document.getElementById("orderHistory") as HTMLTableElement;
    orderdet.style.display = "block";
    orderdet.innerHTML = `<tr>
        <th>Order ID</th>
        <th>Medicine ID</th>
        <th>Medicine Name</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Order Status</th>
    </tr>`;
    orderdet.style.width = "fit-content";
    orderList.forEach(order => {
        if (order.quantity > 0) {
            orderdet.innerHTML += `<tr><td>${order.orderID}</td><td>${order.medicineID}</td><td>${order.medicineName}</td><td>${order.quantity}</td><td>${order.price}</td><td>${order.orderStatus}</td></tr>`
        }
    });

}

function WalletBalancePage() {
    (document.getElementById("medicinePage") as HTMLTableElement).style.display = "none";
    (document.getElementById("orderHistorypage") as HTMLTableElement).style.display = "none";
    (document.getElementById("cancelOrderPage") as HTMLDivElement).style.display = "none";
    (document.getElementById("takeOrderPage") as HTMLTableElement).style.display = "none";
    (document.getElementById("walletBalancePage") as HTMLDivElement).style.display = "block";
    (document.getElementById("topupPage") as HTMLDivElement).style.display = "none";
    let balancedet = (document.getElementById("walletBalance") as HTMLElement);
    balancedet.innerHTML = `<h2>Your Balance : ${currentLoggedInUser.balance}</h2>`;
}
function TopUpPage() {
    (document.getElementById("medicinePage") as HTMLTableElement).style.display = "none";
    (document.getElementById("orderHistorypage") as HTMLTableElement).style.display = "none";
    (document.getElementById("takeOrderPage") as HTMLTableElement).style.display = "none";
    (document.getElementById("cancelOrderPage") as HTMLDivElement).style.display = "none";
    (document.getElementById("walletBalancePage") as HTMLDivElement).style.display = "none";
    (document.getElementById("topupPage") as HTMLDivElement).style.display = "block";
}
function TopUp() {
    let amount = parseInt((document.getElementById("topUpAmount") as HTMLInputElement).value);
    if (amount > 0) {
        currentLoggedInUser.balance += amount;
        alert("your recharge has been successfull ! ");
    }
    else {
        alert("enter valid amount ")
    }

}