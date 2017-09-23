
$(document).ready(function() {
	$(document).on("submit", "form.product", function(event) {
		//app.addDebugLog("form.customer post");
		var $this = $(this);
		
		var url = $this.prop("action");
		
		var product = new Object();
		var $trproduct = $("tr[data-productid='" + $this.data("id") + "']");
		
		if ($trproduct.length == 0) {
			$trproduct = $this;
		}
		
		
product.id = $trproduct.find("#id").text();

product.name = $trproduct.find("#name").text();

var customer = new Object();
customer.id=$trproduct.find("#customer").data("id");
product.customer = customer;

product.createdby = $trproduct.find("#createdby").text();

product.owner = $trproduct.find("#owner").text();

product.updatedby = $trproduct.find("#updatedby").text();

product.createdat = $trproduct.find("#createdat").text();

product.updatedat = $trproduct.find("#updatedat").text();

product.deleted = $trproduct.find("#deleted").text();

		
		var title="";
		var ajaxObject = new AjaxObject();
		ajaxObject.url = url;
		ajaxObject.data = product;
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
