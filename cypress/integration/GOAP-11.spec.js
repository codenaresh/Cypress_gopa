/// <reference types="cypress" />
let manageUserGroupRole = require('../framework/repository/manageUserGroupRoles.repo');
let userRolesObj = require('../framework/functionLogic/userRoles');
let dashboardPage = require('../framework/repository/dashboard.repo');
let ansellConstants = require('../framework/functionLogic/ansellConstants');
let sysObject = require('../framework/utilities/timeUtilities');

var userDataSet;
var userGroupRolesDataSet;

describe('Sprint-1 - GOAP-11 - User group-role listing page', function () 
{
    before(function()
    {
        cy.fixture('users').then(function(data)
        {
            userDataSet = data;
        })
        cy.fixture('manageUserGroupRoles.data').then(function (data) {
            userGroupRolesDataSet = data;
        })
     })

    it('[GOAP-11 TC-1] Login to admin portal', function () {
        cy.login(userDataSet.url,userDataSet.email,userDataSet.password)
        dashboardPage.verifyDashboardPage(userRolesObj.USERROLES.ADMIN, userDataSet.userFullName);
    });

    it('[GOAP-11 TC-2, TC-5] Navigagte to Manage User Group / Role', function () {
        dashboardPage.navigagteToManageUserGroupRoles();
        manageUserGroupRole.verifyPage();
    });
 
    it.skip('[GOAP-11 TC-3] Verify tab order on Manage User Group / Role screen', function () {
        //manageUserGroupRole.verifyTabOrder(); Will be done in later sprint as per test case
    });

    it.skip('[GOAP-11 TC-4] Verify tool tips of controls on Manage User Group / Role screen', function () {
        //manageUserGroupRole.verifyToolTips(); Will be done in later sprint as per test case

    });
    it('[GOAP-11 TC-6, TC-7] Verify the list of groups listed(Enabled & Disabled) on Manage User Group/Role screen', function () {
        manageUserGroupRole.verifyEnabledDisabledGroupInGrid(userGroupRolesDataSet.groupRoleNameColumn.name,userGroupRolesDataSet.groupRoleNameColumn.index,userGroupRolesDataSet.enabledUserGroupName,ansellConstants.ENABLED)
        manageUserGroupRole.verifyEnabledDisabledGroupInGrid(userGroupRolesDataSet.groupRoleNameColumn.name,userGroupRolesDataSet.groupRoleNameColumn.index,userGroupRolesDataSet.enabledUserGroupName,ansellConstants.ENABLED)
    });

   
});