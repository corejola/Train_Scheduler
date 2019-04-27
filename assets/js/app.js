// Psuedo Code:
//1.0 Set up Firebase for Train information

//2.0 Train information input by user
//2.1 Train information pushed as an object to HW specific Firebase
//2.2 Time conversion for Military based time input to 12hr system

//3.0 Train information displayed onto table
//3.1 Train data pulled from Firebase and displayed onto table using database.ref().on("child_added", function(snapshot))
//3.1.A Train name - Firebase info
//3.1.B Destination
//3.1.C Frequency of Train
//3.1.D Next arrival - converted to 13hr time
//3.1.E Minutes to Arrival - calculated value
//3.1.F Next Train Arrival Time - determined based on the frequency
//3.2

$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAbXXQpgtddMhBthgdjN37W0JcQcmN1D9g",
        authDomain: "train-schedule-6f21d.firebaseapp.com",
        databaseURL: "https://train-schedule-6f21d.firebaseio.com",
        projectId: "train-schedule-6f21d",
        storageBucket: "train-schedule-6f21d.appspot.com",
        messagingSenderId: "291733618230"
    };

    firebase.initializeApp(config);
    var database = firebase.database();

    var train = "";
    var dest = "";
    var startTime = "";
    var frequency = 0;
    var currentTime = moment().format("hh:mm:ss a");
    // console.log(currentTime)

    $(document).on("click", "#addTrain", function () {
        event.preventDefault();
        //capture user input
        train = $('#trainInput').val().trim();
        dest = $('#destInput').val().trim();
        startTime = $('#timeInput').val().trim();
        frequency = $('#frequency').val();
        //push train information into database
        database.ref().push({
            train: train,
            dest: dest,
            startTime: startTime,
            frequency: frequency
        });

        // form reset
        $('#trainInput').val("");
        $('#destInput').val("");
        $('#timeInput').val("");
        $('#frequency').val("");
    });

    database.ref().on("child_added", function (snapshot) {
        // storing the snapshot.val() in a variable for convenience
        var sv = snapshot.val();
        console.log(sv)
        // console.log(sv.role)
        // console.log(sv.startDate)
        // console.log(sv.monthlyRate)

        // month's worked is today's date minus start date

        // var dateFormat = moment(sv.startDate).format("MM/DD/YYYY");
        // console.log(dateFormat);
        // var monthsWorked = moment().diff(sv.startDate, 'M');
        // console.log(monthsWorked)

        var tRow = $('<tr>').append(
            $('<th>').text(sv.train),
            $('<td>').text(sv.dest),
            $('<td>').text(sv.frequency + " mins"),
            $('<td>').text(sv.startTime),
            $('<td>').text("TBD"),
            $('<td>').text("TBD"),
        );

        $('.main-table > tbody').append(tRow)

    });

    $('#currentTime').text(currentTime)
});

