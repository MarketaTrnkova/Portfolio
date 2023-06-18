const aboutMeNav = document.querySelector("#about_me_nav")
let homeNav = document.querySelector("#home_nav")
let skillsNav = document.querySelector("#skills_nav")
let portfolioNav = document.querySelector("#portfolio_nav")
let contactNav = document.querySelector("#contact_nav")
const aboutMeSection = document.querySelector("#aboutMeSection")
let nav = document.querySelector("#header_container")
let moreInfoBtn = document.querySelector(".main_sidebar_1")
let portfolioBtn = document.querySelector(".main_sidebar_2")
let hamburgerMenu = document.querySelector("#hamburgerMenu")
let navUl = document.querySelector(".nav_ul")
let pictures = document.querySelectorAll(".picture")
let slideGrafic = document.querySelector(".slide_grafic")
let body = document.querySelector("body")
let about_me_photo = "img/about_me.jpg"




/* scrolování na stránce, odkazování na stránce */
let scrolling = function(target){
    event.preventDefault();
    let scrollingTarget = (target.offsetTop) - (nav.offsetHeight);
    window.scrollTo(0,scrollingTarget);
    hamburgerMenu.click();
}

/* haburger menu - přepínání */
hamburgerMenu.addEventListener("click", function(event){
    navUl.classList.toggle("show");
    if (hamburgerMenu.getAttribute("src") == "img/hamburgerMenu.png"){
        hamburgerMenu.setAttribute("src", "img/crossMenu.png");
    } else if (hamburgerMenu.getAttribute("src") ==  "img/crossMenu.png"){       
        hamburgerMenu.setAttribute("src", "img/hamburgerMenu.png");
}})


/* změna barevného režimu */
let switchColorTheme = function(){
    if (body.classList.contains("dark_theme")) {
        theme_btn.setAttribute("src", "img/dark_theme_moon.svg");
        body.classList.remove("dark_theme")
    } else {
        body.classList.add("dark_theme");
        theme_btn.setAttribute("src", "img/theme_btn.svg");
    }
}

theme_btn.addEventListener("click", function(event){
    switchColorTheme()
})


/* stažení CV */
cv.addEventListener("click", function(event){ 
})

homeNav.addEventListener("click", function(event){
    let target = document.querySelector("#home");
    scrolling(target)
})

aboutMeNav.addEventListener("click", function(event){
    let target = document.querySelector("#aboutMe");
    scrolling(target)
})

skillsNav.addEventListener("click", function(event){
    let target = document.querySelector("#skills");
    scrolling(target)
})

portfolioNav.addEventListener("click", function(event){
    let target = document.querySelector("#portfolio");
    scrolling(target)
})

contactNav.addEventListener("click", function(event){
    let target = document.querySelector("#contact");
    scrolling(target)
})

/* navigace při scrollování */
window.addEventListener('scroll', function() {
    if (window.scrollY > 0){
    header.style.boxShadow = "2px 3px 3px rgba(116, 116, 116, 0.2)"
    } else {
        header.style.boxShadow = "none"
    }
})


/* CAROUSEL */
let slide=document.querySelector(".slide")
let imagesArray = ["img/responzivni_design.png","img/casopis.png", "img/responzivni_design_pexeso.png","img/Kapina.png","img/blecha.png",]
let backBtn = document.querySelector("#back")
let nextBtn = document.querySelector("#next")
let img1 = document.querySelector("#img1")

let carouselGrafic = []
let num=0

let presmerovaniZCursoru = (img)=>{
    img.style.cursor = "pointer";
    if (img.src.includes("img/responzivni_design.png")){
        window.location.href ="kalkulacka/kalkulacka.html";
    }else if (img.src.includes("img/casopis.png")){
        window.open("https://online.fliphtml5.com/sonoq/ceww/");
    }else if (img.src.includes("img/responzivni_design_pexeso.png")){
        window.open("pexeso/pexeso.html");
    }else if (img.src.includes("img/Kapina.png")){
        window.location.href ="img/kapina_site.png";
    }else if (img.src.includes("img/blecha.png")){
        window.location.href ="img/blecha.png";
    }
}


//Přesměrování na odkazy v caruselu
img1.addEventListener("click", (event)=>{
    presmerovaniZCursoru(img1);
})
img2.addEventListener("click", (event)=>{
    presmerovaniZCursoru(img2);
})
img3.addEventListener("click", (event)=>{
    presmerovaniZCursoru(img3);
})


//přesměrování na odkazy kliknutím na tlačítko v caruselu
let otevreniOdkazuZCarouselu = () =>{
    let ClassNameLong = event.target.className;
    let ClassNamePic = ClassNameLong.substring(4);
    if (ClassNamePic === "pic1"){
        presmerovaniZCursoru(img1)
    } else if (ClassNamePic === "pic2"){
        presmerovaniZCursoru(img2)
    } else if(ClassNamePic === "pic3"){
        presmerovaniZCursoru(img3)
    }
}

btn1.addEventListener("click", (event)=>{
    otevreniOdkazuZCarouselu()
})

btn2.addEventListener("click", (event)=>{
    console.log("asdasda")
    otevreniOdkazuZCarouselu()
})

btn3.addEventListener("click", (event)=>{
    otevreniOdkazuZCarouselu()
})

  


//grafika pod carouselem
let makeCarouselGrafic = function(){
    for(let i=0; i < imagesArray.length; i++){
        let newDiv = document.createElement("div");
        newDiv.classList.add("carousel_grafic");
        newDiv.setAttribute("id", `slide${i}`)
        slideGrafic.appendChild(newDiv);
        carouselGrafic.push(newDiv);
    }
}

makeCarouselGrafic()
carouselGrafic[0].classList.add("active_slide")//zvýrazní mi první kuličku caruselové grafiky

nextBtn.addEventListener("click", function(event){
        num++;
        let prvniPrvek = imagesArray.shift(); 
        imagesArray.push(prvniPrvek); 
        if (num >=0 && num < imagesArray.length){
            carouselGrafic[num].classList.add("active_slide");
            carouselGrafic[num-1].classList.remove("active_slide");
        } else if (num = imagesArray.length-1){
            num = 0
            carouselGrafic[num].classList.add("active_slide");
            carouselGrafic[imagesArray.length-1].classList.remove("active_slide");
        }

        // funkce na animaci carouselu
        pictures.forEach(function(picture) { 
            picture.style.opacity = "0.5";
            picture.style.transform = "translateX(-2%)";
            picture.style.transition = "opacity .2s ease-out, transform .4s ease-out";
            setTimeout(function(){ // funkce, která se spustí po uplyutí časového limitu 300ms
                picture.style.transform = "translateX(0)";
                picture.style.opacity="1";
                picture.style.transition="transform .3s ease-out, opacity .2s ease-out";
                img1.src = imagesArray[0];
                img2.src = imagesArray[1];
                img3.src = imagesArray[2];
            }, 300);
        })
 })
    
backBtn.addEventListener("click", function(event){
    let posledniPrvek = imagesArray.pop();
    imagesArray.unshift(posledniPrvek); 
    num--;
    if(num < 0){
        num=imagesArray.length-1;
        carouselGrafic[0].classList.remove("active_slide");
        carouselGrafic[num].classList.add("active_slide");
    }
    else{
        carouselGrafic[num+1].classList.remove("active_slide");
        carouselGrafic[num].classList.add("active_slide");
    }


    // funkce na animaci carouselu
    pictures.forEach(function(picture) { 
        picture.style.opacity = "0.5";
        picture.style.transform = "translateX(2%)";
        picture.style.transition = "opacity .2s ease-out, transform .4s ease-out";
        setTimeout(function(){ // funkce, která se spustí po uplyutí časového limitu 300ms
            picture.style.transform = "translateX(0)";
            picture.style.opacity="1";
            picture.style.transition="transform .3s ease-out, opacity .2s ease-out";
            img1.src = imagesArray[0];
            img2.src = imagesArray[1];
            img3.src = imagesArray[2];
        }, 300);
    })
})

