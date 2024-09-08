sap.ui.define([
    "./BaseController",
    "../model/formatter",
    "sap/m/library",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, formatter,mobileLibrary,JSONModel) {
        "use strict";

        var URLHelper = mobileLibrary.URLHelper;

        return BaseController.extend("myui5app.controller.Detail", {
            formatter: formatter,
            onInit: function () {

                this._aValidKeys =["shipping","processor"];
                var oViewModel = new JSONModel(
                    {
                        busy: false,
                        delay: 0,
                        currency: "EUR",
                        selectedTab: ""
                    }


                );
                this.setModel(oViewModel,"detailView");


                this.getRouter().getRoute("RouteDetail").attachPatternMatched(this._onObjectMatched, this);
            },

            onSendEmailPress :function(){
                URLHelper.triggerEmail(

                );

            },


            _onObjectMatched: function (oEvent) {
                this.getModel("appView").setProperty("/layout", "TwoColumnsMidExpanded");

                var oArguments = oEvent.getParameter("arguments");
                 this._OrderNo = oArguments.OrderNo;
                
                this.getModel().metadataLoaded().then(function () {
                   
                    var OrderPath = this.getModel().createKey("ZA_BO_SalesOrder_Header", {
                        OrderNo: this._OrderNo
                    });
                    
                    console.log("OrderPath:", OrderPath);
                    
                    this.getView().bindElement({
                        path: "/" + OrderPath,
                        parameters: {
                            expand: "to_LineItems,to_ShippingAddress"
                        },
                        events: {
                            dataReceived: function (oData) {
                                var data = oData.getParameter("data");
                                console.log("Full data received: ", data);
                               
                            }
                        }
                    });
                }.bind(this));

                var oQuery = oArguments["?query"];
                if (oQuery && this._aValidKeys.indexOf(oQuery.tab) >= 0){
                    this.getView().getModel("detailView").setProperty("/selectedTab", oQuery.tab);
                    this.getRouter().getTargets().display(oQuery.tab);
                } else {
                    this.getRouter().navTo("RouteDetail", {
                        OrderNo : this._OrderNo,
                        query: {
                            tab: "shipping"
                        }
                    }, true);
                }
            },

            onTabSelect: function(oEvent){
                var sSelectedTab = oEvent.getParameter("selectedKey");
                
                this.getRouter().navTo("RouteDetail",{
                    OrderNo : this._OrderNo,
                    query: {
                        tab : sSelectedTab
                    }
                },true);
            }
        });
    });
