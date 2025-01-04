sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict";

    return Controller.extend("warehouse.controller.QualityInspection", {
        onInit: function() {
            // Set inspection data model
            const oInspectionModel = this.getOwnerComponent().getModel("inspection");
            this.getView().setModel(oInspectionModel, "inspection");
        },

        onSaveInspection: function() {
            const oModel = this.getView().getModel("inspection");
            const aData = oModel.getData();

            // Validate and save inspection results
            if (this._validateInspectionData(aData)) {
                console.log("Inspection results saved", aData);
            } else {
                sap.m.MessageToast.show("Please fill all mandatory fields.");
            }
        },

        _validateInspectionData: function(data) {
            return data.inspections.every(item => item.result);
        }
    });
});
