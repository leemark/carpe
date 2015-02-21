(function(){
    var getInfo, showResults, clearExpiry, secondsLeft,
        initform = document.getElementById('initform'),
        resultsContainer = document.getElementById('results'),
        results = resultsContainer.querySelector('#results>h2'),
        go = document.getElementById('go'),
        reset = document.getElementById('reset'),
        dayEl = document.getElementById('day'),
        day = dayEl.options[dayEl.selectedIndex].value,
        monthEl = document.getElementById('month'),
        month = monthEl.options[monthEl.selectedIndex].value,
        yearEl = document.getElementById('year'),
        year = yearEl.options[yearEl.selectedIndex].value,
        genderEl = document.getElementById('gender'),
        gender = genderEl.options[genderEl.selectedIndex].value,
        expiry = localStorage.getItem('expiry');
    
    getInfo = function(){
        go.innerHTML = '<span>...checking...</span>';
        //console.log(day + ':' + month + ':' + year + ':' + gender);
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = 'http://marksdigital.com/carpe/?gen=' + gender + '&dob=' + month + day + year;
        window.getTime = function(data){
            var startDate = new Date(),
            startTime = startDate.getTime();
            secondsLeft = data.data.secondsLeft;
            expiry = startTime + secondsLeft;
            localStorage.setItem('expiry', expiry);
            showResults(startTime, secondsLeft);
        };
        document.getElementsByTagName('head')[0].appendChild(s);
    };
    showResults = function(startTime, secondsLeft){
        initform.classList.add('hidden');
        resultsContainer.classList.remove('hidden');
        //results.innerHTML = Math.round(secondsLeft).toLocaleString();
        // console.log(secondsLeft);
        // console.dir(data);
        var update = function(){
            var now = new Date();
            var timeSince = now.getTime() - startTime;
            results.innerHTML = Math.round(secondsLeft - (timeSince / 1000)).toLocaleString();
            requestAnimationFrame(update);
        };
        update();
    };
    clearExpiry = function(){
       localStorage.removeItem(expiry);
        initform.classList.remove('hidden');
        resultsContainer.classList.add('hidden');
    };
    
    if(expiry){
        var startDate2 = new Date(),
            startTime2 = startDate2.getTime();
        console.log('exp: ' + expiry);
        console.log('st2' + startTime2);
        secondsLeft = expiry - startTime2;
        showResults(startTime, secondsLeft);
    }else{
        
    }
    
    go.addEventListener('click', getInfo, false);
    reset.addEventListener('click', clearExpiry, false);
}());