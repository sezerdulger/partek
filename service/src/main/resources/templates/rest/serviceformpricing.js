
$(document).ready(function() {
	$(document).on("submit", "form.serviceformpricing", function(event) {
		//app.addDebugLog("form.customer post");
		var $this = $(this);
		
		var url = $this.prop("action");
		
		var serviceformpricing = new Object();
		var $trserviceformpricing = $("tr[data-serviceformpricingid='" + $this.data("id") + "']");
		
		if ($trserviceformpricing.length == 0) {
			$trserviceformpricing = $this;
		}
		
		
serviceformpricing.id = $trserviceformpricing.find("#id").text();

serviceformpricing.title = $trserviceformpricing.find("#title").text();

serviceformpricing.createdby = $trserviceformpricing.find("#createdby").text();

serviceformpricing.owner = $trserviceformpricing.find("#owner").text();

serviceformpricing.updatedby = $trserviceformpricing.find("#updatedby").text();

serviceformpricing.createdat = $trserviceformpricing.find("#createdat").text();

serviceformpricing.updatedat = $trserviceformpricing.find("#updatedat").text();

serviceformpricing.deleted = $trserviceformpricing.find("#deleted").text();

		
		var title="";
		var ajaxObject = new AjaxObject();
		ajaxObject.url = url;
		ajaxObject.data = serviceformpricing;
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
