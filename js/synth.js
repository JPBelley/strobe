// Define the oscillators 1 (https://stackoverflow.com/questions/15455289/changing-variable-by-html-button)
$(document).ready(function() {
    $(".defOscillator").click(function() {
       defOscillator = $(this).attr("data-name");
       // Button CLicked
       var sineType1 = "#" + defOscillator;
       $(".defOscillator").css("background-color", "black");
       $(sineType1).css("background-color", "rgba(255,255,255,0.4)");
    });
});

// Define the oscillators 2
$(document).ready(function() {
    $(".defOscillator2").click(function() {
       defOscillator2 = $(this).attr("data-name");
       // Button CLicked
       var sineType2 = "#" + defOscillator2 + "2";
       $(".defOscillator2").css("background-color", "black");
       $(sineType2).css("background-color", "rgba(255,255,255,0.4)");
    });
});

// Control of the masterVolume
    // jQuery UI interface 
    var data = null;
$( function() {
  $( "#slider-vertical" ).slider({
    orientation: "vertical",
    range: "min",
    min: 0,
    max: 100,
    value: 60,
    slide: function( event, ui ) {
      $( "#amount" ).val( ui.value );
      var data = ui.value;
      // console.log(ui.value);
      // var data = ui.value;
      // return data;
    }
  });
  $( "#amount" ).val( $( "#slider-vertical" ).slider( "value" ) );
} );
      console.log(data);

// The keyboard
var keyboard = new QwertyHancock({
     id: 'keyboard',
     width: 800,
     height: 150,
     octaves: 3
});
// defining the oscillators value to change it
var defOscillator = "sine";
var defOscillator2 = "sine";
var context = new AudioContext(),
    masterVolume = context.createGain(),
    oscillators = {};

masterVolume.gain.value = 100;

masterVolume.connect(context.destination);

keyboard.keyDown = function (note, frequency) {
    var osc = context.createOscillator(),
        osc2 = context.createOscillator();

    osc.frequency.value = frequency;
    osc.type = defOscillator;
    osc.detune.value = -10;

    osc2.frequency.value = frequency;
    osc2.type = defOscillator2;
    osc2.detune.value = 10;

    osc.connect(masterVolume);
    osc2.connect(masterVolume);

    masterVolume.connect(context.destination);

    oscillators[frequency] = [osc, osc2];

    osc.start(context.currentTime);
    osc2.start(context.currentTime);
};

keyboard.keyUp = function (note, frequency) {
    oscillators[frequency].forEach(function (oscillator) {
        oscillator.stop(context.currentTime);
    });
};
