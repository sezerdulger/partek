
$(document).ready(function() {
	$(document).on("submit", "form.serviceform", function(event) {
		//app.addDebugLog("form.customer post");
		var $this = $(this);
		
		var url = $this.prop("action");
		
		var serviceform = new Object();
		var $trserviceform = $("tr[data-id='" + $this.data("id") + "']");
		console.log($trserviceform);
		
serviceform.id = $trserviceform.find("#id").text();

serviceform.comment = $trserviceform.find("#comment").val();
var customer = new Object();
customer.id=$trserviceform.find("#customer").data("id");
serviceform.customer = customer;
		
		
		var ajaxObject = new AjaxObject();
		ajaxObject.url = url;
		ajaxObject.data = serviceform;
		ajaxObject.method = "POST";
		ajaxObject.closeAfter = true;
		ajaxObject.isJson = true;
		
		ajaxObject.ajaxTarget = new AjaxTarget();
		ajaxObject.ajaxTarget.element = null;
		ajaxObject.ajaxTarget.targetSize = "";
		ajaxObject.ajaxTarget.newDialog = false;
		
		ajaxObject.call();
		
		event.preventDefault();
		return false;
	});
});
