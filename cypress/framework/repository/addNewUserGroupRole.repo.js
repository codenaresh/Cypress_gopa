let dashboardRepo = require('./dashboard.repo');
let timeUtility = require('../utilities/timeUtilities');
let ansellConstants = require('../functionLogic/ansellConstants');
let manageUserGroup = require('./manageUserGroupRoles.repo');

let addNewUserGroupRoles = function () {

    this.verifyPageTitle = function(title)
    {
        cy.title().should('eq', title);
    }
    this.verifyPageUrl = function(url)
    {
        cy.url().should('include', url);
    }
    this.verifyPage = function (title,url,header) 
    {
        this.verifyPageUrl(url);
        this.verifyPageTitle(title);
        dashboardRepo.verifyLogo();
        cy.get('h2.page-title').should('contain.text', header).should("be.visible");
    }

    this.verifyControlsInPage = function () 
    {
        cy.get('label[for=groupname]').should("contain.text","Group Name").should("be.visible");
        cy.get('#groupname').should("be.visible");
        cy.get('.secondary-button > .ui-button > .ui-button-text').should("contain.text","Cancel").should("be.visible");
        cy.get('.primary-button > button.ui-button-text-only').should("contain.text","Save").should('have.class','ui-state-disabled').should("be.visible");
        cy.get('#myonoffswitch').should('not.be.visible').should('be.checked');
        //cy.get('#myonoffswitch').should('not.be.visible').check({ force: true }).should('be.checked');
    }

    this.verifyGroupNameTextField = function(groupname){
        cy.get('#groupname').should("be.visible").type(groupname);
        cy.get('.primary-button > button.ui-button-text-only').should("contain.text","Save").should('not.have.class','ui-state-disabled').should("be.visible");
        cy.get('#groupname').should("be.visible").clear();
    }

    this.verifySaveButtonFunctionality = function(){

        cy.get('#groupname').should("be.visible");
        cy.get('#myonoffswitch').should('not.be.visible').should('be.checked');
        cy.get('.primary-button > button.ui-button-text-only').should("contain.text","Save").should('have.class','ui-state-disabled').should("be.visible");
        cy.get("div.form-error-message").should("not.exist");
        cy.get('div.ui-toast-message-text-content > div.ui-toast-detail').should('not.exist');
        cy.get('#groupname').should("be.visible").clear();
    }

    this.verifyCancelButtonFunctionality = function(groupName){

        cy.get('#groupname').should("be.visible");
        if(groupName != null){cy.get('#groupname').should("be.visible").type(groupName);}
        cy.get('#myonoffswitch').should('not.be.visible').should('be.checked');
        cy.get('.secondary-button > .ui-button > .ui-button-text').should("contain.text","Cancel").should("be.visible").click();
    }

    this.verifyDuplicateGroupNameTextField = function(duplicateName)
    {
        cy.get('#groupname').should("be.visible").type(duplicateName);
        cy.get("div.form-error-message").should("contain.text","Group name already exists.").should("be.visible");
        cy.get('.primary-button > button.ui-button-text-only').should("contain.text","Save").should('have.class','ui-state-disabled').should("be.visible");
        cy.get('#groupname').should("be.visible").clear();
        cy.get("div.form-error-message").should("contain.text","Group name is required.").should("be.visible");
    }

    this.createGroup = function(groupname, status)
    {
        if(status == ansellConstants.ENABLED){if(cy.get('#myonoffswitch').should('not.be.visible').should('be.checked')){}else{cy.get('div.enable-disable-switch > label.enable-disable-switch-label > span.enable-disable-switch-switch').should('be.visible').click();}}
        else if(status == ansellConstants.DISABLED){if(cy.get('#myonoffswitch').should('not.be.visible').should('be.checked')){cy.get('div.enable-disable-switch > label.enable-disable-switch-label > span.enable-disable-switch-switch').should('be.visible').click();cy.wait(ansellConstants.MINTIMEOUT); cy.get('#myonoffswitch').should('not.be.visible').should('not.be.checked');}{}}
        cy.wait(ansellConstants.MINTIMEOUT);
        cy.get('#groupname').should("be.visible").type(groupname);
        cy.wait(ansellConstants.MINTIMEOUT);
        cy.get('.primary-button > button.ui-button-text-only').should("contain.text","Save").should('not.have.class','ui-state-disabled').should("be.visible").click();
        //cy.wait(ansellConstants.MINTIMEOUT);
        cy.get("ngx-spinner[name='customspinner'] > div.overlay > div.loading-text > p").should("be.visible");
        cy.get("ngx-spinner[name='customspinner'] > div.overlay > div.loading-text > p").should("not.be.visible");
        cy.get('div.ui-toast-message-text-content > div.ui-toast-detail').should('contain.text','Group saved successfully').should('be.visible');
        if(status == ansellConstants.ENABLED)
        {
            cy.get('#myonoffswitch').should('not.be.visible').should('be.checked');
        }
        else if(status == ansellConstants.DISABLED)
        {
            cy.get('#myonoffswitch').should('not.be.visible').should('not.be.checked');
        }
        cy.get('ul.ui-tabview-nav > li:nth-child(1).ui-state-active > a > span.ui-tabview-title').should('contain.text','Modules & Functionality').should('be.visible');
        cy.get('ul.ui-tabview-nav > li:nth-child(2).ui-state-default > a > span.ui-tabview-title').should('contain.text','Chemicals List').should('be.visible');
        cy.get('ul.ui-tabview-nav > li:nth-child(3).ui-state-default > a > span.ui-tabview-title').should('contain.text','Products List').should('be.visible');
    }

    this.cancellGroupCreation = function()
    {
        cy.get('.secondary-button > .ui-button > .ui-button-text').should("contain.text","Cancel").should("be.visible").click();
        cy.get('h2.page-title').should('contain.text', "Manage User Group/Role").should("be.visible");
    }

    this.saveGroupCreation = function()
    {
        cy.get('.primary-button > button.ui-button-text-only').should("contain.text","Save").should('not.have.class','ui-state-disabled').should("be.visible").click();
        //cy.wait(ansellConstants.MINTIMEOUT);
        cy.get("ngx-spinner[name='customspinner'] > div.overlay > div.loading-text > p").should("be.visible");
        cy.get("ngx-spinner[name='customspinner'] > div.overlay > div.loading-text > p").should("not.be.visible");
        cy.get('div.ui-toast-message-text-content > div.ui-toast-detail').should('contain.text','Group saved successfully').should('be.visible');
    }
    
    this.createAndVerifyEnabledGroupName = function(groupname)
    {
        cy.get('#groupname').should("be.visible").clear();
        cy.get('#myonoffswitch').should('not.be.visible').should('be.checked');
        this.createGroup(groupname,ansellConstants.ENABLED);
        this.cancellGroupCreation();
    }

    this.createAndVerifyDisabledGroupName = function(groupname)
    {
        cy.get('#groupname').should("be.visible").clear();
        cy.get('#myonoffswitch').should('not.be.visible').should('be.checked');
        this.createGroup(groupname,ansellConstants.DISABLED);
        this.cancellGroupCreation();
    }

    this.verifyContentOfModuleAndFunctionalityListTab = function(appModules)
    {
        let showSelectedFunctionalityElem = cy.get('div.ui-tabview-panel > div.list-checkbox:nth-child(2) > p-checkbox');
        showSelectedFunctionalityElem.should('have.attr','label','Show Selected Functionalities').should('be.visible');
        showSelectedFunctionalityElem.find('div.ui-chkbox > div.ui-chkbox-box').should('have.attr','aria-checked','false');

        let showAllFunctionalityElem = cy.get('div.ui-tabview-panel > div.list-checkbox:nth-child(1) > p-checkbox');
        showAllFunctionalityElem.should('have.attr','label','Select All Functionalities').should('be.visible');
        showAllFunctionalityElem.find('div.ui-chkbox > div.ui-chkbox-box').should('have.attr','aria-checked','false');

        appModules.forEach(function(appModule,index){
            let g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
            g1FunctionalityElem.find('div.role-heading > h6').should('contain.text',appModule.header).should('be.visible');
            g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
            g1FunctionalityElem.find('div.functionality-search > input.form-control-onlytextfield').should('be.visible');
            g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
            g1FunctionalityElem.find('ul.roles-list > li > p-checkbox').should("be.visible").each(function(elem,index){
                cy.wait(500);
                if(appModule.functionalities.some(e => e.name === elem.find('label').text()) && cy.get(elem).find('div.ui-chkbox > div.ui-chkbox-box > span.ui-chkbox-icon').should('not.have.class','pi-check') 
                && cy.get(elem).find('div.ui-chkbox > div.ui-helper-hidden-accessible > input').should('not.be.visible').should('not.be.checked')){expect(true).to.be.true;return ; }
            });
        });
    }
    this.verifyShowSelectedFunctionalityCheckboxNoFunctionalitySelected = function(appModules)
    {
        let showSelectedFunctionalityElem = cy.get('div.ui-tabview-panel > div.list-checkbox:nth-child(2) > p-checkbox');
        showSelectedFunctionalityElem.should('have.attr','label','Show Selected Functionalities').should('be.visible').first().click();
        showSelectedFunctionalityElem.find('div.ui-chkbox > div.ui-chkbox-box').should('have.attr','aria-checked','true');

        let showAllFuncti
        onalityElem = cy.get('div.ui-tabview-panel > div.list-checkbox:nth-child(1) > p-checkbox');
        showAllFunctionalityElem.should('have.attr','label','Select All Functionalities').should('be.visible');
        showAllFunctionalityElem.find('div.ui-chkbox > div.ui-chkbox-box').should('have.attr','aria-checked','false');

        appModules.forEach(function(appModule,index)
        {
            let g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
            g1FunctionalityElem.find('div.role-heading > h6').should('contain.text',appModule.header).should('be.visible');
            g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
            g1FunctionalityElem.find('div.functionality-search > input.form-control-onlytextfield').should('be.visible');
            g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
            g1FunctionalityElem.find('ul.roles-list > li.hidden > p-checkbox').should("exist").each(function(elem,index){cy.wait(500);
                if(appModule.functionalities.some(e => e.name === elem.find('label').text()) && cy.get(elem).find('div.ui-chkbox > div.ui-chkbox-box > span.ui-chkbox-icon').should('not.have.class','pi-check') 
                && cy.get(elem).find('div.ui-chkbox > div.ui-helper-hidden-accessible > input').should('not.be.visible').should('not.be.checked')){expect(true).to.be.true;return ;}
            });
        });
        showSelectedFunctionalityElem = cy.get('div.ui-tabview-panel > div.list-checkbox:nth-child(2) > p-checkbox');
        showSelectedFunctionalityElem.find('label').should('contain.text','Show Selected Functionalities').should('have.class','ui-label-active').first().click();
        showSelectedFunctionalityElem = cy.get('div.ui-tabview-panel > div.list-checkbox:nth-child(2) > p-checkbox');
        showSelectedFunctionalityElem.find('div.ui-chkbox > div.ui-chkbox-box').should('have.attr','aria-checked','false');


    }
    this
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    .verifyShowSelectedFunctionalityCheckboxWithFewFunctionalitySelectedPrivate = function(appModules)
    {
        let showSelectedFunctionalityElem = cy.get('div.ui-tabview-panel > div.list-checkbox:nth-child(2) > p-checkbox');
        showSelectedFunctionalityElem.should('have.attr','label','Show Selected Functionalities').should('be.visible').first().click();
        showSelectedFunctionalityElem.find('div.ui-chkbox > div.ui-chkbox-box').should('have.attr','aria-checked','true');

        let showAllFunctionalityElem = cy.get('div.ui-tabview-panel > div.list-checkbox:nth-child(1) > p-checkbox');
        showAllFunctionalityElem.should('have.attr','label','Select All Functionalities').should('be.visible');
        showAllFunctionalityElem.find('div.ui-chkbox > div.ui-chkbox-box').should('have.attr','aria-checked','false');

        appModules.forEach(function(appModule,index){
            let g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
            g1FunctionalityElem.find('div.role-heading > h6').should('contain.text',appModule.header).should('be.visible');
            g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
            g1FunctionalityElem.find('div.functionality-search > input.form-control-onlytextfield').should('be.visible');
            g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
            g1FunctionalityElem.find('ul.roles-list > li > p-checkbox').should("exist").each(function(elem,index){cy.wait(500);
                
                cy.wait(500);
                var isChecked = false;
                appModule.functionalities.forEach(function(moduleFunc,index)
                {
                    if (moduleFunc.name == elem.find('label').text() && moduleFunc.value == 'true')
                    {
                       if(cy.get(elem).find('div.ui-chkbox > div.ui-chkbox-box > span.ui-chkbox-icon').should('have.class','pi-check') 
                        && cy.get(elem).find('div.ui-chkbox > div.ui-helper-hidden-accessible > input').should('not.be.visible').should('be.checked')){expect(true).to.be.true;isChecked = true;return;}
                        else{expect(true).to.be.false;}}else{cy.log("Match not found.");}if(isChecked){return;}
                    })
                    if(isChecked){return;}
                });
            });
        
            showSelectedFunctionalityElem = cy.get('div.ui-tabview-panel > div.list-checkbox:nth-child(2) > p-checkbox');
            showSelectedFunctionalityElem.find('label').should('contain.text','Show Selected Functionalities').should('have.class','ui-label-active').first().click();
            showSelectedFunctionalityElem = cy.get('div.ui-tabview-panel > div.list-checkbox:nth-child(2) > p-checkbox');
            showSelectedFunctionalityElem.find('div.ui-chkbox > div.ui-chkbox-box').should('have.attr','aria-checked','false');
    }

    this.checkFunctionalityCheckboxForModule = function(appModules)
    {
        //let showSelectedFunctionalityElem = cy.get('div.ui-tabview-panel > div.list-checkbox:nth-child(2) > p-checkbox');
        //showSelectedFunctionalityElem.should('have.attr','label','Show Selected Functionalities').should('be.visible');
        //showSelectedFunctionalityElem.find('div.ui-chkbox > div.ui-chkbox-box').should('have.attr','aria-checked','true');

        //let showAllFunctionalityElem = cy.get('div.ui-tabview-panel > div.list-checkbox:nth-child(1) > p-checkbox');
        //showAllFunctionalityElem.should('have.attr','label','Select All Functionalities').should('be.visible');
        //showAllFunctionalityElem.find('div.ui-chkbox > div.ui-chkbox-box').should('have.attr','aria-checked','false');

        appModules.forEach(function(appModule,index)
        {

            let g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
            g1FunctionalityElem.find('div.role-heading > h6').should('contain.text',appModule.header).should('be.visible');
            g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
            g1FunctionalityElem.find('div.functionality-search > input.form-control-onlytextfield').should('be.visible');
            g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
            g1FunctionalityElem.find('ul.roles-list > li > p-checkbox').should("exist").each(function(elem,index)
            {
                cy.wait(500);
                var isChecked = false;
                let obj = appModule.functionalities.find(o => o.name === elem.find('label').text());
                if(obj.name == elem.find('label').text())
                {
                    if (obj.name == elem.find('label').text() && (obj.value == 'true'))
                    {
                       if(cy.get(elem).find('div.ui-chkbox > div.ui-chkbox-box > span.ui-chkbox-icon').should('have.class','pi-check') 
                        && cy.get(elem).find('div.ui-chkbox > div.ui-helper-hidden-accessible > input').should('not.be.visible').should('be.checked'))
                        {
                            elem.find('label').click();
                            isChecked = true;
                            return;
                        }
                        else{
                            cy.log("Match not found.");
                        }
                    }
                    else
                    {
                        cy.log("Match with check enabled not found.");
                    }
                    if(isChecked == true)
                    {
                        return;
                    }
                }
                /*
                appModule.functionalities.forEach(function(moduleFunc,index)
                {
                    if (moduleFunc.name == elem.find('label').text() && (moduleFunc.value == 'true'))
                    {
                        cy.log();
                       if(cy.get(elem).find('div.ui-chkbox > div.ui-chkbox-box > span.ui-chkbox-icon').should('have.class','pi-check') 
                        && cy.get(elem).find('div.ui-chkbox > div.ui-helper-hidden-accessible > input').should('not.be.visible').should('be.checked'))
                        {
                            elem.find('label').click();
                            isChecked = true;
                            return;
                        }
                        else{
                            cy.log("Match not found.");
                        }
                    }
                    else
                    {
                        cy.log("Match with check enabled not found.");
                    }
                    if(isChecked == true)
                    {
                        return;
                    }
                })
                */
            });
        });
    }

    this.verifyShowSelectedFunctionalityCheckboxWithFewFunctionalitySelected = function(appModule)
    {
        this.checkFunctionalityCheckboxForModule(appModule);
        this.verifyShowSelectedFunctionalityCheckboxWithFewFunctionalitySelectedPrivate(appModule);
    }
    this.checkAllFunctionalityCheckboxForModule = function(appModules)
    {
        //let showSelectedFunctionalityElem = cy.get('div.ui-tabview-panel > div.list-checkbox:nth-child(2) > p-checkbox');
        //showSelectedFunctionalityElem.should('have.attr','label','Show Selected Functionalities').should('be.visible');
        //showSelectedFunctionalityElem.find('div.ui-chkbox > div.ui-chkbox-box').should('have.attr','aria-checked','false');

        let showAllFunctionalityElem = cy.get('div.ui-tabview-panel > div.list-checkbox:nth-child(1) > p-checkbox');
        showAllFunctionalityElem.should('have.attr','label','Select All Functionalities').should('be.visible');
        showAllFunctionalityElem.find('div.ui-chkbox > div.ui-chkbox-box').should('have.attr','aria-checked','false');

        appModules.forEach(function(appModule,index)
        {
            let g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
            g1FunctionalityElem.find('div.role-heading > h6').should('contain.text',appModule.header).should('be.visible');
            g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
            g1FunctionalityElem.find('div.functionality-search > input.form-control-onlytextfield').should('be.visible');
            g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
            g1FunctionalityElem.find('ul.roles-list > li > p-checkbox').should("exist").each(function(elem,index)
            {
                cy.wait(500);
                var isChecked = false;
                appModule.functionalities.forEach(function(moduleFunc,index)
                {
                    if (moduleFunc.name == elem.find('label').text())
                    {

                        cy.get(elem).find("div.ui-chkbox > div.ui-chkbox-box").then(function(element){

                            cy.get(element).each(function(elem,index)
                            {
                                if(elem.attr('aria-checked')=='false')
                                {
                                    elem.click();
            
                                }
                            });
                        });

                        /*
                       if(cy.get(elem).find('div.ui-chkbox > div.ui-chkbox-box > span.ui-chkbox-icon').should('not.have.class','pi-check') 
                        && cy.get(elem).find('div.ui-chkbox > div.ui-helper-hidden-accessible > input').should('not.be.visible').should('be.checked')){elem.find('label').click();isChecked = true;return;
                        }
                        else{cy.log("Match not found.");}
                        */
                    }else{
                        
                        cy.log("Match not found.");
                }
                    
                    if(isChecked){return;}
                })
            });
        });
    }
    this.unCheckAllFunctionalityCheckboxForModule = function(appModules)
    {
        //let showSelectedFunctionalityElem = cy.get('div.ui-tabview-panel > div.list-checkbox:nth-child(2) > p-checkbox');
        //showSelectedFunctionalityElem.should('have.attr','label','Show Selected Functionalities').should('be.visible');
        //showSelectedFunctionalityElem.find('div.ui-chkbox > div.ui-chkbox-box').should('have.attr','aria-checked','true');

        //let showAllFunctionalityElem = cy.get('div.ui-tabview-panel > div.list-checkbox:nth-child(1) > p-checkbox');
        //showAllFunctionalityElem.should('have.attr','label','Select All Functionalities').should('be.visible');
        //showAllFunctionalityElem.find('div.ui-chkbox > div.ui-chkbox-box').should('have.attr','aria-checked','false');

        //appModules.forEach(function(appModule,index)
        //{
            let g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModules[0].index + ')');
            g1FunctionalityElem.find('div.role-heading > h6').should('contain.text',appModules[0].header).should('be.visible');
            g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModules[0].index + ')');
            g1FunctionalityElem.find('div.functionality-search > input.form-control-onlytextfield').should('be.visible');
            //g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
            cy.get("div.role-listings:nth-child(" + appModules[0].index + ") > ul.roles-list > li > p-checkbox > div.ui-chkbox > div.ui-chkbox-box").then(function(element){

                cy.get(element).each(function(elem,index)
                {
                    if(elem.attr('aria-checked')=='true')
                    {
                        elem.click();

                    }
                });
            });
            
            let apFunctionalityElem = cy.get('div.role-listings:nth-child(' + appModules[1].index + ')');
            apFunctionalityElem.find('div.role-heading > h6').should('contain.text',appModules[1].header).should('be.visible');
            apFunctionalityElem = cy.get('div.role-listings:nth-child(' + appModules[1].index + ')');
            apFunctionalityElem.find('div.functionality-search > input.form-control-onlytextfield').should('be.visible');
            //g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
            cy.get("div.role-listings:nth-child(" + appModules[1].index + ") > ul.roles-list > li > p-checkbox > div.ui-chkbox > div.ui-chkbox-box").then(function(element){

                cy.get(element).each(function(elem,index)
                {
                    if(elem.attr('aria-checked')=='true')
                    {
                        elem.click();

                    }
                });
            });

            /*
            g1FunctionalityElem.find('ul.roles-list > li > p-checkbox').should("exist").each(function(elem,index)
            {
                cy.wait(500);
                var isChecked = false;
               // appModule.functionalities.forEach(function(moduleFunc,index)
               // {
                    //if (moduleFunc.name == elem.find('label').text())
                    //{
                        //var checkboxElem =  cy.get(elem).find('div.ui-chkbox > div.ui-chkbox-box');
                       //cy.get(checkboxElem).invoke('attr', 'aria-checked').then(function(element){
                        //cy.log(elem.find('label').text());
                        cy.get(elem).find('div.ui-chkbox > div.ui-chkbox-box').should("have.attr",'aria-checked',"true").then(function(element){

                            elem.find('label').click();
                        })
                        //if(element.text() == "true")
                        //{
                        //    elem.find('label').click();
                            //isChecked = true;
                            //return;
                        //}

                       //})
                           
                    //}
                   // else{cy.log("Match not found.");}if(isChecked){return;}
               // })
            });
            */
        //});
    }

    this.deSelectSelectAllFunctionalityCheckbox = function(){

        var showAllFunctionalityElem = cy.get('div.ui-tabview-panel > div.list-checkbox:nth-child(1) > p-checkbox');
        
        showAllFunctionalityElem.find('label').should('contain.text','Select All Functionalities').should('have.class','ui-label-active').first().click();
        cy.wait(ansellConstants.MINTIMEOUT);
        showAllFunctionalityElem = cy.get('div.ui-tabview-panel > div.list-checkbox:nth-child(1) > p-checkbox');
        showAllFunctionalityElem.find('div.ui-chkbox > div.ui-chkbox-box').first().should('have.attr','aria-checked','false');
    }
    this.selectSelectAllFunctionalityCheckbox = function(){

        let showAllFunctionalityElem = cy.get('div.ui-tabview-panel > div.list-checkbox:nth-child(1) > p-checkbox');
        showAllFunctionalityElem.should('have.attr','label','Select All Functionalities').should('be.visible').then(function(elem){

            cy.get(elem).first().click();
            cy.wait(ansellConstants.MAXPLUSTIMEOUT);

        })
        
    }

    this.deSelectShowSelectAFunctionalityCheckbox = function(){

        var showSelectedFunctionalityElem = cy.get('div.ui-tabview-panel > div.list-checkbox:nth-child(2) > p-checkbox');
        showSelectedFunctionalityElem.find('label').should('contain.text','Show Selected Functionalities').should('have.class','ui-label-active').first().click();
        cy.wait(ansellConstants.MINTIMEOUT);
        showSelectedFunctionalityElem = cy.get('div.ui-tabview-panel > div.list-checkbox:nth-child(2) > p-checkbox');
        showSelectedFunctionalityElem.find('div.ui-chkbox > div.ui-chkbox-box').first().should('have.attr','aria-checked','false');
    }
    this.selectShowSelectFunctionalityCheckbox = function(){

        let showSelectedFunctionalityElem = cy.get('div.ui-tabview-panel > div.list-checkbox:nth-child(2) > p-checkbox');
        showSelectedFunctionalityElem.should('have.attr','label','Show Selected Functionalities').should('be.visible').then(function(elem){
            cy.get(elem).first().click();
            cy.wait(ansellConstants.MAXPLUSTIMEOUT);
        })
    }

    this.verifyAllcheckboxSelected = function(appModules)
    {

        appModules.forEach(function(appModule,index){
            let g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
            g1FunctionalityElem.find('div.role-heading > h6').should('contain.text',appModule.header).should('be.visible');
            g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
            g1FunctionalityElem.find('div.functionality-search > input.form-control-onlytextfield').should('be.visible');
            g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
            g1FunctionalityElem.find('ul.roles-list > li > p-checkbox').should("exist").each(function(elem,index){cy.wait(500);
                    if(appModule.functionalities.some(e => e.name === elem.find('label').text()) && cy.get(elem).find('div.ui-chkbox > div.ui-chkbox-box').should("have.attr",'aria-checked',"true") 
                    && cy.get(elem).find('div.ui-chkbox > div.ui-helper-hidden-accessible > input').should('not.be.visible').should('be.checked')){expect(true).to.be.true;return ;}
            });
        });

        
    }
    
    this.createGroupAndVerifyShowSelectedFunctionalityCheckboxWithOptionSelected = function (groupname,appModules) {
        //cy.get('#groupname').should("be.visible").clear();
        //cy.get('#myonoffswitch').should('not.be.visible').should('be.checked');
        //this.createGroup(groupname,ansellConstants.ENABLED);
        this.verifyShowSelectedFunctionalityCheckboxWithFewFunctionalitySelected(appModules);
        //this.cancellGroupCreation();
    }
    this.createGroupAndVerifyShowSelectedFunctionalityCheckboxWithNoFunctionalitySelected = function (groupname,appModules) {
        //cy.get('#groupname').should("be.visible").clear();
        //cy.get('#myonoffswitch').should('not.be.visible').should('be.checked');
        //this.createGroup(groupname,ansellConstants.ENABLED);
        this.verifyShowSelectedFunctionalityCheckboxNoFunctionalitySelected(appModules);
        //this.cancellGroupCreation();
    }
    this.createGroupAndVerifyContentOfModuleAndFunctionalityListTab = function(groupname,appModules)
    {
        cy.get('#groupname').should("be.visible").clear();
        cy.get('#myonoffswitch').should('not.be.visible').should('be.checked');
        this.createGroup(groupname,ansellConstants.ENABLED);
        this.verifyContentOfModuleAndFunctionalityListTab(appModules);
        //this.cancellGroupCreation();
    }

    this.verifyFunctionalityOfSelectAllFunctionalityCheckboxWhenAllFuctionalityCheckboxSelected = function(appModules){

        this.unCheckAllFunctionalityCheckboxForModule(appModules);
        this.checkAllFunctionalityCheckboxForModule(appModules);
        this.verifyFunctionalityOfSelectAllFunctionalityCheckbox(appModules);
    }

    this.verifyFunctionalityOfSearchFieldWhenFunctionalityNotSelected = function(appModules){
        let showSelectedFunctionalityElem = cy.get('div.ui-tabview-panel > div.list-checkbox:nth-child(2) > p-checkbox');
        showSelectedFunctionalityElem.should('have.attr','label','Show Selected Functionalities').should('be.visible');
        showSelectedFunctionalityElem.find('div.ui-chkbox > div.ui-chkbox-box').should('have.attr','aria-checked','false');

        let showAllFunctionalityElem = cy.get('div.ui-tabview-panel > div.list-checkbox:nth-child(1) > p-checkbox');
        showAllFunctionalityElem.should('have.attr','label','Select All Functionalities').should('be.visible');
        showAllFunctionalityElem.find('div.ui-chkbox > div.ui-chkbox-box').should('have.attr','aria-checked','false');

        appModules.forEach(function(appModule,index){
            let g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
            g1FunctionalityElem.find('div.role-heading > h6').should('contain.text',appModule.header).should('be.visible');            
            appModule.functionalities.forEach(function(moduleFunc,index)
                {
                    g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
                    g1FunctionalityElem.find('div.functionality-search > input.form-control-onlytextfield').should('be.visible').clear().type(moduleFunc.name);
                    cy.wait(ansellConstants.MINTIMEOUT);
                    //g1FunctionalityElem = cy.get('');
                    //cy.get('div.role-listings:nth-child(' + appModule.index + ') > ul.roles-list > li > p-checkbox').should("exist").each(
                    //    function(elem,index)
                     //       {
                     //           cy.wait(ansellConstants.MINTIMEOUT);
                     cy.get('div.role-listings:nth-child(' + appModule.index + ') > ul.roles-list > li > p-checkbox > label').then(function(elem, index){

                        if(appModule.functionalities.some(e => e.name === elem.find('label').text()) &&
                                   cy.get(elem).find('div.ui-chkbox > div.ui-chkbox-box').should("have.attr",'aria-checked',"false") &&
                                   cy.get(elem).find('div.ui-chkbox > div.ui-helper-hidden-accessible > input').should('not.be.visible').should('not.be.checked')){expect(true).to.be.true;return ;}
                    });
                    g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
                    g1FunctionalityElem.find('div.functionality-search > input.form-control-onlytextfield').should('be.visible').clear();

                     //})
                                
                
                })
        });
    }

    this.verifyFunctionalityOfSearchFieldWhenFunctionalitySelected = function(appModules){
        let showSelectedFunctionalityElem = cy.get('div.ui-tabview-panel > div.list-checkbox:nth-child(2) > p-checkbox');
        showSelectedFunctionalityElem.should('have.attr','label','Show Selected Functionalities').should('be.visible');
        showSelectedFunctionalityElem.find('div.ui-chkbox > div.ui-chkbox-box').should('have.attr','aria-checked','false');

        let showAllFunctionalityElem = cy.get('div.ui-tabview-panel > div.list-checkbox:nth-child(1) > p-checkbox');
        showAllFunctionalityElem.should('have.attr','label','Select All Functionalities').should('be.visible');
        showAllFunctionalityElem.find('div.ui-chkbox > div.ui-chkbox-box').should('have.attr','aria-checked','false');

        appModules.forEach(function(appModule,index){
            let g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
            g1FunctionalityElem.find('div.role-heading > h6').should('contain.text',appModule.header).should('be.visible');            
            appModule.functionalities.forEach(function(moduleFunc,index)
                {
                    g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
                    g1FunctionalityElem.find('div.functionality-search > input.form-control-onlytextfield').should('be.visible').clear().type(moduleFunc.name);

                    g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
                    g1FunctionalityElem.find('ul.roles-list > li > p-checkbox').should("exist").each(function(elem,index){cy.wait(500);
                    if(appModule.functionalities.some(e => e.name === elem.find('label').text()) && cy.get(elem).find('div.ui-chkbox > div.ui-chkbox-box > span.ui-chkbox-icon').should('have.class','pi-check') 
                    && cy.get(elem).find('div.ui-chkbox > div.ui-helper-hidden-accessible > input').should('not.be.visible').should('not.be.checked')){expect(true).to.be.true;return ;}
                  });
                    g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
                    g1FunctionalityElem.find('div.functionality-search > input.form-control-onlytextfield').should('be.visible').clear();
                
                })
        });
    }

    this.verifyFunctionalityOfSearchFieldWithInvalidData = function(appModules){
        let showSelectedFunctionalityElem = cy.get('div.ui-tabview-panel > div.list-checkbox:nth-child(2) > p-checkbox');
        showSelectedFunctionalityElem.should('have.attr','label','Show Selected Functionalities').should('be.visible');
        showSelectedFunctionalityElem.find('div.ui-chkbox > div.ui-chkbox-box').should('have.attr','aria-checked','false');

        let showAllFunctionalityElem = cy.get('div.ui-tabview-panel > div.list-checkbox:nth-child(1) > p-checkbox');
        showAllFunctionalityElem.should('have.attr','label','Select All Functionalities').should('be.visible');
        showAllFunctionalityElem.find('div.ui-chkbox > div.ui-chkbox-box').should('have.attr','aria-checked','false');
        appModules.forEach(function(appModule,index){
            let g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
            g1FunctionalityElem.find('div.role-heading > h6').should('contain.text',appModule.header).should('be.visible');
            appModule.functionalities.forEach(function(moduleFunc,index)
                {
                    if(index>=5)
                    {
                        return;
                    }
                    g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
                    g1FunctionalityElem.find('div.functionality-search > input.form-control-onlytextfield').should('be.visible').clear().type((moduleFunc.name + "_invalid"));

                    g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
                    g1FunctionalityElem.find('ul.roles-list > li > p-checkbox').should("not.exist");
                    g1FunctionalityElem = cy.get('div.role-listings:nth-child(' + appModule.index + ')');
                    g1FunctionalityElem.find('div.functionality-search > input.form-control-onlytextfield').should('be.visible').clear();
                    
                })
        });
    }

    this.verifyActiveTabsVisibility = function(tabName, index)
    {
        cy.wait(ansellConstants.MINTIMEOUT);
        cy.get('ul.ui-tabview-nav > li:nth-child(' + index + ').ui-state-active > a > span.ui-tabview-title').should('contain.text',tabName).should('be.visible');
        //cy.get('ul.ui-tabview-nav > li:nth-child(' + index + ').ui-state-active > a > span.ui-tabview-title').should("contain.text','" + tabName+ "'").should('be.visible');
    }
    this.verifyNonActiveTabsVisibility = function(tabName, index)
    {
        cy.wait(ansellConstants.MINTIMEOUT);
        cy.get('ul.ui-tabview-nav > li:nth-child(' + index + ').ui-state-default > a > span.ui-tabview-title').should('contain.text',tabName).should('be.visible');
    }
    this.verifyTabsNotVisible = function(tabName, index)
    {
        cy.wait(ansellConstants.MINTIMEOUT);
        cy.get('ul.ui-tabview-nav > li').each(function(elem,index){

            var tabText = elem.children('a').children('span').text();
            if(tabText == tabName)
            {
                expect(false).to.be.true;
                return ;
            }
            else
            {
                expect(true).to.be.true;
            }
        });
    }
    this.verifyEditFunctionality = function(groupname)
    {
        cy.get('#groupname').should("have.value",groupname).should("be.visible");
        cy.get('#myonoffswitch').should('not.be.visible').should('be.checked');
        /*
        cy.get('ul.ui-tabview-nav > li:nth-child(1).ui-state-active > a > span.ui-tabview-title').should('contain.text','Modules & Functionality').should('be.visible');
        cy.get('ul.ui-tabview-nav > li:nth-child(2).ui-state-default > a > span.ui-tabview-title').should('contain.text','Chemicals List').should('be.visible');
        cy.get('ul.ui-tabview-nav > li:nth-child(3).ui-state-default > a > span.ui-tabview-title').should('contain.text','Products List').should('be.visible');
        */
        this.verifyActiveTabsVisibility("Modules & Functionality",1);
        this.verifyNonActiveTabsVisibility("Chemicals List",2);
        this.verifyNonActiveTabsVisibility("Products List",3);
    }

    this.verifyEditFunctionalityNonEditableUser = function(groupname)
    {
        cy.get('#groupname').should("have.value",groupname).should('be.disabled');
        cy.get('#myonoffswitch').should('not.be.visible').should('be.checked').should('be.disabled');
        /*
        cy.get('ul.ui-tabview-nav > li:nth-child(1).ui-state-active > a > span.ui-tabview-title').should('contain.text','Modules & Functionality').should('be.visible');
        cy.get('ul.ui-tabview-nav > li:nth-child(2).ui-state-default > a > span.ui-tabview-title').should('contain.text','Chemicals List').should('be.visible');
        cy.get('ul.ui-tabview-nav > li:nth-child(3).ui-state-default > a > span.ui-tabview-title').should('contain.text','Products List').should('be.visible');
        */
        this.verifyActiveTabsVisibility("Modules & Functionality",1);
        this.verifyNonActiveTabsVisibility("Chemicals List",2);
        this.verifyNonActiveTabsVisibility("Products List",3);
    }

    this.verifyBenefitListNotDisplayedOnScreen = function()
    {
        this.verifyTabsNotVisible("Benefits List",4);
    }
    this.clickOntTab = function(tabName,index)
    {
        cy.get('ul.ui-tabview-nav > li:nth-child(' + index + ').ui-state-default > a > span.ui-tabview-title').should('contain.text',tabName).should('be.visible').click();
        cy.wait(ansellConstants.MINTIMEOUT);
        cy.get('ul.ui-tabview-nav > li:nth-child(' + index + ').ui-state-active > a > span.ui-tabview-title').should('contain.text',tabName).should('be.visible');
    }
    this.verifyContentsBenefitListTab = function()
    {
        cy.get("div[role='tabpanel'] > div > div > p-checkbox > label").should("have.text","Show all Selected Functionality(s)").should("be.visible");
        cy.get("div[role='tabpanel'] > div > div > p-checkbox > div > div[role='checkbox'] > span").should("exist");
        cy.get("div[role='tabpanel'] > div > div > p-button > button > span.ui-button-text").should("have.text","Add Splash Benefits");
        cy.get("p-table#splashBenefitsListingGrid > div.ui-table > div > table > thead.ui-table-thead:nth-child(1) > tr:nth-child(1) > th:nth-child(1) > p-tableheadercheckbox > div > div > input[type='checkbox']").first().should("exist");
        cy.get("p-table#splashBenefitsListingGrid > div.ui-table > div > table > thead.ui-table-thead:nth-child(1) > tr:nth-child(1) > th:nth-child(1) > p-tableheadercheckbox > div > div.ui-chkbox-box").first().should("exist");
        cy.get("p-table#splashBenefitsListingGrid > div.ui-table > div > table > thead.ui-table-thead:nth-child(1) > tr:nth-child(1) > th:nth-child(3) > span").first().should("have.text","Benefit Name").should("be.visible");
        cy.get("p-table#splashBenefitsListingGrid > div.ui-table > div > table > thead.ui-table-thead:nth-child(1) > tr:nth-child(1) > th:nth-child(4) > span").first().should("have.text","Action").should("be.visible");
        cy.get("p-table#splashBenefitsListingGrid > div.ui-table > div > table > thead.ui-table-thead:nth-child(1) > tr:nth-child(2) > th:nth-child(3) > input.ui-inputtext").first().should("be.visible");
        cy.get("p-table#splashBenefitsListingGrid > div.ui-table > div > table > tbody > tr > td:nth-child(1) > p-tablecheckbox> div > div > input[type='checkbox']").each(function(elem,index){
            cy.get(elem).should("exist");
        })
        cy.get("p-table#splashBenefitsListingGrid > div.ui-table > div > table > tbody > tr > td:nth-child(1) > p-tablecheckbox> div > div.ui-chkbox-box").each(function(elem,index){
            cy.get(elem).should("exist");
        })
    }
    this.verifyPaging = function()
    {
        var pageCounter = 0;
        cy.get("p-table#splashBenefitsListingGrid > div > p-paginator[styleclass='ui-paginator-bottom'] > div.ui-paginator-bottom > a.ui-paginator-first").should("have.class","ui-state-disabled").should("not.be.enabled");
        cy.get("p-table#splashBenefitsListingGrid > div > p-paginator[styleclass='ui-paginator-bottom'] > div.ui-paginator-bottom > a.ui-paginator-prev").should("have.class","ui-state-disabled").should("not.be.enabled");
        cy.get("p-table#splashBenefitsListingGrid > div > p-paginator[styleclass='ui-paginator-bottom'] > div > span.ui-paginator-pages > a").each(function(elem,index){
            if(index==0)
            {
                cy.get(elem).should("have.class","ui-state-active");
            }
            else
            {
                pageCounter++;
                cy.get(elem).click({force: true});
                cy.wait(ansellConstants.MINTIMEOUT);
                cy.get(elem).should("have.class","ui-state-active");
                var defCount;
                cy.get("p-table#splashBenefitsListingGrid > div > p-paginator[styleclass='ui-paginator-bottom'] > div.ui-paginator-bottom > p-dropdown > div.ui-dropdown > div.ui-dropdown-label-container > span").then(($btn) => 
                { 
                    defCount = $btn.text();
                    cy.get("p-table#splashBenefitsListingGrid > div >  div > table > tbody.ui-table-tbody > tr").should("have.length.lte",parseInt(defCount));
                    defCount =0;
                });
            }

            if(pageCounter>0)
            {
                cy.get("p-table#splashBenefitsListingGrid > div > p-paginator[styleclass='ui-paginator-bottom'] > div.ui-paginator-bottom > a.ui-paginator-first").click();
                cy.wait(ansellConstants.MINTIMEOUT);
                cy.get("p-table#splashBenefitsListingGrid > div > p-paginator[styleclass='ui-paginator-bottom'] > div.ui-paginator-bottom > p-dropdown > div.ui-dropdown > div.ui-dropdown-label-container > span").then(($btn) => 
                { 
                    defCount = $btn.text();
                    cy.get("p-table#splashBenefitsListingGrid > div >  div > table > tbody.ui-table-tbody > tr").should("have.length.lte",parseInt(defCount));
                });
                cy.log(defCount);

                cy.get("p-table#splashBenefitsListingGrid > div > p-paginator[styleclass='ui-paginator-bottom'] > div.ui-paginator-bottom > a.ui-paginator-last").click();
                cy.wait(ansellConstants.MINTIMEOUT);
                cy.get("p-table#splashBenefitsListingGrid > div > p-paginator[styleclass='ui-paginator-bottom'] > div.ui-paginator-bottom > p-dropdown > div.ui-dropdown > div.ui-dropdown-label-container > span").then(($btn) => 
                { 
                    defCount = $btn.text();
                    cy.get("p-table#splashBenefitsListingGrid > div >  div > table > tbody.ui-table-tbody > tr").should("have.length.lte",parseInt(defCount));
                });

                cy.get("p-table#splashBenefitsListingGrid > div > p-paginator[styleclass='ui-paginator-bottom'] > div.ui-paginator-bottom > a.ui-paginator-prev").click();
                cy.wait(ansellConstants.MINTIMEOUT);
                cy.get("p-table#splashBenefitsListingGrid > div > p-paginator[styleclass='ui-paginator-bottom'] > div.ui-paginator-bottom > p-dropdown > div.ui-dropdown > div.ui-dropdown-label-container > span").then(($btn) => 
                { 
                    defCount = $btn.text();
                    cy.get("p-table#splashBenefitsListingGrid > div >  div > table > tbody.ui-table-tbody > tr").should("have.length.lte",parseInt(defCount));
                });

                cy.get("p-table#splashBenefitsListingGrid > div > p-paginator[styleclass='ui-paginator-bottom'] > div.ui-paginator-bottom > a.ui-paginator-next").click();
                cy.wait(ansellConstants.MINTIMEOUT);
                cy.get("p-table#splashBenefitsListingGrid > div > p-paginator[styleclass='ui-paginator-bottom'] > div.ui-paginator-bottom > p-dropdown > div.ui-dropdown > div.ui-dropdown-label-container > span").then(($btn) => 
                { 
                    defCount = $btn.text();
                    cy.get("p-table#splashBenefitsListingGrid > div >  div > table > tbody.ui-table-tbody > tr").should("have.length.lte",parseInt(defCount));
                });

            }
        })
    }
   
    this.verifyAddSplashBenefit = function(){

        cy.get("div[role='tabpanel'] > div > div > p-button > button > span.ui-button-text").should("have.text","Add Splash Benefits").click();
        cy.wait(ansellConstants.MINTIMEOUT);
        cy.get("div[role='dialog'] > div.ui-dialog-titlebar >span.ui-dialog-title").should("have.text","Add Splash Benefits");
        cy.get("#splash").should("be.visible");
        cy.get("div[role='dialog'] > div.ui-dialog-content > app-splash-addedit-dialog > form > div > p-button[label='Save'] > button.ui-state-disabled > span.ui-button-text").should("have.text","Save").should("be.visible");
        cy.get("div[role='dialog'] > div.ui-dialog-content > app-splash-addedit-dialog > form > div > p-button[label='Cancel'] > button.ui-button > span.ui-button-text").should("have.text","Cancel").should("be.visible");

    }

    this.verifytheSplashBenefitTextBoxMaxLength = function(validationText)
    {
        cy.get("#splash").should("be.visible").click().type(validationText);
        cy.wait(ansellConstants.MINTIMEOUT);
        cy.get("#splash").should("be.visible").should("have.value",validationText.substring(0, 50))
        cy.get("#splash").should("be.visible").click().clear();
    }

    this.verifytheSplashBenefitTextBoxBlankValue = function(validationMessage)
    {
        cy.get("#splash").should("be.visible").click().clear().type('{enter}');
        cy.wait(ansellConstants.MINTIMEOUT);
        cy.get("div[role='dialog'] > div.ui-dialog-content > app-splash-addedit-dialog > form > div > p-button[label='Save'] > button.ui-state-disabled > span.ui-button-text").should("have.text","Save").should("be.visible").click();
        cy.get("span > div.form-error-message").should("contain.text",validationMessage).should("be.visible");
        cy.get("div[role='dialog'] > div.ui-dialog-content > app-splash-addedit-dialog > form > div > p-button[label='Save'] > button.ui-state-disabled > span.ui-button-text").should("be.visible");
    }

    this.verifytheSplashBenefitTextBoxExistingValue = function(existingBenefit,validationMessage)
    {
        cy.get("#splash").should("be.visible").click().clear();
        cy.get("#splash").should("be.visible").click().type(existingBenefit + '{enter}');
        cy.wait(ansellConstants.MINTIMEOUT);
        cy.get("div[role='dialog'] > div.ui-dialog-content > app-splash-addedit-dialog > form > div > p-button[label='Save'] > button.ui-state-disabled > span.ui-button-text").should("have.text","Save").should("be.visible").click();
        cy.get("span > div.form-error-message").should("contain.text",validationMessage).should("be.visible");
        cy.get("div[role='dialog'] > div.ui-dialog-content > app-splash-addedit-dialog > form > div > p-button[label='Save'] > button.ui-state-disabled > span.ui-button-text").should("have.text","Save").should("be.visible");
    }

    this.verifyBenefitInGrid = function(benefitName, checkboxStatus)
    {
        cy.get("p-table#splashBenefitsListingGrid > div.ui-table > div > table > thead >tr:nth-child(2) > th:nth-child(3) > input").clear().type('{enter}')
        cy.wait(ansellConstants.MAXTIMEOUT);
        cy.get("p-table#splashBenefitsListingGrid > div.ui-table > div > table > thead >tr:nth-child(2) > th:nth-child(3) > input").type(benefitName + '{enter}')
        cy.wait(ansellConstants.MAXTIMEOUT);
        cy.get("p-table#splashBenefitsListingGrid > div.ui-table > div > table > tbody > tr > td:nth-child(3) > span").each(function(elem,index){
            if(elem.text() == benefitName)
            {
                expect(true).to.be.true;
                if(checkboxStatus == true)
                {
                    cy.get("p-table#splashBenefitsListingGrid > div.ui-table > div > table > tbody > tr:nth-child(" + (index+1) +") > td:nth-child(1) > p-tablecheckbox > div > div[aria-checked='true']").should("be.visible");
                }
                else
                {
                    cy.get("p-table#splashBenefitsListingGrid > div.ui-table > div > table > tbody > tr:nth-child(" + (index+1) +") > td:nth-child(1) > p-tablecheckbox > div > div[aria-checked='false']").should("be.visible");
                }
                return;
            }
        });
    }
    this.createAndVerifyNewBenefit = function(benefitName)
    {
        cy.log(benefitName);
        cy.get("#splash").should("be.visible").click().clear();
        cy.get("#splash").should("be.visible").click().type(benefitName + '{enter}');
        cy.wait(ansellConstants.MINTIMEOUT);
        cy.get("div[role='dialog'] > div.ui-dialog-content > app-splash-addedit-dialog > form > div > p-button[label='Save'] > button.ui-button > span.ui-button-text").should("have.text","Save").should("be.visible").click();
        cy.wait(ansellConstants.MINTIMEOUT);
        cy.get("div[role='dialog'] > div.ui-dialog-titlebar >span.ui-dialog-title").should("not.exist");
        this.verifyBenefitInGrid(benefitName,false);
    }

    this.editAndVerifyBenefit = function(benefitName)
    {

        var benefitUpdated = benefitName + "_Updated";
        cy.log(benefitName);
        cy.get("p-table#splashBenefitsListingGrid > div.ui-table > div > table > thead >tr:nth-child(2) > th:nth-child(3) > input").clear().type('{enter}')
        cy.wait(ansellConstants.MAXTIMEOUT);
        cy.get("p-table#splashBenefitsListingGrid > div.ui-table > div > table > thead >tr:nth-child(2) > th:nth-child(3) > input").type(benefitName + '{enter}')
        cy.wait(ansellConstants.MAXTIMEOUT);
        cy.get("p-table#splashBenefitsListingGrid > div.ui-table > div > table > tbody > tr").each(function(elem,index)
        {
            if(elem.children("td:nth-child(3)").children("span").text() == benefitName)
            {
                cy.log("matched")
                cy.get(elem).find("td:nth-child(4) > p-button > button").should("be.visible").click();
                return;
            }
        })
        cy.get("#splash").should("be.visible").click().clear();
        cy.get("#splash").should("be.visible").click().type(benefitUpdated + '{enter}');
        cy.wait(ansellConstants.MINTIMEOUT);
        cy.get("div[role='dialog'] > div.ui-dialog-content > app-splash-addedit-dialog > form > div > p-button[label='Save'] > button.ui-button > span.ui-button-text").should("have.text","Save").should("be.visible").click();
        cy.wait(ansellConstants.MINTIMEOUT);
        cy.get("div[role='dialog'] > div.ui-dialog-titlebar >span.ui-dialog-title").should("not.exist");
        this.verifyBenefitInGrid(benefitUpdated,false)
    }

    this.clearUserGroupName = function()
    {
        cy.get('#groupname').should("be.visible").clear();
        cy.get('#myonoffswitch').should('not.be.visible').should('be.checked');
    }

    this.createGroupAndAssignFunctionality = function(groupname,appModules)
    {
        this.clearUserGroupName();
        this.createGroup(groupname,ansellConstants.ENABLED);
        this.checkFunctionalityCheckboxForModule(appModules)
        this.saveGroupCreation();
        //manageUserGroup.verifyGroupInGrid(groupname,ansellConstants.ENABLED);
    }

    this.createGroupWithoutFunctionality = function(groupname)
    {
        this.clearUserGroupName();
        this.createGroup(groupname,ansellConstants.ENABLED);
        this.saveGroupCreation();
        //manageUserGroup.verifyGroupInGrid(groupname,ansellConstants.ENABLED);
    }
    this.updateGroupName = function(groupName){
        cy.get('#groupname').should("be.visible").clear();
        cy.get('#groupname').should("be.visible").type(groupName);
    }

    this.updateModuleFunctionalities = function(appModule)
    {
        this.unCheckAllFunctionalityCheckboxForModule(appModule);
        
        this.checkFunctionalityCheckboxForModule(appModule);
        this.saveGroupCreation();
    }

    this.verifyUserGroupExistInSelectGroupDropDown = function(enabledUserGroupName)
    {
        cy.get("p-dropdown[formcontrolname='userGroupId']  > div.ui-dropdown > div.ui-dropdown-label-container > span.ui-dropdown-label").should('be.visible').click();
        cy.wait(ansellConstants.MINTIMEOUT);
        cy.get("input.ui-dropdown-filter").should("be.visible").click().type(enabledUserGroupName);
        cy.get("p-dropdownitem > li[aria-label='" + enabledUserGroupName + "'] > span").should("have.text",enabledUserGroupName).click();
        cy.get("p-dropdown[formcontrolname='userGroupId']").should('be.visible').should('contain.text', enabledUserGroupName);
        cy.get(ansellConstants.MINTIMEOUT);
        cy.get("p-dropdown[formcontrolname='userGroupId'] > div.ui-dropdown > div.ui-dropdown-label-container > span").should("have.text",enabledUserGroupName).should("be.visible");
    }
};
module.exports = new addNewUserGroupRoles();