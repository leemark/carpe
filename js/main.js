(function(){
    var getInfo,
        go = document.getElementById('go'),
        day = document.getElementById('day'),
        month = document.getElementById('month'),
        yearEl = document.getElementById('year'),
        year = yearEl.options[yearEl.selectedIndex].value;
    
    getInfo = function(){
        console.log(year);
    };
    go.addEventListener('click', getInfo, false);
}());