function goBack() {
    window.history.back();
}

var homeKey = document.getElementById("homeKey");

homeKey.addEventListener('click', goBack);