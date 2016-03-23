$(document).ready(function () {
    window.object = null;
    // Bouton login
    $('#register').on('mouseenter', function() {
        $(this).animate({
            color: "#000",
            backgroundColor: "#F9F9F9",
            borderColor: "#999"
        }, 200);
        }).on('mouseleave', function(){
        $(this).animate({
            color: "#404040",
            backgroundColor: "none",
            borderColor: "#BBB"
        }, 250);
    });
    // Bouton Accueil
    $('.button').on('mouseenter', function() {
        $(this).animate({
            color: "#222",
            backgroundColor: "#FCFCFC",
            borderColor: "#AAA"
        }, 200);
        }).on('mouseleave', function(){
        $(this).animate({
            color: "#444",
            backgroundColor: "#FFF",
            borderColor: "#DDD"
        }, 250);
    });
    // Bouton suivant
    $('#suivant, #precedent').on('mouseenter', function() {
        $(this).animate({
            color: "#666",
            backgroundColor: "#F9F9F9",
            borderColor: "#999"
        }, 200);
        }).on('mouseleave', function(){
        $(this).animate({
            color: "#404040",
            backgroundColor: "none",
            borderColor: "#BBB"
        }, 250);
    });


    $('.container_info_match').on('click', function() {

        if(object){
            $(object).css("color","#707070").css("background-color","#EFEFEF").css("border-color","#707070").css("box-shadow","none");
            var randomColorArray = ["#e83e23"]; // "#cf341b","#a62510","#963929"
            var randomColor = randomColorArray[Math.floor((Math.random() * (randomColorArray.length-1)) + 0)];
            $(this).animate({
                color: "#000",
                backgroundColor: randomColor,
                borderColor: randomColor,
            }, 0);
            $(this).css("box-shadow","0px 0px 10px #631306");
            object = this;
        }else{
            var randomColorArray = ["#e83e23"]; // "#cf341b","#a62510","#963929"
            var randomColor = randomColorArray[Math.floor((Math.random() * (randomColorArray.length-1)) + 0)];
            $(this).animate({
                color: "#000",
                backgroundColor: randomColor,
                borderColor: randomColor,
            }, 100);
            $(this).css("box-shadow","0px 0px 10px #631306");
            object = this;
        }

    });

    $('.button').on('click', function() {
        $('#gif_container').css("display","inherit");
    });

});
