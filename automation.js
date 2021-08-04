const puppeteer = require('puppeteer')
const expect = require('chai').expect
const fs = require('fs').promises
const util = require('util')


describe('E2E Testcase : Opening Kibana for checking XXXX is having zero traffic or not', () =>{

        let browser
        let page
        const newLine = '\r\n';

        before(async function() {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 10, devtools: false
        })
        page = await browser.newPage()

        await page.setDefaultTimeout(15000)
        await page.setDefaultNavigationTimeout(20000)
        await page.goto('https://url-kibana/login')
        await page.waitForSelector('h1')
    
                    const [username] = await page.$x('//input[@name="username"]')
                    await username.type("clsviewer")

                    const [password] = await page.$x('//input[@name="password"]')
                    await password.type("esdcls")

                    const [submit_button_loc] = await page.$x('//button[@data-test-subj="loginSubmit"]')

                    await submit_button_loc.click()

        
        await page.waitForTimeout(4000)
        await page.waitForSelector('input')
        const [selecting_the_namespace] = await page.$x('(//*[@class="euiTitle euiTitle--small euiCard__title"])[12]/a')
        await selecting_the_namespace.click()
         
           })


    it('This is the E2E testcase for checking lowest traffic for 60 days' , async() => {

        await page.waitForTimeout(10000)
            var list_of_clientids = []
            console.log("Following is the list of input clientIds")
            const data = await fs.readFile('/Users/akshat.solanki/validator_KT/script_for_automation_node_js/list_of_clientIds.log',"binary")
            console.log(data.toString())
            // list_of_urls = data.toString().split("\n")
            list_of_clientids = data.toString().split("\n")
        
        
        console.log("VAlues are stored now calling automation script size is - " +list_of_clientids.length)
        //     // Automation script for particular url

            for( var client_id of list_of_clientids){
                
                    console.log("Script started")
                    console.log("clientId taken is :"+client_id)
                    
                    
                    // For POD-1 analysis
                    await page.goto('URL')
                    await page.waitForSelector('strong')
                    
                    let filterlink1 = await page.waitForXPath('//*[text()="Add filter"]')
                    await filterlink1.click()
                    await page.waitFor(3000)
                    await page.waitForXPath('//*[text()="Edit filter"]')
                    let input_link1 = await page.waitForXPath('(//*/input)[3]')
                    await input_link1.click()
                    
                    input_link1.type("client_id")
                    await page.waitFor(2000)
                    await page.keyboard.press('ArrowDown')
                    await page.keyboard.press('Enter')
                    await page.keyboard.press('Tab')
                    await page.keyboard.press('Tab')
                    await page.keyboard.press('ArrowDown')
                    await page.keyboard.press('Enter')
                    await page.keyboard.press('Tab')
                    await page.keyboard.press('Tab')
                    await page.keyboard.type(client_id)
                    await page.keyboard.press('Tab')
                    await page.keyboard.press('Tab')
                    await page.keyboard.press('Enter')

                    await page.waitForTimeout(6000)
                    
                    const is_loading_succeeded_para_1 = await page.$('p').then(res =>!! res)

                    if(!is_loading_succeeded_para_1){
                        console.log("Found the traffic in POD-1 going for next XXXXX")
                    }

                    else{
                    //For POD-2 analysis
                    await page.goto('URL')
                    await page.waitForSelector('strong')
                    let filterlink2 = await page.waitForXPath('//*[text()="Add filter"]')
                    await filterlink2.click()
                    await page.waitForXPath('//*[text()="Edit filter"]')
                    let input_link2 = await page.waitForXPath('(//*/input)[3]')
                    await input_link2.click()
                    
                    input_link2.type("client_id")
                    await page.waitFor(2000)
                    await page.keyboard.press('ArrowDown')
                    await page.keyboard.press('Enter')
                    await page.keyboard.press('Tab')
                    await page.keyboard.press('Tab')
                    await page.keyboard.press('ArrowDown')
                    await page.keyboard.press('Enter')
                    await page.keyboard.press('Tab')
                    await page.keyboard.press('Tab')
                    await page.keyboard.type(client_id)
                    await page.keyboard.press('Tab')
                    await page.keyboard.press('Tab')
                    await page.keyboard.press('Enter')

                    await page.waitForTimeout(6000)
                    
                    const is_loading_succeeded_para_2 = await page.$('p').then(res =>!! res)

                    if(!is_loading_succeeded_para_2){
                        console.log("Found the traffic in POD-2 going for next XXXXX")
                    }
                    else{
                    //POD-3 of analysis
                    await page.goto('URL')
                    await page.waitForSelector('strong')
                    let filterlink3 = await page.waitForXPath('//*[text()="Add filter"]')
                    await filterlink3.click()
                    await page.waitForXPath('//*[text()="Edit filter"]')
                    let input_link3 = await page.waitForXPath('(//*/input)[3]')
                    await input_link3.click()

                    input_link3.type("msg.keyword")
                    await page.waitFor(2000)
                    await page.keyboard.press('ArrowDown')
                    await page.keyboard.press('ArrowDown')
                    await page.keyboard.press('Enter')
                    await page.keyboard.press('Tab')
                    await page.keyboard.press('Tab')
                    await page.keyboard.press('ArrowDown')
                    await page.keyboard.press('Enter')
                    await page.keyboard.press('Tab')
                    await page.keyboard.press('Tab')
                    await page.keyboard.type(client_id)
                    await page.keyboard.press('Tab')
                    await page.keyboard.press('Tab')
                    await page.keyboard.press('Tab')
                    await page.keyboard.press('Enter')
                    
                    await page.waitForTimeout(6000)
                    
                    const is_loading_succeeded_para_3 = await page.$('p').then(res =>!! res)

                    if(!is_loading_succeeded_para_3){
                        console.log("Found the traffic in rid-arc going for next XXXXX")
                    }
                    else{
                        // Adding the client for successfull client-id insertions
                        var successlink = client_id+newLine
                        await fs.appendFile('outputSuccessfullClientIds.csv', successlink, (error) => {
                
                            if (error) {
                                console.error(`Could not save the successfull clientId file: ${error}`)
                            }
                
                            console.log('Saved our list of clientIds to outputSuccessfullClientIds')
                        })
                    }
                }    
            }  
}

}
    ).timeout(200000)

    after(async function() {
        
        await browser.close()
    })
})
