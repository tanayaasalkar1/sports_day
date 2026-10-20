
// Initial scores
let scores = {
    Red: 0,
    Blue: 0,
    Green: 0,
    Yellow: 0
};

// Display messages on the webpage
function showMessage(message) {
    document.getElementById("output").innerHTML +=
        `<p>${message}</p>`;
}

// 1. Opening Ceremony
function OpeningCeremony(callback) {

    showMessage("Opening Ceremony Started!");

    let count = 3;

    let interval = setInterval(() => {
        showMessage(count);
        count--;

        if (count === 0) {
            clearInterval(interval);

            showMessage("Let the Sports Day Begin!");

            // Start the next event
            callback(scores);
        }

    }, 1000);
}


// 2. 100 Meter Race
function Race100M(scores, callback) {

    showMessage("100 Meter Race Started!");

    setTimeout(() => {

        // Generate random times
        let times = {
            Red: Math.random() * 5 + 10,
            Blue: Math.random() * 5 + 10,
            Green: Math.random() * 5 + 10,
            Yellow: Math.random() * 5 + 10
        };

        showMessage("Race Results:");

        for (let color in times) {
            showMessage(
                `${color}: ${times[color].toFixed(2)} seconds`
            );
        }

        // Sort players based on time
        let sorted = Object.keys(times).sort(
            (a, b) => times[a] - times[b]
        );

        showMessage("Previous Scores: " + JSON.stringify(scores));

        // Award points
        scores[sorted[0]] += 50;
        scores[sorted[1]] += 25;
        scores[sorted[2]] += 10;

        showMessage("Updated Scores: " + JSON.stringify(scores));

        // Start next event
        callback(scores);

    }, 3000);
}


// 3. Long Jump
function LongJump(scores, callback) {

    showMessage("Long Jump Started!");

    setTimeout(() => {

        // Select a random color
        let colors = ["Red", "Blue", "Green", "Yellow"];

        let randomIndex = Math.floor(Math.random() * colors.length);

        let winner = colors[randomIndex];

        showMessage("Long Jump Winner: " + winner);

        showMessage("Previous Scores: " + JSON.stringify(scores));

        // Award 150 points
        scores[winner] += 150;

        showMessage("Updated Scores: " + JSON.stringify(scores));

        // Start next event
        callback(scores);

    }, 2000);
}


// 4. High Jump
function HighJump(scores, callback) {

    showMessage("High Jump Started!");

    let winner = prompt(
        "Which color secured the highest jump? Red, Blue, Green or Yellow?"
    );

    showMessage("Previous Scores: " + JSON.stringify(scores));

    if (winner !== null) {

        winner = winner.trim().toLowerCase();

        let colors = ["red", "blue", "green", "yellow"];

        if (colors.includes(winner)) {

            let color = winner.charAt(0).toUpperCase() + winner.slice(1);

            scores[color] += 100;

            showMessage("High Jump Winner: " + color);

        } else {

            showMessage("Invalid color! No points awarded.");

        }

    } else {

        showMessage("No input provided! No points awarded.");

    }

    showMessage("Updated Scores: " + JSON.stringify(scores));

    // Start next event
    callback(scores);
}


// 5. Award Ceremony
function AwardCeremony(scores) {

    showMessage("🏆 Award Ceremony Started!");

    showMessage("Final Scores:");

    // Sort scores from highest to lowest
    let sorted = Object.entries(scores).sort(
        (a, b) => b[1] - a[1]
    );

    sorted.forEach((item, index) => {

        let position = ["1st", "2nd", "3rd", "4th"][index];

        showMessage(
            `${position} Position: ${item[0]} - ${item[1]} points`
        );

    });

    showMessage("🎉 Sports Day Completed!");
}


// Start the complete event
function startSportsDay() {

    // Reset scores and output
    scores = {
        Red: 0,
        Blue: 0,
        Green: 0,
        Yellow: 0
    };

    document.getElementById("output").innerHTML =
        "<h2>Event Results</h2>";

    // Callback chain
    OpeningCeremony((scores) => {

        Race100M(scores, (scores) => {

            LongJump(scores, (scores) => {

                HighJump(scores, (scores) => {

                    AwardCeremony(scores);

                });

            });

        });

    });

}
