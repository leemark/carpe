(function(){
    var getInfo, showResults, clearExpiry, secLeft, 
        initform = document.getElementById('initform'),
        resultsContainer = document.getElementById('results'),
        results = resultsContainer.querySelector('#results>h2'),
        go = document.getElementById('go'),
        formatEl = document.getElementById('format'),
        reset = document.getElementById('reset'),
        dayEl = document.getElementById('day'),
        day = dayEl.options[dayEl.selectedIndex].value,
        monthEl = document.getElementById('month'),
        month = monthEl.options[monthEl.selectedIndex].value,
        yearEl = document.getElementById('year'),
        year = yearEl.options[yearEl.selectedIndex].value,
        genderEl = document.getElementById('gender'),
        gender = genderEl.options[genderEl.selectedIndex].value,
        expiry = localStorage.getItem('expiry'),
        format = localStorage.getItem('format');
    
    getInfo = function(){
        //go.innerHTML = '<span>...checking...</span>';
        go.classList.remove('pre');
        //console.log(day + ':' + month + ':' + year + ':' + gender);
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = 'http://marksdigital.com/carpe/?gen=' + gender + '&dob=' + month + day + year;
        window.getTime = function(data){
            var startDate = new Date(),
            startTime = startDate.getTime() / 1000;
            secLeft = data.data.secondsLeft;
            expiry = startTime + secLeft;
            format = format || 's';
            localStorage.setItem('expiry', expiry);
            localStorage.setItem('format', format);
            showResults(startTime, secLeft);
        };
        document.getElementsByTagName('head')[0].appendChild(s);
    };
    showResults = function(startTime, secLeft){
        initform.classList.add('hidden');
        resultsContainer.classList.remove('hidden');
        go.classList.add('pre');
        //results.innerHTML = Math.round(secondsLeft).toLocaleString();
        //console.log(secLeft);
        var update = function(){
            var now = new Date();
            var timeSince = (now.getTime() / 1000) - startTime;
            console.log(format);
            results.innerHTML = Math.round(secLeft - timeSince).toLocaleString();
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
        var now = new Date(),
            startTime = now.getTime() * 1000;
        //console.log('exp: ' + expiry);
        //console.log('st2: ' + startTime);
        secLeft = expiry - startTime;
        showResults(startTime, secLeft);
    }else{
        
    }
    var formatOptions = formatEl.querySelectorAll('span');
    Array.prototype.forEach.call(formatOptions, function(fo){
        fo.addEventListener('click', function(){
            format = fo.dataset.format;
            localStorage.setItem('format', format);
        },false);
    });
    go.addEventListener('click', getInfo, false);
    reset.addEventListener('click', clearExpiry, false);
}());