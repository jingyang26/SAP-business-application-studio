sap.ui.define([
    "sap/ui/core/UIComponent",
    "warehouse/model/models",
    "sap/m/MessageBox"
], function(UIComponent, models, MessageBox) {
    "use strict";

    return UIComponent.extend("warehouse.Component", {
        metadata: {
            manifest: "json",
            interfaces: ["sap.ui.core.IAsyncContentCreation"]
        },

        init: function() {
            // Call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // Initialize the models
            this.setModel(models.createDeviceModel(), "device");

            // Initialize the user model if not already done in manifest
            const userModel = new sap.ui.model.json.JSONModel({
                isLoggedIn: false,
                username: "",
                userRole: "",
                lastLoginTime: null
            });
            this.setModel(userModel, "user");

            // Initialize the stock model
            const stockModel = new sap.ui.model.json.JSONModel({
                items: []
            });
            this.setModel(stockModel, "stock");

            // Enable routing
            const oRouter = this.getRouter();
            oRouter.attachRouteMatched(this.onRouteMatched, this);
            oRouter.attachBypassed(this.onRouteBypassed, this);
            oRouter.initialize();
        },

        onRouteMatched: function(oEvent) {
            const sRouteName = oEvent.getParameter("name");
            console.log("Route matched: " + sRouteName);

            // Define protected routes
            const protectedRoutes = [
                "RouteStockAnalysis",
                "RouteView1",
                "RouteQualityInspection"
            ];

            // Check if current route needs authentication
            if (protectedRoutes.includes(sRouteName) && !this._isUserLoggedIn()) {
                MessageBox.warning("Please log in to access this page.", {
                    onClose: function() {
                        this.getRouter().navTo("Login", {}, true);
                    }.bind(this)
                });
            }

            // Special handling for login route when already logged in
            if (sRouteName === "Login" && this._isUserLoggedIn()) {
                this.getRouter().navTo("RouteStockAnalysis", {}, true);
            }
        },

        onRouteBypassed: function(oEvent) {
            const sHash = oEvent.getParameter("hash");
            console.log("Invalid route attempted: " + sHash);
            
            // Handle invalid routes
            if (this._isUserLoggedIn()) {
                this.getRouter().navTo("RouteStockAnalysis", {}, true);
            } else {
                this.getRouter().navTo("Login", {}, true);
            }
        },

        _isUserLoggedIn: function() {
            const oUserModel = this.getModel("user");
            const oUserData = oUserModel ? oUserModel.getData() : null;
            return oUserData && oUserData.isLoggedIn;
        },

        _clearUserSession: function() {
            const oUserModel = this.getModel("user");
            oUserModel.setData({
                isLoggedIn: false,
                username: "",
                userRole: "",
                lastLoginTime: null
            });
        },

        destroy: function() {
            const oRouter = this.getRouter();
            oRouter.detachRouteMatched(this.onRouteMatched, this);
            oRouter.detachBypassed(this.onRouteBypassed, this);
            UIComponent.prototype.destroy.apply(this, arguments);
        }
    });
});