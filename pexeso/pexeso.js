var Karta = /** @class */ (function () {
    function Karta(img, hra) {
        var _this = this;
        this.predniStranaSrc = '';
        this.zadniStranaSrc = 'img/zadni-strana.png';
        this.img = img;
        this.imgId = 0;
        this.otocena = false;
        this.hra = hra;
        this.img.addEventListener("click", function () {
            _this.otocKartu();
        });
    }
    Karta.prototype.otocKartu = function () {
        var _this = this;
        if (!this.otocena) {
            if (this.hra.otoceneKarty.length <= 1) {
                this.img.src = this.predniStranaSrc;
                this.otocena = true;
                this.hra.otoceneKarty.push(this);
                if (this.hra.otoceneKarty.length === 2 && this.hra.otoceneKarty[0].predniStranaSrc.substring(4, 5) === this.hra.otoceneKarty[1].predniStranaSrc.substring(4, 5)) {
                    setTimeout(function () {
                        _this.hra.otoceneKarty[0].img.style.opacity = '0.5';
                        _this.hra.otoceneKarty[1].img.style.opacity = '0.5';
                        _this.hra.otoceneKarty = [];
                        if (_this.hra.aktualniHrac === "hrac1" && _this.hra.scoreSpan1 && _this.hra.scoreSpan2) {
                            _this.hra.hrac1 += 1;
                            _this.hra.scoreSpan1.innerHTML = "".concat(_this.hra.hrac1);
                            if (_this.hra.hrac1 + _this.hra.hrac2 === 8) {
                                _this.hra.vypisViteze();
                            }
                        }
                        else if (_this.hra.aktualniHrac === "hrac2" && _this.hra.scoreSpan1 && _this.hra.scoreSpan2) {
                            _this.hra.hrac2 += 1;
                            _this.hra.scoreSpan2.innerHTML = "".concat(_this.hra.hrac2);
                            if (_this.hra.hrac1 + _this.hra.hrac2 === 8) {
                                _this.hra.vypisViteze();
                            }
                        }
                    }, 1200);
                }
                else if (this.hra.otoceneKarty.length === 2 && this.hra.otoceneKarty[0].predniStranaSrc.substring(4, 5) !== this.hra.otoceneKarty[1].predniStranaSrc.substring(4, 5)) {
                    setTimeout(function () {
                        _this.hra.otoceneKarty[0].img.src = _this.hra.otoceneKarty[0].zadniStranaSrc;
                        _this.hra.otoceneKarty[0].otocena = false;
                        _this.hra.otoceneKarty[1].img.src = _this.hra.otoceneKarty[1].zadniStranaSrc;
                        _this.hra.otoceneKarty[1].otocena = false;
                        _this.hra.otoceneKarty = [];
                        if (_this.hra.aktualniHrac === "hrac1" && _this.hra.scoreSpan1 && _this.hra.scoreSpan2) {
                            _this.hra.aktualniHrac = "hrac2";
                            _this.hra.hrac2score.classList.add("aktivniHrac2");
                            _this.hra.hrac1score.classList.remove("aktivniHrac1");
                        }
                        else if (_this.hra.aktualniHrac === "hrac2" && _this.hra.scoreSpan1 && _this.hra.scoreSpan2) {
                            _this.hra.aktualniHrac = "hrac1";
                            _this.hra.hrac1score.classList.add("aktivniHrac1");
                            _this.hra.hrac2score.classList.remove("aktivniHrac2");
                        }
                    }, 1200);
                }
            }
        }
    };
    ;
    return Karta;
}());
var Hra = /** @class */ (function () {
    function Hra() {
        var _this = this;
        this.otoceneKarty = [];
        this.hraciPole = document.querySelector("#hraci-pole");
        this.pocetOtocenychKaret = null;
        this.modalOkno = document.querySelector(".modal");
        this.modalOknoZavrit = document.querySelector(".close");
        this.modalOknoHratZnovu = document.querySelector(".btn");
        this.modalOknoText = document.querySelector(".modal-text");
        this.hrac1 = 0;
        this.hrac2 = 0;
        this.hrac1score = document.querySelector("#hrac1score");
        this.hrac2score = document.querySelector("#hrac2score");
        this.aktualniHrac = "hrac1";
        this.hraciKartyObrazky = [];
        this.zamichaneHraciKartyObrazky = [];
        this.kartyNaHraciPlose = [];
        this.modalOknoZavrit.addEventListener("click", function () {
            _this.zavritModalOkno();
        });
        this.modalOknoHratZnovu.addEventListener("click", function () {
            _this.hratZnovu();
        });
        this.zacitHru();
    }
    Hra.prototype.vytvorScore = function () {
        this.scoreSpan1 = document.createElement("span");
        this.scoreSpan2 = document.createElement("span");
        this.scoreSpan1.classList.add("score");
        this.scoreSpan2.classList.add("score");
        this.scoreSpan1.innerHTML = "".concat(this.hrac2);
        this.scoreSpan2.innerHTML = "".concat(this.hrac2);
        var hrac1score = document.querySelector("#hrac1score");
        var hrac2score = document.querySelector("#hrac2score");
        hrac1score.appendChild(this.scoreSpan1);
        hrac2score.appendChild(this.scoreSpan2);
    };
    ;
    Hra.prototype.zamichejKarty = function () {
        this.hraciKartyObrazky =
            [
                "img/1.png", "img/1-kopie.png", "img/2.png", "img/2-kopie.png",
                "img/3.png", "img/3-kopie.png", "img/4.png", "img/4-kopie.png",
                "img/5.png", "img/5-kopie.png", "img/6.png", "img/6-kopie.png",
                "img/7.png", "img/7-kopie.png", "img/8.png", "img/8-kopie.png"
            ];
        this.zamichaneHraciKartyObrazky = [];
        this.kartyNaHraciPlose = [];
        var pocetHracichKaret = this.hraciKartyObrazky.length;
        for (var i = 0; i < pocetHracichKaret; i++) {
            var nahodnyIndex = Math.floor(Math.random() * this.hraciKartyObrazky.length);
            this.zamichaneHraciKartyObrazky.push(this.hraciKartyObrazky[nahodnyIndex]);
            this.hraciKartyObrazky.splice(nahodnyIndex, 1);
        }
    };
    ;
    Hra.prototype.rozdejKarty = function () {
        for (var a = 0; a < this.zamichaneHraciKartyObrazky.length; a++) {
            var imgElement = document.createElement("img");
            var karta = new Karta(imgElement, this);
            this.hraciPole = document.querySelector("#hraci-pole");
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
    };
    ;
    Hra.prototype.zavritModalOkno = function () {
        this.modalOkno.style.display = "none";
    };
    ;
    Hra.prototype.vypisViteze = function () {
        if (this.hrac1 + this.hrac2 === 8) {
            if (this.hrac1 > this.hrac2) {
                this.modalOknoText.innerHTML = "V\u00EDt\u011Bzem je hr\u00E1\u010D 1";
                this.modalOkno.style.display = "block";
            }
            else if (this.hrac2 > this.hrac1) {
                this.modalOknoText.innerHTML = "V\u00EDt\u011Bzem je hr\u00E1\u010D 2";
                this.modalOkno.style.display = "block";
            }
            else if (this.hrac1 === this.hrac2) {
                this.modalOknoText.innerHTML = "Hra skončila remízou, zkuste to znovu a zjistěte, kdo se stane vítězem!";
                this.modalOkno.style.display = "block";
            }
        }
    };
    ;
    Hra.prototype.vymazImgzPredchoziHry = function () {
        var images = document.querySelectorAll(".karty");
        for (var i = 0; i < images.length; i++) {
            images[i].remove();
        }
    };
    ;
    Hra.prototype.hratZnovu = function () {
        this.hrac1 = 0;
        this.hrac2 = 0;
        this.otoceneKarty = [];
        this.pocetOtocenychKaret = null;
        this.zacitHru();
        this.zavritModalOkno();
    };
    ;
    Hra.prototype.zacitHru = function () {
        this.vymazImgzPredchoziHry();
        this.vytvorScore();
        this.zamichejKarty();
        this.rozdejKarty();
        this.vypisViteze();
    };
    ;
    return Hra;
}());
new Hra();
