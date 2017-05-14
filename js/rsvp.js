var API_URL = "https://jackieandbradenrsvp.firebaseio.com/.json";
var FORM_LEN = 3;

var guest_count = 0;

function sendRSVP(json) {
	$.ajax({
		url: API_URL,
		type: 'POST',
		data: JSON.stringify(json),
		success: function (response) {
			console.log("RSVPd",response);
		}
	});
}

function validateForm(form_data) {
	if(form_data.length < FORM_LEN) {
		$(".form-error").show();
		return false;
	}
	else {
		$(".form-error").hide();
		return true;
	}
}

function formatToJson(form_data) {
	var json = {};
	for(var index in form_data) {
		var key = form_data[index].name;
		json[key] = form_data[index].value;
	}
	return json;
}

function onSubmitForm($event) {
	var form_data = $("#rsvp_form").serializeArray();
	var valid = validateForm(form_data);
	console.log(form_data);
	console.log("VALID?",valid);
	if(valid) {
		var json = formatToJson(form_data);
		console.log(json);
		sendRSVP(json);
	}
	$event.preventDefault();
}

$(document).ready(function () {
	$("#rsvp_form").submit(function($event){
		onSubmitForm($event);
	});
	$("#add_guest").click(function() {
		onAddGuest();
	});
});