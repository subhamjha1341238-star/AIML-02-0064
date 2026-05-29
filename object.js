var person = {
    Name : "John Mac",
    age : 30,
    isMarried : true,
    address : {
        street : "vijay nagar",
        flatNO : 201
    }
};
console.log(person);
console.log(person.Name);
console.log(person.age);
console.log(person.isMarried);
console.log(person.address);
console.log(person.address.street);
console.log(person.address.flatNO); 


//creating object using new keyword
var person2 = new Object();
person2.Name = "Krishnkumar";
person2.age = 25;
person2.isMarried = false;
person2.address = {};
person2.address.street = "Indrapuri";
person2['address']['flatNO'] = 101;
console.log(person2);

