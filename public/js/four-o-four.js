'use strict';

$('#404GoBack').on('click', goBack);

function goBack(e){
    e.preventDefault();
    window.history.back();
}