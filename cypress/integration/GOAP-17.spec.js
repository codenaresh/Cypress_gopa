let manageUserGroupRole = require('../framework/repository/manageUserGroupRoles.repo');
let userRolesObj = require('../framework/functionLogic/userRoles');
let dashboardPage = require('../framework/repository/dashboard.repo');
let ansellConstants = require('../framework/functionLogic/ansellConstants');
let manageFloorplan = require('../framework/repository/manageIndustryFloorPlan2.repo');

const { fn } = require('jquery');
var userDataSet;
var testdata
describe("Sprint-1 - GOAP-17 - Manage floor plan of DashboardPage", function(){

    before(function () {

        cy.fixture('users').then(function (data) {
            userDataSet = data;
        })

        cy.fixture('manageIndustryFloorPlan2').then(function (data) {
            testdata = data;
        })

})

it('[GOAP-17 ] Login to admin portal', function () {

    cy.login(userDataSet.url, userDataSet.email, userDataSet.password)

    dashboardPage.verifyDashboardPage(userRolesObj.USERROLES.ADMIN, userDataSet.userFullName);

    manageFloorplan.verifyTotalModulesPresent(testdata.totlalmodule)

});



it(" [GOAP-17 TC-1] verifyPresenceOfManageIndustryFloorPlan", function(){

    manageFloorplan.verifyPresenceOfManageIndustryFloorPlan(testdata.manageindustrytext)
})

it("[GOAP-17 TC-4] click on ManageIndustryIcon", function(){

    manageFloorplan.clickonManageIndustryIcon(testdata.manageindustryurltext)

    manageFloorplan.verifyPageTitle(testdata.title)

    manageFloorplan.verifyPageUrl(testdata.url)
})



it(" [GOAP-17 TC-1]verifyScreenOnManageIndustryFloorPlan", function(){

    manageFloorplan.verifyScreenOnManageIndustryFloorPlan(testdata.industryfloorplantab,testdata.industryfloorplanimorttab)

    manageFloorplan.VerifyTabNames(testdata.tabNames)

    manageFloorplan.VerifyDefaultTabOpened(testdata.defaultSelectedTab)
})

it("[GOAP-17 TC-2] verifyContentOfIndustryFloorPlan", function(){

    manageFloorplan.verifyContentOfIndustryFloorPlan(testdata.addNewIndustrytext,testdata.backbtntext,testdata.deletebtnText,testdata.searchBtntext)

    manageFloorplan.verifyItsContent()
})

it("[GOAP-17 TC-3,4] verifyContentOfAdavcneSearchSection", function(){

    manageFloorplan.verifyContentOfAdavcneSearchSection(testdata.clearBtntext)
})

it("[GOAP-17 TC-5] verifyContentIndustryLisingSection", function(){

    manageFloorplan.verifyContentIndustryLisingSection(testdata.editlableText,testdata.copylabeltext,testdata.ExportlabelText,testdata.deleteLableText)
})

it("[GOAP-17 TC-6,TC-7] verifyIndustrySearchByRegionDropdwon", function(){

    manageFloorplan.verifyIndustrySearchByRegionDropdwon(testdata.regionname)
    manageFloorplan.verifyRegionDropdownValues(testdata.regionDropdownValues)
})

it("[GOAP-17 TC-8, TC-9] verifyIndustrySearchByIndustryText", function(){

    manageFloorplan.verifyIndustrySearchByIndustryText(testdata.industryNameText)
})

it("[GOAP-17 TC-10,TC-11] verifySearchIndustryByProcessTextField", function(){

    manageFloorplan.verifySearchIndustryByProcessTextField(testdata.searchByProcess)
})

it("[GOAP-17 TC-12, TC-13] verifySearchIndustryByApplicationTextField", function(){

    manageFloorplan.verifySearchIndustryByApplicationTextField(testdata.searchByApplication)
})

it("[GOAP-17 TC-14,TC-15,TC-16 ]verifySeacrhByProductCategory", function(){

    manageFloorplan.verifySeacrhByProductCategory(testdata.productname)
})

it("[GOAP-17 TC-17,TC-18,TC-19] verifySearchByProductName", function(){

    manageFloorplan.verifySearchByProductName(testdata.productnamevalue)
})



it("[GOAP-17 TC-20,TC-21,TC-22,TC-23,TC-24,TC-25,TC-26,TC-28,TC-29,TC-30,TC-31] verifySearchButtonFunctionality", function(){

    manageFloorplan.verifySearchButtonFunctionality(testdata.editlableText,testdata.copylabeltext,testdata.ExportlabelText,testdata.deleteLableText,testdata.message,testdata.loadingtextText)
})



it("[GOAP-17 TC-33,TC-34] indicationForIndustryInDraftState", function(){

    manageFloorplan.indicationForIndustryInDraftState(testdata.addNewIndustrytext,testdata.addIndustryText,testdata.industryNameText,testdata.regionname,testdata.industryState,testdata.inputdocumentTextValue)
})

it("[GOAP-17 TC-27] verifyClearBtnFunctionality", function(){

    
    cy.login(userDataSet.url, userDataSet.email, userDataSet.password)

    dashboardPage.verifyDashboardPage(userRolesObj.USERROLES.ADMIN, userDataSet.userFullName);

    manageFloorplan.clickonManageIndustryIcon(testdata.manageindustryurltext)


    manageFloorplan.verifyClearBtnFunctionality(testdata.industryNameText)
})

it("[GOAP-17 TC- 32] verifyUpdateRecordDisplayedAtTheTop", function(){

    cy.login(userDataSet.url, userDataSet.email, userDataSet.password)

    dashboardPage.verifyDashboardPage(userRolesObj.USERROLES.ADMIN, userDataSet.userFullName);

    manageFloorplan.clickonManageIndustryIcon(testdata.manageindustryurltext)


    manageFloorplan.verifyUpdatedRecordIsDisplayedAtTheTop(testdata.indexnum)


})



})