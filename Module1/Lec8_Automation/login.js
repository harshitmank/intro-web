const  puppeteer= require("puppeteer");
const id="harshitmanktala.dcmc@gmail.com";
const pw="Harshit124$";

//puppeteer has a promisfied functions
//bydefault headless true hota
let browserOpenPromise = puppeteer.launch({headless:false,defaultViewport:null,args:["--start-maximized"]});

// console.log(browserOpenPromise);
//Promise<Pending>
let tab;
let idx;
let gcode;

browserOpenPromise.then(function(browser){
    console.log("browser is  opened!!");
    return browser.pages();
})
.then(function(pages){
    tab=pages[0];
    return tab.goto("https://www.hackerrank.com/auth/login");
})
.then(function(){
    return tab.waitForSelector('input[name="username"]');
})
.then(function(){
    return wait(2000);
})
.then(function(){
    return tab.type('input[name="username"]', id);
})
.then(function(){
    return tab.waitForSelector('input[name="password"]',{visible:true});
})
.then(function(){
    return wait(2000);
})
.then(function () {
    return tab.type('input[name="password"]', pw);
})
.then(function () {
    return waitAndClick('button[type="submit"]'); // extra safety
})
.then(function(){
    console.log("login done");
    return tab.waitForNavigation({ waitUntil: "networkidle2" });
})
.then(function(pages){
    return tab.goto("https://www.hackerrank.com/interview/interview-preparation-kit");
})
.then(function () {
    return waitAndClick('a[href="/interview/interview-preparation-kit/warmup/challenges"]');//make it a promise
})
.then(function(){
    return tab.waitForSelector('.js-track-click.challenge-list-item',{visible:true})
})
.then(function(){
    return tab.$$('.js-track-click.challenge-list-item');
})
.then(function(allQuesArray){
    //[object type form]
    let allPendingPromises=[];
    for(let i=0;i<allQuesArray.length;i++){
        let oneQues=allQuesArray[i];
        let pendingPromise =oneQues.evaluate(function(element){
            return element.getAttribute("href");
        },oneQues);
        allPendingPromises.push(pendingPromise);
    }
    //[Promise<Pending>,Promise<Pending>,Promise<Pending>]
    
    let allPromisesCombined=Promise.all(allPendingPromises);

    return allPromisesCombined;
})
.then(function(allQuesLinks){
    let oneQuesSolvePromise=solveQuestion(allQuesLinks[0]);
    
    for(let i=1 ; i<allQuesLinks.length ; i++){
        oneQuesSolvePromise = oneQuesSolvePromise.then(function(){
        let nextQuesSolvePromise = solveQuestion(allQuesLinks[i]);
        return nextQuesSolvePromise;
        })
    }
    return oneQuesSolvePromise;
  })
.then(function(){
    console.log("All Ques Solved Succesfully !!!!");
})
.catch(function(err){
    console.log(err);
})

 function getCode(){
    return new Promise(function(scb , fcb){
      let waitPromise = tab.waitForSelector(".hackdown-content h3" , {visible:true});
      waitPromise.then(function(){
        return tab.$$(".hackdown-content h3");
      })
      .then(function(allCodeNamesElement){
        // [<h3>C++</h3> , <h3>Python</h3> , <h3>Java</h3> ]
        let allCodeNamesPromise = [];

        for(let i=0 ; i<allCodeNamesElement.length ; i++){
          let codeNamePromise = tab.evaluate( function(elem){  return elem.textContent;   }  , allCodeNamesElement[i]  );
          allCodeNamesPromise.push(codeNamePromise);
        }
        // allCodeNamesPromise = [Promise<data> , Promise<data> , Promise<data> ];
        let combinedPromise = Promise.all( allCodeNamesPromise );
        // Promise<Pending> => Promise< [data,data,data] >
        return combinedPromise;
      })
      .then(function(allCodeNames){
        // [C++ , Python , Java];
        for(let i= 0 ;i<allCodeNames.length ; i++){
          if(allCodeNames[i] == "C++"){
            idx = i;
            break;
          }
        }
        return tab.$$(".hackdown-content .highlight"); // document.querySelectorAll
      })
      .then(function(allCodeDiv){
        // [<div></div> , <div></div> , <div></div>];
        let codeDiv = allCodeDiv[idx];
        return tab.evaluate(function(elem){ return elem.textContent;   }  , codeDiv);
      })
      .then(function(code){
        gcode=code;
        scb();
      })
      .catch(function(err){
        fcb(error);
      })
    })
  }

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

 function pasteCode(){
    return new Promise(function(scb,fcb){
        let waitAndClickPromise =waitAndClick(".checkbox-input");
        waitAndClickPromise.then(function(){
            return wait(2000);
        })
        .then(function(){
            return tab.type('.custom-input',gcode);
        })
        .then(function(){
            return tab.keyboard.down("Control");
        })
        .then(function(){
            return tab.keyboard.press("A");
        })
        .then(function(){
            return tab.keyboard.press("X");
        })
        .then(function(){
            return tab.click('.monaco-scrollable-element.editor-scrollable.vs');
        })
        .then(function(){
            return tab.keyboard.press('A');
        })
        .then(function(){
            return tab.keyboard.press("V");
        })
        .then(function(){
            return tab.keyboard.up("Control");
        })
        .then(function(){
            scb();
        })
    });
 }

 function handleLockBtn(){
    return new Promise(function(scb,fcb){
        let waitForLockBtn=tab.waitForSelector('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled',{visible:true,timeout:5000});
        waitForLockBtn.then(function(){
            return tab.$('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled');
        })
        .then(function(lockButton){
            return tab.evaluate(function(elem){ return elem.click()  } , lockButton);
        })
        .then(function(){
            //Lock Btn found
            console.log("button found");
            scb();
        })
        .catch(function(){
            console.log("button not found");
            //Lock button not found
            scb();
        })
    })
 }

function solveQuestion(quesLink){
    return new Promise(function(scb,fcb){
        let gotoPromise=tab.goto("https://www.hackerrank.com"+quesLink);
        gotoPromise.then(function(){
            return waitAndClick('a[data-attr2="Editorial"]');
        })
        .then(function(){
            return handleLockBtn();
        })
        .then(function(){
            return getCode();
        })
        .then(function(){
            return tab.click('div[data-attr2="Problem"]');
        })
        .then(function(){
            return pasteCode();
        })
        .then(function(){
            return tab.click('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right');
        })
        .then(function(){
        scb();
        })
        .catch(function(error){
            fcb(error);
        })
    });
}


function waitAndClick(selector){
    return new Promise(function(scb,fcb){
        let waitPromise =tab.waitForSelector(selector,{visible:true});
        waitPromise.then(function(){
        let clickPromise=tab.click(selector);
        return clickPromise;
        })
        .then(function(){
            scb();
        })
        .catch(function(){
            fcb();
        })
    });
}
