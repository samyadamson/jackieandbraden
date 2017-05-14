var API_URL = "https://jackieandbraden-df9e4.firebaseio.com/.json";

var FORM_LEN = 3;

var guest_count = 0;

function sendRSVP(json) {
	$.ajax({
		url: API_URL,
		type: 'POST',
		data: JSON.stringify(json),
		success: function (response) {
			$("#rsvp_form").hide()
			$("#rsvp_form_success").show();
		}
	});
}

function validateForm(form_data) {
	if (form_data.length < FORM_LEN+guest_count) {
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
	for (var index in form_data) {
		var key = form_data[index].name;
		if(key.includes("[]")) {
			key = key.replace("[]","");
			if(!json[key])
				json[key] = [];
			json[key].push(form_data[index].value);
		}
		else
			json[key] = form_data[index].value;
	}
	return json;
}

function onSubmitForm($event) {
	var form_data = $("#rsvp_form").serializeArray();
	var valid = validateForm(form_data);
	console.log(form_data);
	console.log("VALID?", valid);
	if (valid) {
		var json = formatToJson(form_data);
		console.log(json);
		sendRSVP(json);
	}
	$event.preventDefault();
}

function generateGuestListItem() {
	return "<li class='input-group guest-list-item'><input type='text' class='form-control' placeholder='name' name='guest[]'><span class='input-group-btn'><button type='button' class='btn btn-danger btn-x remove_guest'>X</button></span></li>"
}

function onAddGuest() {
	guest_count++;
	$("#guest_list").append(generateGuestListItem());
	setTimeout(function () {
		$(".remove_guest").click(function ($event) {
			guest_count--;
			onRemoveGuest($event,this);
		});
	},100);
}

function onRemoveGuest($event,fuck) {
	try {
		var index = $(".remove_guest").index( fuck )
		$(".guest-list-item")[index].remove();
	}
	catch(e){}
}

$(document).ready(function () {
	$("#rsvp_form").submit(function ($event) {
		onSubmitForm($event);
	});
	$("#add_guest").click(function () {
		onAddGuest();
	});

});