console.log("Hello World");

//Data Types->

//Java -> Primitive ->int,float,double,boolean
//non primitive->Arrays,Stacks

//JavaScript->Number(int,float,double),boolean,String("",''),undefined,null,Object

//DataType in java is-> int a=10;

//ES6=Ecma Script 6
//two keywords  let and const

//dynamic casting
let a=10;//you have declared a variable with name and initialize with value 10

//let keyword =>block scope

if(true){
    let a=20;
    // console.log(a);//20
}

// console.log(a);//10

//const=>constant->block scoped and constant
//declare and assign
// const pi=3.14//we cannot change value after
// console.log(pi);

let values=[1,2,3,4,5,6,7];
// console.log(values);

values.push('captain america');
// console.log(values);

values.pop();
// console.log(values);

//shift->delete a element from starting
//unshift=>add a element from starting

// console.log(values.shift());
// console.log(values);

//Objects=>key values pair
//key=>unique

let obj={
    name:"Steve Rogers",
    place:"Queens",
    movies:['captain america','ironman',{
        bestie:"bucky",
        nickname:'wintersoldier',
        weakness:['brainwash'],
    }],
}

console.log(obj.movies[2].weakness[0]);

//get a view of value of a key
//dot->literal check
// console.log(obj.name);

let key="place";

// console.log(obj.key);//undefined

//square bracket notation

// console.log(obj[key]);

obj.skills=["martial arts","fire ball"];
obj.place="new york";

// console.log(obj);