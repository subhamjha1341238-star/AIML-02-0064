// //Create an element
// const heading = document.createElement("h2");

// //get the parent element
// const bodytag = document.getElementsByTagName("body");

// //add element at the position using append method
// bodytag[0].append(heading);

// heading.innerText = "This is heading 2";
// heading.style.color = "red";

// //adds at the start of node(inside)
// Node.prepend();

// //adds at the end of node(inside)
// Node.append();

// //adds before the node(outside)
// Node.before();

// //adds after the node(outside)
// Node.after();

// //removes the node
// Node.remove();


const x = document.querySelector("input");
x.addEventListener("focus", onhandlefocus);
x.addEventListener("blur", onhandleblur);

function onhandlefocus() {
    x.style.backgroundColor = "red";
}
function onhandleblur() {
    x.style.backgroundColor = "yellow";
    x.style.borderColor = "green";
}