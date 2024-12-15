//function body
function fun(){
    console.log("fun says HI");
}

//function call
fun();

//in js,a function acts like variable

// let sayHi=function(){
//     console.log("sayHi says Hi");
// }
// sayHi();

function toBePassedAsArgument(){
    console.log("I am passed as argument");
}

function highOrderFunction(cd){
    cd();
}

highOrderFunction(toBePassedAsArgument);