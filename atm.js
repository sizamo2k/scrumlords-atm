/* Creating a program that simulates a functional ATM */

//function 1 

//bank accounts that are already exisiting

let currentAcctIndex;
//creating global variable to put the current account I am logged into with 
myStorage = localStorage;
//setting my storage to local
let bankAccounts = [];
//creating an empty array to append accounts onto

if (window.localStorage["bankAccounts"] !== undefined) {
    bankAccounts = JSON.parse(window.localStorage.getItem('bankAccounts'));
}
// If my bankAccounts array is not equal to undefined then parse the bankAccounts into my array (convert from a string to an object)


function getAccount() {
    //login to an exisiting bankAccount
    document.getElementById("newPin").style.display = "block";
    //Hide the newpin menu until someone has "logged in" with a exisiting pin
    let pin = parseFloat(document.getElementById("pinput").value);
    //making a variable for the pin to be read from the HTML input box with the ID pinput

    for (let i = 0; i < bankAccounts.length; i++) {

        if (bankAccounts[i].pin === pin) {
            document.getElementById("account").innerHTML = bankAccounts[i].balance;
            currentAcctIndex = i;
            window.localStorage.setItem('currentAcctIndex', i);
            //if the bankAccounts pin is within the localstorage of exisiting PINs then allow them to log in
            return;
            //  return bankAccounts[i]; 
        }
    }
    alert("Invaliad PIN!");

    if (confirm("Would you like to create an account?")) {
        window.location = "index.html";
    }
    //else alert the user that the PIN is either invalid and prompt for them to make a new account
}

function createAccount() {
    //I need to create an option that allows the user to create a bank account with a unqiue pin
    let pin = parseFloat(document.getElementById('getAcct').value);
    let newAccount = {

        "pin": pin,
        "balance": 0
    };
    //allow for a user to make a new account to be pushed into my array
    for (let i = 0; i < bankAccounts.length; i++) {

        if (bankAccounts[i].pin === pin) {
            alert('You already have an account!');

            if (confirm("Would like access your account?")) {
                window.location = "atm.html"
            }

            return;
        }
        //if the newPin they try to make a NEW account with already exisits alert the user that they already have a new account then ask them if they would like to access it

    }


    bankAccounts.push(newAccount);
    window.localStorage.setItem('bankAccounts', JSON.stringify(bankAccounts));

    alert('Your Account Has Been Created!');

    if (confirm("Would like access your account?")) {
        window.location = "atm.html"
    }
    return;
} // if it makes it to this point it will create the user a new account and append the account to my array

//create a function to withdraw money into the indexed account

function withdraw() {

    currentAcctIndex = parseFloat(window.localStorage.getItem('currentAcctIndex'));
    //pulls the currently logged into account to be able to make a withdraw from that account only
    if (confirm("This ATM charges $3.95 per transaction.")) {
        message = "Agree";
    } else {
        return;
    }
    //warning for ATM fees, if they hit Agree then it will go ahead and allow them to proceed with transaction




    let amount = parseFloat(document.getElementById("withd").value);
    //created a variable to refer to the amount they would like to withdraw
    if (amount <= 200 && (amount % 20 === 0) && (amount < bankAccounts[currentAcctIndex].balance.toFixed(2))) {
        bankAccounts[currentAcctIndex].balance -= amount + 4.95;
        //if they accept the confirm above and the amount follows the sudo code right below then allow them to make the transaction and MINUS 4.95 from the account

        window.localStorage.setItem('bankAccounts', JSON.stringify(bankAccounts));
        //log the balance to local storage if so

        document.getElementById("newBalance").innerHTML = bankAccounts[currentAcctIndex].balance.toFixed(2) //.toFixed(2) was used for only placing two points after the decimal
            //Amount must be increments of $20 max of $200
            //for (x = 0; x < 200; x ++) {
            // if x  < $200 let it happen

    } else {
        alert('The max limit is $200 and must be increments of $20!');
    }
} //else NO } 

//create a function to deposit money into the indexed account

function deposit() {

    currentAcctIndex = parseFloat(window.localStorage.getItem('currentAcctIndex'));

    if (confirm("This ATM charges $3.95 per transaction.")) {
        message = "Agree";
    } else {
        return;
    } //warning for ATM fees, if they hit Agree then it will go ahead and allow them to follow through with the transaction


    let addMoney = parseFloat(document.getElementById("depo").value);
    //declare and assign a value to a variable that is used when depositing money into the account

    if (addMoney <= 200 && (addMoney % 20 === 0) && (addMoney != 0)) { // if the amount they addMoney with is <= 200, a incremnent of 20, and the value is not 0 then do the following 
        bankAccounts[currentAcctIndex].balance += addMoney - 4.95;
        //deposit the amount into the account we are indexed into and update the balance in local storage
        window.localStorage.setItem('bankAccounts', JSON.stringify(bankAccounts));

        document.getElementById("updateBalance").innerHTML = bankAccounts[currentAcctIndex].balance.toFixed(2)
    } else {
        alert('The max limit is $200 and must be increments of $20!');
    } // else alert the user the parameters of the amounts they can deposit and withdraw
}

//create a function to check the balance of the currentAccount

function getBalance() {

    currentAcctIndex = parseFloat(window.localStorage.getItem('currentAcctIndex'));

    document.getElementById("currentBalance").innerHTML = bankAccounts[currentAcctIndex].balance.toFixed(2) //show the value of the balance in the currentIndexedAcct with .toFixed(2) two decimal spaces.
}


//function 6 Change pin of the bank account

function changePin() {

    currentAcctIndex = parseFloat(window.localStorage.getItem('currentAcctIndex'));

    let oldAcctIndex = currentAcctIndex;
    //declaring are assining a variable to the oldAcctIndex

    //function to remove old pin and allowing it to be reused
    function removePIN(index) {
        bankAccounts.splice(index, 1);
        window.localStorage.setItem("bankAccounts", JSON.stringify(bankAccounts));
        currentAcctIndex = parseFloat(window.localStorage.getItem('currentAcctIndex'));

    }

    let pin = parseFloat(document.getElementById('changePin').value);
    let newPin = {

        "pin": pin,
        "balance": bankAccounts[currentAcctIndex].balance.toFixed(2)
            //this allows the newPin that has been changed to be updated and the balance to be brought over from the old account.
    };
    removePIN(oldAcctIndex);
    for (let i = 0; i < bankAccounts.length; i++) {

        if (bankAccounts[i].pin === pin) {
            alert('You already have an account!');

            if (confirm("Would like access your account?")) {
                window.location = "atm.html"
            }

            return;
        }
    } // this is done to delete the old PIN and make this number reuseable


    bankAccounts.push(newPin);
    //push the changes to the bankAccounts array
    window.localStorage.setItem('bankAccounts', JSON.stringify(bankAccounts));
    //store it in local storage

    alert('Your PIN Has Been Changed!');

    if (confirm("Would like access your account?")) {
        window.location = "atm.html"
    }
    return;
    //done
}

//NOTES FOR IMPROVMENTS
// function transactionValid(amount){
//     return (amount <= 200 && (amount % 20 === 0));
// }