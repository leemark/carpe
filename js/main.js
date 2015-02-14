(function(){
    var getInfo,
        go = document.getElementById('go'),
        dayEl = document.getElementById('day'),
        day = dayEl.options[dayEl.selectedIndex].value,
        monthEl = document.getElementById('month'),
        month = monthEl.options[monthEl.selectedIndex].value,
        yearEl = document.getElementById('year'),
        year = yearEl.options[yearEl.selectedIndex].value,
        genderEl = document.getElementById('gender'),
        gender = genderEl.options[genderEl.selectedIndex].value;
    
    getInfo = function(){
        console.log(day + ':' + month + ':' + year + ':' + gender);
    };
    go.addEventListener('click', getInfo, false);
}());