
$(document).ready(function() {
	$(document).on("submit", "form.settings", function(event) {
		//app.addDebugLog("form.customer post");
		var $this = $(this);
		
		var url = $this.prop("action");
		
		var settings = new Object();
		var $trsettings = $("tr[data-settingsid='" + $this.data("id") + "']");
		
		if ($trsettings.length == 0) {
			$trsettings = $this;
		}
		
		
settings.id = $trsettings.find("#id").text();

settings.language = $trsettings.find("#language").text();

settings.createdby = $trsettings.find("#createdby").text();

settings.owner = $trsettings.find("#owner").text();

settings.updatedby = $trsettings.find("#updatedby").text();

settings.createdat = $trsettings.find("#createdat").text();

settings.updatedat = $trsettings.find("#updatedat").text();

settings.deleted = $trsettings.find("#deleted").text();

		
		var title="";
		var ajaxObject = new AjaxObject();
		ajaxObject.url = url;
		ajaxObject.data = settings;
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
