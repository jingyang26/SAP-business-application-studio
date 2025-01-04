sap.ui.define([
    "warehouse/controller/QualityInspection.controller"
], function(QualityInspectionController) {
    "use strict";

    QUnit.module("QualityInspection Controller Tests");

    QUnit.test("Should initialize the inspection model", function(assert) {
        const oController = new QualityInspectionController();
        oController.onInit();

        const oModel = oController.getView().getModel("inspection");
        assert.ok(oModel, "Inspection model initialized");
        assert.strictEqual(oModel.getData().inspections.length, 2, "Initial data loaded");
    });

    QUnit.test("Should validate inspection data correctly", function(assert) {
        const oController = new QualityInspectionController();
        const aData = [
            { itemId: "001", description: "Item A", result: "Pass" },
            { itemId: "002", description: "Item B", result: "" }
        ];

        const isValid = oController._validateInspectionData(aData);
        assert.notOk(isValid, "Validation failed for incomplete data");
    });
});
