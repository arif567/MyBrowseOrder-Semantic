sap.ui.define([
    "./BaseController",
    "../model/formatter"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController,formatter) {
        "use strict";

        return BaseController.extend("myui5app.controller.Master", {
            formatter: formatter,
            onInit: function () {
                console.log("allah");

            }
        });
    });
