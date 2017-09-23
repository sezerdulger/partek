
$(document).ready(function() {
	$(document).on("submit", "form.user", function(event) {
		//app.addDebugLog("form.customer post");
		var $this = $(this);
		
		var url = $this.prop("action");
		
		var user = new Object();
		var $truser = $("tr[data-userid='" + $this.data("id") + "']");
		
		if ($truser.length == 0) {
			$truser = $this;
		}
		
		
user.id = $truser.find("#id").text();

var role = new Object();
role.id=$truser.find("#role").data("id");
user.role = role;

user.fullname = $truser.find("#fullname").text();

user.username = $truser.find("#username").text();

user.password = $truser.find("#password").text();

user.active = $truser.find("#active").text();

user.createdat = $truser.find("#createdat").text();

user.deleted = $truser.find("#deleted").text();

		
		var title="";
		var ajaxObject = new AjaxObject();
		ajaxObject.url = url;
		ajaxObject.data = user;
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
