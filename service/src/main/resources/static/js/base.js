var app = new Object();
app.debug = true;

app.addDebugLog = function(log) {
	if (app.debug == true) {
		console.log(log);
	}
}

app.errorLog = function(log) {
	console.log(log);
}

app.pushHistory = function(data, text, href) {
	 window.history.pushState(data, text, href);
}

app.popHistory = function(data, text, href) {
	window.history.popState(data, text, href);
}

app.forwardHistory = function() {
	window.history.forward();
}

app.backHistory = function() {
	window.history.back();
}

app.ajaxObjects = [];

app.createId = function() {
	return Math.random().toString(8);
}

//app.lastAjaxObjectId = "";

app.ajaxContainerObject = null;

app.createDialog = function(modalSize, title, body) {
	app.addDebugLog("modalSize:" + modalSize);
	app.addDebugLog("title:" + title);
	
	var id = app.createId();
	var $modal = $("#" + modalSize);
	var $newmodal = $modal.clone();
	$newmodal.find(".modal-title").text(title);
	$newmodal.find(".modal-body").html(body);
	$newmodal.modal();
	/*
	$newmodal.find('.input-tags').selectize({
	    delimiter: ',',
	    persist: false,
	    create: function(input) {
	        return {
	            value: input,
	            text: input
	        }
	    }
	});*/
	
	$newmodal.find(".restselect").select2({
	  tags: true,
	  maximumSelectionLength: 5
	});
	
	return $newmodal;
}

function ajaxCall(ajaxObject) {
	var ajaxId = app.createId();
	ajaxObject.ajaxId = ajaxId;
	
	if (ajaxObject.ajaxLoader == true) {
		ajaxObject.ajaxLoader();
	}

	var data = ajaxObject.data;
	
	if (ajaxObject.isJson) {
		data = JSON.stringify(data);
	}
	
	app.addDebugLog("data: " + data);
	
	$.ajax({
		method: ajaxObject.method,
		beforeSend: function(xhrObj) {
			//xhrObj.ajaxId = ajaxId;
			xhrObj.ajaxObject = ajaxObject;
			
			if (ajaxObject.isJson) {
				xhrObj.setRequestHeader("Content-Type", "application/json");
				xhrObj.setRequestHeader("Accept", "application/json");
			}
		},
		url: ajaxObject.url,
		data: data,
		processData: false,
		async: ajaxObject.async,
		dataType: ajaxObject.isJson ? "json" : "html"
	}).done(function(data, textStatus, xhrObj) {
		var ajaxObject = xhrObj.ajaxObject;
		
		//var ajaxObject = app.ajaxObjects[xhrObj.ajaxId];
	
		app.addDebugLog("ajaxcall finished...");
		
		ajaxObject.ajaxDone(data, textStatus, xhrObj);
		/*
		$(".resttable").DataTable();
		$(".labelsave").removeClass("sorting");
		$(".labelsave").removeAttr("aria-controls");
		$(".labelsave").prop("disabled", "true");
		*/
		
		
		var $tablesorter = $('.resttable').tablesorter({
		    theme: 'bootstrap',
		    widgets: ['zebra', 'filter'],
		    widgetOptions: {
		      filter_reset: '.reset',
		      filter_cssFilter:true,
		      filter_useParsedData    : true
		    },
		  });
		
		
		//$(".modal-backdrop").remove();
		return data;
	}).fail(function(e) {
		app.errorLog(e.responseText);
	});
}