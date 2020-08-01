let userRoles = require('../functionLogic/userRoles');
const { should } = require('chai');
let Dashboard = function () {

    this.verifyPageTitle = function () {
        cy.title().should('eq', 'Admin Portal');

    }

    this.verifyLogo = function () {
        let logoImageElem = cy.get("a.main-logo img[src*='assets/images/img-ansell-logo.png']");
        logoImageElem.should('be.visible')
    }
    this.verifyDashboardPage = function (userRole, userFullName) {

        this.verifyPageTitle();
        this.verifyLogo();
        if (userRole == userRoles.USERROLES.ADMIN) {
            cy.get('#navbarResponsive ul li:nth-child(1)').contains('Welcome ' + userFullName).should('be.visible');
        }
        cy.get('#navbarResponsive ul li:nth-child(2)').should('contain.text', 'Logout').should('be.visible');

    }

    this.actualtext1navigagteToManageUserGroupRoles = function () {
    };

    this.navigagteToManageUserGroupRoles = function () {
        cy.get('h3[data-hover="Manage User Group/Roles"]').click();
        cy.get("h2.page-title").should('contain.text','Manage User Group/Role').should('be.visible');
    }

    this.navigateTomanageUseraccount = function () {
        cy.get('h3[data-hover="Manage User Accounts"]').click();
        cy.get('.page-title').should('contain.text', "Manage User Accounts")

    }

    this.dashboardSearchinput = function (input) {
        cy.get(`input[name='search']`).should('be.visible').type(input)
    }

    this.dashboardUseraccountText = function (input) {
        cy.get('h3[data-hover="Manage User Accounts"').should('contain.text', input);

    }
    this.dashboardSearchwildcardFunctionality = function (inputText) {

        cy.get('h3').each(function (ele) {
            expect(ele).to.contain(inputText)

        })
    }

    this.dashboardSearchFornoresultFound = function (inputText) {
        cy.get('[class="ui-g-12 text-center no-results-found ng-star-inserted"]').should('contain.text', inputText);

    }
    this.dashboardManageuserGrouproleiconVerify = function () {
        cy.get('.icon-manage-user-accounts').should('be.visible')
        cy.get('.icon-manage-user-accounts').should('have.length', 1)
        cy.get('.icon-manage-user-group-roles').should('be.visible')
        cy.get('.icon-manage-user-group-roles').should('have.length', 1)
        cy.get('.icon-sales-user-master').should('be.visible')
        cy.get('.icon-sales-user-master').should('have.length', 1)

    }

    this.dashboardListoptionsAlphabetssortVerify = function () {
        var strings = [];
        cy.get("h3").each(elements => {
            strings.push(elements.text());
        });
        cy.wrap(strings).should("equal", strings.sort())
        cy.log(strings.sort())
    }
    this.dashboardOptionlistVerifyfunctionality = function (inputheaderManageuserAccount, inputheaderManageUserGroupRole, inputheaderSalesUserMaster) {

        cy.get('h3[data-hover="Manage User Accounts"]').should('be.visible').click();
        cy.get('.page-title').should('contain.text', inputheaderManageuserAccount);
        cy.get('p-button.secondary-button .ui-button-text').should('be.visible').click();
        cy.get('h3[data-hover="Manage User Group/Roles"]').should('be.visible').click();
        cy.get('.page-title').should('contain.text', inputheaderManageUserGroupRole);
        cy.get('p-button.secondary-button .ui-button-text').should('be.visible').click();
        cy.get('h3[data-hover="Sales User Master"]').should('be.visible').click();
        cy.get('.page-title').should('contain.text', inputheaderSalesUserMaster);
        cy.get('p-button.secondary-button .ui-button-text').should('be.visible').click();

    }
    this.dashboardOptionListVerify = function () {
        cy.get('h3[data-hover="Manage User Accounts"]').should('be.visible')
        cy.get('h3[data-hover="Manage User Group/Roles"]').should('be.visible')
        cy.get('h3[data-hover="Sales User Master"]').should('be.visible')
    }

    this.dashboardScreencontentVerification = function (usertype) {
        cy.log(usertype)
        cy.get('img[src="assets/images/img-ansell-logo.png"]').should('be.visible')
        let welcome = "Welcome";
        let logOut = "Logout";
        let expectedString = welcome + " " + usertype + ""
        cy.xpath('//li[1]').should('be.visible').should('contain.text', expectedString);
        cy.xpath('//li[2]').should('be.visible').should('contain.text', logOut);

        let dashboardVerify = this.dashboardOptionListVerify();
    }

    this.dashboardMenutitleVerify = function () {
        cy.get('[title="Manage User Accounts"]').should('be.visible')
        cy.get('[title="Manage User Group/Roles"]').should('be.visible')
        cy.get('[title="Sales User Master"]').should('be.visible')

    }

    this.tabFunctionalityverify = function () {
        //Tab functionality yet to be developed .Cypress issue

    }

};

module.exports = new Dashboard();