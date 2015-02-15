(function(){
    var getInfo, showResults,
        initform = document.getElementById('initform'),
        resultsContainer = document.getElementById('results'),
        results = resultsContainer.querySelector('#results>h2'),
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
        var secondsLeft = data.data.secondsLeft,
            startDate = new Date(),
            startTime = startDate.getTime();
        initform.classList.add('hidden');
        resultsContainer.classList.remove('hidden');
        results.innerHTML = Math.round(secondsLeft).toLocaleString();
        console.log(secondsLeft);
        console.dir(data);
        var update = function(){
            var now = new Date();
            var timeSince = now.getTime() - startTime;
            results.innerHTML = Math.round(secondsLeft - (timeSince / 1000)).toLocaleString();
            requestAnimationFrame(update);
        };
        update();
    };
    go.addEventListener('click', getInfo, false);
}());