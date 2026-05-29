// var count;
// document.write("starting Loop" + "<br>");

// for (count=1; count<=10; count++) {
//     document.write("currentcount : " + count );
//     document.write("<br>");
// }

// document.write("Loop Ended");

// const person = {
//     first_name : "John",
//     last_name : "Doe",
//     age : 25
// };

// for (let x in person){
//     console.log("person details : " + x + " : " + person[x]);
// }

// for (let x in person){
//     console.log("person details : " + x + " : " + person.x);
// }

// var count=0;
// document.write("Starting Loop");

// while(count<10){
//     document.write(count + "<br>");
// }

var age = 20;
if (age>=18){
    console.log("<b>you are eligible to vote</b>");
}
else{
    console.log("You are minor");
}

var grade = 'A';
document.write("Your grade is : " + grade + "<br>");
switch(grade){
    case 'A' : document.write("Good job!<br/>");
    break;
    case 'B' : document.write("Pretty good!<br/>");
    break;
    case 'C' : document.write("Passed!<br/>");
    break;
    case 'D' : document.write("Not so good!<br/>");
    break;
    case 'F' : document.write("Failed!<br/>");
    break;
    default : document.write("Invalid grade!<br/>")
}
document.write("Exiting switch block");
