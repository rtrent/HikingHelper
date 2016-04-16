
var invalidEmail = false;

function validEmail(email){
	return (email.indexOf("@") > 0) && (email.indexOf(".") > 0)
}


$(document).ready(function() {

	var autocomplete = new google.maps.places.Autocomplete(document.getElementById('location-input'), {types: ['(regions)']});

	$('#signup-form').on('submit', function(e) {
		e.preventDefault();
		var name = $('#name-input').val();
		var eaddress = $('#email-input').val();
		var location = $('#location-input').val();
		var distance = $('#distance-input').val();
		var time = $('#time-input').val();
		var length = $('#length-input').val();
		var checkedInputs = [];
		$('input:checked').each(function() {
    		checkedInputs.push($(this).attr('value'));
		});
		var checked = checkedInputs.join(", ");
		
		var confirmationString = '<p>Hello!  Thanks for signing up for Hiking Helper! Your helper will email you shortly to begin planning a personalized adventure for you.</p>';
		var signupArray = [
			'<p>Name: ' + name + '</p>',
			'<p>Email: ' + eaddress + '</p>',
			'<p>location: ' + location + '</p>',
			'<p>distance: ' + distance + '</p>',
			'<p>time: ' + time + '</p>',
			'<p>length: ' + length + '</p>',
			'<p>reasons: ' + checked + '</p>',
		];
		var signupString = signupArray.join("");
		
		if (!validEmail(eaddress)) {
			$('#email-input').css({ "border": '#FF0000 1px solid'});
			return;
		} else {
			$('#email-input').css({ "border": 'none'});
			$('button').text('Sending...');
			$.ajax({
				type: 'POST',
				url: 'https://mandrillapp.com/api/1.0/messages/send.json',
				data: {
					'key': 'W7gRFyLglBdYZfka0BbG_A',
					'message': {
						'from_email': 'rick@hikinghelper.com',
						'to': [
							{ 'email': eaddress,
										'type': 'to'
							}
						],
						'autotext': 'true',
						'subject': 'Thanks for signing up for Hiking Helper!',
						'html': confirmationString
					}
				}
			});

			//record
			$.ajax({
				type: 'POST',
				url: 'https://mandrillapp.com/api/1.0/messages/send.json',
				data: {
					'key': 'W7gRFyLglBdYZfka0BbG_A',
					'message': {
						'from_email': 'rick@hikinghelper.com',
						'to': [
							{ 'email': 'rick@hikinghelper.com',
										'name': 'Rick',
										'type': 'to'
							},
							{ 'email': 'indraneelpurohit+hikinghelper@gmail.com',
										'name': 'Indraneel',
										'type': 'to'
							}
						],
						'autotext': 'true',
						'subject': 'New Hiker to Help!',
						'html': signupString
					}
				}
			});

			setTimeout( function() {
				$('#signup-form > *').slideUp(800);
			}, 1000);
			setTimeout( function() {
				// $('#signup-form > *').slideUp(800);
				$('#signup-form').append('Welcome to Hiking Helper! You will receive an email from your helper shortly.')
			}, 2000);
	
		}
	});

});
