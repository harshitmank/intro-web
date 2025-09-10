let fs=require("fs");

const { getFilesData, applySFlag, applyBFlag, applyNFlag } = require("./util");

let contents=process.argv.slice(2);
console.log(contents);

const flags= [];
const files=[];

for(let i=0;i<contents.length;i++){
    if(contents[i].startsWith("-")){
        flags.push(contents[i]);
    }
    else{
        files.push(contents[i]);
    }
}



let filesData=getFilesData(files);
// console.log(fileData);

if(flags.includes("-s")){
    //files data updated if s flag is present
    filesData=applySFlag(filesData);
}

// console.log(filesData);

if(flags.includes("-b")&& flags.includes("-n")){
    if(flags.indexOf("-b")<flags.indexOf("-n")){
        //apply b flag
        filesData=applyBFlag(filesData);
    }
    else{
        //apply n flag
        filesData=applyNFlag(filesData);
    }
}
else if(flags.includes("-b")){
    //apply b flag
    filesData=applyBFlag(filesData);
}
else if(flags.includes("-n")){
    //apply n flag
    filesData=applyNFlag(filesData);
}

console.log(filesData);
