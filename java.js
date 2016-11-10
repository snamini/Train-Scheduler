

// ========================================== START CODING BELOW!!

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCU7VvoKzIQX1hZqVifEZpTGz-iuPVDnsY",
    authDomain: "train-scheduler-9285b.firebaseapp.com",
    databaseURL: "https://train-scheduler-9285b.firebaseio.com",
    storageBucket: "train-scheduler-9285b.appspot.com",
    messagingSenderId: "760836903965"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Capture Button Click
$("#submit").on("click", function() {

	// Code in the logic for storing and retrieving the train schedule.
	// provide initial data to your Firebase database.
	var thisobject = {
		name: $('#nameinput').val().trim(),
		destination: $('#destinationinput').val().trim(),
		frequency: $('#frequencyinput').val().trim(),
		time: $('#timeinput').val().trim(),
	}
	console.log("thisobject***************",thisobject)

	database.ref().push(thisobject);

	// Don't refresh the page!
	return false;
});


// listening to new children added to database
	firebase.database().ref().on("child_added", function(snapshot){


            var newTrainName = snapshot.val().train;
            var newDestination = snapshot.val().destination;
            var newFirstTrainTime = snapshot.val().trainTime;
            var newFrequency = snapshot.val().frequency;

            // Moment ============================================================


		var tFrequency = snapshot.val().frequency;
		var tFirstTrain = snapshot.val().time;
		
		// First Time (pushed back 1 year to make sure it comes before current time)
		var firstTimeConverted = moment(tFirstTrain,"hh:mm").subtract(1, "years");
		console.log(firstTimeConverted);

		// Current Time
		var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

		// Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		// Time apart (remainder)
		var tRemainder = diffTime % tFrequency;
		console.log(tRemainder);


		// var nextTrain = moment().add(tMinutesTillTrain, "minutes");
		// nextTrainLLL = moment(nextTrain).format("hh:mm");
		// console.log("ARRIVAL TIME: " + nextTrainLLL)
		// console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))


		// Minute Until Train
		var tMinutesTillTrain = tFrequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train Arrival Time
		var nextTrain = moment().add(tMinutesTillTrain, "minutes");
                console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));

		// 		// Next Train
		// var nextTrain = currentTime + tMinutesTillTrain;
		// // nextTrain = moment(nextTrain).format("hh:mm");
		// // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))


		$("#train-data").append("<tr><td>" + snapshot.val().name +
		 "</td>" + "<td>" + snapshot.val().destination + "</td>" +
		  "<td>" + tFrequency + "</td>" 
		  + "<td>" + nextTrain + "</td>"
		  + "<td>" + tMinutesTillTrain + "</td></tr>" );

	// })

	 }); // End database.ref().on('value', function(snapshot){
