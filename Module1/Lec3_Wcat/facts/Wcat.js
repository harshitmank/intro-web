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

    let splittedData=f1kadata.split("\r\n")
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

applySFlag(f1kadata);