/// <reference types="cypress" />
let mifp = require('../framework/repository/manageIndustryFloorplans.repo');

var userDataSet;
var mifpData;

describe('Sprint-1 - GOAP-11 - User group-role listing page', function () {
    before(function(){
        cy.fixture('users').then(function(data) {
            userDataSet = data;
        })
        cy.fixture('manageIndustryFloorplans').then(function(data) {
            mifpData = data;
        })
    })

    it('[GOAP-17 TC-1, Verify the Manage Industry Floorplan screen] ', function () {
        cy.login(userDataSet.url,userDataSet.email,userDataSet.password);
        mifp.navigateTOManageIndustryFloorPlan();
        mifp.verifyPageTitle(mifpData.pageTitle);
        mifp.VerifyTabNames(mifpData.tabNames);
        mifp.VerifyDefaultTabOpened(mifpData.defaultSelectedTab);
    });

    it('[GOAP-17 TC-2, Verify the content of Industry Floorplan tab ] ', function () {
        cy.login(userDataSet.url,userDataSet.email,userDataSet.password);
        mifp.navigateTOManageIndustryFloorPlan();
        mifp.verifyItsContent();
    });

    it('[GOAP-17 TC-3, Verify the content of Advanced Search section ] ', function () {
        cy.login(userDataSet.url,userDataSet.email,userDataSet.password);
        mifp.navigateTOManageIndustryFloorPlan();
        mifp.searchWith();
        mifp.verifySearchResult();
    });

    it('[GOAP-17 TC-4, Verify the content of Industry Listing section ] ', function () {
        cy.login(userDataSet.url,userDataSet.email,userDataSet.password);
        mifp.navigateTOManageIndustryFloorPlan();
        // data required for validation
    });

    it('[GOAP-17 TC-5, Verify the content of Industry Listing section ] ', function () {
        cy.login(userDataSet.url,userDataSet.email,userDataSet.password);
        mifp.navigateTOManageIndustryFloorPlan();
        mifp.verifyRegionDropdownValues(mifpData.regionDropdownValues);
    });
   
});