// Define the oscillators 1 (https://stackoverflow.com/questions/15455289/changing-variable-by-html-button)
$(document).ready(function() {
    $(".defOscillator").click(function() {
       defOscillator = $(this).attr("data-name");
    });

    $("#test").click(function() {
       alert(defOscillator);
    });
});

// Define the oscillators 2
$(document).ready(function() {
    $(".defOscillator2").click(function() {
       defOscillator2 = $(this).attr("data-name");
    });

    $("#test").click(function() {
       alert(defOscillator2);
    });
});

// Control of the masterVolume
    // jQuery UI interface
$( function() {
  $( "#slider-vertical" ).slider({
    orientation: "vertical",
    range: "min",
    min: 0,
    max: 100,
    value: 60,
    slide: function( event, ui ) {
      $( "#amount" ).val( ui.value );
    }
  });
  $( "#amount" ).val( $( "#slider-vertical" ).slider( "value" ) );
} );
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

masterVolume.gain.value = 0.2;

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