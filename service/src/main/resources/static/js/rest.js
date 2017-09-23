$(document).ready(function() {
	
	
	$(document).on("click", "a.rest", function(event) {
		var $this = $(this);
		var target = $this.data("target");
		var newDialog = $this.data("newdialog");
		
		app.addDebugLog("target: " + target);
		app.addDebugLog("newdialog: " + newDialog);

		if (target == undefined && newDialog == undefined) {
			return true;
		}
		var targetSize = $this.data("targetsize");
		var url = $this.prop("href");
		var isAjaxContainer = $this.data("isajaxcontainer");

		var ajaxObject = new AjaxObject();
		ajaxObject.url = url;
		ajaxObject.method = "GET";
		ajaxObject.isAjaxContainer = isAjaxContainer;
		
		ajaxObject.ajaxTarget = new AjaxTarget();
		ajaxObject.ajaxTarget.element = target;
		ajaxObject.ajaxTarget.targetSize = targetSize;
		ajaxObject.ajaxTarget.title = $this.html();
		ajaxObject.ajaxTarget.newDialog = newDialog;
		
		ajaxObject.call();

		event.preventDefault();
		return false;
	});
	
	$(document).on("click", ".restcancel", function(event) {
		app.addDebugLog("app.ajaxObjects.length: " + app.ajaxObjects.length);
		var ajaxObject = app.ajaxObjects[app.ajaxObjects.length - 1];
		app.addDebugLog("canceled ajaxObject:" + ajaxObject);
		ajaxObject.cancel();
		
		event.preventDefault();
		return false;
	});
	
	$(document).on('DOMNodeInserted', ".restselect", function () {
		console.log("readdd*****************");
		
    });
	
	$(document).on("ready", ".restselect", function(event) {
		console.log("readdd*****************");
		/*$('.input-tags').selectize({
		    delimiter: ',',
		    persist: false,
		    create: function(input) {
		        return {
		            value: input,
		            text: input
		        }
		    }
		});*/
		
		event.preventDefault();
		return false;
	});
});