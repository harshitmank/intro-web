//fs=file system

const fsKaObject=require("fs");//fs is already in node so think it as a object which is already there
// console.log(fsKaObject);

//utf-8

let f1kadata=fsKaObject.readFileSync("./f1.txt");
console.log(f1kadata+ "");

fsKaObject.writeFileSync("index.txt","Hello world!!!");