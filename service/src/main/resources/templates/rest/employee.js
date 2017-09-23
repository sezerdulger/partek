
$(document).ready(function() {
	$(document).on("submit", "form.employee", function(event) {
		//app.addDebugLog("form.customer post");
		var $this = $(this);
		
		var url = $this.prop("action");
		
		var employee = new Object();
		var $tremployee = $("tr[data-employeeid='" + $this.data("id") + "']");
		
		if ($tremployee.length == 0) {
			$tremployee = $this;
		}
		
		
employee.id = $tremployee.find("#id").text();

employee.name = $tremployee.find("#name").text();

employee.createdby = $tremployee.find("#createdby").text();

employee.owner = $tremployee.find("#owner").text();

employee.updatedby = $tremployee.find("#updatedby").text();

employee.createdat = $tremployee.find("#createdat").text();

employee.updatedat = $tremployee.find("#updatedat").text();

employee.deleted = $tremployee.find("#deleted").text();

		
		var title="";
		var ajaxObject = new AjaxObject();
		ajaxObject.url = url;
		ajaxObject.data = employee;
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
