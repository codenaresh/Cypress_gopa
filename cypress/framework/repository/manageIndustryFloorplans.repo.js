var manageIndustryFloorPlan = function() {

    this.navigateTOManageIndustryFloorPlan = function() {
        cy.get('div.ui-card.ui-widget.ui-widget-content.ui-corner-all').should('be.visible').eq(2).click();
    }

    this.verifyPageTitle = function (title) {
        cy.title().should('eq', title)
    }

    this.VerifyTabNames = function (args) {
        var index = 0;
        for (const expText of args) {
            cy.get(`#ui-tabpanel-${index}-label`).should('be.visible').invoke('text').then(actualText => {
                expect(actualText.toLowerCase()).to.eq(expText.toLowerCase());
            });
            index++; 
        } 
    }

    this.VerifyDefaultTabOpened = function (tabName) {
        cy.get('#ui-tabpanel-0-label').should('be.visible').invoke('attr', 'aria-selected').then(actualText => {
            expect(actualText.toLowerCase()).to.eq('true');
        });
        cy.get('#ui-tabpanel-0-label').should('be.visible').invoke('text').then(actualText => {
            expect(actualText.toLowerCase()).to.eq(tabName.toLowerCase());
        });
    }

    this.verifyItsContent = function () {
        cy.get('button').contains('Back').should('be.visible');
        cy.get('button').contains('Delete').should('be.visible');
        cy.get('button').contains('Add New Industry').should('be.visible');
        cy.get('button').contains('Search').should('be.visible');
        cy.get('#ui-tabpanel-0').should('be.visible');
        cy.get('.page-title').contains('Manage Industry Floorplan').should('be.visible');
    }

    this.searchWith = function () {
        cy.get('.ui-dropdown-label-container > .ng-tns-c42-6').should('be.visible').click({force:true});
        cy.get(':nth-child(2) > .ui-dropdown-item').should('be.visible').click({force:true});
        cy.get(':nth-child(2) > .form-group > .ui-float-label > .ng-untouched').should('be.visible').type('xxx');
        cy.get(':nth-child(3) > .form-group > .ui-float-label > .ng-untouched').should('be.visible').type('xxxx');
        cy.get(':nth-child(4) > .form-group > .ui-float-label > .ng-pristine').should('be.visible').type('xxx');
        cy.get('.ui-dropdown-label-container > .ng-tns-c42-7').should('be.visible').click({force:true});
        cy.get(':nth-child(2) > .ui-dropdown-item').should('be.visible').click({force:true});
        cy.get('#autoComplete').should('be.visible').type('xx');

        cy.get('button').contains('Clear').should('be.visible');
        cy.get('button').contains('Search').should('be.visible').click();
    }

    this.verifySearchResult = function() {
// will verify once data available
    }

    this.verifyRegionDropdownValues = function(optionsArray) {
        cy.get('.ui-dropdown-label-container > .ng-tns-c42-6').should('be.visible').click({force:true});
        var index = 1;
        for (const options of optionsArray) {
            cy.get(`:nth-child(${index}) > .ui-dropdown-item`).contains(options);
            index++; 
        }
    }
}

module.exports = new manageIndustryFloorPlan()