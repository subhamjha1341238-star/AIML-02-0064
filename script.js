// console.log("Hello World!");
// document.write("Hello World!");



var num = 10;
console.log(num);
console.log(typeof(num));
num = false;
console.log(num);
console.log(typeof(num));
num = "Hello World!";
console.log(num);
console.log(typeof(num));
num = "hello";
console.log(num);
console.log(typeof(num));
num = undefined;
console.log(num);
console.log(typeof(num));



const sym1 = Symbol(4);
console.log(sym1);
const sym2 = Symbol(4);
console.log(sym2);
if(sym1===sym2){
    console.log("true");
}
else{
    console.log("false");
}



var a = 100; var b = 13; var c = 10; var linebreak = "<br>";
document.write("a + b + c = ");
result = a + b + c;
document.write(result);
document.write(linebreak);
