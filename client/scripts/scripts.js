$(document).ready(function(){

	var $contacts = $('#contacts');
	var $icons = $('.fa');
	var $saveButton = $('#save');
	var $title = $('.title');
	var $name = $('#name');
	var $phone = $('#phone');
	var $email = $('#email');
	var $message = $('#message');
	var $dropMenu = $('.drop-down-menu');

	var contactTemplate = $('#contactTemplate').html();

	function addContact(contact){
		$contacts.append(Mustache.render(contactTemplate, contact))
	}

	function clearForm(){
		$name.val('');
		$phone.val('');
		$email.val('');
		$message.val('');
	}

	//GETs a list of contacts from the api to display on screen
	$.ajax({
		type:'GET',
		url:'/api/contacts',
		success:function(contacts){
			$.each(contacts, function(i, contact){
				addContact(contact);
			})
		}
	})

	//Saves a new contact to the local database by sending a POST to the api
	$saveButton.on('click', function(){
		var contact = {
			name: $name.val(),
			phone: $phone.val(),
			email: $email.val(),
			message: $message.val()
		}

		$.ajax({
			type:'POST',
			url:'/api/contacts',
			data: contact,
			success:function(newContact){
				addContact(newContact);
			},
			error:function(){
				alert('Error saving contact.');
			}
		})
	})

	//DELETEs a contact when trash icon is clicked.
	$contacts.delegate('.remove', 'click', function(){

		var $tr = $(this).closest('tr');
		var $drop = $(this).parent().parent().next();

		$.ajax({
			type:'DELETE',
			url:'/api/contacts/' + $(this).attr('data-id'),
			success:function(){
				$tr.remove();
				$drop.remove();
			},
			error:function(){
				alert('Problem deleting contact.');
			}
		})
	})

	// Changes pencil icon to 'x' icon
	// Removes sav button; Adds check icon
	// Fills form with contact info
	$contacts.delegate('.fa-pencil', 'click', function(){
		var $contactsTh = $(this).parent().parent().next().children();
		var $clickableIcons = $(this).parent().parent().find('i');
		var $allIcons = $(this).parent().parent().parent().find('i');
		var $checkIcon = $(this).parent().prev().find('i');

		$(this).removeClass('fa-pencil').addClass('fa-times');
		$title.html('Edit Contact');

		$clickableIcons.addClass('active')

		$name.val( $contactsTh.find('span.name').html());
		$phone.val( $contactsTh.find('span.phone').html());
		$email.val( $contactsTh.find('span.email').html());
		$message.val( $contactsTh.find('span.message').html());

		$saveButton.addClass('hidden');
		$checkIcon.removeClass('hidden');

		$allIcons.not($clickableIcons).addClass('hidden');

	})

	// Clears form input fields
	// Resets form to original state
	$contacts.delegate('.fa-times', 'click', function(){
		var $checkIcon = $(this).parent().prev().find('i');
		var $allIcons = $(this).parent().parent().parent().find('i');

		$(this).removeClass('fa-times').addClass('fa-pencil');

		$title.html('Create Contact');

		clearForm();

		$allIcons.not('.fa-check').removeClass('hidden');

		$saveButton.removeClass('hidden');
		$checkIcon.addClass('hidden');
	})

	// Sends PUT request to the api
	// Updates dom to reflect the changed data
	$contacts.delegate('.fa-check', 'click', function(){
		var $tr = $(this).parent().parent();
		var $droptr = $(this).parent().parent().next();
		var $allIcons = $(this).parent().parent().parent().find('i');
		var $checkIcon = $(this);
		var $closeIcon = $(this).parent().next().find('i');

		var contact = {
			name: $name.val(),
			phone: $phone.val(),
			email: $email.val(),
			message: $message.val()
		};

		$.ajax({
			type:'PUT',
			url:'/api/contacts/' + $(this).attr('data-id'),
			data:contact,
			success:function(){
				$title.html('Create Contact');

				//Replace drop down info.
				$droptr.find('span.name').html(contact.name);
				$droptr.find('span.phone').html(contact.phone);
				$droptr.find('span.email').html(contact.email);
				$droptr.find('span.message').html(contact.message);

				//Replace table info
				$tr.find('span.name').html(contact.name);
				$tr.find('span.phone').html(contact.phone);

				clearForm();

				$allIcons.not('.fa-check').removeClass('hidden');

				$checkIcon.addClass('hidden');

				$closeIcon.removeClass('fa-times').addClass('fa-pencil');
				$saveButton.removeClass('hidden');
			},
			error:function(){
				alert('Problem updating contact.')
			}
		})
	})

	//Shows drop down menu
	$contacts.delegate('.down', 'click', function(){
		var element = $(this)
		var $tr = $(this).parent().parent().next()

		if(element.hasClass('fa-sort-desc')){
			element.removeClass('fa-sort-desc');
			element.addClass('fa-sort-asc');
			$tr.removeClass('hidden');
		}else{
			element.removeClass('fa-sort-asc');
			element.addClass('fa-sort-desc');
			$tr.addClass('hidden');
		}
	})
})
