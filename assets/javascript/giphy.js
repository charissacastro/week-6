$(document).ready(function () {
    
    var gifs = ['dog', 'cat', 'bear', 'bird', 'snake', 'fish', 'panda', 'whale', 'turtle', 'butterfly', 'penquin'];

    function renderButtons(){ 

        
        $('#animalButtons').empty();

        
        for (var i = 0; i < gifs.length; i++){

            
            var a = $('<button>') 
            a.addClass('gif'); 
            a.attr('data-name', gifs[i]);
            a.addClass('animalBtn');
            a.text(gifs[i]); 
            $('#animalButtons').append(a); 
        } 
    }
    renderButtons();
    

    $('#addAnimal').on('click', function(){

        
        var newGif = $('#animal-input').val().trim();

        
        gifs.push(newGif);
        
        
        renderButtons();

        
        return false;
    })

    $('#animaButtons').on('click', '.animalBtn', function() {
        var animal = $(this).data('name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
               
                console.log(response)

                
                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                   
                    var animalDiv = $('<div>');
                    var p = $('<p>').text("Rating: " + results[i].rating);
                    var animalImage = $('<img>').attr('src', results[i].images.fixed_height_still.url);
                    animalImage.attr('data-still', results[i].images.fixed_height_still.url);
                    animalImage.attr('data-animate', results[i].images.fixed_height.url);
                    animalImage.attr('data-state', 'still');
                    animalmage.addClass('cartoonGif');

                    animalDiv.append(p);
                    animalDiv.append(animalImage);
                    $('#animal').prepend(animalDiv);
                    
                }

            });
        $('#animal').empty();
    });
      $('#animal').on('click', '.animalGif', function(){
           

            var state = $(this).attr('data-state');
            var animate = $(this).attr('data-animate');
            var still = $(this).attr('data-still');
            console.log(animate);
            

            if (state == 'still') {
                $(this).attr('src', animate);
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', still);
                $(this).attr('data-state', 'still');
            }
            
        });
});
