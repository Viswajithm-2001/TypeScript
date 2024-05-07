
let currentLoggedInUser: UserDetails;
interface UserDetails {
    userID: number;
    userName: string;
    userPhoneNumber: number;
    userMailID: string;
    password: string;
    userBalance: number;
}

interface MedicineDetails {
    medicineID: number;
    medicineName: string;
    medicineCount: number;
    expiryDate: string;
    medicinePrice: number;

}

interface OrderDetails {
    orderID: number;
    medicineID: number;
    medicineName: string
    quantity: number;
    price: number;
    orderStatus: string;

}

let editingID: number;
function homepage() {
    (document.getElementById("medicinePage") as HTMLTableElement).style.display = "none";
    (document.getElementById("orderHistorypage") as HTMLTableElement).style.display = "none";
    (document.getElementById("cancelOrderPage") as HTMLDivElement).style.display = "none";
    (document.getElementById("takeOrderPage") as HTMLTableElement).style.display = "none";
    (document.getElementById("walletBalancePage") as HTMLDivElement).style.display = "none";
    (document.getElementById("topupPage") as HTMLDivElement).style.display = "none";
    (document.getElementById("homepage") as HTMLDivElement).style.display = "block";
    (document.getElementById("welcomemsg") as HTMLDivElement).style.display = "none";
    (document.getElementById("loggedInPage") as HTMLDivElement).style.display = "none";
    (document.getElementById("signoutbtn") as HTMLDivElement).style.display = "none";
}
function homesignin() {
    (document.getElementById("signinpage") as HTMLDivElement).style.display = "block";
    (document.getElementById("homepage") as HTMLDivElement).style.display = "none";
    homepage();
    (document.getElementById("signuppage") as HTMLDivElement).style.display = "none";
}
function homesignup() {
    (document.getElementById("signuppage") as HTMLDivElement).style.display = "block";
    (document.getElementById("homepage") as HTMLDivElement).style.display = "none";
    homepage();
    (document.getElementById("signinpage") as HTMLDivElement).style.display = "none";
}
async function signUp() {
    let username: string = (document.getElementById("signUpUserName") as HTMLInputElement).value;
    let phoneNumber: number = parseInt((document.getElementById("signUpPhoneNumber") as HTMLInputElement).value);
    let balance: number = parseInt((document.getElementById("signUpBalance") as HTMLInputElement).value);
    let mailID: string = (document.getElementById("signUpMail") as HTMLInputElement).value;
    let upassword: string = (document.getElementById("signUpPwd") as HTMLInputElement).value;
    let cpassowrd: string = (document.getElementById("confirmpwd")as HTMLInputElement).value;
    if(upassword==cpassowrd){
        const newUser: UserDetails = { userID: 0, userName: username, userPhoneNumber: phoneNumber, userBalance: balance, userMailID: mailID, password: upassword };
        addUserDetails(newUser);
    }
    else{
        alert("Enter same password")
    }


    (document.getElementById("signuppage") as HTMLDivElement).style.display = "none";
    (document.getElementById("homepage") as HTMLDivElement).style.display = "block";
}

async function signIn() {
    let mailID: string = (document.getElementById("signInUserID") as HTMLInputElement).value;
    let password: string = (document.getElementById("signinpwd") as HTMLInputElement).value;
    let flag: boolean = true;
    const userArrayList = await fetchUsers();
    userArrayList.forEach(element => {
        if (element.userMailID === mailID) {
            if (element.password==password) {
                currentLoggedInUser = element;
                flag = false;
                alert("You Have successfully logged in ! ");
                (document.getElementById("welcome") as HTMLDivElement).style.display = "block";
                (document.getElementById("welcomemsg") as HTMLElement).innerHTML = `<h2>Hi ${currentLoggedInUser.userName}</h2>`;
                (document.getElementById("signoutbtn") as HTMLDivElement).style.display = "block";
                (document.getElementById("welcomemsg") as HTMLDivElement).style.display = "flex";
                (document.getElementById("loggedInPage") as HTMLDivElement).style.display = "flex";
                (document.getElementById("signinpage") as HTMLDivElement).style.display = "none";
                (document.getElementById("signuppage") as HTMLDivElement).style.display = "none";
                (document.getElementById("homepage") as HTMLDivElement).style.display = "none";
            }
            else{
                alert("Invalid Password")
            }
        }
    });
    if (flag) {
        alert("Enter valid User ID !");
    }
}

async function showMedicinePage() {
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
    <th>Expiry Date </th>
    <th>Action</th>
</tr>`
    const medicineList = await fetchMedicines();
    medicineList.forEach(medicine => {
        if (medicine.medicineCount > 0) {
            medicinedet.innerHTML += `<tr><td>${medicine.medicineName}</td><td>${medicine.medicineCount}</td><td>${medicine.medicinePrice}</td><td>${medicine.expiryDate.split("T")[0].split("-").reverse().join("/")}</td><td><button id="editbtn" onclick = "EditMedicine('${medicine.medicineID}')">Edit</button><button id="deletebtn" onclick="DeleteMedicine('${medicine.medicineID}')">Delete</button></td></tr>`
        }
    });
}
async function AddMedicine() {
    let mName = (document.getElementById("mName") as HTMLInputElement).value;
    let mQuantity = parseInt((document.getElementById("mQuantity") as HTMLInputElement).value);
    let mPrice = parseInt((document.getElementById("mPrice") as HTMLInputElement).value);
    let mExpiry = (document.getElementById("mExpiry") as HTMLInputElement).value;
    const newMedicine: MedicineDetails = { medicineID: 0, medicineName: mName, medicineCount: mQuantity, medicinePrice: mPrice, expiryDate: mExpiry };
    addMedicineDetails(newMedicine);
    alert("Medicine Added Successfully !");
    showMedicinePage();
}
async function EditMedicine(mId: number) {
    let mName = (document.getElementById("mName") as HTMLInputElement);
    let mQuantity = (document.getElementById("mQuantity") as HTMLInputElement);
    let mPrice = (document.getElementById("mPrice") as HTMLInputElement);

    const medicineList = await fetchMedicines();
    medicineList.forEach(list => {
        if (list.medicineID == mId) {
            editingID = mId;
            mName.value = list.medicineName;
            mQuantity.value = String(list.medicineCount);
            mPrice.value = String(list.medicinePrice);
        }
    }
    )
}

function Edit() {
    let mName = (document.getElementById("mName") as HTMLInputElement).value;
    let mQuantity = (document.getElementById("mQuantity") as HTMLInputElement).value;
    let mPrice = (document.getElementById("mPrice") as HTMLInputElement).value;
    let mExpiry = (document.getElementById("mExpiry") as HTMLInputElement).value;
    const medicine: MedicineDetails = {
        medicineID: editingID,
        medicineName: mName,
        medicineCount: Number(mQuantity),
        medicinePrice: Number(mPrice),
        expiryDate: mExpiry
    }
    updateMedicineDetails(editingID, medicine);
    alert("Updated successfully !")
}

function DeleteMedicine(mID: number) {
    let id = mID;
    deleteMedicineDetails(id);
}

async function takeOrderPage() {
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
    <th>Expiry Date</th>
    <th>Action</th>
</tr>`
    const medicineList = await fetchMedicines();
    medicineList.forEach(medicine => {
        if (medicine.medicineCount > 0) {
            medicinedet.innerHTML += `<tr><td>${medicine.medicineName}</td><td>${medicine.medicineCount}</td><td>${medicine.medicinePrice}</td><td>${medicine.expiryDate.split("T")[0].split("-").reverse().join("/")}</td><td><button id="takeorderbtn" onclick ="takeOrder('${medicine.medicineID}')">Buy</button></td></tr>`
        }
    });

}
let tempID: number;
async function takeOrder(mID: number) {
    alert("medicine selected successfully")
    tempID = Number(mID);

}

async function submitOrder() {
    let mcount: number = parseInt((document.getElementById("medicineCount") as HTMLInputElement).value);
    let flag: boolean = true;
    const medicineList = await fetchMedicines();
    medicineList.forEach(medicine => {
        if (Number(tempID) == medicine.medicineID) {
            flag = false;
            if (mcount > medicine.medicineCount) {
                alert("Your count exceeds the medicine Count !");
            }
            else {
                let tempprice: number = (mcount * medicine.medicinePrice);
                if (currentLoggedInUser.userBalance > tempprice) {
                    medicine.medicineCount -= mcount;
                    currentLoggedInUser.userBalance -= tempprice;
                    alert("You have successfully bought the Medicine !");
                    const newOrder: OrderDetails = { orderID: 0, medicineID: Number(tempID), medicineName: medicine.medicineName, quantity: mcount, price: tempprice, orderStatus: "Ordered" };
                    addOrderDetails(newOrder);
                    (document.getElementById("medicineList1") as HTMLTableElement).style.display = "block";
                    updateMedicineDetails(medicine.medicineID, medicine);
                    takeOrderPage();

                }
                else {
                    alert("kindly Check your Balance ! ");
                }
            }
        }
    });
    if (flag) {
        alert("Invalid ID!");
    }
}
async function CancelOrderPage() {
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
    const orderList = await fetchOrder();
    cancelorderdet.style.width = "fit-content";
    orderList.forEach(order => {
        if (order.orderStatus == "Ordered") {
            cancelorderdet.innerHTML += `<tr><td>${order.orderID}</td><td>${order.medicineID}</td><td>${order.medicineName}</td><td>${order.quantity}</td><td>${order.price}</td><td>${order.orderStatus}</td><td><button id="cancelbtn" onclick=CancelOrder("${order.orderID}")>Cancel</button></td></tr>`;
        }
    });

}
async function CancelOrder(orderID: number) {
    const orderList = await fetchOrder();
    orderList.forEach(async order => {
        if (orderID == order.orderID) {
            if (order.orderStatus == "Ordered") {
                order.orderStatus = "cancelled";
                currentLoggedInUser.userBalance += order.price;
                const medicineList = await fetchMedicines();
                medicineList.forEach(medicine => {
                    if (medicine.medicineID == order.medicineID) {
                        medicine.medicineCount += order.quantity;
                        updateMedicineDetails(medicine.medicineID, medicine);
                    }
                    let id: number = Number(orderID)
                    updateOrderDetails(id, order);
                });
                alert("Order is now Cancelled ! ");
            }
        }
    });

}

async function orderHistory() {
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
    const orderList = await fetchOrder();
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
    balancedet.innerHTML = `<h2>Your Balance : ${currentLoggedInUser.userBalance}</h2>`;
}
function TopUpPage() {
    (document.getElementById("medicinePage") as HTMLTableElement).style.display = "none";
    (document.getElementById("orderHistorypage") as HTMLTableElement).style.display = "none";
    (document.getElementById("takeOrderPage") as HTMLTableElement).style.display = "none";
    (document.getElementById("cancelOrderPage") as HTMLDivElement).style.display = "none";
    (document.getElementById("walletBalancePage") as HTMLDivElement).style.display = "none";
    (document.getElementById("topupPage") as HTMLDivElement).style.display = "block";
    let balancedet = (document.getElementById("walletBalance") as HTMLElement);
    balancedet.innerHTML = `<h2>Your Balance : ${currentLoggedInUser.userBalance}</h2>`;
    balancedet.style.display = "block"
}
function TopUp() {
    let amount = parseInt((document.getElementById("topUpAmount") as HTMLInputElement).value);
    if (amount > 0) {
        currentLoggedInUser.userBalance += amount;
        alert("your recharge has been successfull ! ");
    }
    else {
        alert("enter valid amount ")
    }

}






async function addUserDetails(UserDetails: UserDetails): Promise<void> {
    const response = await fetch(`http://localhost:5250/api/userdetails`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(UserDetails),
        });
    if (!response.ok) {
        throw new Error("Failed to add User Details");
    }

}

async function addMedicineDetails(MedicineDetails: MedicineDetails): Promise<void> {
    const response = await fetch(`http://localhost:5250/api/medicinedetails`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(MedicineDetails),
        });
    if (!response.ok) {
        throw new Error("Failed to add Medicine Details");
    }
}

async function addOrderDetails(OrderDetails: OrderDetails): Promise<void> {
    const response = await fetch(`http://localhost:5250/api/orderdetails`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(OrderDetails),
        });
    if (!response.ok) {
        throw new Error("Failed to add order Details");
    }

}

async function updateMedicineDetails(id: number, MedicineDetails: MedicineDetails): Promise<void> {
    const response = await fetch(`http://localhost:5250/api/medicinedetails/${id}`,
        {
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
}

async function updateOrderDetails(id: number, OrderDetails: OrderDetails): Promise<void> {
    const response = await fetch(`http://localhost:5250/api/orderdetails/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(OrderDetails),
        });
    if (!response.ok) {
        throw new Error("Failed to add User Details");
    }
    CancelOrderPage();
}

async function deleteMedicineDetails(id: number): Promise<void> {
    const response = await fetch(`http://localhost:5250/api/medicinedetails/${id}`,
        {
            method: 'DELETE'
        });
    if (!response.ok) {
        throw new Error('Failed to delete contact');
    }
    showMedicinePage();

}



async function fetchUsers(): Promise<UserDetails[]> {
    const response = await fetch(`http://localhost:5250/api/userdetails`);
    if (!response.ok) {
        throw new Error('Failed to fetch user details');
    }
    return await response.json();
}
async function fetchMedicines(): Promise<MedicineDetails[]> {
    const response = await fetch(`http://localhost:5250/api/medicinedetails`);
    if (!response.ok) {
        throw new Error('Failed to fetch user details');
    }
    return await response.json();
}
async function fetchOrder(): Promise<OrderDetails[]> {
    const response = await fetch(`http://localhost:5250/api/orderdetails`);
    if (!response.ok) {
        throw new Error('Failed to fetch user details');
    }
    return await response.json();
}