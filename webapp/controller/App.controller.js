/* AMD : Asynchronus module definition */
sap.ui.define(
	[
	"sap/ui/core/mvc/Controller",
	//"sap/ui/core/Fragment",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"opensap/myapp/model/formatter"
	], function (Controller, MessageToast, Filter, FilterOperator, formatter) {
	
	return Controller.extend("opensap.myapp.controller.App", {
		
		formatter : formatter,
		
		/*onInit: function(OEvent){
			
			var oTabContainer = this.byId("idTopLevelTabContainer");
			oTabContainer.addEventDelegate({
            onAfterRendering: function() {
              var oTabStrip = this.getAggregation("_tabStrip");
              var oItems = oTabStrip.getItems();
              for (var i = 0; i < 3; i++) {
                var oCloseButton = oItems[i].getAggregation("_closeButton");
                oCloseButton.setVisible(false);
              }
            }
          }, oTabContainer);
			
		},*/
		
		onShowHello: function () {
			
			// read msg from i18n model
			var oBundle = this.getView().getModel("i18n").getResourceBundle();
			var sRecipient = this.getView().getModel("helloPanel").getProperty("/recipient/name");
			var sMsg = oBundle.getText("helloMsg", [sRecipient]);
			
			// show message
			MessageToast.show(sMsg);
		},

		onFilterProducts : function (oEvent) {

			// build filter array
			var aFilter = [], sQuery = oEvent.getParameter("query"),
				// retrieve list control
				oList = this.getView().byId("productsList"),
				// get binding for aggregation 'items'
				oBinding = oList.getBinding("items");

			if (sQuery) {
				
							//create a single sap.ui.model.Filter object and specifying a path, 
							//an operator, and up to two values
				aFilter.push(new Filter("ProductID", FilterOperator.Contains, sQuery));
			}
			// apply filter. an empty filter array simply removes the filter
			// which will make all entries visible again
			oBinding.filter(aFilter);
		},
		
		onItemSelected : function (oEvent) {
			
			var oSelectedItem = oEvent.getParameter("listItem");
			var oContext = oSelectedItem.getBindingContext();
			var sPath = oContext.getPath();
			var oPanel = this.byId("productDetailsPanel");
			oPanel.bindElement({path: sPath});
			oPanel.setVisible(true);
			
			
			var oTabContainer = this.byId("idTopLevelTabContainer");
			
			//var singleProductID = oContext.getProperty("ProductID");
			var sProductId = "ProductId-" + Math.random();
			
			
			var oTabContainerItem = new sap.m.TabContainerItem( sProductId , {name: "{ProductID}"});
			oTabContainerItem.setName("{ProductID}");
			oTabContainerItem.bindElement({path: sPath});
			
			var oProductDetailFragment = new sap.ui.xmlfragment("opensap.myapp.view.ProductDetails", this);
			/*var oProductDetailFragment = Fragment.load({
				name: "opensap.myapp.view.ProductDetails",
				controller: this
			}).then(function(oFragment){
				//oTabContainerItem.addContent(oFragment);
			});*/
			
			oTabContainerItem.addContent(oProductDetailFragment);
			
			var oSupplierInfoFragment = new sap.ui.xmlfragment("opensap.myapp.view.SupplierInfo", this);
			oTabContainerItem.addContent(oSupplierInfoFragment);
			
			var oItemsList = oTabContainer.getItems();
			
			var flag = false;
			for (var i=0; i<oItemsList.length; i++) {
				var value = oItemsList[i];
				//value.mProperties.name
				if( value.getName() === oContext.getProperty("ProductID")){
					flag = true;
				}	
			}
			
			if (!flag)
				oTabContainer.addItem(oTabContainerItem);
		
		
			
			
		}
	});
});