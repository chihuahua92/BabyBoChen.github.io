/** @type {HTMLButtonElement} */
let btnToggleSideBar = null;
/** @type {HTMLDivElement} */
let sideBar = null;
/** @type {CSSStyleDeclaration} */
let sideBarCSS = null;

let toggle_collapses = [];

window.addEventListener('DOMContentLoaded', function(e){

    btnToggleSideBar = document.getElementById("btnToggleSideBar");
    sideBar = document.getElementById("sideBar");    
    sideBarCSS = window.getComputedStyle(sideBar);
    toggle_collapses = document.querySelectorAll(".toggle-collapse");

    if(localStorage.getItem("sideBar") == "off"){
        sideBar.classList.add('off');
    }

    sideBar.style.display = "block";

    btnToggleSideBar.addEventListener("click", function () {
        sideBar.classList.toggle("off");
        if (localStorage.getItem("sideBar") == "off"){
            localStorage.setItem("sideBar", "on");
        }else{
            localStorage.setItem("sideBar", "off");
        }
    });

    sideBar.addEventListener('click',function(e){        
        if(sideBarCSS.getPropertyValue('position') == 'absolute'){
            sideBar.classList.add('off');
            localStorage.setItem("sideBar", "off");
        }
    });
    
    
    toggle_collapses.forEach(/** @param node {HTMLAnchorElement} */function(node){        
        let aria_control_id = node.getAttribute("aria-controls");
        let aria_control = document.getElementById(aria_control_id);
        if(localStorage.getItem(aria_control_id) == "true"){
            aria_control.classList.add("show");
            node.setAttribute("aria-expanded","true");
        }
        node.addEventListener("click",function(e){
            let aria_expanded = node.getAttribute("aria-expanded");
            localStorage.setItem(aria_control_id, aria_expanded);
        });
    });
    
});



