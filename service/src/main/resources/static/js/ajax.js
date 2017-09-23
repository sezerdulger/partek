var AjaxObject = function() {
		this.url = "";
		this.data = "";
		this.method = "";
		this.ajaxLoader = false;
		this.ajaxTarget = null;
		this.isJson = false;
		this.async = true;
		this.result = "";
		this.dialog = null;
		this.closeAfter = false;
		this.title = "";
		this.ajaxId = "";
		this.isAjaxContainer = false;
};

AjaxObject.prototype.ajaxLoader = function() {
	$("#" + this.ajaxTarget.element).html($("#loader_" + this.ajaxTarget.targetSize).html());
};

AjaxObject.prototype.ajaxDone = function(data, textStatus, xhrObj) {
	if (this.ajaxTarget.newDialog == true) {
		var dialog = app.createDialog(this.ajaxTarget.dialogSize, this.ajaxTarget.title, data);
		this.dialog = dialog;
		
		app.ajaxObjects.push(xhrObj.ajaxObject);
		
		app.addDebugLog("pushed ajaxObject:" +  xhrObj.ajaxObject);
	}
	
	if (this.closeAfter == true) {
		var ajaxObject = app.ajaxObjects.pop();
		app.addDebugLog(ajaxObject.ajaxTarget.newDialog);
		ajaxObject.closeDialog();
		
		if (app.ajaxObjects.length > 0) {
			var refreshingAjaxObject = app.ajaxObjects.pop();
			refreshingAjaxObject.refresh();
		}
		else {
			app.ajaxContainerObject.refresh();
		}
	}
	
	if (this.isAjaxContainer == true) {
		app.ajaxContainerObject = this;
	}
	
	if (this.ajaxTarget != null && this.ajaxTarget.element != undefined) {
		$("#" + this.ajaxTarget.element).html(data);
	}
};

AjaxObject.prototype.call = function() {
	ajaxCall(this);
	//app.lastAjaxObjectId = this.ajaxId;
};

AjaxObject.prototype.refresh = function() {
	ajaxCall(this);
};

AjaxObject.prototype.cancel = function() {
	
	this.closeDialog();
	
	app.ajaxObjects.pop();
	if (app.ajaxObjects.length > 0) {
		var refreshingAjaxObject = app.ajaxObjects.pop();
		//refreshingAjaxObject.refresh();
	}
	else {
		//app.ajaxContainerObject.refresh();
	}
};

AjaxObject.prototype.closeDialog = function() {
	if (this.ajaxTarget.newDialog == true) {
		this.dialog.remove();
		$(".modal-backdrop").remove();
	}
};

var AjaxTarget = function() {
	this.element = "";
	this.targetSize = "";
	this.newDialog = false;
	this.title = "";
	this.dialogSize = "largeModal";
};