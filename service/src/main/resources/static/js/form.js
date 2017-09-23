function postForm(form) {
	
	var newFormArray = form.serializeArray();
	var serialized = form.serialize();
    var tempObj = new Object();
    
    var data = JSON.stringify(tempObj);
    console.log("json data " + 	data);
	
	 $.ajax({
    	method: "post",
    	beforeSend: function(xhrObj) {
			xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Accept","application/json");
		},
    	contentType: "application/json; charset=utf-8",
    	url: action,
    	data: data,
    	processData: false,
    	async: false,
    	dataType: "json",
	  })
      .done(function(data) {
	    //alert( "second success" );
	    //$(caller).tabs("refresh");
	    //dialogs.dialog("close");
	    console.log(data);
	    //TODO createDialog(data, "", caller);
	    return data;
	  })
	  .fail(function(e) {
	    alert( e.responseText );
	  });
}