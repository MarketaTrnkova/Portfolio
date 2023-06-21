var Karta = /** @class */ (function () {
    function Karta(img, hra) {
        var _this = this;
        this.predniStranaSrc = null;
        this.zadniStranaSrc = "img/zadni-strana.png";
        this.img = img /* querry selector konkrétního img elementu obrázku karty */;
        this.imgId = null;
        this.otocena = false;
        this.hra = hra;
        this.otocKartu();
        this.img.addEventListener("click", function (event) {
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
                if (this.hra.otoceneKarty.length === 2 && this.hra.otoceneKarty[0].predniStranaSrc.substring(4, 5) == this.hra.otoceneKarty[1].predniStranaSrc.substring(4, 5)) {
                    setTimeout(function () {
                        _this.hra.otoceneKarty[0].img.style.opacity = 0.5;
                        _this.hra.otoceneKarty[1].img.style.opacity = 0.5;
                        _this.hra.otoceneKarty = [];
                        if (_this.hra.aktualniHrac == "hrac1") {
                            _this.hra.hrac1 += +1;
                            _this.hra.scoreSpan1.innerHTML = "".concat(_this.hra.hrac1jmeno, ": ").concat(_this.hra.hrac1);
                            if (_this.hra.hrac1 + _this.hra.hrac2 == 8) {
                                _this.hra.vypisViteze();
                            }
                        }
                        else if (_this.hra.aktualniHrac == "hrac2") {
                            _this.hra.hrac2 += +1;
                            _this.hra.scoreSpan2.innerHTML = "".concat(_this.hra.hrac2jmeno, ": ").concat(_this.hra.hrac2);
                            if (_this.hra.hrac1 + _this.hra.hrac2 == 8) {
                                _this.hra.vypisViteze();
                            }
                        }
                    }, 1500);
                }
                else if (this.hra.otoceneKarty.length === 2 && this.hra.otoceneKarty[0].predniStranaSrc.substring(4, 5) != this.hra.otoceneKarty[1].predniStranaSrc.substring(4, 5)) {
                    setTimeout(function () {
                        _this.hra.otoceneKarty[0].img.src = _this.hra.otoceneKarty[0].zadniStranaSrc;
                        _this.hra.otoceneKarty[0].otocena = false;
                        _this.hra.otoceneKarty[1].img.src = _this.hra.otoceneKarty[1].zadniStranaSrc;
                        _this.hra.otoceneKarty[1].otocena = false;
                        _this.hra.otoceneKarty = [];
                        if (_this.hra.aktualniHrac == "hrac1") {
                            _this.hra.aktualniHrac = "hrac2";
                            _this.hra.scoreSpan2.style.fontWeight = "bold";
                            _this.hra.scoreSpan1.style.fontWeight = "normal";
                            alert("Na tahu je hr\u00E1\u010D: ".concat(_this.hra.hrac2jmeno, " "));
                        }
                        else if (_this.hra.aktualniHrac == "hrac2") {
                            _this.hra.aktualniHrac = "hrac1";
                            _this.hra.scoreSpan1.style.fontWeight = "bold";
                            _this.hra.scoreSpan2.style.fontWeight = "normal";
                            alert("Na tahu je hr\u00E1\u010D ".concat(_this.hra.hrac1jmeno));
                        }
                        ;
                    }, 1500);
                }
            }
        }
    };
    return Karta;
}());
var Hra = /** @class */ (function () {
    function Hra() {
        var _this = this;
        this.zamichejKarty = function () {
            _this.hraciKartyObrazky = ["img/1.png", "img/1-kopie.png", "img/2.png", "img/2-kopie.png", "img/3.png", "img/3-kopie.png", "img/4.png", "img/4-kopie.png", "img/5.png", "img/5-kopie.png", "img/6.png", "img/6-kopie.png", "img/7.png", "img/7-kopie.png", "img/8.png", "img/8-kopie.png"];
            _this.zamichaneHraciKartyObrazky = [];
            _this.kartyNaHraciPlose = [];
            var pocetHracichKaret = _this.hraciKartyObrazky.length;
            for (var i = 0; i < pocetHracichKaret; i++) {
                var nahodnyIndex = Math.floor(Math.random() * _this.hraciKartyObrazky.length);
                _this.zamichaneHraciKartyObrazky.push(_this.hraciKartyObrazky[nahodnyIndex]);
                _this.hraciKartyObrazky.splice(nahodnyIndex, 1);
            }
            ;
        };
        this.rozdejKarty = function () {
            for (var a = 0; a < _this.zamichaneHraciKartyObrazky.length; a++) {
                var imgElement = document.createElement("img");
                var karta = new Karta(imgElement, _this);
                karta.predniStranaSrc = _this.zamichaneHraciKartyObrazky[a];
                karta.zadniStranaSrc = "img/zadni-strana.png";
                karta.imgElement = imgElement;
                karta.imgId = a;
                imgElement.src = "img/zadni-strana.png";
                imgElement.classList.add("karty");
                imgElement.setAttribute("id", a);
                _this.hraciPole.appendChild(imgElement);
                _this.kartyNaHraciPlose.push(karta);
            }
        };
        this.zavritModalOkno = function () {
            _this.modalOkno.style.display = "none";
        };
        this.vypisViteze = function () {
            if (_this.hrac1 + _this.hrac2 == 8) {
                if (_this.hrac1 > _this.hrac2) {
                    _this.modalOknoText.innerHTML = "V\u00EDt\u011Bzem je hr\u00E1\u010D ".concat(_this.hrac1jmeno, " ");
                    _this.modalOkno.style.display = "block";
                }
                else if (_this.hrac2 > _this.hrac1) {
                    _this.modalOknoText.innerHTML = "V\u00EDt\u011Bzem je hr\u00E1\u010D ".concat(_this.hrac2jmeno, " ");
                    _this.modalOkno.style.display = "block";
                }
                else if (_this.hrac1 == _this.hrac2) {
                    _this.modalOknoText.innerHTML = "Hra skon\u010Dila rem\u00EDzou, zkuste to znovu a zjist\u011Bte, kdo se stane v\u00EDt\u011Bzem!";
                    _this.modalOkno.style.display = "block";
                }
                ;
            }
            ;
        };
        this.vymazImgzPredchoziHry = function () {
            var images = document.querySelectorAll(".karty");
            for (var i = 0; i < images.length; i++) {
                images[i].remove();
            }
        };
        this.hratZnovu = function () {
            _this.hrac1 = 0;
            _this.hrac2 = 0;
            _this.otoceneKarty = [];
            _this.pocetOtocenychKaret = null;
            _this.zacitHru();
            _this.zavritModalOkno();
        };
        this.otoceneKarty = [];
        this.hraciPole = document.querySelector("#hraci-pole");
        this.pocetOtocenychKaret = null;
        this.modalOkno = document.querySelector(".modal");
        this.modalOknoZavrit = document.querySelector(".close");
        this.modalOknoHratZnovu = document.querySelector(".btn");
        this.modalOknoText = document.querySelector(".modal-text");
        this.hrac1 = 0;
        this.hrac2 = 0;
        this.modalOknoZavrit.addEventListener("click", function () {
            _this.zavritModalOkno();
        });
        this.modalOknoHratZnovu.addEventListener("click", function () {
            _this.hratZnovu();
        });
        this.vytvorScore = function () {
            _this.scoreSpan1.setAttribute("id", "hrac1");
            _this.scoreSpan2.setAttribute("id", "hrac2");
            _this.hraciPole.appendChild(_this.scoreSpan1);
            _this.hraciPole.appendChild(_this.scoreSpan2);
            _this.scoreSpan1.innerHTML = "".concat(_this.hrac1jmeno, ": ").concat(_this.hrac1);
            _this.scoreSpan2.innerHTML = "".concat(_this.hrac2jmeno, ": ").concat(_this.hrac2);
            alert("Na tahu je hr\u00E1\u010D: ".concat(_this.hrac1jmeno));
        };
        this.naplnJmenaHracu();
        this.zacitHru = function () {
            _this.vymazImgzPredchoziHry();
            _this.zamichejKarty();
            _this.rozdejKarty();
            _this.naplnJmenaHracu();
            _this.vytvorScore();
            _this.vypisViteze();
        };
        this.zacitHru();
    }
    return Hra;
}());
;
var hra = new Hra();
