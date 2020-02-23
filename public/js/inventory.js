'use strict';

$('.update').on('click', editUpdate);

function editUpdate(e){
    e.preventDefault();
    let parents = $(this).parent().parent().attr('id');
    $(`#update${parents}`).toggle();
}


$('.tableRow').hide();

'use strict';


////brendon's code////

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

// search function
function search(){
  // element selectors
  let input = document.getElementById('searchBar');
  let filter = input.value.toUpperCase();
  let table = document.getElementById('items');
  let tr = table.getElementsByTagName('tr');
  // sort through data names
  for(i = 0; i<tr.length; i++) {
    td = tr[i].getElementsByTagName('td')[0];
    // displays based on user input
    // hides everything not matching userinput 
    if (td) {
      txtValue = td.textContent || td.innerText;
      if(txtValue.toUpperCase().indexOf(filter)> -1) {
        tr[i].style.display = '';
      }
      else {
        tr[i].style.display = 'none';
      }
    }
  }
};