sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("warehouse.controller.Login", {
        onInit: function() {
            // Initialize user model if needed
            const userModel = this.getOwnerComponent().getModel("user");
            if (!userModel) {
                const newUserModel = new sap.ui.model.json.JSONModel({
                    isLoggedIn: false,
                    username: "",
                    userRole: ""
                });
                this.getOwnerComponent().setModel(newUserModel, "user");
            }
        },

        onLogin: function () {
            // Retrieve input values
            const sUsername = this.getView().byId("username").getValue();
            const sPassword = this.getView().byId("password").getValue();

            // Validate username and password
            if (sUsername === "AKMAJU" && sPassword === "12345") {
                // Set user model data
                const userModel = this.getOwnerComponent().getModel("user");
                userModel.setData({
                    isLoggedIn: true,
                    username: sUsername,
                    userRole: "admin",
                    lastLoginTime: new Date()
                });

                MessageToast.show("Login successful!");
                
                // Navigate to the Stock Analysis page
                this.getOwnerComponent().getRouter().navTo("RouteStockAnalysis", {}, true);
            } else {
                MessageToast.show("Invalid credentials! Please try again.");
            }
        },

        onAfterRendering: function() {
            // Clear any existing login data
            const userModel = this.getOwnerComponent().getModel("user");
            if (userModel) {
                userModel.setData({
                    isLoggedIn: false,
                    username: "",
                    userRole: ""
                });
            }
        }
    });
});