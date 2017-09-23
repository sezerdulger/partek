
$(document).ready(function() {
	$(document).on("submit", "form.role", function(event) {
		//app.addDebugLog("form.customer post");
		var $this = $(this);
		
		var url = $this.prop("action");
		
		var role = new Object();
		var $trrole = $("tr[data-roleid='" + $this.data("id") + "']");
		
		if ($trrole.length == 0) {
			$trrole = $this;
		}
		
		
role.id = $trrole.find("#id").text();

role.title = $trrole.find("#title").text();

role.createdby = $trrole.find("#createdby").text();

role.owner = $trrole.find("#owner").text();

role.updatedby = $trrole.find("#updatedby").text();

role.createdat = $trrole.find("#createdat").text();

role.updatedat = $trrole.find("#updatedat").text();

role.deleted = $trrole.find("#deleted").text();

		
		var title="";
		var ajaxObject = new AjaxObject();
		ajaxObject.url = url;
		ajaxObject.data = role;
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
