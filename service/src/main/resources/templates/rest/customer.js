
$(document).ready(function() {
	$(document).on("submit", "form.customer", function(event) {
		//app.addDebugLog("form.customer post");
		var $this = $(this);
		
		var url = $this.prop("action");
		
		var customer = new Object();
		var $trcustomer = $("tr[data-customerid='" + $this.data("id") + "']");
		
		if ($trcustomer.length == 0) {
			$trcustomer = $this;
		}
		
		
customer.id = $trcustomer.find("#id").text();

customer.title = $trcustomer.find("#title").text();

customer.address = $trcustomer.find("#address").text();

customer.tel = $trcustomer.find("#tel").text();

customer.contracted = $trcustomer.find("#contracted").text();

customer.emails = $trcustomer.find("#emails").text();

customer.authorizedperson = $trcustomer.find("#authorizedperson").text();

customer.createdby = $trcustomer.find("#createdby").text();

customer.owner = $trcustomer.find("#owner").text();

customer.updatedby = $trcustomer.find("#updatedby").text();

customer.createdat = $trcustomer.find("#createdat").text();

customer.updatedat = $trcustomer.find("#updatedat").text();

customer.deleted = $trcustomer.find("#deleted").text();

		
		var title="";
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
