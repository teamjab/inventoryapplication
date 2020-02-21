'use strict';

let count = 0;

$('.update').on('click', editUpdate);

function editUpdate(e){
    e.preventDefault();
    let parents = $(this).parent().parent().attr('id');
    $(`#update${parents}`).toggle();
}


$('.tableRow').hide();

