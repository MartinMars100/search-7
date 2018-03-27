'use strict';

// document.getElementById("therName").focus();

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

$("#therName").on('change', function() {
  $('#therName').removeClass('focusBright scroll');
  $('#therName').removeClass('nameBright'); // Remove bright (field empty) styling
  $('label[for="therName"]').removeClass('error scroll').text('Name:');
});

$("#therStreet").on('change', function() {
  $('#therStreet').removeClass('focusBright scroll');
  $('#therStreet').removeClass('nameBright'); // Remove bright (field empty) styling
  $('label[for="therStreet"]').removeClass('error scroll').text('Street:');
});

$("#therCity").on('change', function() {
  $('#therCity').removeClass('focusBright scroll');
  $('#therCity').removeClass('nameBright'); // Remove bright (field empty) styling
  $('label[for="therCity"]').removeClass('error scroll').text('City:');

  focusScrollClick();
});

$("#therState").on('change', function() {
  $('#therState').removeClass('focusBright scroll');
  $('#therState').removeClass('nameBright'); // Remove bright (field empty) styling
  $('label[for="therState"]').removeClass('error scroll').text('State:');

  focusScrollClick();
});

$("#therImage1").on('change', function() {
  var image = $("#therImage1").val();
  var imageNum = '1';
  checkImage(image, imageNum);
});

$("#therImage2").on('change', function() {
  var image = $("#therImage2").val();
  var imageNum = '2';
  checkImage(image, imageNum);
});

$("#therImage3").on('change', function() {
  var image = $("#therImage3").val();
  var imageNum = '3';
  checkImage(image, imageNum);
});

$("#therSvc1").on('change', function() {
  $('#therSvc1').removeClass('focusBright scroll');
  $('#therSvc1').removeClass('nameBright'); // Remove bright (field empty) styling
  $('label[for="therSvc1"]').removeClass('error scroll').text('Service 1:');

  focusScrollClick();
});

$("#therSvc2").on('change', function() {
  $('#therSvc2').removeClass('focusBright scroll');
  $('#therSvc2').removeClass('nameBright'); // Remove bright (field empty) styling
  $('label[for="therSvc2"]').removeClass('error scroll').text('Service 2:');

  focusScrollClick();
});

$("#therSvc3").on('change', function() {
  $('#therSvc3').removeClass('focusBright scroll');
  $('#therSvc3').removeClass('nameBright'); // Remove bright (field empty) styling
  $('label[for="therSvc3"]').removeClass('error scroll').text('Service 3:');

  focusScrollClick();
});

$("#therAbout").on('change', function() {
  $('#therAbout').removeClass('focusBright scroll');
  $('#therAbout').removeClass('nameBright'); // Remove bright (field empty) styling
  $('label[for="therAbout"]').removeClass('error scroll').text('About:');

  focusScrollClick();
});

$("#therDeals").on('change', function() {
  $('#therDeals').removeClass('focusBright scroll');
  $('#therDeals').removeClass('nameBright'); // Remove bright (field empty) styling
  $('label[for="therDeals"]').removeClass('error scroll').text('Deals and Discounts:');
});

function checkInputs() {            // Check for next empty field
  var nameInput = $("#therName").val(); // val is value of what user enters in this field
  var label;
  if (nameInput === '') {    // If the field is empty
    label = $('#therName');      // Return and change the styling to a white background
    return label;
  } 
  
  var streetInput = $("#therStret").val(); // val is value of what user enters in this field
  if (streetInput === '') {    // If the field is empty
    label = $('#therStreet');      // Return and change the styling to a white background
    return label;
  } 
  
  var cityInput = $("#therCity").val(); // val is value of what user enters in this field
  if (cityInput === '') {    // If the field is empty
    label = $('#therCity');      // Return and change the styling to a white background
    return label;
  } 
  
  var stateInput = $("#therState").val(); // val is value of what user enters in this field
  if (stateInput === '') {    // If the field is empty
    label = $('#therState');      // Return and change the styling to a white background
    return label;
  } 
  
  var image1Input = $("#therImage1").val(); // val is value of what user enters in this field
  if (image1Input === '') {    // If the field is empty
    label = $('#therImage1');      // Return and change the styling to a white background
    return label;
  } 
  
  var svc1Input = $("#therSvc1").val(); // val is value of what user enters in this field
  if (svc1Input === '') {    // If the field is empty
    label = $('#therSvc1');      // Return and change the styling to a white background
    return label;
  } 
  
  var aboutInput = $("#therAbout").val(); // val is value of what user enters in this field
  if (aboutInput === '') {    // If the field is empty
    label = $('#therAbout');      // Return and change the styling to a white background
    return label;
  } 
  
  var dealsInput = $("#therDeals").val(); // val is value of what user enters in this field
  if (dealsInput === '') {    // If the field is empty
    label = $('#therDeals');      // Return and change the styling to a white background
    return label;
  } 
  
  label = $('#submit');
  return label;
}

function checkErrors() {  // This function runs when enter key is pressed or submit button is clicked
  var nameInput = $("#therName").val();  // These errors change the field label to a red message
  if (nameInput === '' || nameInput.length === 0) {
    $('label[for="therName"]').addClass('error scroll').text("Enter Therapy Name");
  } else {
    $('label[for="name"]').removeClass('error scroll').text('Name:');
  }
  
  var streetInput = $("#therStreet").val();  // These errors change the field label to a red message
  if (streetInput === '' || streetInput.length === 0) {
    $('label[for="therStreet"]').addClass('error scroll').text("Enter Street Address");
  } else {
    $('label[for="therStreet"]').removeClass('error scroll').text('Address:');
  }
  
  var cityInput = $("#therCity").val();  // These errors change the field label to a red message
  if (cityInput === '' || cityInput.length === 0) {
    $('label[for="therCity"]').addClass('error scroll').text("Enter City");
  } else {
    $('label[for="therCity"]').removeClass('error scroll').text('City:');
  }
  
  var stateInput = $("#therState").val();  // These errors change the field label to a red message
  if (stateInput === '' || stateInput.length === 0) {
    $('label[for="therState"]').addClass('error scroll').text("Enter State");
  } else {
    $('label[for="therState"]').removeClass('error scroll').text('State:');
  }
  
  var image1Input = $("#therImage1").val();  // These errors change the field label to a red message
  if (image1Input === '' || image1Input.length === 0) {
    $('label[for="therImage1"]').addClass('error scroll').text("Enter Image 1");
  } else {
    $('label[for="therImage1"]').removeClass('error scroll').text('Image 1:');
  }
  
  var svc1Input = $("#therSvc1").val();  // These errors change the field label to a red message
  if (svc1Input === '' || svc1Input.length === 0) {
    $('label[for="therSvc1"]').addClass('error scroll').text("Enter Service 1");
  } else {
    $('label[for="therSvc1"]').removeClass('error scroll').text('Service 1:');
  }
  
  var aboutInput = $("#therAbout").val();  // These errors change the field label to a red message
  if (aboutInput === '' || aboutInput.length === 0) {
    $('label[for="therAbout"]').addClass('error scroll').text("Enter About Paragraph");
  } else {
    $('label[for="therAbout"]').removeClass('error scroll').text('About:');
  }
  
  var dealsInput = $("#therDeals").val();  // These errors change the field label to a red message
  if (dealsInput === '' || dealsInput.length === 0) {
    $('label[for="therDeals"]').addClass('error scroll').text("Enter Deals");
  } else {
    $('label[for="therDeals"]').removeClass('error scroll').text('Dealzzzz:');
  }
  
  
  if ($('label').hasClass('error')) {
    focusScroll(); // This is the focus scroll when enter pressed
  } else {
      $('#submit').addClass('focusBright');
      focusScroll();
  } // end else
  
  
} // end checkErrors

function focusScroll(){
  if ($('label[for="therDeals"]').hasClass('error') || $('#submit').hasClass('focusBright') ) { //If we are already at the bottom
  } else {
      scrollNow();
  }
  
  // The event.preventDefault will keep the post route from firing
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
  
  if ($("#therDeals").hasClass('focusBright')) { //If we are already at the bottom
  } else {
      scrollNow();
  }
}

function scrollNow() {
  if ($('.scroll').length > 0) {
    $('html, body').animate({    //Automatically Scrolls form up to error fields
       scrollTop: $(".scroll:first").offset().top - 100
    }, 500);
  }
}

// This is a promise function 
function checkImage(image, imageNum) {
  var id = '';
  switch (imageNum) {  
  case '1':
    id = '#therImage1';
    break;
  case '2':
    id = '#therImage2';
    break;
  case '3':
    id = '#therImage3';
    break;
  } // end switch
  
  var url = "/static/img/" + image;
  var jqxhr = $.get (url, function(){
  }).success(function() {
    $(id).removeClass('focusBright scroll');
    $(id).removeClass('nameBright'); // Remove bright (field empty) styling
    $('label[for=id]').removeClass('error scroll').text('Image ' + id + ':');
    focusScrollClick();
    checkErrors();
  }).fail(function() {
    alert("Image Failed to Load!")
    $(id).val('');
    focusScrollClick();
    checkErrors();
  })
}; // end checkImage function