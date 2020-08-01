let floorplan = require('../framework/repository/manageIndustryFloorPlan.repo');
let manageUserGroupRole = require('../framework/repository/manageUserGroupRoles.repo');
let userRolesObj = require('../framework/functionLogic/userRoles');
let dashboardPage = require('../framework/repository/dashboard.repo');
let ansellConstants = require('../framework/functionLogic/ansellConstants');
const { fn } = require('jquery');
var userDataSet;
var manageFloorPlanData;

describe("Sprint-1 - GOAP-16 - Manage floor plan of DashboardPage", function () {

    before(function () {

        cy.fixture('users').then(function (data) {
            userDataSet = data;
        })

        cy.fixture('manageIndustryFloorPlan.data').then(function(data){

            manageFloorPlanData=data
        })

    })



    it('[GOAP-16 TC-1] Login to admin portal', function () {

        cy.login(userDataSet.url, userDataSet.email, userDataSet.password)

        dashboardPage.verifyDashboardPage(userRolesObj.USERROLES.ADMIN, userDataSet.userFullName);

    });



    it("[GOAP-16 TC-2] verify Modules present on dahshboard  ", function () {

        floorplan.verifyTotalModulesPresent()


    })

    it("[GOAP-16 TC-3] Verify Presen of Industry Floor Plan", function () {

        floorplan.verifyPresenceOfManageIndustryFloorPlan(manageFloorPlanData.indiustryFlorpmanTextValue)


    })

    it("[GOAP-16 TC-4] verify Flor plan and clikc on link ", function () {

        floorplan.clickonManageIndustryIcon(manageFloorPlanData.indiustryFlorpmanTextValue)


    })

    
    

   it("[GOAP-16 TC-5] verify Page title ", function(){

        floorplan.verifyPageTitle(manageFloorPlanData.title)
    })

    it("[GOAP-16 TC-6] verify page url ", function(){

        floorplan.verifyPageUrl(manageFloorPlanData.url)
    })

    it("[GOAP-16 TC-7] verify fields and button present on Floor plan", function () {

        floorplan.verifyFieldsAndButtonsManageIndustryFloorPlanDashboard()


    })


    it("[GOAP-16 TC-8] Verify region present on idustry record", function(){

        floorplan.verifyRegionNameOnIndustry(manageFloorPlanData.region)


    })

    it("[GOAP-16 TC-9] verify options present on each industry record", function(){

        floorplan.verifyIconsPresentOnIdustryImage(manageFloorPlanData.EditTextVal,manageFloorPlanData.CopyTextValue,manageFloorPlanData.ExportTextvalue,manageFloorPlanData.DeleteTextValue)


    })

    it("[GOAP-16 TC-10]  verify select mutiple industries" , function(){

        floorplan.selectMultipleIndustries()
    })


    it("[GOAP-16 TC-11] verify delete pop up and records presence", function(){

        floorplan.verifyDeleteConfirmationPopUpAndRecord(manageFloorPlanData.ConfirmationPopUptextValue)


    })

    
    it("[GOAP-16 TC-12] verify industry records", function(){

        floorplan.verifyUpdateIndustryRecord(5)


    })

  

  it("[GOAP-16 TC-13] Verify Back button functionality" , function () {

        floorplan.verifyBackBtnfunctionality(manageFloorPlanData.dashaordUrltext)
    })

    it("test", function(){

        floorplan.verifyAddnewIndustryCreation()

    })




})




