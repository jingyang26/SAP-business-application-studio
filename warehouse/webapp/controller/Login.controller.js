sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("warehouse.controller.Login", {
        onLogin: function () {
            // Retrieve input values
            const sUsername = this.getView().byId("username").getValue();
            const sPassword = this.getView().byId("password").getValue();

            // Validate username and password
            if (sUsername === "AKMAJU" && sPassword === "12345") {
                MessageToast.show("Login successful!");
                // Navigate to the main view
                this.getOwnerComponent().getRouter().navTo("RouteView1");
            } else {
                MessageToast.show("Invalid credentials! Please try again.");
            }
        }
    });
});
