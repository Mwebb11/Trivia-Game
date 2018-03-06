var questions = [{
    question: "What is the best selling Fantasy book of all time?",
    choices: ["Lord of the Rings", "Game of Thrones", "Harry Potter", "Chronicles of Narnia"],
    correctAnswer: 2
}, 
{
    question: "Mr.Tumnus in Chronicles of Narnia was what mythical creature?",
    choices: ["centaur", "unicorn", "faun", "griffin"],
    correctAnswer: 2
},
 {
    question: "In Lord of the Rings what is the most dangerous creature?",
    choices: ["Orcs", "Balrog", "Dragon", "Shelob"],
    correctAnswer: 1
}, 
{
    question: "What was the name of Gandolf's sword in Lord of the Rings?",
    choices: ["Sting", "Nightbane", "Orc Hewer", "Glamdring"],
    correctAnswer: 3
}, 
{
    question: "In Game of Thrones what is the name of the Dragon that Daenerys Stormborn rides?",
    choices: ["Drogon", "Rhaegal", "Viserion", "Eragon"],
    correctAnswer: 0
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;
var time;
var seconds;
var timeRunningBoolean;
$(document).ready(function () {

showCurrentQuestion();
$(this).find(".Message").hide();

$(this).find(".next").on("click", function () {
 if (!quizOver) {
     value = $("input[type='radio']:checked").val();
     if (value == undefined) {
     $(document).find(".Message").text("You gotta click something...weirdo");
         $(document).find(".Message").show();
         } else {
     $(document).find(".Message").hide();
        if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }
              currentQuestion++; 
             if (currentQuestion < questions.length) {
                    showCurrentQuestion();
            } else {
                    showScore();
                    $(document).find(".next").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { 
            quizOver = false;
            $(document).find(".next").text("Next Question");
            resetQuiz();
            showCurrentQuestion();
            hideScore();
        }
    });

});


function showCurrentQuestion() {

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".Container > .question");
    var choiceList = $(document).find(".Container > .choices");
    var numChoices = questions[currentQuestion].choices.length;
    timeRunningBoolean = true;
    $(questionClass).text(question);
    $(choiceList).find("li").remove();
    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
    timerunning();

    $('.choice').on('click',function(){
        playerPick = $(this).data('index');
        clearInterval(time);
        result();
    });
}
function timerunning(){
    seconds = 20;
    
    timeRunningBoolean = true;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    time = setInterval(decrement,1000);

};

function decrement(){
    seconds--;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');

    if(seconds < 1){
        timeRunningBoolean = false;
        clearInterval(time);
        result();
    }


}
function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function showScore() {
    $(document).find(".Container > .result").text("Congratulations! You Earned: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".Container > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}