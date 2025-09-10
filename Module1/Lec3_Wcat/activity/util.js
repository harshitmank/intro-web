let fs=require("fs");

function getFilesData(files){
    let filesData="";
    for(let i=0;i<files.length;i++){
        if(!fs.existsSync(files[i])){
            console.log("One or more files doesn't exist");
            return;
        }
        if(i==files.length-1){
            filesData+=fs.readFileSync(files[i]);
        }
        else{
            filesData+=fs.readFileSync(files[i])+ "\r\n";
        }
        
    }
    return filesData
}

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
    return removedSpacesString;
}

function applyBFlag(f1kadata){
    let count=1;
    let splittedData=f1kadata.split("\r\n");
    
    for(let i=0;i<splittedData.length;i++){
        if(splittedData[i]!= ''){
            splittedData[i] = `${count}. ${splittedData[i]}`;
            count++;
        }
    }
    // console.log(splittedData);
    let BflagString=splittedData.join("\r\n");
    return BflagString;
}

function applyNFlag(f1kadata){
    let count=1;
    let splittedData=f1kadata.split("\r\n");
    
    for(let i=0;i<splittedData.length;i++){
        splittedData[i] = `${count}. ${splittedData[i]}`;
        count++;
    }
    console.log(splittedData);
    let NflagString=splittedData.join("\r\n");
    // console.log(BflagString);
    return NflagString;
}


module.exports.getFilesData=getFilesData;
module.exports.applySFlag=applySFlag; 
module.exports.applyBFlag=applyBFlag;
module.exports.applyNFlag=applyNFlag;