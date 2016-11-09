

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

	database.ref().push({
		name: $('#nameinput').val().trim(),
		destination: $('#destinationinput').val().trim(),
		time: $('#timeinput').val().trim(),
		frequency: $('#frequencyinput').val().trim(),
	});

	// Don't refresh the page!
	return false;
});

// listening to new children added to database
	firebase.database().ref().on("child_added", function(snapshot){
		$("#train-data").append("<tr><td>" + snapshot.val().name +
		 "</td>" + "<td>" + snapshot.val().destination + "</td>" +
		  "<td>" + snapshot.val().frequency + "</td>" + "<td>" + 
		  snapshot.val().time + "</td></tr>" );

	})


//Firebase watcher + initial loader
database.ref().on("value", function(snapshot) {

	// Log everything that's coming out of snapshot
	console.log(snapshot.val());
	console.log(snapshot.val().name);
	console.log(snapshot.val().destination);
	console.log(snapshot.val().time);
	console.log(snapshot.val().frequency);


// Handle the errors
}, function(errorObject) {

	console.log("Errors handled: " + errorObject.code);
});


var jumboHeight = $('.jumbotron').outerHeight();
function parallax(){
    var scrolled = $(window).scrollTop();
    $('.bg').css('height', (jumboHeight-scrolled) + 'px');
}

$(window).scroll(function(e){
    parallax();
});
