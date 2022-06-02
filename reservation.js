


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase


//make auth and firestore references
const auth = firebase.auth();
const db = firebase.firestore();


const frmData = $('#frmData');
const tblItems = $('#tblItems');

function addRec(doc) {

    tblItems.append(`<tr id="${doc.id}">    
        <td>${doc.data().name}</td>
        <td>${doc.data().number}</td>
        <td>${doc.data().venuelocation}</td>
        <td>${doc.data().hours}</td>
        <td>${doc.data().datetime}</td>
        <td>${doc.data().bandperformers}</td>
        <td>${doc.data().totalprice}</td>
  
        <td align="center" width="100px"><a href="javascript:void(0)" class="delete" id="${doc.id}">DELETE</a></td>
        <td align="center" width="100px"><a href="javascript:void(0)" class="edit" id="${doc.id}">EDIT</a></td>
  
        </tr>`)

    $('.delete').click(e => {
        e.stopImmediatePropagation();
        var id = e.target.id;
        db.collection('BandReservations').doc(id).delete();
    })

    $('.edit').click(e => {
        e.stopImmediatePropagation();
        var id = e.target.id;
        db.collection('BandReservations').doc(id).get().then(doc => {
            $('#name').val(doc.data().name);
            $('#number').val(doc.data().number);
            $('#venuelocation').val(doc.data().venuelocation);
            $('#hours').val(doc.data().hours);
            $('#datetime').val(doc.data().datetime);
            $('#bandperformers').val(doc.data().bandperformers);
            $('#totalprice').val(doc.data().totalprice);
            $('#document').val(doc.id);
        });
    })
}

$('#update').on('click', () => {
    var id = $('#document').val();

    db.collection('BandReservations').doc(id).set({
        name: $('#name').val(),
        number: $('#number').val(),
        venuelocation: $('#venuelocation').val(),
        hours: $('#hours').val(),
        datetime: $('#datetime').val(),
        bandperformers: $('#bandperformers').val(),
        totalprice: $('#totalprice').val(),
    }, { merge: true })
})

//store
frmData.on('submit', (e) => {
    e.preventDefault();

    db.collection('BandReservations').add({
        name: $('#name').val(),
        number: $('#number').val(),
        venuelocation: $('#venuelocation').val(),
        hours: $('#hours').val(),
        datetime: $('#datetime').val(),
        bandperformers: $('#bandperformers').val(),
        totalprice: $('#totalprice').val(),


    })

    $('#name').val('');
    $('#number').val('');
    $('#venuelocation').val('');
    $('#hours').val('');
    $('#datetime').val('');
    $('#bandperformers').val('');
    $('#totalprice').val('');
    alert('Your reservation has been created.');

})

db.collection('BandReservations').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == "added") {
            addRec(change.doc)
        }

        else if (change.type == "removed") {
            var id = change.doc.id;
            $('#' + id).remove();

        }
        else if (change.type == "removed") {
            var id = change.doc.id;
            $('#' + id).remove();

        }
        else if (change.type == "modified") {
            var id = change.doc.id;
            $('#' + id).remove();
            addRec(change.doc);

        }
    })
})
