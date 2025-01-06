sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("warehouse.controller.StockAnalysis", {
        onInit: function () {
            // Sample Data
            const oModel = new sap.ui.model.json.JSONModel({
                items: [
                    { "#": 1, item: "Twisted White Yarn", type: "Raw Material", warehouse: "Warehouse 1", quantity: "1000.00 kg", level: "Out of Stock" },
                    { "#": 2, item: "Rugs Zola", type: "Finished Products", warehouse: "Warehouse 1", quantity: "30 rolls", level: "In Stock" },
                    { "#": 3, item: "Casa Pale", type: "Finished Products", warehouse: "Warehouse 1", quantity: "30 rolls", level: "Low" },
                    { "#": 4, item: "Sage Rugs", type: "Finished Products", warehouse: "Warehouse 1", quantity: "30 rolls", level: "In Stock" }
                ]
            });
            this.getView().setModel(oModel, "stock");
        },

        onFilter: function () {
            MessageToast.show("Filter functionality to be implemented.");
        },

        onExport: function () {
            MessageToast.show("Export functionality to be implemented.");
        },

        onLogout: function () {
            // Clear the user model's login status
            const oUserModel = this.getOwnerComponent().getModel("user");
            if (oUserModel) {
                oUserModel.setProperty("/isLoggedIn", false);
            }

            // Show a confirmation toast
            MessageToast.show("You have successfully logged out.");

            // Navigate to the Login page
            this.getOwnerComponent().getRouter().navTo("Login", {}, true);
        },
        
    });

    
});
