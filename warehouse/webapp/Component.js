sap.ui.define([
    "sap/ui/core/UIComponent",
    "warehouse/model/models",
    "sap/m/MessageBox"
], (UIComponent, models, MessageBox) => {
    "use strict";

    return UIComponent.extend("warehouse.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // Call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // Set the device model
            this.setModel(models.createDeviceModel(), "device");

            // Enable routing and attach route match handler
            const oRouter = this.getRouter();
            oRouter.attachRouteMatched(this.onRouteMatched, this);
            oRouter.initialize();
        },

        onRouteMatched(oEvent) {
            const sRouteName = oEvent.getParameter("name");
            console.log(`Route matched: ${sRouteName}`);

            // Check if user is logged in for protected routes
            if (sRouteName !== "Login" && !this._isUserLoggedIn()) {
                MessageBox.warning("You are not logged in. Redirecting to the Login page.");
                this.getRouter().navTo("Login", {}, true);
            }
        },

        _isUserLoggedIn() {
            // Example logic for checking login status
            const oUserModel = this.getModel("user"); // Assuming a "user" model exists
            const oUserData = oUserModel ? oUserModel.getData() : null;
            return oUserData && oUserData.isLoggedIn;
        },

        destroy() {
            // Perform cleanup (if needed) before component destruction
            const oRouter = this.getRouter();
            oRouter.detachRouteMatched(this.onRouteMatched, this);

            // Call base class destroy
            UIComponent.prototype.destroy.apply(this, arguments);
        }
    });
});
