let dashboardRepo = require('./dashboard.repo');
let timeUtility = require('../utilities/timeUtilities');
let ansellConstants = require('../functionLogic/ansellConstants');

let manageIndustryFloorPlan

manageIndustryFloorPlan = function () {

    this.verifyPageTitle = function (title) {

        cy.title().should('eq', title)//Admin Portal

        


    }

    this.verifyPageUrl = function (url) {

        cy.url().should('include', url)//floor
    }

    this.verifyTotalModulesPresent = function () {

        cy.get("[class='ui-card-body']").should('have.length', 9)
            .each(function ($ele, index, $lis) {


            }).then(function ($lis) {

                expect($lis).to.have.length(9)
            })


    }

    this.verifyPresenceOfManageIndustryFloorPlan = function (val) {

        cy.get(' div:nth-child(3) > div > p-card > div > div > div > div.module_title > h3').should('be.visible')

            .should('have.text', val)//Manage Industry Floorplan 

    }


    this.clickonManageIndustryIcon = function (value) {

        cy.get('.ui-card-body').each(function ($ele, index) {

            const text = $ele.text()

            if (text.includes(value)) {

                $ele.click()

                cy.url().should('include', 'floor')
            }
        })
    }
    // tc_003
    this.verifyFieldsAndButtonsManageIndustryFloorPlanDashboard = function () {

        cy.get(' div > div:nth-child(7) >p-button:nth-child(1)').should('be.visible').should('contain.text', 'Clear')

        cy.get(' div > div:nth-child(7) >p-button:nth-child(1)').then(function ($ele) {

            expect($ele.text()).to.contain('Clear')

        })

        cy.get(' div > div:nth-child(7) >p-button:nth-child(2)').should('be.visible').should('contain.text', 'Search')

        cy.get(' div > div:nth-child(7) >p-button:nth-child(2)').then(function ($ele) {

            expect($ele.text()).to.contain('Search')

        })

        cy.get('[label="Back"]').should('be.visible').should('contain.text', 'Back')

        cy.get('[label="Add New Industry"]').should('be.visible').should('contain.text', 'Add New Industry')

        cy.get(" [formcontrolname='industryName']").should('be.visible')

       cy.get("[formcontrolname='processName']").should('be.visible')

       cy.get("[formcontrolname='applicationName']").should('be.visible')

        cy.get("[role='searchbox']").should('be.visible')

        cy.get("[type='text']").should('have.length',6)


    }



    this.verifyBackBtnfunctionality = function (inputText) {

        cy.get('[label="Back"]').should('contain.text','Back').should('be.visible')
        .then(function(ele){
            expect(ele.text()).to.contain('Back')
        }).click()
        

        cy.url().should('include', inputText) //dashboard


    }


    this.lsitofindustriesWithBtn = function () {





    }

    this.verifyUserwithDefaultIndustry = function () {


    }

    this.selectMultipleIndustries = function () {

        var isChecked = false;

        cy.get(" [role='checkbox']").should('be.visible').should('not.be.checked').each(function ($ele, index) {

            if ($ele.attr('aria-checked') == 'false') {

                $ele.click()
            }
            else {

                return isChecked
            }

        })

        // to  verify if checkboxes are uncheck now 
       
        cy.get(" [role='checkbox']").should('be.visible').each(function ($ele, index) {

            if ($ele.attr('aria-checked') == 'true') {

                $ele.click()

                
            }

            


        })


    }

    this.verifyIconsPresentOnIdustryImage = function (edittex,copytext,exporttext, deletetext) {

        cy.get("[class='industry-block']").first().find('[title="Edit"]').should('be.visible').then(function($ele){

            expect($ele.text()).to.contain(edittex)
        })

        cy.get("[class='industry-block']").first().find('[title="Copy"]').should('be.visible').then(function($ele){

            expect($ele.text()).to.contain(copytext)
        })

        cy.get("[class='industry-block']").first().find('[title="Export"]').should('be.visible').then(function($ele){

            expect($ele.text()).to.contain(exporttext)
        })

        cy.get("[class='industry-block']").first().find('[title="Delete"]').should('be.visible').then(function($ele){

            expect($ele.text()).to.contain(deletetext)
        })


    }



    this.verifyRegionNameOnIndustry = function (regionname) {

        cy.get("[class='industry-block']").first().find('[class="pull-right"]').should('be.visible')

        cy.get("[class='industry-block']").find('[class="pull-right"]').should('be.visible')

        cy.get("[class='industry-block']").first().find('[class="pull-right"]').then(function (ele) {

            cy.log(ele.text())

            expect(ele.text()).to.contain(regionname)
        })


    }

    this.verifyDeleteConfirmationPopUpAndRecord = function (Confirmationtext) {


        cy.get("[class='industry-block']").first().find('[title="Delete"]').click()

        cy.get("[class='ui-dialog-title ng-tns-c60-4 ng-star-inserted']").then(function (ele) {

            cy.log(ele.text())

            expect(ele.text()).to.contain(Confirmationtext)//Confirmation
        })

        cy.get('div > div.ui-dialog-content>span').should('have.text', 'Delete industry ?')
            .should('contain.text', 'Delete industry ?')
            .then(function (ele) {

                expect(ele.text()).to.contain('Delete industry ?')
            })

        cy.get('div > div.ui-dialog-footer>button:nth-child(1)').should('have.text', 'Ok')
            .should('contain.text', 'Ok')
            .then(function (data) {

                expect(data.text()).to.contain('Ok')
            })
            .click()

            cy.wait(3000)

            cy.get('p-card >div div> div > div>div:nth-child(2)>h4').each(function ($ele, index) {
    
                if ($ele.text().includes('Drug')) {
    
                    cy.log("element  found")
    
                    return true
    
                }
                else {
    
    
                    cy.log("ele not found")
    
                    return false
    
    
    
                }
            })
    


    }

   
    this.verifyEditConfirmationPopUp = function (edictindustrytext) {

        cy.get("[class='industry-block']").first().find('[title="Edit"]').click()

        cy.get(' p-dynamicdialog > div > div >div:nth-child(1)>span').then(function (ele) {

            expect(ele.text()).to.contain(edictindustrytext)//Edit Industry
        })


    }

    this.copyConfirmationPop = function () {

        // developement is in process
    }



    this.exportConfirmationPop = function () {

        // developement is in process
    }

    this.veriySelectedrecordDeletedFromIndustry = function () {


    }

    this.VerifyAddnewIndustrybtnPopUp = function () {

        cy.get('[label="Add New Industry"]').should('be.visible').click()

        cy.get('[class="ui-dialog-title ng-tns-c80-103"]').then(function (ele) {

            cy.log(ele.text())

            expect(ele.text()).to.contain('Add Industry')
        })


    }

    this.verifyUpdateIndustryRecord = function (indexnum) {

        cy.get("[class='industry-block']").each(function ($ele, index) {

            if (index == indexnum) {

                cy.get(" p-card >div div> div > div>div:nth-child(2)>h4").each(function ($text, index) {

                    if (index == indexnum) {

                        //cy.log($text.text())

                        const val1 = $text.text()


                        $ele.find('[title="Edit"]').click()

                        cy.get("[label='Save']").should('be.visible').click()
                        
                        cy.wait(2000)

                        cy.get('div:nth-child(1) > p-card > div > div > div > div > div.industry-image > h4')

                        .then(function ($text1) {

                            // cy.log($text1.text())

                            expect($text1.text()).to.be.eq(val1)
                        })

            


                    }
                })




            }

        })

      

                

    }

    this.verifyIndustryImageLink= function(){
    
    
        cy.get("[class='industry-block']").first().find("div.industry-action-icons>ul>li")

        .each(function($ele,index,$list){

            
        }).then(function($list){

            expect($list).to.have.length(4)
        })

    
    
}

this.verifyAddnewIndustryCreation= function(){

    cy.get('[label="Add New Industry"]').should('be.visible').click()

    cy.get('#industryName').type("test").should('have.value','test')




}





}

module.exports = new manageIndustryFloorPlan()