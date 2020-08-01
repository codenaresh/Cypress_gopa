let dashboardRepo = require('./dashboard.repo');
let timeUtility = require('../utilities/timeUtilities');
let ansellConstants = require('../functionLogic/ansellConstants');
let addEditGroup = require('../repository/addNewUserGroupRole.repo');

let manageUserGroupRoles = function () {


    this.verifyPageTitle = function()
    {
        cy.title().should('eq', 'Admin Portal');
    }
    this.verifyPage = function() 
    {
        this.verifyPageTitle();
        dashboardRepo.verifyLogo();
        cy.get("h2.page-title").should('contain.text','Manage User Group/Role').should('be.visible');
    }
    this.verifyControlsInPage = function () 
    {
        //this.verifyPage();
        cy.get("h2 p-button:nth-child(2) button span:nth-child(1)").should('have.text',"Back").should('be.visible');
        cy.get("h2 p-button:nth-child(1) button span:nth-child(1)").should('have.text',"Add New User Group").should('be.visible');
        cy.get("thead > tr:nth-child(1) > th:nth-child(2) span").should('have.text',"Group/Role Name").should('be.visible');
        cy.get("thead > tr:nth-child(1) > th:nth-child(2)").should('have.text',"Group/Role Name").should("have.attr","aria-sort","none").should('be.visible');
        cy.get("thead > tr:nth-child(1) > th:nth-child(2) > p-sorticon > i").should('have.class','pi-sort-alt');

        cy.get("thead > tr:nth-child(1) > th:nth-child(3) span").should('have.text',"Created By").should('be.visible');
        cy.get("thead > tr:nth-child(1) > th:nth-child(3)").should('have.text',"Created By").should("have.attr","aria-sort","none").should('be.visible');
        cy.get("thead > tr:nth-child(1) > th:nth-child(3) > p-sorticon > i").should('have.class','pi-sort-alt');

        cy.get("thead > tr:nth-child(1) > th:nth-child(4) span").should('have.text',"Updated By").should('be.visible');
        cy.get("thead > tr:nth-child(1) > th:nth-child(4)").should('have.text',"Updated By").should("have.attr","aria-sort","none").should('be.visible');
        cy.get("thead > tr:nth-child(1) > th:nth-child(4) > p-sorticon > i").should('have.class','pi-sort-alt');

        cy.get("thead > tr:nth-child(1) > th:nth-child(5) span").should('have.text',"Updated Date").should('be.visible');
        cy.get("thead > tr:nth-child(1) > th:nth-child(5)").should('have.text',"Updated Date").should("have.attr","aria-sort","descending").should('be.visible');
        cy.get("thead > tr:nth-child(1) > th:nth-child(5) > p-sorticon > i").should('have.class','pi-sort-amount-down');

        cy.get("thead > tr:nth-child(1) > th:nth-child(6) span").should('have.text',"Enabled").should('be.visible');
        cy.get("thead > tr:nth-child(1) > th:nth-child(6)").should('have.text',"Enabled").should("have.attr","aria-sort","none").should('be.visible');
        cy.get("thead > tr:nth-child(1) > th:nth-child(6) > p-sorticon > i").should('have.class','pi-sort-alt');

        cy.get("thead > tr:nth-child(1) > th:nth-child(7) span").should('have.text',"Action").should('be.visible');


        cy.get("thead.ui-table-thead tr:nth-child(2) th input").each(function (el){cy.get(el).should('be.visible')});
        //Todo textbox clear icons pending

        //TODO Filtering options pending
        cy.get("tbody > tr > td:nth-child(7) >p-button > button > span:nth-child(1)").each(function(el,index){cy.get(el).should('be.visible')})
        cy.get("p-paginator > div > span.ui-paginator-pages").should("contain.text","1").should("be.visible");
        cy.get("p-paginator > div.ui-paginator-bottom > p-dropdown").should("be.visible");
        cy.get("p-paginator > div.ui-paginator-bottom > a > span.pi-step-backward").should("be.visible");
        cy.get("p-paginator > div.ui-paginator-bottom > a > span.pi-caret-left").should("be.visible");
        cy.get("p-paginator > div.ui-paginator-bottom > a > span.pi-caret-right").should("be.visible");
        cy.get("p-paginator > div.ui-paginator-bottom > a > span.pi-step-forward").should("be.visible");
        //TODO disabled and enabled users should be disabled

    }

    this.navigagteToAddNewUserGroupRoles = function () {
        cy.get('p-button.primary-button .ui-button-text').should("contain.text","Add New User Group").should('be.visible').click();
        cy.get("h2.page-title").should('contain.text','Add New User Group/Role').should('be.visible');
    }
    this.verifyRecordsAreInDecendingOrderOfUpdatedDate = function (){
        var unSortedOptionlist = [];
        var sortedOptionlist = [];
        cy.get("thead > tr:nth-child(1) > th:nth-child(5) > p-sorticon > i").should('have.class','pi-sort-amount-down');
        cy.get("thead > tr:nth-child(1) > th:nth-child(5)").should("have.attr","aria-sort","descending");
        cy.get("tbody > tr > td:nth-child(5)").each(function(el){unSortedOptionlist.push(el.text())})
        sortedOptionlist = unSortedOptionlist;
        sortedOptionlist.sort().reverse();
        unSortedOptionlist.forEach(function(item, index)
        {
            if(new Date(item) == new Date(sortedOptionlist[index]))
            {
                cy.log(item + " == " + sortedOptionlist[index])
                expect(true).to.be.true
            }
            else 
            {
                cy.log(item + " != " + sortedOptionlist[index])
                expect(false).to.be.true
            }
        })
    }

    this.verifyAscendingDescendingOrderofRecords = function(columnHeader,columnIndex)
    {
        var unSortedOptionlist = [];
        var sortedOptionlist = [];
        cy.get("thead > tr:nth-child(1) > th:nth-child(" + columnIndex + ") > p-sorticon > i").should('have.class','pi-sort-alt');
        cy.get("thead > tr:nth-child(1) > th:nth-child(" + columnIndex + ")").should('have.text',columnHeader).should('be.visible').should("have.attr","aria-sort","none").click();
        cy.wait(ansellConstants.MAXTIMEOUT);
        cy.get("ngx-spinner[name='customspinner']").should("not.be.visible");
        cy.get("thead > tr:nth-child(1) > th:nth-child(" + columnIndex + ") > p-sorticon > i").should('have.class','pi-sort-amount-up-alt');
        cy.get("thead > tr:nth-child(1) > th:nth-child(" + columnIndex + ")").should("have.attr","aria-sort","ascending");

        cy.get("tbody > tr > td:nth-child(" + columnIndex + ")").each(function(el){unSortedOptionlist.push(el.text())})
        if(columnIndex == 5)
        {
            unSortedOptionlist.forEach(function(item, index){sortedOptionlist.push(new Date(item))})
            sortedOptionlist.sort();
        }
        else
        {
            sortedOptionlist = unSortedOptionlist;
            sortedOptionlist.sort();
        }
        unSortedOptionlist.forEach(function(item, index)
        {
            if(columnIndex == 5)
            {
                if(new Date(item) == new Date(sortedOptionlist[index]))
                {
                    cy.log(item + " == " + sortedOptionlist[index])
                    expect(true).to.be.true
                }
                else 
                {
                    cy.log(item + " != " + sortedOptionlist[index])
                    expect(false).to.be.true
                }
            }
            else
            {
                if(item == sortedOptionlist[index])
                {
                    cy.log(item + " == " + sortedOptionlist[index])
                    expect(true).to.be.true
                }
                else 
                {
                    cy.log(item + " != " + sortedOptionlist[index])
                    expect(false).to.be.true
                }
            }
            
        })
        unSortedOptionlist = [];
        sortedOptionlist = [];
        cy.get("thead > tr:nth-child(1) > th:nth-child(" + columnIndex + ")").should('have.text',columnHeader).should("have.attr","aria-sort","ascending").click();
        cy.wait(ansellConstants.MAXTIMEOUT);
        cy.get("ngx-spinner[name='customspinner']").should("not.be.visible");
        cy.get("thead > tr:nth-child(1) > th:nth-child(" + columnIndex + ") > p-sorticon > i").should('have.class','pi-sort-amount-down');
        cy.get("thead > tr:nth-child(1) > th:nth-child(" + columnIndex + ")").should("have.attr","aria-sort","descending");
        
        cy.get("ngx-spinner[name='customspinner']").should("not.be.visible");
        cy.get("tbody > tr > td:nth-child(" + columnIndex + ")").each(function(el){unSortedOptionlist.push(el.text())})
        sortedOptionlist = unSortedOptionlist;
            if(columnIndex == 5)
            {
                unSortedOptionlist.forEach(function(item, index){sortedOptionlist.push(new Date(item))})
                sortedOptionlist.sort().reverse();
            }
            else
            {
                sortedOptionlist = unSortedOptionlist;
                sortedOptionlist.sort().reverse();
            }

        unSortedOptionlist.forEach(function(item, index)
        {
            if(columnIndex == 5)
            {
                if(new Date(item) == new Date(sortedOptionlist[index]))
                {
                    cy.log(item + " == " + sortedOptionlist[index])
                    expect(true).to.be.true
                }
                else 
                {
                    cy.log(item + " != " + sortedOptionlist[index])
                    expect(false).to.be.true
                }
            }
            else
            {
                if(item == sortedOptionlist[index])
                {
                    cy.log(item + " == " + sortedOptionlist[index])
                    expect(true).to.be.true
                }
                else 
                {
                    cy.log(item + " != " + sortedOptionlist[index])
                    expect(false).to.be.true
                }
            }
        })
    }

    this.verifySortingDoesNotExistOnColumn = function(columnHeader,columnIndex)
    {
        cy.get("thead > tr:nth-child(1) > th:nth-child(" + columnIndex + ")").should('have.text',columnHeader).should('be.visible').should("have.attr","aria-sort","none").click();
        cy.wait(ansellConstants.MINTIMEOUT);
        cy.get("ngx-spinner[name='customspinner']").should("not.be.visible");
        cy.get("thead > tr:nth-child(1) > th:nth-child(" + columnIndex + ")").should("have.attr","aria-sort","none");
        cy.get("thead > tr:nth-child(1) > th:nth-child(" + columnIndex + ")").should("not.have.attr","aria-sort","ascending");
        cy.get("thead > tr:nth-child(1) > th:nth-child(" + columnIndex + ")").should('have.text',columnHeader).should('be.visible').should("have.attr","aria-sort","none").click();
        cy.wait(ansellConstants.MINTIMEOUT);
        cy.get("thead > tr:nth-child(1) > th:nth-child(" + columnIndex + ")").should("have.attr","aria-sort","none");
        cy.get("thead > tr:nth-child(1) > th:nth-child(" + columnIndex + ")").should("not.have.attr","aria-sort","descending");
    
    
    }

    this.verifyFilterTextBoxDoesNotExistOnColumn = function(columnHeader,columnIndex,flag)
    {
        if(flag)
        {
            cy.get("thead > tr:nth-child(1) > th:nth-child(" + columnIndex + ")").should('have.text',columnHeader).should('be.visible');
            cy.get("thead.ui-table-thead tr:nth-child(2) th:nth-child(" + columnIndex + ") input").should("be.visible");
        }
        else
        {
            cy.get("thead > tr:nth-child(1) > th:nth-child(" + columnIndex + ")").should('have.text',columnHeader).should('be.visible');
            cy.get("thead.ui-table-thead tr:nth-child(2) th:nth-child(" + columnIndex + ") input").should("not.exist");
        }
    }

    this.verifyFilterSearchFunctionality = function(columnHeader,columnIndex,searchText)
    {
        if(searchText!="temp")
        {
            //Enter
            cy.get("thead > tr:nth-child(1) > th:nth-child(" + columnIndex + ")").should('have.text',columnHeader).should('be.visible');
            cy.get("thead.ui-table-thead tr:nth-child(2) th:nth-child(" + columnIndex + ") input").should("be.visible").type(searchText + '{enter}');
            //cy.wait(2000);
            //cy.get("ngx-spinner[name='customspinner']").should("be.visible");
            cy.wait(ansellConstants.MAXTIMEOUT);
            cy.get("ngx-spinner[name='customspinner']").should("not.be.visible");
            cy.get("tbody.ui-table-tbody > tr > td:nth-child(" + columnIndex + ") > span").each(function(el){cy.get(el).should("contain.text",searchText).should("be.visible");});
            cy.wait(ansellConstants.MINTIMEOUT);
            cy.get("thead.ui-table-thead tr:nth-child(2) th:nth-child(" + columnIndex + ") input").should("be.visible").focus().clear().type('{enter}');
            //cy.wait(2000);
            //cy.get("ngx-spinner[name='customspinner']").should("be.visible");
            cy.wait(ansellConstants.MAXTIMEOUT);
            cy.get("ngx-spinner[name='customspinner']").should("not.be.visible");

            //Click
            cy.get("thead.ui-table-thead tr:nth-child(2) th:nth-child(" + columnIndex + ") input").should("be.visible").type(searchText);
            //cy.wait(2000);
            //cy.get("ngx-spinner[name='customspinner']").should("be.visible");
            cy.wait(ansellConstants.MINTIMEOUT);
            cy.get("ngx-spinner[name='customspinner']").should("not.be.visible");
            cy.get("thead > tr:nth-child(1) > th:nth-child(7)").should('have.text',"Action").should('be.visible').click();
            cy.wait(ansellConstants.MAXTIMEOUT);
            //cy.get("ngx-spinner[name='customspinner']").should("be.visible");
            //cy.wait(2000);
            cy.get("ngx-spinner[name='customspinner']").should("not.be.visible");
            cy.get("tbody.ui-table-tbody > tr > td:nth-child(" + columnIndex + ") > span").each(function(el){cy.get(el).should("contain.text",searchText).should("be.visible");});
            cy.get("thead.ui-table-thead tr:nth-child(2) th:nth-child(" + columnIndex + ") input").should("be.visible").focus().clear();
            cy.get("thead > tr:nth-child(1) > th:nth-child(7)").should('have.text',"Action").should('be.visible').click();
            //cy.wait(2000);
            //cy.get("ngx-spinner[name='customspinner']").should("be.visible");
            cy.wait(ansellConstants.MINTIMEOUT);
            cy.get("ngx-spinner[name='customspinner']").should("not.be.visible");

            //TAB Todo - will be done as part of taborder

        }
        else
        {
            //Enter
            cy.log("inside temp")
            cy.get("thead > tr:nth-child(1) > th:nth-child(" + columnIndex + ")").should('have.text',columnHeader).should('be.visible');
            cy.get("thead.ui-table-thead tr:nth-child(2) th:nth-child(" + columnIndex + ") input").should("be.visible").type(searchText + '{enter}').wait;
            //cy.wait(2000);
            //cy.get("ngx-spinner[name='customspinner']").should("be.visible");
            cy.wait(ansellConstants.MAXTIMEOUT);
            cy.get("ngx-spinner[name='customspinner']").should("not.be.visible");
            cy.get("tbody.ui-table-tbody > tr > td").should("contain.text","No records found").should("be.visible");
            cy.get("thead.ui-table-thead > tr:nth-child(2) > th:nth-child(2) > span.filterclear-btn > i").click({ force: true });
            //cy.get("thead.ui-table-thead tr:nth-child(2) th:nth-child(" + columnIndex + ") input").should("be.visible").focus().clear().type('{enter}');
            //cy.wait(2000);
            //cy.get("ngx-spinner[name='customspinner']").should("be.visible");
            cy.wait(ansellConstants.MINTIMEOUT);
            cy.get("ngx-spinner[name='customspinner']").should("not.be.visible");
            //cy.get("tbody.ui-table-tbody > tr > td:nth-child(" + columnIndex + ") > span").each(function(el){cy.get(el).should("be.visible");});

        }
    }

    this.verifyInvalidDataFilterSearchFunctionality = function(columnHeader,columnIndex,searchText)
    {
        //Enter
        cy.get("thead > tr:nth-child(1) > th:nth-child(" + columnIndex + ")").should('have.text',columnHeader).should('be.visible');
        cy.get("thead.ui-table-thead tr:nth-child(2) th:nth-child(" + columnIndex + ") input").should("be.visible").type(searchText + '{enter}');
        //cy.get("ngx-spinner[name='customspinner']").should("be.visible");
        cy.wait(ansellConstants.MAXTIMEOUT);
        cy.get("ngx-spinner[name='customspinner']").should("not.be.visible");
        cy.get("tbody.ui-table-tbody > tr > td").should("contain.text","No records found").should("be.visible");
        cy.get("thead.ui-table-thead tr:nth-child(2) th:nth-child(" + columnIndex + ") input").should("be.visible").focus().clear().type('{enter}');
        //cy.get("ngx-spinner[name='customspinner']").should("be.visible");
        cy.wait(ansellConstants.MAXTIMEOUT);
        cy.get("ngx-spinner[name='customspinner']").should("not.be.visible");
        
    }

    this.verifyDefaultNumberofRecordsInPaginationControls = function(defaultRcords)
    {
        cy.get("div.ui-paginator-bottom > p-dropdown > div.ui-dropdown > div.ui-dropdown-label-container > span").should("have.text",defaultRcords).should("be.visible");
        cy.get("tbody.ui-table-tbody > tr").should("have.length.lte",defaultRcords);
    }

    this.verifyNumberOfRecordsInPaginationControls = function(pageNumbers)
    {
        let applicationDefaultPgNums = [];
        cy.get("div.ui-paginator-bottom > p-dropdown > div.ui-dropdown > div.ui-dropdown-trigger").click();
        cy.wait(ansellConstants.MINTIMEOUT)
        cy.get("div.ui-paginator-bottom > p-dropdown > div.ui-dropdown > div.ui-dropdown-panel > div.ui-dropdown-items-wrapper > ul > p-dropdownitem > li.ui-dropdown-item > span").should("be.visible").each(
            function(el){
                expect(pageNumbers.includes(parseInt(el.text().trim()))).to.be.true;
            });
        cy.get("thead > tr:nth-child(1) > th:nth-child(7)").should('have.text',"Action").should('be.visible').click();

    }

    this.verifyPaginationControlsFunctionality = function(pageNumbers)
    {

        pageNumbers.forEach(function(item){

            cy.get("div.ui-paginator-bottom > p-dropdown > div.ui-dropdown > div.ui-dropdown-trigger").click();
            cy.wait(ansellConstants.MINTIMEOUT)
            cy.get("div.ui-paginator-bottom > p-dropdown > div.ui-dropdown > div.ui-dropdown-panel > div.ui-dropdown-items-wrapper > ul > p-dropdownitem > li.ui-dropdown-item > span").should("be.visible").each(function(el){if(el.text() == String(item)){el.click();return;}});
            cy.wait(ansellConstants.MINTIMEOUT);
            cy.get("ngx-spinner[name='customspinner']").should("not.be.visible");
            cy.get("div.ui-paginator-bottom > p-dropdown > div.ui-dropdown > div.ui-dropdown-label-container > span").should("have.text",String(item)).should("be.visible");
            cy.get("tbody.ui-table-tbody > tr").should("have.length.lte",item);
        })
        
            
    }

    this.verifyAddNewUserGroupFunctionality = function(){
        cy.get('p-button.primary-button .ui-button-text').should("contain.text","Add New User Group").should('be.visible').click();
        cy.get('h2.page-title').should('contain.text', "Add New User Group/Role").should("be.visible");
        cy.get('.secondary-button > .ui-button > .ui-button-text').should("contain.text","Cancel").click();
        cy.get('h2.page-title').should('contain.text', "Manage User Group/Role").should("be.visible");

    }
    this.verifyBackButtonFunctionality = function(userRole){
        cy.get('p-button.secondary-button .ui-button-text').should("contain.text","Back").should('be.visible').click();
        //dashboardRepo.verifyDashboardPage(userRole)
    }

    this.manageuserRolepageComponentsverify = function (inputheader) {
        cy.get('h3[data-hover="Manage User Group/Roles"]').should('be.visible').click();
        cy.get('h2.page-title').should('contain.text', inputheader)
        cy.get('thead.ui-table-thead th:nth-of-type(2) > span').should('be.visible')
        cy.get('p-button.primary-button .ui-button-text').should("contain.text","Add New User Group").should('be.visible')
        cy.get('p-button.secondary-button .ui-button-text').should("contain.text","Back").should('be.visible').click()
        cy.get("input[name='search']").should('be.visible')
    }

    this.clearFilter= function(columnHeader,columnIndex)
    {
        cy.get("thead > tr:nth-child(1) > th:nth-child(" + columnIndex + ")").should('have.text',columnHeader).should('be.visible');
        cy.get("thead.ui-table-thead tr:nth-child(2) th:nth-child(" + columnIndex + ") input").should("be.visible").focus().clear().type('{enter}');
            //cy.wait(2000);
            //cy.get("ngx-spinner[name='customspinner']").should("be.visible");
        cy.wait(ansellConstants.MINTIMEOUT);
        cy.get("ngx-spinner[name='customspinner']").should("not.be.visible");
    }
    this.searchByGroupName= function(columnHeader,columnIndex,groupName)
    {
        cy.get("thead > tr:nth-child(1) > th:nth-child(" + columnIndex + ")").should('have.text',columnHeader).should('be.visible');
        cy.get("thead.ui-table-thead tr:nth-child(2) th:nth-child(" + columnIndex + ") input").should("be.visible").type(groupName + '{enter}');
        //cy.wait(2000);
        //cy.get("ngx-spinner[name='customspinner']").should("be.visible");
        cy.wait(ansellConstants.MINTIMEOUT);
        cy.get("ngx-spinner[name='customspinner']").should("not.be.visible");
    }
    this.verifyGroupInGrid = function(groupName,status)
    {
        cy.get('tbody.ui-table-tbody > tr').each(function(elem,index){
           if(elem.find('td:nth-child(2)').text() == groupName)
           {
            //cy.get(elem).find('td:nth-child(5)').should('contain.text',timeUtility.getCurrentDateForGrid());
            if(status == ansellConstants.ENABLED)
            {
                cy.get(elem).find('td:nth-child(6) > input').should('be.checked');
            }
            else if(status == ansellConstants.DISABLED)
            {
                cy.get(elem).find('td:nth-child(6) > input').should('not.be.checked');
            }
            return;
           }
        });
    }
    
    this.verifyEnabledDisabledGroupInGrid = function(columnHeader,columnIndex, groupName,status){

        this.searchByGroupName(columnHeader,columnIndex,groupName);
        this.verifyGroupInGrid(groupName,status)
        this.clearFilter(columnHeader,columnIndex);
    }

    this.verifyEditFunctionalityOfGroup = function(columnHeader, columnIndex, groupName)
    {
        this.searchByGroupName(columnHeader, columnIndex, groupName);
        cy.wait(ansellConstants.MAXTIMEOUT);
        cy.get("tbody.ui-table-tbody > tr > td:nth-child(" + columnIndex + ") > span").each(function(el, index){
            if(el.text() == groupName){
                cy.get(el).should("contain.text",groupName).should("be.visible");
                cy.get("tbody.ui-table-tbody > tr:nth-child(" + (index +1) +") > td:nth-child(7) > p-button > button").click();
                return;
            }
        });
        cy.wait(ansellConstants.MINTIMEOUT);
        //addEditGroup.verifyEditFunctionality(groupName);
    }
    

    this.verifyPaging = function()
    {

        var pageCounter = 0;
        cy.get("div.ui-paginator-bottom > a.ui-paginator-first").should("have.class","ui-state-disabled").should("not.be.enabled");
        cy.get("div.ui-paginator-bottom > a.ui-paginator-prev").should("have.class","ui-state-disabled").should("not.be.enabled");
        cy.get("p-paginator[styleclass='ui-paginator-bottom'] > div > span.ui-paginator-pages > a").each(function(elem,index){
            if(index==0){cy.get(elem).should("have.class","ui-state-active");}
            else
            {
                pageCounter++;
                cy.get(elem).click();
                cy.wait(ansellConstants.MINTIMEOUT);
                cy.get(elem).should("have.class","ui-state-active");
                var defCount;
                cy.get("div.ui-paginator-bottom > p-dropdown > div.ui-dropdown > div.ui-dropdown-label-container > span").then(($btn) => { defCount = $btn.text();
                    cy.get("tbody.ui-table-tbody > tr").should("have.length.lte",parseInt(defCount));
                    defCount =0;
                });
            }
            if(pageCounter>0)
            {
                cy.get("div.ui-paginator-bottom > a.ui-paginator-first").click();
                cy.wait(ansellConstants.MINTIMEOUT);
                cy.get("div.ui-paginator-bottom > p-dropdown > div.ui-dropdown > div.ui-dropdown-label-container > span").then(($btn) => 
                { 
                    defCount = $btn.text();
                    cy.get("tbody.ui-table-tbody > tr").should("have.length.lte",parseInt(defCount));
                });
                cy.log(defCount);

                cy.get("div.ui-paginator-bottom > a.ui-paginator-last").click();
                cy.wait(ansellConstants.MINTIMEOUT);
                cy.get("div.ui-paginator-bottom > p-dropdown > div.ui-dropdown > div.ui-dropdown-label-container > span").then(($btn) => 
                { 
                    defCount = $btn.text();
                    cy.get("tbody.ui-table-tbody > tr").should("have.length.lte",parseInt(defCount));
                });

                cy.get("div.ui-paginator-bottom > a.ui-paginator-prev").click();
                cy.wait(ansellConstants.MINTIMEOUT);
                cy.get("div.ui-paginator-bottom > p-dropdown > div.ui-dropdown > div.ui-dropdown-label-container > span").then(($btn) => 
                { 
                    defCount = $btn.text();
                    cy.get("tbody.ui-table-tbody > tr").should("have.length.lte",parseInt(defCount));
                });

                cy.get("div.ui-paginator-bottom > a.ui-paginator-next").click();
                cy.wait(ansellConstants.MINTIMEOUT);
                cy.get("div.ui-paginator-bottom > p-dropdown > div.ui-dropdown > div.ui-dropdown-label-container > span").then(($btn) => 
                { 
                    defCount = $btn.text();
                    cy.get("tbody.ui-table-tbody > tr").should("have.length.lte",parseInt(defCount));
                });

            }
        })

    }
    this.verifyTablesAndData = function(url, appModules)
    {
        var testDataFunctionalities = [];
        cy.request(
            {
            method: 'GET',
            url: url + '/api/user-group/modulesandfunctionality',
            timeout: 120000,
            failOnStatusCode: false
            }).then(response => 
                {
                    cy.log(response.body);
                    response.body.forEach(function(responseItem) 
                    {
                        appModules.forEach(function(testDataItem,testDataIndex){
                            if(responseItem.moduleName == testDataItem.header)
                            {
                                testDataItem.functionalities.forEach(function(testDataFunctionalityItem,testDataFunctionalityIndex){
                                    testDataFunctionalities.push(testDataFunctionalityItem.name);
                                })
                                responseItem.functionalityList.forEach(function(functionalityItem, functionalityIndex)
                                {
                                    
                                    if(testDataFunctionalities.includes(functionalityItem.functionalityName))
                                    {
                                        cy.log("Functionality name [functionalityItem.functionalityName] found");
                                        expect(true).to.be.true;
                                    }
                                    else
                                    {
                                        cy.log("Functionality name [functionalityItem.functionalityName] not found");
                                        expect(false).to.be.true;
                                    }
                                })
                            }
                        })
                        
                    });
                    
          })
    }

    this.getUserGroupIdByGroupName = function(url,userGroupName)
    {
        let userGroupId;
        cy.request(
            {
            method: 'POST',
            url: url + '/api/generic-component-data/user-service/user-groups',
            body: {
                "genericId": "userGroupGrid",
                "page": 0,
                "rowsPerPage": 30,
                "sortIndex": "updatedDate",
                "filterParams": {},
                "sortOrder": "desc",
                "criteriaParams": {}
            },
            timeout: 120000,
            failOnStatusCode: false
            }).then(response => {
                    response.body.rows.forEach(function(item) 
                    {
                        if(item.userGrpName == userGroupName)
                        {
                            userGroupId = item.userGrpId;
                            cy.log(item.userGrpName);
                            cy.log(item.userGrpId);
                            return userGroupId;

                        }
                        //cy.log(item.userGrpName);
                    });
                
          })

    }

    this.getFunctionalitiesIndexForUserGroup = function(url,userGroupId)
    {
        var functionalityIndexes = []
        cy.request(
            {
            method: 'GET',
            url: url + '/api/user-group/functionalities/' + userGroupId + '',
            timeout: 120000,
            failOnStatusCode: false
            }).then(response => 
                {
                    cy.log(response.body);
                    response.body.forEach(function(responseItem) 
                    {
                      functionalityIndexes.push(responseItem);
                    })

        })
    
        return functionalityIndexes;
    }

    this.getFunctionalityNamesForIndexes = function(url,functionalityIndexes)
    {
        var functionalitiesName = [];
        cy.request(
            {
            method: 'GET',
            url: url + '/api/user-group/modulesandfunctionality',
            timeout: 120000,
            failOnStatusCode: false
            }).then(response => 
                {
                    cy.log(response.body);
                    response.body.forEach(function(responseItem) 
                    {
                        responseItem.functionalityList.forEach(function(functionalityItem, functionalityIndex)
                        {
                            if(functionalityIndexes.includes(functionalityItem.functionalityId))
                            {
                                functionalitiesName.push(functionalityItem.functionalityName);
                            }
                        })
                       
                    });
                    
          })

          return functionalitiesName;
    }

    this.verifyFunctionalityNamesAreEqual = function(appModules,functionalitiesName)
    {

        var testDataFunctionalities = [];
        appModules.forEach(function(testDataItem,testDataIndex){
               
            testDataItem.functionalities.forEach(function(testDataFunctionalityItem,testDataFunctionalityIndex){
                if(testDataFunctionalityItem.value == "true")
                {
                    testDataFunctionalities.push(testDataFunctionalityItem.name);
                }
            })
            
        })
        functionalitiesName.forEach(function(item, index){

            if(testDataFunctionalities.includes(item))
            {
                cy.log("Functionality name [functionalityItem.functionalityName] found");
                expect(true).to.be.true;
            }
            else
            {
                cy.log("Functionality name [functionalityItem.functionalityName] not found");
                expect(false).to.be.true;
            }
        })

    }
/*
    this.addManageUserGroup = function (groupNameinput) {
        let addNewuserGroup = element(by.buttonText('Add New User Group'));
        addNewuserGroup.click();
        let groupName = element(by.css('#groupname'));
        groupName.sendKeys(groupNameinput);
        // let enabletoggle = element(by.name('onoffswitch'));
        // enabletoggle.click();
    }
    this.SaveUserAccountDetails = function () {
        let save = element(by.buttonText('Save'));
        save.click();
    }

    this.CancelUserAccountDetails = function () {
        let cancel = element(by.buttonText('Cancel'));
        cancel.click();
    }
    */
};
module.exports = new manageUserGroupRoles();