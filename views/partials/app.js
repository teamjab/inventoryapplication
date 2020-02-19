'use strict';


/////placeholder since empty folders doesn't get pushed///

// array to store items 
let items = [];
// function to push input values into array
const addItem = (ev)=>{
  ev.preventDefault(); //stops the form from submitting
  let item = {
    Name: document.getElementById('item').value,
    PO: document.getElementById('po').value,
    Lot: document.getElementById('lot').value,
    Received: document.getElementById('received').value,
    Expiration: document.getElementById('expiration').value,
    Quantity: document.getElementById('quantity').value,
    type: document.querySelector('input[name="type"]:checked').value
  }
  items.push(item);
  //clears form for another entry
  document.querySelector('form').reset();
  console.log(items); 
}
//event listener for button
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('submit').addEventListener('click', addItem);
});