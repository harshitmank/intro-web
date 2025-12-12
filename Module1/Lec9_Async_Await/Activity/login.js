const  puppeteer= require("puppeteer");
const challenges = require("./challenges");
const id="harshitmanktala.dcmc@gmail.com";
const pw="Harshit124$";

async function login() {
    let browser= await puppeteer.launch({
        headless:false,
        defaultViewport:null,
        args:["--start-maximized"],
        slowMo:50
    });
    let pages=await browser.pages();
    let tab=pages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.waitForSelector('input[name="username"]',{delay : 5000});
    await tab.type('input[name="username"]', id);
    await tab.waitForSelector('input[name="password"]',{delay : 2000});
    await tab.type('input[name="password"]', pw);
    await tab.click('button[type="submit"]');
    console.log("logged in");
    await tab.waitForNavigation({ waitUntil: "networkidle2" });
    await tab.goto("https://www.hackerrank.com/administration/contests");
    await tab.waitForSelector('.hr-flex.hr-justify-between.hr-align-center.administration__header a ',{visible:true});
    let bothLis= await tab.$$('.hr-flex.hr-justify-between.hr-align-center.administration__header a ');
    let manageChallengeLi=bothLis[1];
    await manageChallengeLi.click();
    await tab.waitForSelector('.c-cUYkx.c-cUYkx-dshqME-variant-primary.c-cUYkx-QOCjp-size-medium.hr-inline-flex.hr-justify-center.hr-align-center' , {visible:true});
    let createChallengeElement = await tab.$('.c-cUYkx.c-cUYkx-dshqME-variant-primary.c-cUYkx-QOCjp-size-medium.hr-inline-flex.hr-justify-center.hr-align-center');
    let createChallengeLink = await tab.evaluate( function(elem){ return elem.getAttribute("href"); }   ,  createChallengeElement);
    createChallengeLink = "https://www.hackerrank.com/administration/"+createChallengeLink;

    console.log(createChallengeLink);

    for(let i=0;i<challenges.length;i++){
        await addChallenges(browser,createChallengeLink,challenges[i]);
    }

};

login();

async function addChallenges(browser,createChallengeLink,challenge){
    let newTab=await browser.newPage();
    //add new Tab

    await newTab.goto(createChallengeLink);

    let challengeName = challenge["Challenge Name"];
    let description = challenge["Description"];
    let problemStatement = challenge["Problem Statement"];
    let inputFormat = challenge["Input Format"];
    let constraints = challenge["Constraints"];
    let outputFormat = challenge["Output Format"];
    let tags = challenge["Tags"];

    await newTab.waitForSelector("#name");
    await newTab.type("#name" , challengeName);
    await newTab.type("#preview" , description);
    await newTab.type('#problem_statement-container .CodeMirror textarea' , problemStatement);
    await newTab.type('#input_format-container .CodeMirror textarea' , inputFormat);
    await newTab.type('#constraints-container .CodeMirror textarea' , constraints);
    await newTab.type('#output_format-container .CodeMirror textarea' , outputFormat);
    await newTab.type('#tags_tag' , tags);
    await newTab.keyboard.press("Enter");
    await newTab.click('.save-challenge.btn.btn-green');
    await newTab.close();

}



