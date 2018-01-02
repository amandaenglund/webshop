$(document).ready(function(){ 

    var huvudKat = "";

    //Tar upp informationen från JSON-filen
    fetch("json/huvudkategorier.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        huvudKat = data;
        //console.log(huvudKat);

        for(i = 0; i < huvudKat.length; i++) {

            var huvudKatId = (huvudKat[i].id);
            var huvudKatTea = (huvudKat[i].teacolor);
            var printHuvudKat = "";
            //console.log(huvudKatId);
            //console.log(huvudKatTea);
 
            var printHuvudKat = '<li class="dropdown" id="hk'+ huvudKatId +'"><a class="dropdown-toggle" data-toggle="dropdown" href="#">'+ huvudKat[i].teacolor +'<span class="caret"></span></a><ul class="dropdown-menu" id="underKat"></ul></li>'
            $('#huvudKat').append(printHuvudKat);
   

        };

    
    });
    //stängt fetchen för Huvudkategorier

    
    //Tar upp informationen från JSON-filen
    fetch("json/underkategorier.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        underKat = data;
        console.log(underKat);

        for(i = 0; i < underKat.length; i++) {


            var underKatId = (underKat[i].id);
            var underKatPack = (underKat[i].packaging);
            var underKatHuvud = (underKat[i].huvudkategori);


            console.log(underKatId);
            console.log(underKatPack);
            console.log(underKatHuvud);


            if (underKatHuvud == 1) {
                $('#hk1').append('<li id='+ i +'><a href="#">'+ underKat[i].packaging +'</a></li>');
            
            } else if (underKatHuvud == 2) {
                $('#hk2').append('<li id='+ i +'><a href="#">'+ underKat[i].packaging +'</a></li>');
            
            } else if (underKatHuvud == 3) {
                $('#hk3').append('<li id='+ i +'><a href="#">'+ underKat[i].packaging +'</a></li>');

            } else {
                $('#hk4').append('<li id='+ i +'><a href="#">'+ underKat[i].packaging +'</a></li>');
            }

            

        };

    
    });
    //stängt fetchen



});