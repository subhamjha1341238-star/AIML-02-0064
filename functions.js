// var res = mul(12,30);
// function mul(a,b){
//     return a*b;
// }
// document.write("The result of multiplication is : " + res);


//normal function
function add(a,b){
    console.log(a+b);
}
add(10,20);

//arrow function
var add2 = (a,b) => {
    console.log(a+b);
};
add2(130,40);

//arrow function with single line parameter
var add3 = (a,b) => console.log(a+b);
add3(100,200);