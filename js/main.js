(function(){
    var getInfo, showResults,
        initform = document.getElementById('initform'),
        results = document.getElementById('results'),
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
        go.innerHTML = '<span>...checking...</span>';
        //console.log(day + ':' + month + ':' + year + ':' + gender);
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = 'http://marksdigital.com/carpe/?gen=' + gender + '&dob=' + month + day + year;
        window.getTime = function(data){
            showResults(data);
        };
        document.getElementsByTagName('head')[0].appendChild(s);
    };
    showResults = function(data){
        var secondsLeft = data.secondsLeft,
            startDate = new Date(),
            startTime = startDate.getTime();
        initform.classList.add('hidden');
        results.classList.remove('hidden');
        results.innerHTML = secondsLeft;
        console.log(secondsLeft);
        console.dir(data);
        var update = function(){
            var now = new Date();
            var timeSince = now.getTime() - startTime;
            results.innerHTML = secondsLeft - (timeSince * 1000);
           // console.log(timeSince);
            // console.log(startTime);
            // console.log(secondsLeft);
            requestAnimationFrame(update);
        };
        update();
    };
    go.addEventListener('click', getInfo, false);
}());