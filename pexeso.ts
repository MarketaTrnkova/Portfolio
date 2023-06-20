class Karta{
    predniStranaSrc: string | null;
    zadniStranaSrc: string;
    img: HTMLImageElement;
    imgId: number | null;
    otocena: boolean;
    hra: Hra

    constructor(img: HTMLImageElement, hra: Hra){
        this.predniStranaSrc = null;
        this.zadniStranaSrc = "img/zadni-strana.png";
        this.img = img /* querry selector konkrétního img elementu obrázku karty */;
        this.imgId = null;
        this.otocena = false;
        this.hra = hra;
        
        this.otocKartu();
        
        this.img.addEventListener("click", (event) => {
            this.otocKartu();
        });
    }

    otocKartu(): void{
        if (!this.otocena)
        {
            if(this.hra.otoceneKarty.length <= 1)
            {
                this.img.src = this.predniStranaSrc;
                this.otocena = true;
                this.hra.otoceneKarty.push(this);
                if(this.hra.otoceneKarty.length === 2 && this.hra.otoceneKarty[0].predniStranaSrc.substring(4, 5) == this.hra.otoceneKarty[1].predniStranaSrc.substring(4, 5))
                {
                    setTimeout(() => {
                        this.hra.otoceneKarty[0].img.style.opacity = 0.5;
                        this.hra.otoceneKarty[1].img.style.opacity = 0.5;
                        this.hra.otoceneKarty = [];
                        if (this.hra.aktualniHrac == "hrac1"){
                            this.hra.hrac1 += +1;
                            this.hra.scoreSpan1.innerHTML = `${this.hra.hrac1jmeno}: ${this.hra.hrac1}`;
                            if(this.hra.hrac1 + this.hra.hrac2 == 8){
                                this.hra.vypisViteze();
                            }
                        }
                        else if(this.hra.aktualniHrac == "hrac2"){
                            this.hra.hrac2 += +1;
                            this.hra.scoreSpan2.innerHTML = `${this.hra.hrac2jmeno}: ${this.hra.hrac2}`;
                            if(this.hra.hrac1 + this.hra.hrac2 == 8){
                                this.hra.vypisViteze();
                            }
                        }
                    }, 1500);
                }
                else if (this.hra.otoceneKarty.length === 2 && this.hra.otoceneKarty[0].predniStranaSrc.substring(4, 5) != this.hra.otoceneKarty[1].predniStranaSrc.substring(4, 5))
                {
                    setTimeout(() =>{
                        this.hra.otoceneKarty[0].img.src =  this.hra.otoceneKarty[0].zadniStranaSrc;
                        this.hra.otoceneKarty[0].otocena = false;
                        this.hra.otoceneKarty[1].img.src = this.hra.otoceneKarty[1].zadniStranaSrc;
                        this.hra.otoceneKarty[1].otocena = false;
                        this.hra.otoceneKarty = [];
                        if (this.hra.aktualniHrac == "hrac1")
                        {
                            this.hra.aktualniHrac = "hrac2";
                            this.hra.scoreSpan2.style.fontWeight = "bold";
                            this.hra.scoreSpan1.style.fontWeight = "normal";
                            alert(`Na tahu je hráč: ${this.hra.hrac2jmeno} `);
                        }
                        else if (this.hra.aktualniHrac == "hrac2")
                        {
                                this.hra.aktualniHrac = "hrac1";
                                this.hra.scoreSpan1.style.fontWeight = "bold";
                                this.hra.scoreSpan2.style.fontWeight = "normal";
                                alert(`Na tahu je hráč ${this.hra.hrac1jmeno}`);
                        };
                        }, 1500);
                }
            }
        }
    }

}

 
class Hra{
    otoceneKarty: string[];
    hraciPole: HTMLDivElement;
    pocetOtocenychKaret: null | number;
    modalOkno: HTMLDivElement;
    modalOknoZavrit: HTMLSpanElement;
    modalOknoHratZnovu: HTMLButtonElement;
    modalOknoText: HTMLParagraphElement;
    hrac1: number;
    hrac2: number;
    aktualniHrac: string;
    hraciKartyObrazky: string[];
    zamichaneHraciKartyObrazky: string[];
    kartyNaHraciPlose: string[];
    scoreSpan1: HTMLSpanElement;
    scoreSpan2: HTMLSpanElement;


   zamichejKarty = (): void =>
    {
        this.hraciKartyObrazky = ["img/1.png",  "img/1-kopie.png", "img/2.png",  "img/2-kopie.png", "img/3.png",  "img/3-kopie.png", "img/4.png",  "img/4-kopie.png", "img/5.png",  "img/5-kopie.png", "img/6.png",  "img/6-kopie.png", "img/7.png",  "img/7-kopie.png", "img/8.png",  "img/8-kopie.png"];
        this.zamichaneHraciKartyObrazky = [];
        this.kartyNaHraciPlose = [];

        let pocetHracichKaret = this.hraciKartyObrazky.length;
        
        for (let i = 0; i < pocetHracichKaret; i++)
        {
        let nahodnyIndex = Math.floor(Math.random() * this.hraciKartyObrazky.length);
        this.zamichaneHraciKartyObrazky.push(this.hraciKartyObrazky[nahodnyIndex]);
        this.hraciKartyObrazky.splice(nahodnyIndex, 1);
        };
    };

    rozdejKarty = (): void =>
    {
        for (let a = 0; a < this.zamichaneHraciKartyObrazky.length; a++)
        {
        let imgElement = document.createElement("img");
        let karta = new Karta(imgElement, this);
        karta.predniStranaSrc = this.zamichaneHraciKartyObrazky[a];
        karta.zadniStranaSrc = "img/zadni-strana.png";
        karta.imgElement = imgElement;
        karta.imgId = a;
        imgElement.src = "img/zadni-strana.png";
        imgElement.classList.add("karty");
        imgElement.setAttribute("id", a)
        this.hraciPole.appendChild(imgElement);

        this.kartyNaHraciPlose.push(karta);
        }
    };

    zavritModalOkno = (): void =>{
        this.modalOkno.style.display = "none";
    };

    vypisViteze = (): void =>{
        if (this.hrac1 + this.hrac2 == 8){
            if(this.hrac1 > this.hrac2){
                this.modalOknoText.innerHTML = `Vítězem je hráč ${this.hrac1jmeno} `
                this.modalOkno.style.display = "block";
            } else if (this.hrac2 > this.hrac1){
                this.modalOknoText.innerHTML = `Vítězem je hráč ${this.hrac2jmeno} `
                this.modalOkno.style.display = "block";
            } else if (this.hrac1 == this.hrac2){
                this.modalOknoText.innerHTML = `Hra skončila remízou, zkuste to znovu a zjistěte, kdo se stane vítězem!`
                this.modalOkno.style.display = "block";
            };
        };
    };

    vymazImgzPredchoziHry = ():void =>{
        let images = document.querySelectorAll(".karty");
        for(let i = 0; i < images.length; i++){
            images[i].remove()
        }
    };

    hratZnovu = (): void =>{
        this.hrac1 = 0;
        this.hrac2 = 0;
        this.otoceneKarty = [];
        this.pocetOtocenychKaret = null;
        this.zacitHru();
        this.zavritModalOkno();
    };

    constructor(){
        this.otoceneKarty = [];
        this.hraciPole = document.querySelector("#hraci-pole");
        this.pocetOtocenychKaret = null;
        this.modalOkno = document.querySelector(".modal");
        this.modalOknoZavrit = document.querySelector(".close");
        this.modalOknoHratZnovu = document.querySelector(".btn");
        this.modalOknoText = document.querySelector(".modal-text");
        this.hrac1 = 0;
        this.hrac2 = 0;
        
        this.modalOknoZavrit.addEventListener("click", () =>{
            this.zavritModalOkno()
        });

        this.modalOknoHratZnovu.addEventListener("click", () =>{
            this.hratZnovu()});

        this.vytvorScore = () =>{
            this.scoreSpan1.setAttribute("id", "hrac1");
            this.scoreSpan2.setAttribute("id", "hrac2");
            this.hraciPole.appendChild(this.scoreSpan1);
            this.hraciPole.appendChild(this.scoreSpan2);
            this.scoreSpan1.innerHTML = `${this.hrac1jmeno}: ${this.hrac1}`;
            this.scoreSpan2.innerHTML = `${this.hrac2jmeno}: ${this.hrac2}`;
            alert(`Na tahu je hráč: ${this.hrac1jmeno}`);
        };

        this.naplnJmenaHracu();
        this.zacitHru = () =>
        {
            this.vymazImgzPredchoziHry();
            this.zamichejKarty();
            this.rozdejKarty();
            this.naplnJmenaHracu();
            this.vytvorScore();
            this.vypisViteze();
        };
    
        this.zacitHru();

    }

};

let hra = new Hra()


