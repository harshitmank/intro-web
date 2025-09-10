const fs=require("fs");

let f1kadata= fs.readFileSync("./f1.txt","utf8");
let f2kadata= fs.readFileSync("./f2.txt","utf8");

// let bothOutput=f1kadata+"\n" +f2kadata;
// console.log(f1kadata);
// console.log(f2kadata);
// console.log(bothOutput);

function applySFlag(f1kadata){
    let Emptyincluded=false;
    let removedSpaces=[];

    let splittedData=f1kadata.split("\r\n");
    // [ 'Hey I am f1', '', '', '', '', '', 'Bye I am f1' ]
    
    for(let i=0;i<splittedData.length;i++){
        if(splittedData[i]=="" && Emptyincluded==false){
            removedSpaces.push(splittedData[i]);
            Emptyincluded=true;
        }
        else if(splittedData[i]!=""){
            removedSpaces.push(splittedData[i]);
            if(i< splittedData.length-2)
            Emptyincluded=false;
        }
    }

    // console.log(removedSpaces);

    let removedSpacesString=removedSpaces.join("\r\n");
    console.log(removedSpacesString);

}
// applySFlag(f1kadata);

// -b flag-->add line number to non empty lines
function applyBFlag(f1kadata){
    let count=1;
    let splittedData=f1kadata.split("\r\n");
    
    for(let i=0;i<splittedData.length;i++){
        if(splittedData[i]!= ''){
            splittedData[i] = `${count}. ${splittedData[i]}`;
            count++;
        }
    }
    console.log(splittedData);
    let BflagString=splittedData.join("\r\n");
    console.log(BflagString);
}
// applyBFlag(f1kadata);

function applyNFlag(f1kadata){
    let count=1;
    let splittedData=f1kadata.split("\r\n");
    
    for(let i=0;i<splittedData.length;i++){
        splittedData[i] = `${count}. ${splittedData[i]}`;
        count++;
    }
    console.log(splittedData);
    let BflagString=splittedData.join("\r\n");
    console.log(BflagString);
}

applyNFlag(f1kadata);