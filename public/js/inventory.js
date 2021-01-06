'use strict';

$('.update').on('click', editUpdate);

function editUpdate(e){
    e.preventDefault();
    let parents = $(this).parent().parent().attr('id');
    $(`#update${parents}`).toggle();
}

$('.tableRow').hide();


// search function
function search(){
  // element selectors
  let input = document.getElementById('searchBar');
  let filter = input.value.toUpperCase();
  let table = document.getElementById('items');
  let tr = table.getElementsByTagName('tr');
  // sort through data names
  for(var i = 0; i<tr.length; i++) {
    let td = tr[i].getElementsByClassName('item-names')[0];
    let po = tr[i].getElementsByClassName('purchase-order')[0];
    // displays based on user input
    // hides everything not matching userinput 
    if (td || po) {
      let txtValue = td.textContent || td.innerText;
      let txtValue1 = po.textContent || po.innerText;
      if(txtValue.toUpperCase().indexOf(filter)> -1 || txtValue1.toUpperCase().indexOf(filter)> -1 ) {
        tr[i].style.display = '';
      }
      else {
        tr[i].style.display = 'none';
      }
    }
  }
};