sap.ui.define([
    "./BaseController",
    "../model/formatter",
    "sap/ui/Device",

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController,formatter,Device) {
        "use strict";

        return BaseController.extend("myui5app.controller.Master", {
            formatter: formatter,
            onInit: function () {
                console.log("allah");
                this.getRouter().getRoute("RouteMaster").attachPatternMatched(this._onMasterMatched, this);

            },
            createGroupHeader : function (oGroup) {
                return new GroupHeaderListItem({
                    title : oGroup.text
                });
            },
            onSelectionChange : function(oEvent)
            {
                var oList = oEvent.getSource(),
                    bSelected = oEvent.getParameter("selected"),
                    listItem = oEvent.getParameter("listitem");
                    this._showDetail(listItem || oEvent.getSource());
                    console.log(listItem);

                
            },

            _showDetail : function (oItem){
                var bReplace = !Device.system.phone;
              var  OrderNo = oItem.getBindingContext().getProperty("OrderNo");

              console.log("OrderNo: ", OrderNo);
             // OrderNo ='0000005579'

              this.getRouter().navTo("RouteDetail",{
                OrderNo: OrderNo
              },bReplace);

              


              
            },
            _onMasterMatched :  function() {
                //Set the layout property of the FCL control to 'OneColumn'
                this.getModel("appView").setProperty("/layout", "OneColumn");
            },
        });
    });
