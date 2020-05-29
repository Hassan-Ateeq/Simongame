var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var begain = false;


$(document).on('keydown', function(event){
    if(!started || !begain)
    {
        $('#level-title').text('Level ' + level);

        nextSequence();
        started = true;
        begain = true;
    }
    
});



function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        console.log('Success');
        if(gamePattern.length === userClickedPattern.length)
        {
            setTimeout(function(){
                nextSequence();
            }, 100);


        }
    }
    else
    {
        $('body').addClass('game-over');

        var audio = new Audio('sounds/wrong.mp3');
        audio.play();

        setTimeout(function(){
            $('body').removeClass('game-over');
        }, 200);

        $('h1').text('Game Over, Press Any Key to Restart');

        startOver();

    }
}


function startOver()
{
    level = 0;
    gamePattern = [];
    started = false;
    begain = false;
}


function nextSequence()
{
    userClickedPattern = [];

    level++;

    $('#level-title').text('Level ' + level);

    var randomNumber = Math.floor(Math.random() * 4);
    
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}


$(".btn").on('click', function(){
    begain = true;
    
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
    
    console.log(userClickedPattern);
});

$(document).on('touchstart', function(){
    begain = true;
    
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
    
    console.log(userClickedPattern);
});



function playSound(name)
{
    var audio = new Audio("sounds/" + name +".mp3");
    audio.play();
}




function animatePress(currentColour)
{
    $('#' + currentColour).addClass("pressed");

    setTimeout(function(){
        $('#' + currentColour).removeClass("pressed");
    }, 100);
}






