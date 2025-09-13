//package / node module -> npm init-y
//npm install cheerio
const fs=require('fs');
const cheerio=require("cheerio");
const { text } = require('stream/consumers');

let htmlkadata=fs.readFileSync("./index.html","utf8");

// console.log(htmlkadata); //we have a stringified html file !!!

//html file is loaded in cheerio
let myDocument=cheerio.load(htmlkadata);
// console.log(myDocument);

// document.querySelector("h1")

// let h1Element =myDocument("h1");
// console.log(h1Element); //object ki form mei

let h1Element =myDocument("h1").text();
// console.log(h1Element);

// let pTagkaData=myDocument("p").text();
let pTagkaData=myDocument("p");
// let secondPtag=myDocument("p")["1"];

// console.log(myDocument(secondPtag).text()); 

//Selector concept
// console.log(myDocument("ul p").text()); //it will give all the p tabs in ul

// console.log(myDocument("a").text());
// console.log(myDocument("ul li a").text()); //u will get all a tags

//only direct child
// console.log(myDocument("ul>a").text());

//classes and ids
// console.log(myDocument(".inside").text());

// console.log(myDocument(".inside.main").text());


//ids->can only be used once, not like classes where they can be used as many times
// #
console.log(myDocument("#main-heading").text());
