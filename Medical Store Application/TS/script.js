var staticUserID = 1001;
var staticMedicineID = 101;
var staticOrderID = 101;
var currentLoggedInUser;
var UserDetails = /** @class */ (function () {
    function UserDetails(paramUserName, paramuserAge, paramuserPhoneNumber) {
        this.UserId = "UI" + (staticUserID++);
        this.UserName = paramUserName;
        this.UserAge = paramuserAge;
        this.UserPhoneNumber = paramuserPhoneNumber;
        this.Balance = 500;
    }
    return UserDetails;
}());
var userArrayList = new Array();
userArrayList.push(new UserDetails("Hemanth", 23, 9789011226));
userArrayList.push(new UserDetails("Harish", 23, 9445153060));
var MedicineDetails = /** @class */ (function () {
    function MedicineDetails(paramMedicinename, paramMedicineCount, paramPrice) {
        this.MedicineID = "MID" + (staticMedicineID++);
        this.MedicineName = paramMedicinename;
        this.MedicineCount = paramMedicineCount;
        this.Price = paramPrice;
    }
    return MedicineDetails;
}());
var medicineList = new Array();
medicineList.push(new MedicineDetails("Paracetomol", 5, 50));
medicineList.push(new MedicineDetails("Colpal", 5, 60));
medicineList.push(new MedicineDetails("Stepsil", 5, 70));
medicineList.push(new MedicineDetails("Iodex", 5, 80));
medicineList.push(new MedicineDetails("Acetherol", 5, 100));
var OrderDetails = /** @class */ (function () {
    function OrderDetails(parammedcineID, parammedicineName, paramprice) {
        this.OrderID = "OID" + (staticOrderID++);
        this.MedicineID = parammedcineID;
        this.MedicineName = parammedicineName;
        this.Price = paramprice;
    }
    return OrderDetails;
}());
function homesignin() {
    document.getElementById("signinpage").style.display = "block";
    document.getElementById("homepage").style.display = "none";
}
function homesignup() {
    document.getElementById("signuppage").style.display = "block";
    document.getElementById("homepage").style.display = "none";
}
function signUp() {
    var username = document.getElementById("signUpUserName").value;
    var age = parseInt(document.getElementById("signUpUserName").value);
    var phoneNumber = parseInt(document.getElementById("signUpUserName").value);
    userArrayList.push(new UserDetails(username, age, phoneNumber));
    alert("Saved Successfully !");
    document.getElementById("signuppage").style.display = "none";
    document.getElementById("homepage").style.display = "block";
}
function signIn() {
    var userID = document.getElementById("signInUserID").value.toUpperCase();
    var flag = true;
    userArrayList.forEach(function (element) {
        if (element.UserId === userID) {
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
var tempCount = 0;
function showMedicine() {
    var medicinedet = document.getElementById("medicineList");
    if (tempCount < medicineList.length) {
        document.getElementById("medicineList").style.display = "block";
        medicineList.forEach(function (medicine) {
            if (medicine.MedicineCount > 0) {
                tempCount++;
                medicinedet.innerHTML += "<tr><td>".concat(medicine.MedicineID, "</td><td>").concat(medicine.MedicineName, "</td><td>").concat(medicine.MedicineCount, "</td><td>").concat(medicine.Price, "</td></tr>");
            }
        });
    }
}
tempCount = 0;
function takeOrder() {
    showMedicine();
    var takeorder = document.getElementById("takeorder");
    takeorder.style.display = "flex";
    var mID = document.getElementById("medicineID").value.toUpperCase();
    var mcount = parseInt(document.getElementById("medicineCount").value);
    var flag = true;
    medicineList.forEach(function (medicine) {
        if (mID === medicine.MedicineID) {
            flag = false;
            if (mcount > medicine.MedicineCount) {
                alert("Your count exceeds the medicine Count !");
            }
            else {
                var tempprice = (mcount * medicine.Price);
                if (currentLoggedInUser.Balance > tempprice) {
                    medicine.MedicineCount -= mcount;
                    alert("You have successfully bought the Medicine !");
                    document.getElementById("medicineList").style.display = "none";
                }
                else {
                    alert("kindly Check your Balance ! ");
                }
            }
        }
    });
    if (flag) {
        alert("enter valid Medicine ID !");
    }
    document.getElementById("medicineList").style.display = "block";
}
function orderHistory() {
}
