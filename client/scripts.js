$(document).ready(function(){

	var $contacts = $('#contacts');
	var $name = $('#name');
	var $phone = $('#phone');
	var $email = $('#email');
	var $message = $('message');

	function addContact(contact){
		var html =	'<tr>' + 
					'<th>' + contact.name + '</th>' +
					'<th>' + contact.phone + '</th>' +
					'<th><i class="fa fa-pencil" aria-hidden="true"></i></th>' +
					'<th><i class="fa fa-trash-o" aria-hidden="true"></i></th>' + 
					'<th><i class="fa fa-sort-desc" aria-hidden="true"></i></th>' +
					'</tr>'
		$contacts.append(html);	}

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
})
