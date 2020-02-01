// Firebase Configuration
var firebaseConfig = {
    apiKey: "AIzaSyDiZZCW3zp4kkJATlkF8wwRe5qN_afay-U",
    authDomain: "workout-data-tracking-794a4.firebaseapp.com",
    databaseURL: "https://workout-data-tracking-794a4.firebaseio.com",
    projectId: "workout-data-tracking-794a4",
    storageBucket: "workout-data-tracking-794a4.appspot.com",
    messagingSenderId: "341687081539",
    appId: "1:341687081539:web:ec96d921d47e1d788cd2f6"
};
firebase.initializeApp(firebaseConfig);

// Load date in EST
var date = new Date();
var currentDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toJSON().slice(0,10).replace(/-/g,'/');

// Load Previous Day Information from the Database
window.onload = getData();

// Load Charts 
window.onload = getCharts();

// Write Push Day Data to the Database
function push_writeData() {
    // Write to "Date" Child
    firebase.database().ref(currentDate).set({
        // Warmup Calories
        warmupCals: document.getElementById("warmupCals").value,
        // Incline DB Bench Press
        iBench_sets: document.getElementById("iBench_sets").value,
        iBench_reps: document.getElementById("iBench_reps").value,
        iBench_weight: document.getElementById("iBench_weight").value,
        // Machine Fly
        Fly_sets: document.getElementById("Fly_sets").value,
        Fly_reps: document.getElementById("Fly_reps").value,
        Fly_weight: document.getElementById("Fly_weight").value,
        // French Curls
        fCurl_sets: document.getElementById("fCurl_sets").value,
        fCurl_reps: document.getElementById("fCurl_reps").value,
        fCurl_weight: document.getElementById("fCurl_weight").value,
        // Lateral Raises
        latRaise_sets: document.getElementById("latRaise_sets").value,
        latRaise_reps: document.getElementById("latRaise_reps").value,
        latRaise_weight: document.getElementById("latRaise_weight").value,
        // Front Raises
        frontRaise_sets: document.getElementById("frontRaise_sets").value,
        frontRaise_reps: document.getElementById("frontRaise_reps").value,
        frontRaise_weight: document.getElementById("frontRaise_weight").value,
        // Overhead Press
        OHP_sets: document.getElementById("OHP_sets").value,
        OHP_reps: document.getElementById("OHP_reps").value,
        OHP_weight: document.getElementById("OHP_weight").value,
        // Cooldown Calories
        coolCals: document.getElementById("coolCals").value,
    });
    // Write to Specific Workout Folders:
        // Warmup Calories
    firebase.database().ref("warmupCals").push({
        date: currentDate,
        cals: document.getElementById("warmupCals").value
    })
        // Incline Bench Press
    firebase.database().ref("iBench").push({
        date: currentDate,
        iBench_sets: document.getElementById("iBench_sets").value,
        iBench_reps: document.getElementById("iBench_reps").value,
        iBench_weight: document.getElementById("iBench_weight").value,
    })
        // Machine Fly
    firebase.database().ref("Fly").push({
        date: currentDate,
        Fly_sets: document.getElementById("Fly_sets").value,
        Fly_reps: document.getElementById("Fly_reps").value,
        Fly_weight: document.getElementById("Fly_weight").value,
    })
        // French Curls
    firebase.database().ref("fCurl").push({
        date: currentDate,
        fCurl_sets: document.getElementById("fCurl_sets").value,
        fCurl_reps: document.getElementById("fCurl_reps").value,
        fCurl_weight: document.getElementById("fCurl_weight").value,
    })
        // Lateral Raises
    firebase.database().ref("latRaise").push({
        date: currentDate,
        latRaise_sets: document.getElementById("latRaise_sets").value,
        latRaise_reps: document.getElementById("latRaise_reps").value,
        latRaise_weight: document.getElementById("latRaise_weight").value,
    })
        // Front Raises
    firebase.database().ref("frontRaise").push({
        date: currentDate,
        frontRaise_sets: document.getElementById("frontRaise_sets").value,
        frontRaise_reps: document.getElementById("frontRaise_reps").value,
        frontRaise_weight: document.getElementById("frontRaise_weight").value,
    })
        // Overhead Press
    firebase.database().ref("OHP").push({
        date: currentDate,
        OHP_sets: document.getElementById("OHP_sets").value,
        OHP_reps: document.getElementById("OHP_reps").value,
        OHP_weight: document.getElementById("OHP_weight").value,
    })
        // Cooldown Calories
    firebase.database().ref("coolCals").push({
        date: currentDate,
        cals: document.getElementById("coolCals").value
    })
}

// Get Previous Workout Data from the Database
function getData() {
    // Incline DB Bench Press
    firebase.database().ref("iBench").limitToLast(1).on('child_added', function(childSnapshot){
        iBench = childSnapshot.val();
        document.getElementById("prev_iBench").innerHTML = iBench.iBench_weight;
    })
    // Machine Fly
    firebase.database().ref("Fly").limitToLast(1).on('child_added', function(childSnapshot){
        Fly = childSnapshot.val();
        document.getElementById("prev_Fly").innerHTML = Fly.Fly_weight;
    })
    // French Curls
    firebase.database().ref("fCurl").limitToLast(1).on('child_added', function(childSnapshot){
        fCurl = childSnapshot.val();
        document.getElementById("prev_fCurl").innerHTML = fCurl.fCurl_weight;
    })
    // Lateral Raises
    firebase.database().ref("latRaise").limitToLast(1).on('child_added', function(childSnapshot){
        latRaise = childSnapshot.val();
        document.getElementById("prev_latRaise").innerHTML = latRaise.latRaise_weight;
    })
    // Front Raises
    firebase.database().ref("frontRaise").limitToLast(1).on('child_added', function(childSnapshot){
        frontRaise = childSnapshot.val();
        document.getElementById("prev_frontRaise").innerHTML = frontRaise.frontRaise_weight;
    })
    // Overhead Press
    firebase.database().ref("OHP").limitToLast(1).on('child_added', function(childSnapshot){
        OHP = childSnapshot.val();
        document.getElementById("prev_OHP").innerHTML = OHP.OHP_weight;
    })
}

// Get Chart Data and Render
function getCharts() {

    // Incline DB Bench
    var ref = firebase.database().ref("iBench")
    ref.once("value")
        .then(function(snapshot) {
            var test = snapshot.val();

            data = Object.values(test)
            dLen = data.length;

            dates = [];
            weights = [];
            chart = [];
            int = [];
            for (i = 0; i < dLen; i++) {
                dates.push(data[i].date);
                weights.push(data[i].iBench_weight);
                int.push(parseFloat(weights[i]))
                chart[i] = {x: dates[i],y: int[i]}
            }

            sorted = parseFloat(weights.sort((a, b) => b - a));
            y_max = sorted + 10;
            y_min = sorted - 10
            

            var timeFormat = 'YYYY/MM/DD';
            var ctx = document.getElementById('iBench_canvas').getContext('2d');
            var myLineChart = new Chart(ctx, {
                    type:    'line',
                    data:    {
                        datasets: [
                            {
                                label: "Incline DB Bench",
                                data: chart,
                                fill: false,
                                borderColor: 'red'
                            }
                        ]
                    },
                    options: {
                        legend: {
                            display: false,
                        },
                        responsive: true,
                        aspectRatio: 0.9,
                        title:      {
                            display: false,
                            text:    ""
                        },
                        scales:     {
                            xAxes: [{
                                type:       "time",
                                time:       {
                                    parser: timeFormat,
                                    tooltipFormat: 'll'
                                },
                                scaleLabel: {
                                    display:     true,
                                    labelString: 'Date'
                                }
                            }],
                            yAxes: [{
                                scaleLabel: {
                                    display:     true,
                                    labelString: 'Weight (lbs)'
                                },
                                ticks: {
                                    beginAtZero: true,
                                    max: y_max,
                                    min: 0
                                }
                            }]
                        }
                    }
                });
            //Ends
        })
    
    // Machine Fly
    var ref = firebase.database().ref("Fly")
    ref.once("value")
        .then(function(snapshot) {
            var test = snapshot.val();

            data = Object.values(test)
            dLen = data.length;

            dates = [];
            weights = [];
            chart = [];
            int = [];
            for (i = 0; i < dLen; i++) {
                dates.push(data[i].date);
                weights.push(data[i].Fly_weight);
                int.push(parseFloat(weights[i]))
                chart[i] = {x: dates[i],y: int[i]}
            }

            sorted = parseFloat(weights.sort((a, b) => b - a));
            y_max = sorted + 10;
            y_min = sorted - 10
            

            var timeFormat = 'YYYY/MM/DD';
            var ctx = document.getElementById('Fly_canvas').getContext('2d');
            var myLineChart = new Chart(ctx, {
                    type:    'line',
                    data:    {
                        datasets: [
                            {
                                label: "Machine Fly",
                                data: chart,
                                fill: false,
                                borderColor: 'red'
                            }
                        ]
                    },
                    options: {
                        legend: {
                            display: false,
                        },
                        responsive: true,
                        aspectRatio: 0.9,
                        title:      {
                            display: false,
                            text:    ""
                        },
                        scales:     {
                            xAxes: [{
                                type:       "time",
                                time:       {
                                    parser: timeFormat,
                                    tooltipFormat: 'll'
                                },
                                scaleLabel: {
                                    display:     true,
                                    labelString: 'Date'
                                }
                            }],
                            yAxes: [{
                                scaleLabel: {
                                    display:     true,
                                    labelString: 'Weight (lbs)'
                                },
                                ticks: {
                                    beginAtZero: true,
                                    max: y_max,
                                    min: 0
                                }
                            }]
                        }
                    }
                });
            //Ends
        })

    // French Curls
    var ref = firebase.database().ref("fCurl")
    ref.once("value")
        .then(function(snapshot) {
            var test = snapshot.val();

            data = Object.values(test)
            dLen = data.length;

            dates = [];
            weights = [];
            chart = [];
            int = [];
            for (i = 0; i < dLen; i++) {
                dates.push(data[i].date);
                weights.push(data[i].fCurl_weight);
                int.push(parseFloat(weights[i]))
                chart[i] = {x: dates[i],y: int[i]}
            }

            sorted = parseFloat(weights.sort((a, b) => b - a));
            y_max = sorted + 10;
            y_min = sorted - 10
            

            var timeFormat = 'YYYY/MM/DD';
            var ctx = document.getElementById('fCurl_canvas').getContext('2d');
            var myLineChart = new Chart(ctx, {
                    type:    'line',
                    data:    {
                        datasets: [
                            {
                                label: "French Curl",
                                data: chart,
                                fill: false,
                                borderColor: 'red'
                            }
                        ]
                    },
                    options: {
                        legend: {
                            display: false,
                        },
                        responsive: true,
                        aspectRatio: 0.9,
                        title:      {
                            display: false,
                            text:    ""
                        },
                        scales:     {
                            xAxes: [{
                                type:       "time",
                                time:       {
                                    parser: timeFormat,
                                    tooltipFormat: 'll'
                                },
                                scaleLabel: {
                                    display:     true,
                                    labelString: 'Date'
                                }
                            }],
                            yAxes: [{
                                scaleLabel: {
                                    display:     true,
                                    labelString: 'Weight (lbs)'
                                },
                                ticks: {
                                    beginAtZero: true,
                                    max: y_max,
                                    min: 0
                                }
                            }]
                        }
                    }
                });
            //Ends
        })

    // Lateral Raises
    var ref = firebase.database().ref("latRaise")
    ref.once("value")
        .then(function(snapshot) {
            var test = snapshot.val();

            data = Object.values(test)
            dLen = data.length;

            dates = [];
            weights = [];
            chart = [];
            int = [];
            for (i = 0; i < dLen; i++) {
                dates.push(data[i].date);
                weights.push(data[i].latRaise_weight);
                int.push(parseFloat(weights[i]))
                chart[i] = {x: dates[i],y: int[i]}
            }

            sorted = parseFloat(weights.sort((a, b) => b - a));
            y_max = sorted + 10;
            y_min = sorted - 10
            

            var timeFormat = 'YYYY/MM/DD';
            var ctx = document.getElementById('latRaise_canvas').getContext('2d');
            var myLineChart = new Chart(ctx, {
                    type:    'line',
                    data:    {
                        datasets: [
                            {
                                label: "Lateral Raises",
                                data: chart,
                                fill: false,
                                borderColor: 'red'
                            }
                        ]
                    },
                    options: {
                        legend: {
                            display: false,
                        },
                        responsive: true,
                        aspectRatio: 0.9,
                        title:      {
                            display: false,
                            text:    ""
                        },
                        scales:     {
                            xAxes: [{
                                type:       "time",
                                time:       {
                                    parser: timeFormat,
                                    tooltipFormat: 'll'
                                },
                                scaleLabel: {
                                    display:     true,
                                    labelString: 'Date'
                                }
                            }],
                            yAxes: [{
                                scaleLabel: {
                                    display:     true,
                                    labelString: 'Weight (lbs)'
                                },
                                ticks: {
                                    beginAtZero: true,
                                    max: y_max,
                                    min: 0
                                }
                            }]
                        }
                    }
                });
            //Ends
        })

    // Front Raises
    var ref = firebase.database().ref("frontRaise")
    ref.once("value")
        .then(function(snapshot) {
            var test = snapshot.val();

            data = Object.values(test)
            dLen = data.length;

            dates = [];
            weights = [];
            chart = [];
            int = [];
            for (i = 0; i < dLen; i++) {
                dates.push(data[i].date);
                weights.push(data[i].frontRaise_weight);
                int.push(parseFloat(weights[i]))
                chart[i] = {x: dates[i],y: int[i]}
            }

            sorted = parseFloat(weights.sort((a, b) => b - a));
            y_max = sorted + 10;
            y_min = sorted - 10
            

            var timeFormat = 'YYYY/MM/DD';
            var ctx = document.getElementById('frontRaise_canvas').getContext('2d');
            var myLineChart = new Chart(ctx, {
                    type:    'line',
                    data:    {
                        datasets: [
                            {
                                label: "Front Raises",
                                data: chart,
                                fill: false,
                                borderColor: 'red'
                            }
                        ]
                    },
                    options: {
                        legend: {
                            display: false,
                        },
                        responsive: true,
                        aspectRatio: 0.9,
                        title:      {
                            display: false,
                            text:    ""
                        },
                        scales:     {
                            xAxes: [{
                                type:       "time",
                                time:       {
                                    parser: timeFormat,
                                    tooltipFormat: 'll'
                                },
                                scaleLabel: {
                                    display:     true,
                                    labelString: 'Date'
                                }
                            }],
                            yAxes: [{
                                scaleLabel: {
                                    display:     true,
                                    labelString: 'Weight (lbs)'
                                },
                                ticks: {
                                    beginAtZero: true,
                                    max: y_max,
                                    min: 0
                                }
                            }]
                        }
                    }
                });
            //Ends
        })

    // Overhead Press
    var ref = firebase.database().ref("OHP")
    ref.once("value")
        .then(function(snapshot) {
            var test = snapshot.val();

            data = Object.values(test)
            dLen = data.length;

            dates = [];
            weights = [];
            chart = [];
            int = [];
            for (i = 0; i < dLen; i++) {
                dates.push(data[i].date);
                weights.push(data[i].OHP_weight);
                int.push(parseFloat(weights[i]))
                chart[i] = {x: dates[i],y: int[i]}
            }

            sorted = parseFloat(weights.sort((a, b) => b - a));
            y_max = sorted + 10;
            y_min = sorted - 10
            

            var timeFormat = 'YYYY/MM/DD';
            var ctx = document.getElementById('OHP_canvas').getContext('2d');
            var myLineChart = new Chart(ctx, {
                    type:    'line',
                    data:    {
                        datasets: [
                            {
                                label: "Overhead Press",
                                data: chart,
                                fill: false,
                                borderColor: 'red'
                            }
                        ]
                    },
                    options: {
                        legend: {
                            display: false,
                        },
                        responsive: true,
                        aspectRatio: 0.9,
                        title:      {
                            display: false,
                            text:    ""
                        },
                        scales:     {
                            xAxes: [{
                                type:       "time",
                                time:       {
                                    parser: timeFormat,
                                    tooltipFormat: 'll'
                                },
                                scaleLabel: {
                                    display:     true,
                                    labelString: 'Date'
                                }
                            }],
                            yAxes: [{
                                scaleLabel: {
                                    display:     true,
                                    labelString: 'Weight (lbs)'
                                },
                                ticks: {
                                    beginAtZero: true,
                                    max: y_max,
                                    min: 0
                                }
                            }]
                        }
                    }
                });
            //Ends
        })

}