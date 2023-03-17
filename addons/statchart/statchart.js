


//initialisation du bouton sur la tools bar.
var _btn = document.createElement("button");

_btn.className = "btn btn-default btn-raised";
_btn.title = "Statistiques"; // renommer le nom du plugin
let _span = document.createElement("span");
_span.className = "fas fa-signal";
_btn.appendChild(_span);
_btn.addEventListener('click', toggle);
document.getElementById("toolstoolbar").appendChild(_btn);


$(document).ready(function () {
    
 
    //function pour attendre un element
    function waitForElm(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }

            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector));
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

    waitForElm('#close').then((elm) => {


        setTimeout(function () {

            console.log(document.getElementById("close"))
            document.getElementById("close").addEventListener("click", toggle);
            document.getElementById("close").addEventListener("touchstart", toggle); // pour mobile 

            $('#statsPanel').easyDrag({
                handle: 'h2',
                container: $('#map')
                
            });
        }, 3000);
     });
 // délai pour laisser le temps a la page de charger

});


//function clikc btn !
function toggle() {

    console.log("click")
  

    if ($("#statsPanel").is(':visible')) {
        $('#statsbtn').blur();
        $('#statsbtn').removeClass('active');
        $("#statsPanel").hide();
    } else {
        $('#statsbtn').addClass('active');
        $("#statsPanel").show();
    }


}
