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
let staticUserID = 4;
let staticMedicineID = 6;
let staticOrderID = 4;
let currentLoggedInUser;
let editingID;
function homesignin() {
    document.getElementById("signinpage").style.display = "block";
    document.getElementById("homepage").style.display = "none";
}
function homesignup() {
    document.getElementById("signuppage").style.display = "block";
    document.getElementById("homepage").style.display = "none";
}
function signUp() {
    return __awaiter(this, void 0, void 0, function* () {
        let username = document.getElementById("signUpUserName").value;
        let phoneNumber = parseInt(document.getElementById("signUpPhoneNumber").value);
        let balance = parseInt(document.getElementById("signUpBalance").value);
        const newUser = { userID: staticUserID++, userName: username, userPhoneNumber: phoneNumber, userBalance: balance };
        addUserDetails(newUser);
        document.getElementById("signuppage").style.display = "none";
        document.getElementById("homepage").style.display = "block";
    });
}
function signIn() {
    return __awaiter(this, void 0, void 0, function* () {
        let userID = parseInt(document.getElementById("signInUserID").value);
        let flag = true;
        const userArrayList = yield fetchUsers();
        userArrayList.forEach(element => {
            if (element.userID === userID) {
                currentLoggedInUser = element;
                flag = false;
                alert("You Have successfully logged in ! ");
                document.getElementById("welcome").style.display = "block";
                document.getElementById("welcomemsg").innerHTML = `<h2>Hi ${currentLoggedInUser.userName}</h2>`;
                document.getElementById("loggedInPage").style.display = "flex";
                document.getElementById("signinpage").style.display = "none";
            }
        });
        if (flag) {
            alert("Enter valid User ID !");
        }
    });
}
function showMedicinePage() {
    return __awaiter(this, void 0, void 0, function* () {
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
        const medicineList = yield fetchMedicines();
        medicineList.forEach(medicine => {
            if (medicine.medicineCount > 0) {
                medicinedet.innerHTML += `<tr><td>${medicine.medicineName}</td><td>${medicine.medicineCount}</td><td>${medicine.medicinePrice}</td><td><button onclick = "EditMedicine('${medicine.medicineID}')">Edit</button><button onclick="deleteMedicineDetails('${medicine.medicineID}')">Delete</button></td></tr>`;
            }
        });
    });
}
function AddMedicine() {
    return __awaiter(this, void 0, void 0, function* () {
        let mName = document.getElementById("mName").value;
        let mQuantity = parseInt(document.getElementById("mQuantity").value);
        let mPrice = parseInt(document.getElementById("mPrice").value);
        const newMedicine = { medicineID: staticMedicineID++, medicineName: mName, medicineCount: mQuantity, medicinePrice: mPrice };
        addMedicineDetails(newMedicine);
        alert("Medicine Added Successfully !");
        showMedicinePage();
    });
}
function EditMedicine(mId) {
    return __awaiter(this, void 0, void 0, function* () {
        alert("medicine");
        let mName = document.getElementById("mName");
        let mQuantity = document.getElementById("mQuantity");
        let mPrice = document.getElementById("mPrice");
        const medicineList = yield fetchMedicines();
        medicineList.forEach(list => {
            if (list.medicineID == mId) {
                editingID = mId;
                mName.value = list.medicineName;
                mQuantity.value = String(list.medicineCount);
                mPrice.value = String(list.medicinePrice);
            }
        });
    });
}
function Edit() {
    let mName = document.getElementById("mName").value;
    let mQuantity = document.getElementById("mQuantity").value;
    let mPrice = document.getElementById("mPrice").value;
    const medicine = {
        medicineID: editingID,
        medicineName: mName,
        medicineCount: Number(mQuantity),
        medicinePrice: Number(mPrice)
    };
    updateMedicineDetails(editingID, medicine);
}
function takeOrderPage() {
    return __awaiter(this, void 0, void 0, function* () {
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
        const medicineList = yield fetchMedicines();
        medicineList.forEach(medicine => {
            if (medicine.medicineCount > 0) {
                medicinedet.innerHTML += `<tr><td>${medicine.medicineName}</td><td>${medicine.medicineCount}</td><td>${medicine.medicinePrice}</td><td><button onclick ="takeOrder('${medicine.medicineID}')">Buy</button></td></tr>`;
            }
        });
    });
}
function takeOrder(mID) {
    return __awaiter(this, void 0, void 0, function* () {
        let mcount = parseInt(document.getElementById("medicineCount").value);
        let flag = true;
        const medicineList = yield fetchMedicines();
        medicineList.forEach(medicine => {
            if (mID == medicine.medicineID) {
                flag = false;
                if (mcount > medicine.medicineCount) {
                    alert("Your count exceeds the medicine Count !");
                }
                else {
                    let tempprice = (mcount * medicine.medicinePrice);
                    if (currentLoggedInUser.userBalance > tempprice) {
                        medicine.medicineCount -= mcount;
                        currentLoggedInUser.userBalance -= tempprice;
                        alert("You have successfully bought the Medicine !");
                        const newOrder = { orderID: staticOrderID++, medicineID: mID, medicineName: medicine.medicineName, quantity: mcount, price: tempprice, orderStatus: "Ordered" };
                        addOrderDetails(newOrder);
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
    });
}
function CancelOrderPage() {
    return __awaiter(this, void 0, void 0, function* () {
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
        const orderList = yield fetchOrder();
        cancelorderdet.style.width = "fit-content";
        orderList.forEach(order => {
            if (order.orderStatus == "ordered") {
                cancelorderdet.innerHTML += `<tr><td>${order.orderID}</td><td>${order.medicineID}</td><td>${order.medicineName}</td><td>${order.quantity}</td><td>${order.price}</td><td>${order.orderStatus}</td><td><button onclick="CancelOrder('${order.orderID}')">Cancel</button></td></tr>`;
            }
        });
    });
}
function CancelOrder(orderID) {
    return __awaiter(this, void 0, void 0, function* () {
        const orderList = yield fetchOrder();
        orderList.forEach((order) => __awaiter(this, void 0, void 0, function* () {
            if (orderID == order.orderID) {
                if (order.orderStatus == "ordered") {
                    order.orderStatus = "cancelled";
                    currentLoggedInUser.userBalance += order.price;
                    const medicineList = yield fetchMedicines();
                    medicineList.forEach(medicine => {
                        if (medicine.medicineID == order.medicineID) {
                            medicine.medicineCount += order.quantity;
                        }
                    });
                    alert("Order is now Cancelled ! ");
                }
            }
        }));
        CancelOrderPage();
    });
}
function orderHistory() {
    return __awaiter(this, void 0, void 0, function* () {
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
        const orderList = yield fetchOrder();
        orderList.forEach(order => {
            if (order.quantity > 0) {
                orderdet.innerHTML += `<tr><td>${order.orderID}</td><td>${order.medicineID}</td><td>${order.medicineName}</td><td>${order.quantity}</td><td>${order.price}</td><td>${order.orderStatus}</td></tr>`;
            }
        });
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
    balancedet.innerHTML = `<h2>Your Balance : ${currentLoggedInUser.userBalance}</h2>`;
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
        currentLoggedInUser.userBalance += amount;
        alert("your recharge has been successfull ! ");
    }
    else {
        alert("enter valid amount ");
    }
}
function addUserDetails(UserDetails) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5250/api/userdetails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(UserDetails),
        });
        if (!response.ok) {
            throw new Error("Failed to add User Details");
        }
    });
}
function addMedicineDetails(MedicineDetails) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5250/api/medicinedetails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(MedicineDetails),
        });
        if (!response.ok) {
            throw new Error("Failed to add Medicine Details");
        }
    });
}
function addOrderDetails(OrderDetails) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5250/api/orderdetails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(OrderDetails),
        });
        if (!response.ok) {
            throw new Error("Failed to add order Details");
        }
    });
}
function updateMedicineDetails(id, MedicineDetails) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5250/api/medicinedetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(MedicineDetails),
        });
        if (!response.ok) {
            throw new Error("Failed to add User Details");
        }
        showMedicinePage();
    });
}
function updateOrderDetails(id, OrderDetails) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5250/api/orderdetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(OrderDetails),
        });
        if (!response.ok) {
            throw new Error("Failed to add User Details");
        }
    });
}
function deleteMedicineDetails(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5250/api/medicinedetails/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete contact');
        }
    });
}
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5250/api/userdetails`);
        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }
        return yield response.json();
    });
}
function fetchMedicines() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5250/api/medicinedetails`);
        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }
        return yield response.json();
    });
}
function fetchOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5250/api/orderdetails`);
        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }
        return yield response.json();
    });
}
