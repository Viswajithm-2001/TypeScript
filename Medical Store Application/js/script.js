"use strict";
let staticUserID = 1001;
let staticMedicineID = 101;
let staticOrderID = 101;
let currentLoggedInUser;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Purchased"] = "Purchased";
    OrderStatus["Cancelled"] = "Cancelled";
})(OrderStatus || (OrderStatus = {}));
;
class UserDetails {
    constructor(paramUserName, paramuserAge, paramuserPhoneNumber, parambal) {
        this.userId = "UI" + (staticUserID++);
        this.userName = paramUserName;
        this.userAge = paramuserAge;
        this.userPhoneNumber = paramuserPhoneNumber;
        this.balance = parambal;
    }
}
let userArrayList = new Array();
userArrayList.push(new UserDetails("Hemanth", 23, 9789011226, 500));
userArrayList.push(new UserDetails("Harish", 23, 9445153060, 500));
class MedicineDetails {
    constructor(paramMedicinename, paramMedicineCount, paramPrice) {
        this.medicineID = "MID" + (staticMedicineID++);
        this.medicineName = paramMedicinename;
        this.medicineCount = paramMedicineCount;
        this.price = paramPrice;
    }
}
let medicineList = new Array();
medicineList.push(new MedicineDetails("Paracetomol", 5, 50));
medicineList.push(new MedicineDetails("Colpal", 5, 60));
medicineList.push(new MedicineDetails("Stepsil", 5, 70));
medicineList.push(new MedicineDetails("Iodex", 5, 80));
medicineList.push(new MedicineDetails("Acetherol", 5, 100));
class OrderDetails {
    constructor(parammedcineID, parammedicineName, paramQuantity, paramprice, paramorderstatus) {
        this.orderID = "OID" + (staticOrderID++);
        this.medicineID = parammedcineID;
        this.medicineName = parammedicineName;
        this.quantity = paramQuantity;
        this.price = paramprice;
        this.orderStatus = paramorderstatus;
    }
}
let orderList = new Array();
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
    let age = parseInt(document.getElementById("signUpUserName").value);
    let phoneNumber = parseInt(document.getElementById("signUpUserName").value);
    userArrayList.push(new UserDetails(username, age, phoneNumber, 500));
    alert("Saved Successfully !");
    document.getElementById("signuppage").style.display = "none";
    document.getElementById("homepage").style.display = "block";
}
function signIn() {
    let userID = document.getElementById("signInUserID").value.toUpperCase();
    let flag = true;
    userArrayList.forEach(element => {
        if (element.userId === userID) {
            currentLoggedInUser = element;
            flag = false;
            alert("You Have successfully logged in ! ");
            document.getElementById("loggedInPage").style.display = "flex";
            document.getElementById("signinpage").style.display = "none";
        }
    });
    if (flag) {
        alert("Enter valid User ID !");
    }
}
function showMedicinePage() {
    document.getElementById("medicinePage").style.display = "block";
    document.getElementById("orderHistorypage").style.display = "none";
    document.getElementById("takeOrderPage").style.display = "none";
    document.getElementById("cancelOrderPage").style.display = "none";
    document.getElementById("walletBalancePage").style.display = "none";
    document.getElementById("topupPage").style.display = "none";
    let medicinedet = document.getElementById("medicineList1");
    medicinedet.innerHTML = `<tr>
    <th>Medicine Name</th>
    <th>Quantity</th>
    <th>Price</th>
    <th>Action</th>
</tr>`;
    medicineList.forEach(medicine => {
        if (medicine.medicineCount > 0) {
            medicinedet.innerHTML += `<tr><td>${medicine.medicineName}</td><td>${medicine.medicineCount}</td><td>${medicine.price}</td><td><button>Edit</button><button onclick="DeleteMedicine('${medicine.medicineID}')">Delete</button></td></tr>`;
        }
    });
}
function AddMedicine() {
    let mName = document.getElementById("mName").value;
    let mQuantity = parseInt(document.getElementById("mQuantity").value);
    let mPrice = parseInt(document.getElementById("mPrice").value);
    medicineList.push(new MedicineDetails(mName, mQuantity, mPrice));
    alert("Medicine Added Successfully !");
    showMedicinePage();
}
function DeleteMedicine(mID) {
    let count;
    medicineList.forEach(medicine => {
        if (mID == medicine.medicineID) {
            delete medicineList[count];
            alert("Medicine Deleted Successfully ! ");
            showMedicinePage();
        }
        count += 1;
    });
}
function AddQuantity(medID) {
    medicineList.forEach(medicine => {
        if (medID == medicine.medicineID) {
        }
    });
}
function takeOrderPage() {
    document.getElementById("medicinePage").style.display = "none";
    document.getElementById("orderHistorypage").style.display = "none";
    document.getElementById("takeOrderPage").style.display = "block";
    document.getElementById("topupPage").style.display = "none";
    document.getElementById("cancelOrderPage").style.display = "none";
    document.getElementById("walletBalancePage").style.display = "none";
    let takeorder = document.getElementById("takeorder");
    takeorder.style.display = "flex";
    let medicinedet = document.getElementById("takeOrderMedicineList");
    medicinedet.innerHTML = `<tr>
    <th>Medicine Name</th>
    <th>Quantity</th>
    <th>Price</th>
    <th>Action</th>
</tr>`;
    medicineList.forEach(medicine => {
        if (medicine.medicineCount > 0) {
            medicinedet.innerHTML += `<tr><td>${medicine.medicineName}</td><td>${medicine.medicineCount}</td><td>${medicine.price}</td><td><button onclick ="takeOrder('${medicine.medicineID}')">Buy</button></td></tr>`;
        }
    });
}
function takeOrder(mID) {
    let mcount = parseInt(document.getElementById("medicineCount").value);
    let flag = true;
    medicineList.forEach(medicine => {
        if (mID === medicine.medicineID) {
            flag = false;
            if (mcount > medicine.medicineCount) {
                alert("Your count exceeds the medicine Count !");
            }
            else {
                let tempprice = (mcount * medicine.price);
                if (currentLoggedInUser.balance > tempprice) {
                    medicine.medicineCount -= mcount;
                    currentLoggedInUser.balance -= tempprice;
                    alert("You have successfully bought the Medicine !");
                    orderList.push(new OrderDetails(medicine.medicineID, medicine.medicineName, mcount, tempprice, OrderStatus.Purchased));
                    document.getElementById("medicineList1").style.display = "block";
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
    document.getElementById("medicinePage").style.display = "none";
    document.getElementById("orderHistorypage").style.display = "none";
    document.getElementById("takeOrderPage").style.display = "none";
    document.getElementById("topupPage").style.display = "none";
    document.getElementById("walletBalancePage").style.display = "none";
    document.getElementById("cancelOrderPage").style.display = "block";
    let cancelorderdet = document.getElementById("ordered");
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
function CancelOrder(orderID) {
    orderList.forEach(order => {
        if (orderID == order.orderID) {
            if (order.orderStatus == OrderStatus.Purchased) {
                order.orderStatus = OrderStatus.Cancelled;
                currentLoggedInUser.balance += order.price;
                medicineList.forEach(medicine => {
                    if (medicine.medicineID == order.medicineID) {
                        medicine.medicineCount += order.quantity;
                    }
                });
                alert("Order is now Cancelled ! ");
            }
        }
    });
    CancelOrderPage();
}
function orderHistory() {
    document.getElementById("medicinePage").style.display = "none";
    document.getElementById("orderHistorypage").style.display = "block";
    document.getElementById("takeOrderPage").style.display = "none";
    document.getElementById("cancelOrderPage").style.display = "none";
    document.getElementById("walletBalancePage").style.display = "none";
    document.getElementById("topupPage").style.display = "none";
    let orderdet = document.getElementById("orderHistory");
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
            orderdet.innerHTML += `<tr><td>${order.orderID}</td><td>${order.medicineID}</td><td>${order.medicineName}</td><td>${order.quantity}</td><td>${order.price}</td><td>${order.orderStatus}</td></tr>`;
        }
    });
}
function WalletBalancePage() {
    document.getElementById("medicinePage").style.display = "none";
    document.getElementById("orderHistorypage").style.display = "none";
    document.getElementById("cancelOrderPage").style.display = "none";
    document.getElementById("takeOrderPage").style.display = "none";
    document.getElementById("walletBalancePage").style.display = "block";
    document.getElementById("topupPage").style.display = "none";
    let balancedet = document.getElementById("walletBalance");
    balancedet.innerHTML = `<h2>Your Balance : ${currentLoggedInUser.balance}</h2>`;
}
function TopUpPage() {
    document.getElementById("medicinePage").style.display = "none";
    document.getElementById("orderHistorypage").style.display = "none";
    document.getElementById("takeOrderPage").style.display = "none";
    document.getElementById("cancelOrderPage").style.display = "none";
    document.getElementById("walletBalancePage").style.display = "none";
    document.getElementById("topupPage").style.display = "block";
}
function TopUp() {
    let amount = parseInt(document.getElementById("topUpAmount").value);
    if (amount > 0) {
        currentLoggedInUser.balance += amount;
        alert("your recharge has been successfull ! ");
    }
    else {
        alert("enter valid amount ");
    }
}
