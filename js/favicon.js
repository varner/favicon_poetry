// favicon.js
// by xX_mAdDy_VaRnEr_Xx

var links = [""];
var sides = 150;
var bits = 40;

function makeWindows() {
    var maxPerWindow = ((screen.width) - sides) / bits;
    var windowLinks = [];
    var url = 0;
    var windows = 0;
    var len = links.length;
    while (url < len) {
        var bestCase = url + maxPerWindow;
        var nextOne = bestCase + 1;
        var top = windows * 60;
        
        if ((bestCase < len) && (links[bestCase] == "")) {
            windowLinks = links.slice(url, bestCase);
            url = bestCase;
            console.log(windowLinks.length + " (best case ends perfectly with a space) " + len);
        } else if (bestCase >= len) {
            windowLinks = links.slice(url, links.length);
            url = len;
            console.log(windowLinks.length + " (rest of message fits within window) " + len);
        } else if (bestCase < len) {
            var last = links.lastIndexOf("", bestCase);
            console.log(last + " : the last index since " + bestCase);
            windowLinks = links.slice(url, last);
            url = last;
            console.log(windowLinks.length + " (max window cuts up a letter, need to make new one) " + len);
        }
        
        var width = 140 + (40 * windowLinks.length);
        chrome.windows.create({url: windowLinks, width: width, top: top, height: 500}, function(){});
        windows++;
    }        
}

function decided() {
    var phrase = document.getElementById("phrase").value.toLowerCase().replace(new RegExp("[^a-z \d]", "g"), "");
    var characters = phrase.split("");
	$.getJSON("http://favicon.maddy.zone/favicons.json", function(data) {
        $.each(characters, function(i, character) {
            var urls = data[character];
            var url = urls[Math.floor(Math.random()*urls.length)];
            links.push(url);
        });
	}).done( function() {
        makeWindows();
    });
}

$( document ).ready(function(){
    $( "#go" ).click(function() {
        decided();
    });
});