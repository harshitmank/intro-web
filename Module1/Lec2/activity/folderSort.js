let fs=require("fs");
let extentionsMapping=require("./util.js");

//cd..->one way back
//ctrl+number->to switch between groups
//ctrl+\ -> for multigroup
//
let testFolderPath="./Downloads";
let allFiles=fs.readdirSync(testFolderPath);

for(let i=0;i<allFiles.length;i++){
    sortFile(allFiles[i]);
}

function getExtension(file){
    file= file.split(".");
    return file[1];
}

// "Documents": ["doc","pdf","txt"],
// "Images" : ["img","jpg","gif","png"],
// "Audio" : ["mp3"],
// "Video" : ["mp4","mkv"],
// "Application" : ["exe"] 

function checkExtensionFolder(extension){
    //extension=doc
    let extensionFolderName=testFolderPath;
    for(let key in extentionsMapping){
        let extensions=extentionsMapping[key];

        if (extensions.includes(extension)){
            extensionFolderName=extensionFolderName+"/"+key;
            break;
        }
    }

    //"./Downloads/Documents"
    let isFolderExist=fs.existsSync(extensionFolderName);
    if(!isFolderExist){
        fs.mkdirSync(extensionFolderName);
    }

    return extensionFolderName;
    
}

function moveFile(file,extensionFolderName){
    //copy file from source to destination
    let sourceFile=testFolderPath+"/"+file;

    let destination=extensionFolderName+"/"+file;
    
    fs.copyFileSync(sourceFile,destination);
    //then delete file from source path!!!

    fs.unlinkSync(sourceFile);
}


function sortFile(file){
    let extension=getExtension(file);
    // console.log(extension);

    let extensionFolderName=checkExtensionFolder(extension);
    moveFile(file,extensionFolderName);
}