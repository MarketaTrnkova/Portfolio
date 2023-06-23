class Karta {
    predniStranaSrc: string;
    zadniStranaSrc: string;
    img: HTMLImageElement;
    imgElement?: HTMLImageElement;
    imgId: number;
    otocena: boolean;
    hra: Hra;
    test?: string;
    
    constructor(img: HTMLImageElement, hra: Hra) {
        this.predniStranaSrc = '';
        this.zadniStranaSrc = 'img/zadni-strana.png';
        this.img = img;
        this.imgId = 0;
        this.otocena = false;
        this.hra = hra;

        this.otocKartu();

        this.img.addEventListener("click", () => {
            this.otocKartu();
        });
    }

    otocKartu(): void {
        if (!this.otocena) {
            if (this.hra.otoceneKarty.length <= 1) {
                this.img.src = this.predniStranaSrc;
                this.otocena = true;
                this.hra.otoceneKarty.push(this);

                if (this.hra.otoceneKarty.length === 2 && this.hra.otoceneKarty[0].predniStranaSrc.substring(4, 5) === this.hra.otoceneKarty[1].predniStranaSrc.substring(4, 5)) {
                    setTimeout(() => {
                        this.hra.otoceneKarty[0].img.style.opacity = '0.5';
                        this.hra.otoceneKarty[1].img.style.opacity = '0.5';
                        this.hra.otoceneKarty = [];

                        if (this.hra.aktualniHrac === "hrac1" && this.hra.scoreSpan1 && this.hra.scoreSpan2) {
                            this.hra.hrac1 += 1;
                            this.hra.scoreSpan1.innerHTML = `${this.hra.hrac1jmeno}`;

                            if (this.hra.hrac1 + this.hra.hrac2 === 8) {
                                this.hra.vypisViteze();
                            }
                        } else if (this.hra.aktualniHrac === "hrac2" && this.hra.scoreSpan1 && this.hra.scoreSpan2) {
                            this.hra.hrac2 += 1;
                            this.hra.scoreSpan2.innerHTML = `${this.hra.hrac2jmeno}`;

                            if (this.hra.hrac1 + this.hra.hrac2 === 8) {
                                this.hra.vypisViteze();
                            }
                        }
                    }, 1500);
                } else if (this.hra.otoceneKarty.length === 2 && this.hra.otoceneKarty[0].predniStranaSrc.substring(4, 5) !== this.hra.otoceneKarty[1].predniStranaSrc.substring(4, 5)) {
                    setTimeout(() => {
                        this.hra.otoceneKarty[0].img.src = this.hra.otoceneKarty[0].zadniStranaSrc;
                        this.hra.otoceneKarty[0].otocena = false;
                        this.hra.otoceneKarty[1].img.src = this.hra.otoceneKarty[1].zadniStranaSrc;
                        this.hra.otoceneKarty[1].otocena = false;
                        this.hra.otoceneKarty = [];

                        if (this.hra.aktualniHrac === "hrac1" && this.hra.scoreSpan1 && this.hra.scoreSpan2) {
                            this.hra.aktualniHrac = "hrac2";
                            this.hra.scoreSpan2.style.fontWeight = "bold";
                            this.hra.scoreSpan1.style.fontWeight = "normal";
                            alert(`Na tahu je hráč: ${this.hra.hrac2jmeno}`);
                        } else if (this.hra.aktualniHrac === "hrac2" && this.hra.scoreSpan1 && this.hra.scoreSpan2) {
                            this.hra.aktualniHrac = "hrac1";
                            this.hra.scoreSpan1.style.fontWeight = "bold";
                            this.hra.scoreSpan2.style.fontWeight = "normal";
                            alert(`Na tahu je hráč ${this.hra.hrac1jmeno}`);
                        }
                    }, 1500);
                }
            }
        }
    }
}

class Hra {
    otoceneKarty: Karta[];
    hraciPole: HTMLElement;
    pocetOtocenychKaret: number | null;
    modalOkno: HTMLElement;
    modalOknoZavrit: HTMLElement;
    modalOknoHratZnovu: HTMLElement;
    modalOknoText: HTMLElement;
    hrac1: number;
    hrac1jmeno: string | null;
    hrac2: number;
    hrac2jmeno: string | null;
    aktualniHrac: string;
    hraciKartyObrazky: string[];
    zamichaneHraciKartyObrazky: string[];
    kartyNaHraciPlose: Karta[];
    scoreSpan1: HTMLSpanElement | undefined;
    scoreSpan2: HTMLSpanElement | undefined;


    constructor() {
        this.otoceneKarty = [];
        this.hraciPole = document.querySelector("#hraci-pole")!;
        this.pocetOtocenychKaret = null;
        this.modalOkno = document.querySelector(".modal")!;
        this.modalOknoZavrit = document.querySelector(".close")!;
        this.modalOknoHratZnovu = document.querySelector(".btn")!;
        this.modalOknoText = document.querySelector(".modal-text")!;
        this.hrac1 = 0;
        this.hrac2 = 0;
        this.hrac1jmeno = null;
        this.hrac2jmeno = null;
        this.aktualniHrac = "hrac1";
        this.hraciKartyObrazky= [];
        this.zamichaneHraciKartyObrazky= [];
        this.kartyNaHraciPlose= [];


        this.modalOknoZavrit.addEventListener("click", () => {
            this.zavritModalOkno();
        });

        this.modalOknoHratZnovu.addEventListener("click", () => {
            this.hratZnovu();
        });

        this.zacitHru();
    }

    vytvorScore(): void {
        this.scoreSpan1 = document.createElement("span");
        this.scoreSpan2 = document.createElement("span");

        this.scoreSpan1.classList.add("score");
        this.scoreSpan2.classList.add("score");

        this.scoreSpan1.innerHTML = `${this.hrac1jmeno}: ${this.hrac1}`;
        this.scoreSpan2.innerHTML = `${this.hrac2jmeno}: ${this.hrac2}`;

        let hraciPoleElement = document.querySelector("#hraci-pole")!;
        hraciPoleElement.parentNode!.insertBefore(this.scoreSpan1, hraciPoleElement.nextSibling);
        hraciPoleElement.parentNode!.insertBefore(this.scoreSpan2, hraciPoleElement.nextSibling);
    };

    zamichejKarty(): void {
        this.hraciKartyObrazky = [
            "img/1.png", "img/1-kopie.png", "img/2.png", "img/2-kopie.png",
            "img/3.png", "img/3-kopie.png", "img/4.png", "img/4-kopie.png",
            "img/5.png", "img/5-kopie.png", "img/6.png", "img/6-kopie.png",
            "img/7.png", "img/7-kopie.png", "img/8.png", "img/8-kopie.png"
        ];
        this.zamichaneHraciKartyObrazky = [];
        this.kartyNaHraciPlose = [];

        let pocetHracichKaret = this.hraciKartyObrazky.length;

        for (let i = 0; i < pocetHracichKaret; i++) {
            let nahodnyIndex = Math.floor(Math.random() * this.hraciKartyObrazky.length);
            this.zamichaneHraciKartyObrazky.push(this.hraciKartyObrazky[nahodnyIndex]);
            this.hraciKartyObrazky.splice(nahodnyIndex, 1);
        }
    }

    rozdejKarty(): void {
        for (let a = 0; a < this.zamichaneHraciKartyObrazky.length; a++) {
            let imgElement = document.createElement("img");
            let karta = new Karta(imgElement, this);
            karta.predniStranaSrc = this.zamichaneHraciKartyObrazky[a];
            karta.zadniStranaSrc = "img/zadni-strana.png";
            karta.imgElement = imgElement;
            karta.imgId = a;
            imgElement.src = "img/zadni-strana.png";
            imgElement.classList.add("karty");
            imgElement.setAttribute("id", a.toString());
            this.hraciPole.appendChild(imgElement);

            this.kartyNaHraciPlose.push(karta);
        }
    }

    zavritModalOkno(): void {
        this.modalOkno.style.display = "none";
    }

    vypisViteze(): void {
        if (this.hrac1 + this.hrac2 === 8) {
            if (this.hrac1 > this.hrac2) {
                this.modalOknoText.innerHTML = `Vítězem je hráč ${this.hrac1jmeno}`;
                this.modalOkno.style.display = "block";
            } else if (this.hrac2 > this.hrac1) {
                this.modalOknoText.innerHTML = `Vítězem je hráč ${this.hrac2jmeno}`;
                this.modalOkno.style.display = "block";
            } else if (this.hrac1 === this.hrac2) {
                this.modalOknoText.innerHTML = "Hra skončila remízou, zkuste to znovu a zjistěte, kdo se stane vítězem!";
                this.modalOkno.style.display = "block";
            }
        }
    }

    vymazImgzPredchoziHry(): void {
        let images = document.querySelectorAll(".karty");
        for (let i = 0; i < images.length; i++) {
            images[i].remove();
        }
    }

    hratZnovu(): void {
        this.hrac1 = 0;
        this.hrac2 = 0;
        this.otoceneKarty = [];
        this.pocetOtocenychKaret = null;
        this.zacitHru();
        this.zavritModalOkno();
    }

    zacitHru(): void {
        this.vymazImgzPredchoziHry();
        this.vytvorScore();
        this.zamichejKarty();
        this.rozdejKarty();
        this.vypisViteze();
    }

}

new Hra();
