$(document).ready(function() {
	$(document).on("submit", "form.customer", function(event) {
		app.addDebugLog("form.customer post");
		var $this = $(this);
		
		var url = $this.prop("action");
		
		var customer = new Object();
		customer.id = $this.find("#id").val();
		customer.title = $this.find("#title").val();
		
		var ajaxObject = new AjaxObject();
		ajaxObject.url = url;
		ajaxObject.data = customer;
		ajaxObject.method = "POST";
		ajaxObject.closeAfter = true;
		ajaxObject.isJson = true;
		
		ajaxObject.ajaxTarget = new AjaxTarget();
		ajaxObject.ajaxTarget.element = null;
		ajaxObject.ajaxTarget.targetSize = "";
		ajaxObject.ajaxTarget.title = title;
		ajaxObject.ajaxTarget.newDialog = false;
		
		ajaxObject.call();
		
		event.preventDefault();
		return false;
	});
});