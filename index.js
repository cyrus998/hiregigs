const firebaseConfig = {
    apiKey: "AIzaSyCMSJ40960AFjKkbtr7cUzgw1jfdjyvXXM",
    authDomain: "cyrusgg-feeb1.firebaseapp.com",
    databaseURL: "https://cyrusgg-feeb1-default-rtdb.firebaseio.com",
    projectId: "cyrusgg-feeb1",
    storageBucket: "cyrusgg-feeb1.appspot.com",
    messagingSenderId: "324727266648",
    appId: "1:324727266648:web:d3754ccd0940c9b87f192d"
};

// initialize the firebase
firebase.initializeApp(firebaseConfig);

var cyrusgg = firebase.database().ref("bandReservation");

document.getElementById("frmData").addEventListener("submit", submitForm);


function submitForm(e) {
    
    var bandperformers = getElementVal("bandperformers");
    var name = getElementVal("name");
    var number = getElementVal("number");
    var venuelocation = getElementVal("venuelocation");
    var hours = getElementVal("hours");
    var datetime = getElementVal("datetime");
    var totalprice = getElementVal("totalprice");

    saveMessages(bandperformers, name, number, venuelocation, hours, datetime, totalprice);

    $('#bandperformers').removeAttr('bandperformers');
    $('#name').removeAttr('value');
    $('#number').removeAttr('value');
    $('#venuelocation').removeAttr('value');
    $('#hours').removeAttr('value');
    $('#datetime').removeAttr('datetime');
    $('#totalprice').removeAttr('value');

    alert('booking added');

}


const saveMessages = (bandperformers, name, number, venuelocation, hours, datetime, totalprice) => {

    var newGigForm = cyrusgg.push();

    newGigForm.set({
        
        bandperformers: bandperformers,
        name: name,
        number: number,
        venuelocation: venuelocation,
        number: number,
        hours: hours,
        datetime: datetime,
        totalprice: totalprice,
    });
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};
