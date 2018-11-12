var trivia_data = {
    "length":4,
    "Who was NOT a member of New Edition?": ["Davey","Ronny","Ralph","Michael"],
    "Which of these birds can actually fly?": ["Chicken","Ostrich","Penguin","Kiwi"],
    "Which is heavier: 2 tons of feathers or 3000 lbs of scrap metal?": ["Feathers","Scrap Metal"],
    "Who was the tallest NBA player to ever play?": ["Gheorghe Muresan","Yao Ming","Kareem Abdul-Jabbar","Manute Bol"]
    
};
var answerholder = new Array();
var question =0;
var time=30;
var gamescreen = true;
var clockrunning= false;
var wins=0;
var losses=0;

function calculate_percentage(losses,total) 
{   return ((losses*100)/total);}
function coin()
{
    return Math.floor(Math.random()*2);
}

for(let i=1;i<=trivia_data.length;i++)
{
    
    console.log(Object.entries(trivia_data)[i][0]);
    console.log(Object.entries(trivia_data)[i][1[1]]);
    answerholder.push(Object.entries(trivia_data)[i][1]);
}

function draw_choices()
{   for(let i=0;i<answerholder[question].length;i++)
     {   var ansdiv = $("<div>");
         let temp = answerholder[question][i];
         ansdiv.addClass("ansdiv");
         ansdiv.attr("data-number",i);
         ansdiv.html(temp);
         if(coin())
         {$("#gamebox").append(ansdiv);}
         else{$("#gamebox").prepend(ansdiv);}
     }
}

function draw_title()
{   titlediv=$("<div>");
    titlediv.html('<h3 id="title">TRIVIA</h3>');
    $("#gamebox").prepend(titlediv);
}

function start_game()
{
    time=30; 
    $("#gamebox").empty();
    draw_choices();
    draw_time();
    draw_question();
    draw_title();
    if(!clockrunning){run();clockrunning=true;}
gamescreen=true;

create_clickevent();
}

start_game();
function endscreen()
{   $("#gamebox").empty();
    endgame=$("<div>");
    endgame.addClass("endgame");
    gamescreen=false;
    let temp = "<h3>GAME OVER</h3><br><h3>W: "+wins+"</h3><h3>L: "+losses+"</h3><h3>"+calculate_percentage(wins,trivia_data.length)+"%</h3>";
    endgame.html(temp);
    $("#gamebox").append(endgame);

    let ansdiv = $("<div>");
    ansdiv.addClass("ansdiv");
    ansdiv.text("Play again?");
    $("#gamebox").append(ansdiv);

    $(".ansdiv").on("click",function(){
        time=30;
        question=0;
        wins=0;
        losses=0;
        start_game();
    });

}

function draw_question(){
    var qdiv = $("<div>");
    qdiv.addClass("qdiv");
    qdiv.text(Object.entries(trivia_data)[question+1][0]);
    $("#gamebox").prepend(qdiv);
}

function run()
{   interval=setInterval(function(){
    $(".timediv").html(--time);
    if(time==0){
        if(question==trivia_data.length-1){if(gamescreen==true){losescreen();}else{
            endscreen();}}
            else{
                if(gamescreen==true){
                losescreen();}else{
                    question++;start_game();}
}}},1000)

}

function draw_time()
{   timediv=$("<div>");
    timediv.addClass("timediv");
    timediv.html(time);
    $("#gamebox").prepend(timediv);

}   


function losescreen()
{   time=4;
    gamescreen=false;
    $("#gamebox").empty();
    $("#gamebox").html("<h3>TIMEOUT</h3>");
    losses++;

}

function create_clickevent(){
$(".ansdiv").on("click",function(){
    guess= this.getAttribute("data-number")
    if(guess==0){win();}else{lose();}
    console.log(guess);

});
}



function win()
{   gamescreen=false;
    $("#gamebox").empty();
    $("#gamebox").html('<br><br><br><h4 class="winlose">CORRECT</h4>');
    draw_title();
    time=2;
    wins++;
}

function lose()
{   
    gamescreen=false;
    $("#gamebox").empty();
    let temp = '<br><br><br><h4 class="winlose">INCORRECT<br><br>THE ANSWER WAS: '+answerholder[question][0]+'<br></h4>';
    $("#gamebox").html(temp);
    draw_title();
    time=2;
    losses++;

}
