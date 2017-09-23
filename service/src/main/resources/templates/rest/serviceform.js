
$(document).ready(function() {
	$(document).on("submit", "form.serviceform", function(event) {
		//app.addDebugLog("form.customer post");
		var $this = $(this);
		
		var url = $this.prop("action");
		
		var serviceform = new Object();
		var $trserviceform = $("tr[data-serviceformid='" + $this.data("id") + "']");
		
		if ($trserviceform.length == 0) {
			$trserviceform = $this;
		}
		
		
serviceform.id = $trserviceform.find("#id").text();

var customer = new Object();
customer.id=$trserviceform.find("#customer").data("id");
serviceform.customer = customer;

serviceform.customertitle = $trserviceform.find("#customertitle").text();

serviceform.department = $trserviceform.find("#department").text();

serviceform.address = $trserviceform.find("#address").text();

serviceform.tel = $trserviceform.find("#tel").text();

serviceform.emails = $trserviceform.find("#emails").text();

serviceform.authorizedperson = $trserviceform.find("#authorizedperson").text();

serviceform.requestdate = $trserviceform.find("#requestdate").text();

serviceform.servicedate = $trserviceform.find("#servicedate").text();

serviceform.servicetype = $trserviceform.find("#servicetype").text();

serviceform.scope = $trserviceform.find("#scope").text();

serviceform.servicedefinition = $trserviceform.find("#servicedefinition").text();

serviceform.usedmaterial = $trserviceform.find("#usedmaterial").text();

serviceform.contracted = $trserviceform.find("#contracted").text();

serviceform.servicedescription = $trserviceform.find("#servicedescription").text();

serviceform.starttime = $trserviceform.find("#starttime").text();

serviceform.finishtime = $trserviceform.find("#finishtime").text();

serviceform.duration = $trserviceform.find("#duration").text();

serviceform.pricing = $trserviceform.find("#pricing").text();

var serviceformpricing = new Object();
serviceformpricing.id=$trserviceform.find("#serviceformpricing").data("id");
serviceform.serviceformpricing = serviceformpricing;

var employee = new Object();
employee.id=$trserviceform.find("#employee").data("id");
serviceform.employee = employee;

serviceform.createdby = $trserviceform.find("#createdby").text();

serviceform.owner = $trserviceform.find("#owner").text();

serviceform.updatedby = $trserviceform.find("#updatedby").text();

serviceform.createdat = $trserviceform.find("#createdat").text();

serviceform.updatedat = $trserviceform.find("#updatedat").text();

serviceform.deleted = $trserviceform.find("#deleted").text();

		
		var title="";
		var ajaxObject = new AjaxObject();
		ajaxObject.url = url;
		ajaxObject.data = serviceform;
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
