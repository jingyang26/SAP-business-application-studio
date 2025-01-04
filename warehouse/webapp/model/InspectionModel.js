sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function(JSONModel) {
    "use strict";

    return {
        createInspectionModel: function() {
            const oData = {
                inspections: [
                    { itemId: "001", description: "Item A", result: "" },
                    { itemId: "002", description: "Item B", result: "" }
                ]
            };
            return new JSONModel(oData);
        }
    };
});
