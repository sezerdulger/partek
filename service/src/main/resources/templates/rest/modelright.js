
$(document).ready(function() {
	$(document).on("submit", "form.modelright", function(event) {
		//app.addDebugLog("form.customer post");
		var $this = $(this);
		
		var url = $this.prop("action");
		
		var modelright = new Object();
		var $trmodelright = $("tr[data-modelrightid='" + $this.data("id") + "']");
		
		if ($trmodelright.length == 0) {
			$trmodelright = $this;
		}
		
		
modelright.id = $trmodelright.find("#id").text();

var role = new Object();
role.id=$trmodelright.find("#role").data("id");
modelright.role = role;

modelright.model = $trmodelright.find("#model").text();

modelright.read = $trmodelright.find("#read").text();

modelright.create = $trmodelright.find("#create").text();

modelright.edit = $trmodelright.find("#edit").text();

modelright.delete = $trmodelright.find("#delete").text();

modelright.createdby = $trmodelright.find("#createdby").text();

modelright.owner = $trmodelright.find("#owner").text();

modelright.updatedby = $trmodelright.find("#updatedby").text();

modelright.createdat = $trmodelright.find("#createdat").text();

modelright.updatedat = $trmodelright.find("#updatedat").text();

modelright.deleted = $trmodelright.find("#deleted").text();

		
		var title="";
		var ajaxObject = new AjaxObject();
		ajaxObject.url = url;
		ajaxObject.data = modelright;
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
