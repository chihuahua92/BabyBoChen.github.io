window.addEventListener('DOMContentLoaded', function(e){

    /** @type {HTMLButtonElement} */
    let btnToggleSideBar = document.getElementById("btnToggleSideBar");
    /** @type {HTMLDivElement} */
    let sideBar = document.getElementById("sideBar");
    /** @type {CSSStyleDeclaration} */
    let sideBarCSS = window.getComputedStyle(sideBar);
    /** @type {NodeList} */
    let my_links = document.querySelectorAll(".my-link");
    /** @type {NodeList} */
    let toggle_collapses = document.querySelectorAll(".toggle-collapse");
    /** @type {HTMLDivElement} */
    let main = document.getElementById("main");    

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

    // sideBar.addEventListener('click',function(e){        
    //     if(sideBarCSS.getPropertyValue('position') == 'absolute'){
    //         sideBar.classList.add('off');
    //         localStorage.setItem("sideBar", "off");
    //     }
    // });
    my_links.forEach(function(link){
        link.addEventListener("click",function(e){
            if(sideBarCSS.getPropertyValue('position') == 'absolute'){
                sideBar.classList.add('off');
                localStorage.setItem("sideBar", "off");
            }
        });        
    });

    main.addEventListener("click",function(e){
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



