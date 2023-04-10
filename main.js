let errors = [];
document.getElementById("success").style.display = "none";
document.getElementById("error-list").style.display = "none";
document.getElementById("betalingswijze").style.display = "none";

function validatieForm() {
    errors = [];
    //voornaam
    checkEmptyField("voornaam", "Het veld voornaam is vereist.");
    //naam
    checkEmptyField("naam", "Het veld naam is vereist.");
    //gebruikersnaam
    checkEmptyField("gebruikersnaam", "het veld gebruikersnaam is vereist");
    //email
    if (document.getElementById("email").value == "") {
        errors.push("Het veld email is vereist.");
    } else if (!validatieEmail(document.getElementById("email").value)) {
        errors.push("E-mailadres is niet correct.");
    }
    //wachtwoord
    if (document.getElementById("wachtwoord".value == "")) {
        errors.push("Het veld wachtwoord is vereist.");
    } else if (document.getElementById("wachtwoord").value < 7) {
        errors.push("Het wachtwoord moet langer zijn dan 7 tekens.");
    }
    if (document.getElementById("herhaalWachtwoord").value == "") {
        errors.push("Het veld herhaal wachtwoord is vereist.")
    } else if (document.getElementById("herhaalWachtwoord").value != document.getElementById("wachtwoord").value) {
        errors.push("Je wachtwoorden komen niet overeen.")
    }
    //adres
    checkEmptyField("adres", "Adres is vereist.");
    //land
    checkEmptyField("land", "Land is vereist.");
    //provincie
    checkEmptyField("provincie", "Provincie is vereist.");
    //postcode
    checkPC("postcode");
    //algemene voorwaarden
    if (document.getElementById("voorwaarden").checked == false) {
        errors.push("Je moet de algemene voorwaarden accepteren.");
    }
    //betaling
    validatiePayment();
    //show errors
    if (errors.length > 0) {
        document.getElementById("error-list").innerHTML = "<h4 class='alert-heading'>Yikes, errors..</h4>";
        errors.forEach(addErrorToList);
        document.getElementById("error-list").style.display = "block";
        document.getElementById("success").style.display = "none";
        document.getElementById("betalingswijze").style.display = "none";
    } else {
        document.getElementById("error-list").style.display = "none";
        document.getElementById("success").style.display = "block";
        document.getElementById("betalingswijze").style.display = "block";
    }
}

function checkEmptyField(name, message) {
    if (document.getElementById(name).value == "") {
        errors.push(message);
    }
}

function checkPC(name) {
    let x = document.getElementById(name).value;
    if (isNaN(parseInt(x))) {
        errors.push("Postcode is vereist.");
    } else {
        if (x < 1000 || x > 9999) {
            errors.push("De waarde van postcode moet tussen 1000 en 9999 liggen.");
        }
    }
}

function addErrorToList(item, index) {
    document.getElementById("error-list").innerHTML += item + "<br/>";
}

function validateEmail() {
    //https://www.w3resource.com/javascript/form/email-validation.php
    let mail =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return mail.test(String(email).toLowerCase());
}

function validatiePayment(option) {
    let radios = document.getElementsByName("betalingmethode");
    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            document.getElementById("betalingswijze-msg").innerHTML = "Je betalingswijze is " + radios[i].value + ".";
            break;
        }
    }
}