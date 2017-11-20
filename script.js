
$(function(){ // document ready
    $("#quiz").hide();
    let cpaName = "" //determined by user input (form-name)
    let possessivePronoun = "" //determined by user input (form-preferredPronoun)
  
    $("select").change(function () {
        $("h1 span").html($(this).val()) // determined by user input (form-relationship)
    });

   
    var required = $('[required]');  //disabling submit button until form is complete
    required.bind('change keyup', function () {
        var flag = 0;
        required.each(function () {
            if ($(this).val() != '') flag++;
        });
        if (flag == required.length) $('#begin').prop('disabled', false);
        else $('#begin').prop('disabled', true);
    });

    $("form").on("submit", function(e){ //once form is submitted
        $("#coverpage").hide(); //transition out of coverpage
        $("#quiz").fadeIn(); // transition into quiz        
        e.preventDefault();
        
        pronoun = $("input[name=pronoun]:checked").val();
        
        inputName = document.getElementById("firstName").value.trim(); // to get rid of white space
        
        firstLetterFirstName = inputName[0]
        cpaName = firstLetterFirstName.toUpperCase() + inputName.substring(1).toLowerCase() //to capitalize only the first letter of name 
        console.log(cpaName, relationship, pronoun)
        
    })
   
    // Array of 6 objects each containing 1. situations 2.their corresponding actionPoints 3. related giphy    
    var pairings = [
        // (i=0)
        {
            situation: function(cpaName){
                return `${cpaName}'s been travelling a whole lot lately...`
            },
            actionPoint: function(cpaName){
                return `There's a good chance that ${cpaName} is probably really home sick. Gather some close friends at same place at same time right before next big trip!`
             },
            giphy:`https://media.giphy.com/media/hMkPriZTKphdu/giphy.gif`
        },
        // (i=1)
        {
            situation: function(cpaName){
                return `${cpaName} has not been eating right...`
            },
            actionPoint:function(cpaName){
                return `Whether its too much or just not enough - a steady, balanced diet is hard to maintain these days. Try cooking ${cpaName} a home cooked meal or packing a healthy lunch!`
            },
            giphy: `https://media3.giphy.com/media/B6DWQhuBx3Q7C/giphy.gif`
         },
        // (i=2)
        {
            situation: function (cpaName){
                return `${cpaName} hasn’t been getting enough sleep...`
            },
            actionPoint: function(cpaName){
                return `Avoid late night activities, let ${cpaName} sleep in when possible since those hours of zzz will be totally worth the investment!`
            },
            giphy: `https://media2.giphy.com/media/3o85xHPDPnRupptDws/giphy.gif`
        },
        // (i=3)
        {
            situation: function (cpaName){
                return `${cpaName} hasn’t been getting enough exercise...`
            },
            actionPoint: function (activity) {
                return  `Suggest some adrenalin inducing activities next time you both hang out. Consider yoga, some urban hiking, rock climbing e.g. - the sky is the limit with those natural endorphins!`
            },
            giphy: `https://media.giphy.com/media/l4Ki8WjiS8RCQATDi/giphy.gif`
        },
        // (i=4)
        {
            situation: function(){  
                return `Seems like ${cpaName} needs to blow off some steam`
            },
            actionPoint: function(activity){
                return `Friday is universal Fun-day— even for CPAs. Plan a fun night out with lots of wine, beers… and Axe-throwing maybe?`
            },
            giphy: `https://media.giphy.com/media/e6ZpXWy1hV7Ow/giphy.gif`
        },
        // (i=5)
        {
            situation: function(cpaName){
                return `${cpaName} really just had a bad day at work`
            },
            actionPoint: function(cpaName, pronoun){
                return `Let ${cpaName} know that ${pronoun} the smartest, most hardworking person you know because let's be honest - it’s the truth.`
            },
            giphy: `https://media.giphy.com/media/Qwi6fEcn2JJeg/giphy.gif`
        }
    ] //end of pairings array
   

        
        $("#context li.option button").each(function () { //on click of font awesome icons
            $(this).click(function (e) {
                e.preventDefault();
                const listIndex = $(this).parent().index(); //return index of <li> in <ul>
                $("h3").empty(); // clear whatever was in h3 previously
                $("h3").append(`${pairings[listIndex].situation(cpaName)}`)//display situation description
                $(".actionDescription").empty();
                $(".actionDescription").append(`<h5>${pairings[listIndex].actionPoint(cpaName, pronoun)}</h5>`)//display actionPoint
                $(".modal-body img").attr('src',`${pairings[listIndex].giphy}`)//display giphy
            });
            // to enable button only when a font awesome icon has been selected
            function disableBtn() {
                console.log(`disable`);
                document.getElementById("results").disabled = true;
            }
            disableBtn();
            $("ul").on("click", function(){
                document.getElementById("results").disabled = false;
            })


        });
        //when 'end quiz' button is clicked, reload app to return to coverpage
        $(".end-quiz").on("click", function(){
            window.location.reload(true);
        })
})




