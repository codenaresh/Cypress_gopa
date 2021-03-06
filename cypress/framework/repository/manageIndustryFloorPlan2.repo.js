

var industryFloorPlanManage

industryFloorPlanManage = function () {

    this.verifyPageTitle = function (title) {

        cy.title().should('eq', title)//Admin Portal



    }

    this.verifyPageUrl = function (url) {

        cy.url().should('include', url)//floor
    }

    this.verifyTotalModulesPresent = function (totlalmodule) {

        cy.get("[class='ui-card-body']").should('have.length', 9)
            .each(function ($ele, index, $lis) {


            }).then(function ($lis) {

                expect($lis).to.have.length(totlalmodule)
            })


    }

    this.verifyPresenceOfManageIndustryFloorPlan = function (manageindustrytext) {

        cy.get(' div:nth-child(3) > div > p-card > div > div > div > div.module_title > h3').should('be.visible')

            .should('have.text', manageindustrytext)//Manage Industry Floorplan 

    }

    this.clickonManageIndustryIcon = function (inputtext) {

        cy.get('.ui-card-body').each(function ($ele, index) {

            const text = $ele.text()

            if (text.includes(inputtext)) {   //Floorplan

                $ele.click()


            }
        })
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

    this.verifyRegionDropdownValues = function(optionsArray) {
        cy.get('.ui-dropdown-label-container > .ng-tns-c42-6').should('be.visible').click({force:true});
        var index = 1;
        for (const options of optionsArray) {
            cy.get(`:nth-child(${index}) > .ui-dropdown-item`).contains(options);
            index++; 
        }
    }



    this.verifyScreenOnManageIndustryFloorPlan = function (industryfloorplantab, industryfloorplanimorttab) {

        // . Industry Floorplan
        // ii. Industry Floorplan Import
        // 2. By default "Industry Floorplan" tab selected

        cy.url().should('include', 'floor')  // floor

        cy.get('p-tabview>div>ul>li:nth-child(1)').should('be.visible')
            .should('contain', industryfloorplantab)


        cy.get('p-tabview>div>ul>li:nth-child(2)').should('be.visible')
            .should('contain', industryfloorplanimorttab)


        // by default will do later


    }



    this.verifyContentOfIndustryFloorPlan = function (addNewIndustrytext, backbtntext, deletebtnText, searchBtntext) {

        //         Industry Floorplan tab name
        // ii. Advanced Search section
        // iii. Delete button (at top of Listing section)
        // iv. Add New Industry button (at top of Listing section)
        // v. Industry Listing section
        // vi. Back button (at the top)

        cy.get('p-tabview>div>ul>li:nth-child(1)').should('be.visible')
            .should('contain', 'Industry Floorplan')

        cy.get('[label="Add New Industry"]').should('be.visible')
            .then(function (ele) {

                expect(ele.text()).to.contain(addNewIndustrytext)
            })

        cy.get('[label="Back"]').should('contain.text', 'Back').should('be.visible')
            .then(function (ele) {
                expect(ele.text()).to.contain(backbtntext)
            })

        cy.get("[label='Delete']").should('be.visible').should('contain.text', deletebtnText)

        cy.get(' div > div:nth-child(7) >p-button:nth-child(2)').then(function ($ele) {

            expect($ele.text()).to.contain(searchBtntext)

        })

        cy.get(" [formcontrolname='industryName']").should('be.visible')

        cy.get("[formcontrolname='processName']").should('be.visible')

        cy.get("[formcontrolname='applicationName']").should('be.visible')

        cy.get("[role='searchbox']").should('be.visible')

        cy.get("[type='text']").should('have.length', 6)





    }

    this.verifyContentOfAdavcneSearchSection = function (clearBtntext) {


        cy.get(" [formcontrolname='industryName']").should('be.visible')

        cy.get("[formcontrolname='processName']").should('be.visible')

        cy.get("[formcontrolname='applicationName']").should('be.visible')

        cy.get(' div > div:nth-child(7) >p-button:nth-child(1)').then(function ($ele) {

            expect($ele.text()).to.contain(clearBtntext)

        })

        cy.get(' div > div:nth-child(7) >p-button:nth-child(2)').should('be.visible').should('contain.text', 'Search')

        cy.get(' div > div:nth-child(7) >p-button:nth-child(2)').then(function ($ele) {

            expect($ele.text()).to.contain('Search')

        })


    }


    this.verifyContentIndustryLisingSection = function (editlableText, copylabeltext, ExportlabelText, deleteLableText) {

        cy.get("[class='industry-block']").first().should('be.visible')


        cy.get("[class='industry-block']").first().find('[title="Edit"]').should('be.visible').then(function ($ele) {

            expect($ele.text()).to.contain(editlableText)
        })

        cy.get("[class='industry-block']").first().find('[title="Copy"]').should('be.visible').then(function ($ele) {

            expect($ele.text()).to.contain(copylabeltext)
        })

        cy.get("[class='industry-block']").first().find('[title="Export"]').should('be.visible').then(function ($ele) {

            expect($ele.text()).to.contain(ExportlabelText)
        })

        cy.get("[class='industry-block']").first().find('[title="Delete"]').should('be.visible').then(function ($ele) {

            expect($ele.text()).to.contain(deleteLableText)
        })

        cy.get("[class='industry-block']").first().find('[class="pull-right"]').should('be.visible')

        cy.get("[class='industry-block']").find('[class="pull-right"]').should('be.visible')


        var isChecked = false;

        cy.get(" [role='checkbox']").should('be.visible').should('not.be.checked').each(function ($ele, index) {

            if ($ele.attr('aria-checked') == 'false') {

                return true
            }
            else {

                return isChecked
            }

        })


    }



    this.verifyIndustrySearchByRegionDropdwon = function (regionname) {


        var list = []
        cy.get("[formcontrolname='regionId']").click().then(function () {

            cy.get("[class='region_name']").should('be.visible').each(function (ele) {

                cy.log(ele.text())

                if (ele.text().includes(regionname)) {

                    ele.click()

                    cy.wait(2000)

                    expect(true).to.be.true;
                }
            })


        })




    }

    this.verifyIndustrySearchByIndustryText = function (industryNameText) {
        

        var d = new Date();

        var update= industryNameText+"TestIndustry"+d

        cy.get(" [formcontrolname='industryName']").should('be.visible')
            .clear()
            .type(update)



    }

    this.verifySearchIndustryByProcessTextField = function (inputtext) {

        cy.get(" [formcontrolname='processName']").should('be.visible')
            .clear()
            .type(inputtext).should('have.value', inputtext)





    }

    this.verifySearchIndustryByApplicationTextField = function (inputtext) {


        cy.get(" [formcontrolname='applicationName']").should('be.visible')
            .clear()
            .type(inputtext).should('have.value', inputtext)



    }

    this.verifySeacrhByProductCategory = function (productname) {

        cy.get("[formcontrolname='productCategoryId']").click().then(function () {

            cy.get("[role='option']").should('be.visible').each(function (ele) {

                if (ele.text().includes(productname)) {

                    ele.click()

                    cy.wait(2000)

                    expect(true).to.be.true;
                }
            })

        })








    }

    this.verifySearchByProductName = function (productname) {

        cy.get("#autoComplete").should('be.visible')
            .clear()
            .type(productname).should('have.value', productname)
    }



    this.verifyAutosuggesionInProductName = function (inputtext) {


        cy.get('#autoComplete').should('be.visible').type(inputtext).should('have.value', inputtext)


        cy.get('[role="option"]').should('be.visible').each(function ($ele, index) {

            cy.log($ele.text())

            cy.log($ele.length)

            expect(true).to.be.true;

            return
        })

    }

    this.verifySearchButtonFunctionality = function (editlableText, copylabeltext, ExportlabelText, deleteLableText, message,loadingtext) {



        cy.get("[label='Search']").should('be.visible').click()

        cy.get("ngx-spinner[name='customspinner'] > div.overlay > div.loading-text > p").should("be.visible")
        .then(function(ele){
    
            cy.log(ele.text())
    
            expect(ele.text()).to.contain(loadingtext)
        })


        cy.wait(2000)

        cy.get('body').then(function ($body) {

            if ($body.find("[class='industry-block']").length > 0) {

                cy.get("[class='industry-block']").first().find('[title="Edit"]').should('be.visible').then(function ($ele) {

                    expect($ele.text()).to.contain(editlableText)
                })

                cy.get("[class='industry-block']").first().find('[title="Copy"]').should('be.visible').then(function ($ele) {

                    expect($ele.text()).to.contain(copylabeltext)
                })

                cy.get("[class='industry-block']").first().find('[title="Export"]').should('be.visible').then(function ($ele) {

                    expect($ele.text()).to.contain(ExportlabelText)
                })

                cy.get("[class='industry-block']").first().find('[title="Delete"]').should('be.visible').then(function ($ele) {

                    expect($ele.text()).to.contain(deleteLableText)
                })

                cy.get("[class='industry-block']").first().find('[class="pull-right"]').should('be.visible')

                cy.get("[class='industry-block']").find('[class="pull-right"]').should('be.visible')


                cy.get('p-card >div div> div > div>div:nth-child(2)>h4').first().then(function (ele) {

                    cy.log(ele.text())

                    // expect(ele.text()).to.contain()
                })

                // delete functionality  start here

                cy.get("[class='industry-block']").first().find("[role='checkbox']").click()

                cy.get("[label='Delete']").should('be.visible').click()

                cy.get(' p-confirmdialog > div > div >div:nth-child(1)').then(function (ele) {

                    cy.log(ele.text())
                })



                cy.get('p-confirmdialog >div>div>div:nth-child(2)>span').should('have.text', 'Delete selected industries ?')
                    .should('contain.text', 'Delete selected industries ?')
                    .then(function (ele) {

                        expect(ele.text()).to.contain('Delete selected industries ?')
                    })



                cy.get(' p-confirmdialog >div>div>div:nth-child(3)>button:nth-child(2)')
                    .should('be.visible')
                    .then(function (ele) {

                        expect(ele.text()).to.contain('Cancel')

                        cy.log(ele.text())
                    })

                cy.get(' p-confirmdialog >div>div>div:nth-child(3)>button:nth-child(1)')
                    .should('be.visible')
                    .then(function (ele) {

                        expect(ele.text()).to.contain('Delete')
                        cy.log(ele.text())
                        ele.click()
                    })


                cy.get('p-card >div div> div > div>div:nth-child(2)>h4').each(function (ele, index) {

                    if (ele.text().includes()) {

                        //  expect().to.be.false
                    }
                })



                // end here








            }

            else {

                cy.get('#ui-tabpanel-0 > div.p-grid.all-industry-blocks.ng-star-inserted').then(function (ele) {

                    cy.log(ele.text())

                    expect(ele.text()).to.contain(message)
                })


            }
        })






    }


    this.verifyLoadingicondisplayed = function (loadingtext) {

        cy.get("ngx-spinner[name='customspinner'] > div.overlay > div.loading-text > p").should("be.visible")
        .then(function(ele){
    
            cy.log(ele.text())
    
            expect(ele.text()).to.contain(loadingtext)
        })


    }

    this.verifyClearBtnFunctionality = function (industryname) {

        cy.get(" [formcontrolname='industryName']").should('be.visible')
            .clear()
            .type(industryname).should('have.value', industryname)

        cy.wait(3000)


        cy.get(' div > div:nth-child(7) >p-button:nth-child(1)').should('be.visible').should('contain.text', 'Clear')

        cy.get(' div > div:nth-child(7) >p-button:nth-child(1)').then(function ($ele) {

            expect($ele.text()).to.contain('Clear')

            $ele.click()

        })




    }


    this.verifyDeleteBtnFunctionality = function () {


        cy.get("[class='industry-block']").first().find("[role='checkbox']").click()

        cy.get("[label='Delete']").should('be.visible').click()

        cy.get(' p-confirmdialog > div > div >div:nth-child(1)').should('be.visible').then(function (ele) {

            cy.log(ele.text())
        })



        cy.get('p-confirmdialog >div>div>div:nth-child(2)>span').should('have.text', 'Delete selected industries ?')
            .should('contain.text', 'Delete selected industries ?')
            .should('be.visible')
            .then(function (ele) {

                expect(ele.text()).to.contain('Delete selected industries ?')
            })



        cy.get(' p-confirmdialog >div>div>div:nth-child(3)>button:nth-child(2)')
            .should('be.visible')
            .then(function (ele) {

                expect(ele.text()).to.contain('Cancel')

                cy.log(ele.text())
            })

        cy.get(' p-confirmdialog >div>div>div:nth-child(3)>button:nth-child(1)')
            .should('be.visible')
            .then(function (ele) {

                expect(ele.text()).to.contain('Delete')
                cy.log(ele.text())
                ele.click()
            })


        cy.get('p-card >div div> div > div>div:nth-child(2)>h4').each(function (ele, index) {

            if (ele.text().includes()) {

                //  expect().to.be.false
            }
        })

    }

    this.verifyUpdatedRecordIsDisplayedAtTheTop = function (indexnum) {

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


        // done in goap-16
    }



    this.indicationForIndustryInDraftState = function (inputtext, inputtext1, industryName, regionname, industrystate, inputdocumenttext) {

        cy.get('[label="Add New Industry"]').should('be.visible')
            .then(function (ele) {

                cy.log(ele.text())

                expect(ele.text()).to.contain(inputtext)

                ele.click()

            })

        cy.get('p-dynamicdialog>div>div>div:nth-child(1)>span').should('be.visible')
            .should('contain.text', inputtext1)  //Add industry
            .then(function (ele) {

                expect(ele.text()).to.contain(inputtext1)
                cy.log(ele.text())
            })

            var d= new Date()

          var  update="TestIndustry"+d+industryName

        cy.get("#industryName").should('be.visible')
            .clear()
            .type(update).should('have.value', update)

        cy.get("app-addedit-industry-floorplan > form>div:nth-child(1)>div:nth-child(2)>div>span").click().then(function () {

            cy.get("[role='option']").each(function (ele) {


                //  cy.log(ele.text())

                if (ele.text().includes(regionname)) {

                    ele.click()
                }

            })

        })

        cy.get("div.p-grid > div:nth-child(3) > div > span > p-dropdown>div").click().then(function () {

            cy.get("[role='option']").each(function (ele) {

                cy.log(ele.text())

                if (ele.text().includes(industrystate)) {  //DDRAFT

                    ele.click()
                }
            })
        })

        cy.get(' p-multiselect > div ').click().then(function () {

            cy.get(" [role='textbox']").type(inputdocumenttext)

            cy.get('p-multiselect:nth-child(1)>div>div:nth-child(4)>div:nth-child(1)>div:nth-child(1)').click()


        })

        cy.get("[label='Save']").click()

        cy.wait(2000)

        cy.get("[class='main-logo']").should('be.visible').click()

        cy.get('.ui-card-body').should('be.visible').each(function ($ele, index) {

            const text = $ele.text()

            if (text.includes('Floorplan')) {   //Floorplan

                $ele.click()


            }
        })

        // search draft

        cy.get("[formcontrolname='regionId']").click().then(function () {

            cy.get("[class='region_name']").should('be.visible').each(function (ele) {

                cy.log(ele.text())

                if (ele.text().includes('LAC')) {

                    ele.click()

                    cy.wait(2000)

                    expect(true).to.be.true;
                }
            })


        })

        cy.get("[label='Search']").should('be.visible').click()

        cy.wait(2000)


        cy.get('p-card >div div> div > div>div:nth-child(2)>h4').first().then(function (ele) {

            cy.log(ele.text())

            

            if (ele.text().includes('Draft')) {

                expect(ele.text()).to.contain('Draft')



                
            }
        })

        


    }


}



module.exports = new industryFloorPlanManage()

