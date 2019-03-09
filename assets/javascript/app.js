$(document).ready(function () {

    var qSets = [];

    //the first answer in the object is always correct
    qSets[0] = {
        question: "What type of bear is best?",
        answers: ["black bear", "polar bear", "panda bear", "gay bear"]
    }
    qSets[1] = {
        question: "You got a lobster and you got a...?",
        answers: ["magnet", "stick of butter", "fork", "crustacean"]
    }
    qSets[2] = {
        question: "Was Tamatoa always this glam?",
        answers: ["No, he was a drab little crab, once", "No, he was a sad little flab, once", "Yes, he was always a fab crab", "Yes, he always sparkled like a wealthy woman's neck"]
    }
    qSets[3] = {
        question: "Do you like waffles?",
        answers: ["Yeah we like waffles!", "Hell no, crepes4lyfe", "I mean, sure?", "EAT DEM PAMCAKES"]
    }
    qSets[4] = {
        question: "What is a robot's favorite dance?",
        answers: ["The robot", "The robo-boogie", "Beep boop", "BEEEeeeewwwwwwww..."]
    }
    qSets[5] = {
        question: "Key and?",
        answers: ["Peele", "Locke", "Hammer", "Nail"]
    }

    var right = 0;
    var wrong = 0;
    var gameLength = qSets.length;
    var gameState = "start";
    var intervalID;
    var timer;
    restart();

    //Click the timer/ready button
    $(".timer").on("click", function () {
        if (gameState === "waitForReady" || gameState === "start") {
            gameState = "running";
            startTimer();
            loadQuestion();
        }
        if (gameState === "done") {
            restart();
        }
    })

    //Click an answer
    $(".ans").on("click", function () {
        //clear timer
        clearInterval(intervalID);
        if (gameState === "running") {
            if ($(this).attr("value") === "right") {
                right++;
                if (right + wrong === gameLength) {
                    $(".timer").text("You got " + right + " right! Play again?");
                    gameState = "done";
                } else {
                    $(".timer").text("That's right! The next question awaits!");
                    gameState = "waitForReady";
                }
            } else {
                wrong++;
                if (right + wrong === gameLength) {
                    if (wrong === gameLength) {
                        $(".timer").text("0? That's just...wow. Try again, I believe in you, boo!");
                    } else {
                        $(".timer").text("You got " + right + " right! Play again?");
                    }
                    gameState = "done";
                } else {
                    $(".timer").text("That's a nope! Try the next question?");
                    gameState = "waitForReady";
                }
            }

            //highlight correct answer
            $("p[value='right'").css("background-color", "#90ee90");

            //activate hover for the ready button
            $(".timer").attr("id", "hovr");

        }
    })

    function startTimer() {
        timer = 9;
        $(".timer").text(timer + 1);
        intervalID = setInterval(function () {
            $(".timer").text(timer);
            //if the timer runs out, stop the interval function and increment "wrong" counter
            if (timer === 0) {
                clearInterval(intervalID);
                wrong++;

                if (right + wrong === gameLength) {
                    $(".timer").text("You got " + right + " right! Play again?");
                    gameState = "done";
                } else {
                    $(".timer").text("Time's up! Next question?");
                    gameState = "waitForReady";
                }
                //activate hover for the ready button
                $(".timer").attr("id", "hovr");

                //highlight correct answer
                $("p[value='right'").css("background-color", "#90ee90");
            }
            timer--;
        }, 1000)
    }

    function loadQuestion() {

        //reset highlighting
        $(".timer").attr("id", "");
        $(".ans").attr("value", "");
        $(".ans").css("background-color", "");


        //load a question in order of the question array, no fancy randomization here!
        var currentQ = qSets[right + wrong].question;
        $(".question-box").text(currentQ);

        //randomize answer order, some fanciness. Doing my best okay? :P
        var ansOrder = [];

        for (var i = 0; i < 4; i++) {
            var answerIndex = 0;

            do {
                answerIndex = Math.floor(Math.random() * 4)
            }
            while (ansOrder.indexOf(answerIndex) !== -1);

            //make sure we can't choose that spot again
            ansOrder.push(answerIndex);
        }
        //now the ansOrder array has a list of 0-3 in random order, time to populate the answer fields
        $(".ans").show();
        for (var i = 0; i < ansOrder.length; i++) {
            var currentA = ansOrder[i];
            $(".ans-" + i).text(qSets[right + wrong].answers[currentA]);

            //the first answer in answer[] is always right, so give it that value to make it easy to identify
            if (currentA === 0) {
                $(".ans-" + i).attr("value", "right");
            }
        }
    }

    function restart() {
        right = 0;
        wrong = 0;
        gameState = "start";
        $(".timer").text("I'm ready, let's do it!");
        $(".ans").attr("value", "wrong");
        $(".ans").hide();
        $(".question-box").empty();
        $(".ready").show();
        $(".timer").attr("id", "hovr");

    }

});