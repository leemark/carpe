(function(){
    var getInfo,
        go = document.getElementById('go'),
        day = document.getElementById('day'),
        month = document.getElementById('month'),
        year = document.getElementById('year');
    
    go.addEventListener('click', getInfo, false);
    getInfo = function(){
        console.log(year);
    };
}());