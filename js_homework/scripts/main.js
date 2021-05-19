//Multiplication table
{
    const table = document.createElement("table");
    table.id = "multi_table";
    var tbody = document.createElement("tbody");
    var wrapper = document.getElementById("wrapper");
    table.append(tbody);
    wrapper.append(table);

    for (let i = 0; i < 9; i++) {
        var tr = document.createElement("tr");
        for (j = 0; j < 9; j++) {
            let td = document.createElement("td");

            let sum = (i + 1) * (j + 1);
            if (sum < 10) {
                sum = `0${sum}`;
            }

            td.innerHTML = `${i + 1}x${j + 1}=${sum}`;
            tr.append(td);
        }
        table.append(tr);
    }
}

var incorrect = new Image();
incorrect.src = "./Images/Incorrect.png";
incorrect.height = 15;
var correct = new Image();
correct.src = "./Images/Correct.png";
correct.height = 15;

//Name Validation
{
    /** @type {HTMLInputElement} */
    const nameInput = document.getElementById("name");
    const nameInputHint = document.getElementById("nameInputHint");
    const reChineseChar = /^[\u4E00-\u9FFF]+$/;
    const reWhiteSpace = /[\s]/;
    nameInput.addEventListener("input", e => {
        if (nameInput.value.length == 0) {

            nameInputHint.innerHTML = "";
            nameInputHint.append(incorrect);
            nameInputHint.innerHTML += "Name couldn't be blank!";
        }
        else if (reChineseChar.exec(nameInput.value) == null) {

            nameInputHint.innerHTML = "";
            nameInputHint.append(incorrect);
            nameInputHint.innerHTML += "Name must be Chinese characters!";
        }
        else if (nameInput.value.length < 2) {

            nameInputHint.innerHTML = "";
            nameInputHint.append(incorrect);
            nameInputHint.innerHTML += "Name must have more than 2 characters!";
        }
        else {

            nameInputHint.innerHTML = "";
            nameInputHint.append(correct);
            nameInputHint.innerHTML += "Valid name!";
        }
    });
}

/**
 * @param {number} year
 * @param {number} month
 * @param {number} date
 * @return {bool}
 */
function validateDate(year, month, date) {
    year = parseInt(year);
    month = parseInt(month);
    date = parseInt(date);
    let valid = false;
    let isLeap = false;
    if (isNaN(year) || isNaN(month) || isNaN(date)) {
        return valid;
    }
    if (year == 0) {
        return valid;
    }
    if (month > 12 || month == 0) return valid;
    if (year % 4 == 0) {
        if (year % 100 == 0) {
            if (year % 400 == 0) {
                isLeap = true;
            } else {
                isLeap = false;
            }
        } else {
            isLeap = true;
        }
    } else {
        isLeap = false;
    }

    if ([1, 3, 5, 7, 8, 10, 12].find((m) => m == month) != undefined) {
        if (date == 0 || date > 31) {
            return valid;
        }
    } else {
        if (date == 0 || date > 30) {
            return valid;
        }
        if (month == 2) {
            if (isLeap == true) {
                if (date > 29) {
                    return valid;
                }
            } else {
                if (date > 28) {
                    return valid;
                }
            }
        }
    }
    let d = new Date(year, month, date);
    if (d.getTime() >= Date.now()) {
        return valid;
    }
    valid = true;
    return true;
}

//Birthdate Validation
{
    /**@type {HTMLInputElement} */
    const birthdate = document.getElementById("birthdate");
    const birthdateInputHint = document.getElementById("birthdateInputHint");
    const reDate = /^([\d]*)[\/]((?:\d{2})|(?:\d{1}))[\/]((?:\d{2})|(?:\d{1}))$/;
    birthdate.oninput = function (e) {
        let inputDate = reDate.exec(this.value);

        if (inputDate == null) {

            birthdateInputHint.innerHTML = "Incorrect date format!";

        }
        else if (!validateDate(inputDate[1], inputDate[2], inputDate[3])) {

            birthdateInputHint.innerHTML = "";
            birthdateInputHint.append(incorrect);
            birthdateInputHint.innerHTML += "Incorrect date format!";

        }
        else {

            birthdateInputHint.innerHTML = "";
            birthdateInputHint.append(correct);
            birthdateInputHint.innerHTML += "Valid date!";
        }
    }
}

//Password Validation
{
    /** @type {HTMLInputElement} */
    const pwdInput = document.getElementById("password");
    const pwdInputHint = document.getElementById("pwdInputHint");
    const reWhiteSpace = /[\s]/;
    const reSymbol = /[~,!,@,#,$,%,^,&,*,(,),_,-,+,=,?,/]+/;
    const reNumber = /[0-9]+/;
    const reAlphabet = /[A-Za-z]+/;
    const reNonChineseChar = /^[^\u4E00-\u9FFF]+$/;
    pwdInput.onfocus = function () {
        pwdInput.type = "text";
    }
    pwdInput.onblur = function () {
        pwdInput.type = "password";
    }
    pwdInput.addEventListener("input", e => {
        if (pwdInput.value.length < 6) {
            pwdInputHint.innerHTML = "";
            pwdInputHint.append(incorrect);
            pwdInputHint.innerHTML += "Password must has more than 6 characters!";
        }
        else if (reWhiteSpace.exec(pwdInput.value) != null) {
            pwdInputHint.innerHTML = "";
            pwdInputHint.append(incorrect);
            pwdInputHint.innerHTML += "Mustn't contain any white space!";
        }
        else if (reAlphabet.exec(pwdInput.value) == null) {
            pwdInputHint.innerHTML = "";
            pwdInputHint.append(incorrect);
            pwdInputHint.innerHTML += "Must contain at least one alphabet!";
        }
        else if (reNumber.exec(pwdInput.value) == null) {
            pwdInputHint.innerHTML = "";
            pwdInputHint.append(incorrect);
            pwdInputHint.innerHTML += "Must contain at least one number!";
        }
        else if (reSymbol.exec(pwdInput.value) == null) {
            pwdInputHint.innerHTML = "";
            pwdInputHint.append(incorrect);
            pwdInputHint.innerHTML += "Must contain at least one symbol!";
        }
        else if (reNonChineseChar.exec(pwdInput.value) == null) {
            pwdInputHint.innerHTML = "";
            pwdInputHint.append(incorrect);
            pwdInputHint.innerHTML += "Password mustn't contain Chinese any character!";
        }
        else {
            pwdInputHint.innerHTML = "";
            pwdInputHint.append(correct);
            pwdInputHint.innerHTML += "Valid password!";
        }
    });
}

//Email Validation
{
    const email = document.getElementById("email");
    const emailInputHint = document.getElementById("emailInputHint");
    const reEmail = /^([a-z0-9]+(?:\.?[a-z0-9_+]){5,})@([a-z0-9_]+(?:[.][a-z0-9_]{2,3})+)$/;

    email.oninput = (e) => {
        if (reEmail.exec(email.value) == null) {
            emailInputHint.innerHTML = "";
            emailInputHint.append(incorrect);
            emailInputHint.innerHTML += "Incorrect email address!";
        } else {
            emailInputHint.innerHTML = "";
            emailInputHint.append(correct);
            emailInputHint.innerHTML += "Valid email address!";
        }
    }


}

//Stars Evaluation
{
    const stars = document.getElementById("starsEval");
    const displayScore = document.createElement("p");
    displayScore.style.display = "hidden";
    let fiveStars = [new Image(), new Image(), new Image(), new Image(), new Image()];
    let score = -1;
    fiveStars.forEach(star => {
        star.src = "./Images/StarGray.png";
        star.width = 94;
        star.height = 92;
        star.draggable = false;
        star.score = fiveStars.indexOf(star);
        star.isCheck = false;
        star.isHalf = false;
        star.isHalfCheck = false;
        star.addEventListener("mousemove", (e => {
            for (let i = 0; i < fiveStars.length; i++) {
                if (i < star.score) {
                    fiveStars[i].src = "./Images/StarYellow.png";
                    fiveStars[i].isHalf = false;
                } else if (i == star.score) {
                    if (e.offsetX >= star.width / 2) {
                        star.src = "./Images/StarYellow.png";
                        star.isHalf = false;
                    } else {
                        star.src = "./Images/StarHalf.png";
                        star.isHalf = true;
                    }
                } else {
                    fiveStars[i].src = "./Images/StarGray.png";
                    fiveStars[i].isHalf = false;
                }
            }

        }));
        star.addEventListener("mouseleave", (e) => {
            for (let i = 0; i < fiveStars.length; i++) {
                fiveStars[i].isHalf = false;
                if (fiveStars[i].isHalfCheck == true) {
                    fiveStars[i].src = "./Images/StarHalf.png";
                } else if (fiveStars[i].isCheck == true) {
                    fiveStars[i].src = "./Images/StarYellow.png";
                } else {
                    fiveStars[i].src = "./Images/StarGray.png";
                }
            }
        });
        star.addEventListener("click", (e) => {
            for (let i = 0; i < fiveStars.length; i++) {
                if (i < star.score) {
                    fiveStars[i].isCheck = true;
                    fiveStars[i].isHalfCheck = false;
                } else if (i == star.score) {
                    if (fiveStars[i].isHalf == true) {
                        fiveStars[i].isCheck = false;
                        fiveStars[i].isHalfCheck = true;
                        score = star.score + 0.5;
                    } else {
                        fiveStars[i].isCheck = true;
                        fiveStars[i].isHalfCheck = false;
                        score = star.score + 1;
                    }
                } else {
                    fiveStars[i].isCheck = false;
                    fiveStars[i].isHalfCheck = false;
                }
            }
            displayScore.style.visibility = "visible";
            displayScore.innerHTML = score;
        });

        star.addEventListener("dblclick", function (e) {
            if (displayScore.style.visibility == "visible") {
                for (let i = 0; i < fiveStars.length; i++) {
                    fiveStars[i].isCheck = false;
                    fiveStars[i].isHalfCheck = false;
                }
                score = "";
                displayScore.style.visibility = "hidden";
                displayScore.innerHTML = score;
            } else {
                return;
            }
        });
        stars.append(star);
    });
    stars.append(displayScore);
}

//Slide
{
    //loading all the image files and keep it in the memory
    let images = [new Image(), new Image(), new Image(), new Image(), new Image()];
    images.forEach(image=>{
        let index = images.indexOf(image);
        if (index < 10){
            index = `0${index+1}`;
        }
        image.src=`./Images/slideShow/${index}.jpg`;
        image.className = "photo";
    });

    //images and linked url
    let photoes = [
        {
            img:images[0],
            url:"https://zh.wikipedia.org/wiki/%E8%89%BE%E9%80%A3%C2%B7%E8%91%89%E5%8D%A1"
        },
        {
            img:images[1],
            url:"https://zh.wikipedia.org/wiki/%E9%80%B2%E6%93%8A%E7%9A%84%E5%B7%A8%E4%BA%BA%E8%A7%92%E8%89%B2%E5%88%97%E8%A1%A8#%E7%B1%B3%E5%8D%A1%E8%8E%8E"
        },
        {
            img:images[2],
            url:"https://zh.wikipedia.org/wiki/%E9%80%B2%E6%93%8A%E7%9A%84%E5%B7%A8%E4%BA%BA%E8%A7%92%E8%89%B2%E5%88%97%E8%A1%A8#%E9%98%BF%E7%88%BE%E6%95%8F"
        },
        {
            img:images[3],
            url:"https://zh.wikipedia.org/wiki/%E9%80%B2%E6%93%8A%E7%9A%84%E5%B7%A8%E4%BA%BA%E8%A7%92%E8%89%B2%E5%88%97%E8%A1%A8#%E8%B2%9D%E7%88%BE%E6%89%98%E7%89%B9%C2%B7%E8%83%A1%E4%BD%9B"
        },
        {
            img:images[4],
            url:"https://www.youtube.com/watch?v=NS5pn6Y2L1s&ab_channel=Muse%E6%9C%A8%E6%A3%89%E8%8A%B1-TW"
        }
    ];
    
    //the main container of the slideshow
    const slide = document.getElementById("slide");
    slide.addEventListener("mouseover", function () {
        pause();
        pre.className = "pre_arrowHover";
        next.className = "next_arrowHover";
    });
    slide.addEventListener("mouseleave", function () {
        resume();
        pre.className = "arrow";
        next.className = "arrow";
    });
    slide.addEventListener("click",function(){
        if (moving == false) location.href = photoes[currentPhoto].url;
    });
    
    //pre and next buttons inside the "slide" container
    let pre = document.getElementById("pre");
    let next = document.getElementById("next");
    pre.addEventListener("mouseover", function () {
        pre.className = "pre_arrowHover";
        next.className = "next_arrowHover";
        pause();
    });
    next.addEventListener("mouseover", function () {
        pre.className = "pre_arrowHover";
        next.className = "next_arrowHover";
        pause();
    });
    pre.addEventListener("mouseleave", function () {
        pre.className = "arrow";
        next.className = "arrow";
        resume();
    });
    next.addEventListener("mouseleave", function () {
        pre.className = "arrow";
        next.className = "arrow";
        resume();
    });
    pre.addEventListener("click", prePhoto);
    next.addEventListener("click", nextPhoto);

    //white dots on the buttom of the slide container
    var swiper = document.getElementById("swiper");
    for (let i = 0; i < photoes.length; i++) {
        let dot = document.createElement("span");
        dot.className = "dot";
        swiper.append(dot);
    }
    
    //add the first image to the frame, which is the sub-container of the photo being displayed
    var frame = document.getElementById("frame");
    var framePos = 0;
    var currentPhoto = 0;
    var img = photoes[0].img;
    frame.append(img);
    let dot = document.querySelectorAll(".dot")[0]; //make the first dot white
    dot.className = "dotWhite";

    // timer is the time keeper, controling the "play" and "pause" of this slideshow
    var moving = false;
    var playing = true;
    var second = 0;
    var timer = setInterval(() => {
        if (playing) {
            second++;
        } else {

        }
        if (second == 3) {
            nextPhoto(); //turn to the next photo every 3 sec
        }
    }, 1000);

    function pause() {
        playing = false;
        btnPause.src = "./Images/btnPlay.png";
    }

    function resume() {
        playing = true;
        btnPause.src = "./Images/btnPause.png";
    }

    //handler for every "previous photo" behaviour, including the click on pre,
    //and the click on btnPre
    function prePhoto(e) {
        if (moving) return;
        moving = true;
        if (e != undefined) e.stopPropagation();
        if (currentPhoto - 1 < 0) {
            currentPhoto = photoes.length - 1;
        } else {
            currentPhoto = currentPhoto - 1;
        }
        let frame2 = document.createElement("div");
        frame2.id = "frame";
        frame2.className = "frame";
        framePos = -frame.offsetWidth;
        moveStyle = `transform:translate(${framePos}px)`;
        frame2.style = moveStyle;
        let preImg = photoes[currentPhoto].img
        frame2.append(preImg);
        slide.append(frame2);
        //photo moving animation
        var slidePre = setInterval(function () {
            if (framePos + 20 >= 0) {
                framePos = 0;
            } else {
                framePos += 20;
            }
            moveStyle = `transform:translate(${framePos}px)`;
            frame2.style = moveStyle;
            if (framePos >= 0) {
                document.querySelector(".dotWhite").className = "dot";
                document.querySelectorAll(".dot")[currentPhoto].className = "dotWhite";
                clearInterval(slidePre);
                second = 0;
                img.remove();
                frame.remove();
                frame = frame2;
                img = preImg;
                moving = false;
            }
        }, 10);
    }

    //handler for every "next photo" behaviour, including the click on next,
    //and the click on btnNext
    function nextPhoto(e) {
        if (moving) return;
        moving = true;
        if (e != undefined) e.stopPropagation();
        currentPhoto = (currentPhoto + 1) % photoes.length;
        let frame2 = document.createElement("div");
        frame2.id = "frame";
        frame2.className = "frame";
        framePos = frame.offsetWidth;
        moveStyle = `transform:translate(${framePos}px)`;
        frame2.style = moveStyle;
        let nextImg = photoes[currentPhoto].img;
        frame2.append(nextImg);
        slide.append(frame2);
        //photo moving animation
        var slideNext = setInterval(function () {
            if (framePos - 20 <= 0) {
                framePos = 0;
            } else {
                framePos -= 20;
            }
            moveStyle = `transform:translate(${framePos}px)`;
            frame2.style = moveStyle;
            if (framePos <= 0) {
                document.querySelector(".dotWhite").className = "dot";
                document.querySelectorAll(".dot")[currentPhoto].className = "dotWhite";
                next.addEventListener("click", nextPhoto, { once: true });
                clearInterval(slideNext);
                second = 0;
                img.remove();
                frame.remove();
                frame = frame2;
                img = nextImg;
                moving = false;
            }
        }, 10);
    }

    //media buttons, including skip next, pause and skip back buttons
    var btnPre = document.getElementById("btnPre");
    var btnPause = document.getElementById("btnPause");
    var btnNext = document.getElementById("btnNext");
    btnPre.addEventListener("click", prePhoto);
    btnNext.addEventListener("click", nextPhoto);
    btnPause.addEventListener("click", function(){
        if (playing){
            pause();
        }else{
            resume();
        }
    });
}


//Canvas
{
    class Football extends Image {
        constructor() {

            super();
            this.src = "./Images/footballCompressed.png";
            this.angle = 0;
            this.angularDirection = 1;
            this.X = 0;
            this.Y = 0;
            this.xDirecttion = 1;
            this.yDirecttion = 1;
            this.step2 = 5;
        }

        move(step) {
            if ((this.X + this.naturalWidth + step * this.xDirecttion) > body.offsetWidth) {
                this.xDirecttion = -Math.abs(this.xDirecttion);
            }
            else if ((this.X + step * this.xDirecttion) < 0) {
                this.xDirecttion = Math.abs(this.xDirecttion);
            }
            this.X += this.xDirecttion * step;
            if ((this.Y + this.naturalHeight + step * this.yDirecttion) > window.innerHeight + window.pageYOffset) {
                this.yDirecttion = -Math.abs(this.yDirecttion);
            }
            else if ((this.Y + step * this.yDirecttion) < window.pageYOffset) {
                this.yDirecttion = Math.abs(this.yDirecttion);
            }
            this.Y += this.yDirecttion * step;
        }

        rotate(degree) {

            this.angle += degree * this.angularDirection * (Math.PI / 180);
            if (this.angle >= Math.PI * 2) {

                this.angle -= Math.PI * 2;
            }
            if (this.angle <= -Math.PI * 2) {

                this.angle += Math.PI * 2;
            }
        }

        collision_detection(football) {

            var distanceX = this.X - football.X;
            var distanceY = this.Y - football.Y;

            if ((distanceX * distanceX + distanceY * distanceY) <= this.naturalWidth * this.naturalHeight) {
                this.xDirecttion = this.xDirecttion * (-1);
                this.yDirecttion = this.yDirecttion * (-1);
            }

        }
    }
    /**@type {HTMLCanvasElement} */
    var viewport = document.getElementById("viewport");
    var body = document.getElementsByTagName("body")[0];
    var wrapper = document.getElementById("wrapper");
    
    window.addEventListener("load", function (e) {
        viewport.style.height = body.offsetHeight + "px";
    });
    viewport.style.height = body.offsetHeight + "px";
    window.addEventListener("resize", function (e) {
        viewport.style.height = body.offsetHeight + "px";
    });
    

    /** @type {CanvasRenderingContext2D} */
    var ctx = viewport.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'low';

    var footballs = [];

    var football1 = new Football();
    football1.angularDirection = 2;
    footballs.push(football1);
    var football2 = new Football();
    football2.X = body.offsetWidth - football2.naturalWidth;
    football2.xDirecttion = 2;
    football2.yDirecttion = 2;
    football2.angularDirection = -1;
    footballs.push(football2);

    var mainloop = setInterval(function (e) {
        ctx.canvas.width = body.offsetWidth;
        ctx.canvas.height = body.offsetHeight;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        footballs.forEach(football => {
            football.move(5);
            football.rotate(5);
            ctx.translate(football.X + football.naturalWidth / 2, football.Y + football.naturalHeight / 2);
            ctx.rotate(football.angle);
            ctx.translate(-(football.X + football.naturalWidth / 2), -(football.Y + football.naturalHeight / 2));
            ctx.drawImage(football, football.X, football.Y, football.naturalWidth, football.naturalHeight);
            ctx.setTransform(1, 0, 0, 1, 0, 0);//why???
        });

    }, 1000 / 30);
}