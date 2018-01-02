$(document).ready(function(){ 

    var huvudKat

    //Tar upp informationen från JSON-filen
    fetch("json/huvudkategorier.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        huvudKat = data;
        console.log(huvudKat);

        for(i = 0; i < huvudKat.length; i++) {

            console.log(huvudKat[i].id);
            console.log(huvudKat[i].teacolor);
            $('#huvudKat').append('<li class="dropdown" id='+ i +'><a class="dropdown-toggle" data-toggle="dropdown" href="#">'+ huvudKat[i].teacolor +'<span class="caret"></span></a><ul class="dropdown-menu" id="underKat"></ul></li>');


            };

    
    });
    //stängt fetchen

    



});