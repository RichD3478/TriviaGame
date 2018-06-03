var timer = new Timer();
timer.start({countdown: true, startValues: {seconds: 120}});
$('#shotClock .values').html(timer.getTimeValues().toString());
timer.addEventListener('secondsUpdated', function (e) {
    $('#shotClock .values').html(timer.getTimeValues().toString());
});
timer.addEventListener('targetAchieved', function (e) {
    $('#shotClock .values').html('Time!!');
});