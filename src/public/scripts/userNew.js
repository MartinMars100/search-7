'use strict';

document.getElementById("userName").focus();

$(document).keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13' ){   // If enter key is pressed
	  checkErrors();    
	event.preventDefault();
	} 
});

$('#submit').click(function() {   // If submit button is clicked
  checkErrors();
  if ($('label').hasClass('error')) {
    // return false;
  } else {
  } // end else
}); // end click functioun

$("#userName").on('change', function() {
  $('#userName').removeClass('focusBright scroll');
  $('#userName').removeClass('nameBright'); // Remove bright (field empty) styling
  $('label[for="userName"]').removeClass('error scroll').text('Name:');
  
  focusScrollClick();
  
});

$("#userEmail").on('change', function() {
  $('#userEmail').removeClass('focusBright scroll');
  $('#userEmail').removeClass('nameBright'); // Remove bright (field empty) styling
  $('label[for="userEmail"]').removeClass('error scroll').text('Email:');

  focusScrollClick();
});

function checkInputs() {            // Check for next empty field
  var nameInput = $("#userName").val(); // val is value of what user enters in this field
  var label;
  if (nameInput === '') {    // If the field is empty
    label = $('#userName');      // Return and change the styling to a white background
    return label;
  } 
  
  var emailInput = $("#userEmail").val(); // val is value of what user enters in this field
  if (emailInput === '') {    // If the field is empty
    label = $('#userEmail');      // Return and change the styling to a white background
    return label;
  } 
  
  var adminInput = $("#userAdmin").val(); // val is value of what user enters in this field
  if (adminInput === '') {    // If the field is empty
    label = $('#userAdmin');      // Return and change the styling to a white background
    return label;
  } 
  
  label = $('#submit');
  return label;
}

function checkErrors() {  // This function runs when enter key is pressed or submit button is clicked
  var nameInput = $("#userName").val();  // These errors change the field label to a red message
  if (nameInput === '' || nameInput.length === 0) {
    $('label[for="userName"]').addClass('error scroll').text("Enter User Name");
  } else {
    $('label[for="userName"]').removeClass('error scroll').text('Name:');
  }
  
  var emailInput = $("#userEmail").val();  // These errors change the field label to a red message
  if (emailInput === '' || emailInput.length === 0) {
    $('label[for="userEmail"]').addClass('error scroll').text("Enter Email");
  } else {
    $('label[for="userEmail"]').removeClass('error scroll').text('Email:');
  }
  
  if ($('label').hasClass('error')) {
    focusScroll(); // This is the focus scroll when enter pressed
  } else {
      $('#submit').addClass('focusBright');
      focusScroll();
  } // end else
} // end checkErrors

function focusScroll(){
  if ($('label.error').length <  1) {
    $("#submit").focus(); // Focus on the submit button
  } else {
      $(".error:first").focus(); // Focus on the first error, not selected, or blank field found
      event.preventDefault(); // Very Important - Keeps the Post Route from firing
  }
}

function focusScrollClick(){   //This is the scroll for clicking through boxes not pressing enter
  var labelReturn = checkInputs();
  labelReturn.addClass('focusBright scroll');
}
