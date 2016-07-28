$(document).ready(function(){

	var $contacts = $('#contacts');
	var $name = $('#name');
	var $phone = $('#phone');
	var $email = $('#email');
	var $message = $('#message');
	var $dropMenu = $('.drop-down-menu');

	var contactTemplate = $('#contactTemplate').html();

	function addContact(contact){
		$contacts.append(Mustache.render(contactTemplate, contact))
	}

	//GETs a list of contacts from the api to display on screen
	$.ajax({
		type:'GET',
		url:'/api/contacts',
		success:function(contacts){
			$.each(contacts, function(i, contact){
				addContact(contact);
			})
		},
		error:function(){
			alert('Error loading contacts.')
		}
	})

	//Saves a new contact to the local database by sending a POST to the api
	$('#save').on('click', function(){
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

	$contacts.delegate('.edit', 'click', function(){

		var $nameInput = $('#name')
		var $phoneInput = $('#phone');
		var $emailInput = $('#email');
		var $messageInput = $('#message');



	})

	$contacts.delegate('.down', 'click', function(){
		var element = $(this)

		if(element.hasClass('fa-sort-desc')){
			element.removeClass('fa-sort-desc');
			element.addClass('fa-sort-asc');
		}else{
			element.removeClass('fa-sort-asc');
			element.addClass('fa-sort-desc');
		}
	})

})
