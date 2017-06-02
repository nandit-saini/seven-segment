$(document).ready(function () {
	
	console.log("Tested");

	$('body').on('submit', '#uploadForm', function (event) {

		event.preventDefault();
		var formData = new FormData($(this)[0]);

		$.ajax({
			url: '/api/parse',
	       	type: 'POST',
	       	data: formData,
	       	async: false,
	       	cache: false,
	       	contentType: false,
	       	enctype: 'multipart/form-data',
	       	processData: false,
	       	success: function (response) {
	       	  	var data = response.data.split("\n");
	       		for(var i=0; i<data.length-1 ; i++) {
	       			$("#invoices").append("Invoice No "+ (i+1) + " : " + data[i]+ "<br/>");

	       		}	
	       	}
		})

	})

});