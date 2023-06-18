let plus = document.querySelector("#plus")
let minus = document.querySelector("#minus")
let nasobeni = document.querySelector("#nasobeni")
let deleni = document.querySelector("#deleni")
let vypocitej = document.querySelector("#vypocitej")
let display =  document.querySelector("#display")
let priklad =  document.querySelector("#priklad")
let ce = document.querySelector("#ce")
let c = document.querySelector("#c")
let backspace = document.querySelector("#backspace")
let carka = document.querySelector("#carka")

let prvniCislo = null
let druheCislo
let ulozCislo
let pocetniOperator 
display.value = 0
let zretezeni
let prevedNaCislo

//funkce na vypisování čísel na display
let pridejCislo = function(){
    if(display.value.length == 0){
        display.value = event.target.defaultValue;} //button value
        else if (display.value.includes(".")){
            display.value +=event.target.defaultValue;
         } else {
        display.value=Number.parseFloat(display.value)*10+Number.parseFloat(event.target.defaultValue)
        }
}


//obecná funkce pro uložení první hodnoty do proměnné prvniCislo
let UlozPrvniHodnotu = function(){
    if (prvniCislo == NaN){
        console.log("Zadej číslo")
    }
    else if (prvniCislo == null){
        prvniCislo = Number.parseFloat(display.value);
        display.value = "";
        console.log(prvniCislo)}
    else if (prvniCislo !== null){
        UlozDalsiHodnotu(pocetniOperator);
        console.log(prvniCislo)
    }  else {
        console.log("chyba")
    }
}

//funkce pro uložení dalších hodnot do proměnné prvniCislo
let UlozDalsiHodnotu = function(pocetniOperator){
    if (pocetniOperator == "+" && display.value.length > 0){
        prvniCislo = prvniCislo + Number.parseFloat(display.value);
        display.value = "";
    } else if (pocetniOperator == "-" && display.value.length > 0){
        prvniCislo = prvniCislo - Number.parseFloat(display.value);
        display.value = "";
    } else if (pocetniOperator == "*" && display.value.length > 0){
        prvniCislo = prvniCislo * Number.parseFloat(display.value);
        display.value = "";
    } else if (pocetniOperator == "/" && display.value.length > 0 && Number.parseFloat(display.value) !==0){
        prvniCislo = prvniCislo / Number.parseFloat(display.value);
        display.value = ""; } 
        else if (pocetniOperator == "/" && Number.parseFloat(display.value) == 0) {            
            priklad.value="aaa";
            alert("Nemůžeš dělit nulou");
            display.value=prvniCislo;
            
        } 
}


//volání funkce na uložení hodnoty při matematických operacích 
    //při sčítání
    plus.addEventListener("click", function(event){
        if (priklad.value.includes("=")){
            prvniCislo = Number.parseFloat(display.value)
        };
        UlozPrvniHodnotu();
        pocetniOperator = "+";
        if (display.value.length > 0){
        display.value=""
        }
        priklad.value = `${prvniCislo}${pocetniOperator}`
    })
    
      //při odčítání
      minus.addEventListener("click", function(event){
        if (priklad.value.includes("=")){
            prvniCislo = Number.parseFloat(display.value)
        };
        UlozPrvniHodnotu();
        pocetniOperator = "-";
        if (display.value.length > 0){
            display.value=""
          }
        priklad.value = `${prvniCislo}${pocetniOperator}`
      })
    
      //při násobení
      nasobeni.addEventListener("click", function(event){
        if (priklad.value.includes("=")){
            prvniCislo = Number.parseFloat(display.value)
        };
        UlozPrvniHodnotu();
        pocetniOperator = "*";
        if (display.value.length > 0){
            display.value=""
          }
        priklad.value = `${prvniCislo}${pocetniOperator}`
      })
    
    
      //při dělení
      deleni.addEventListener("click", function(event){
        if (priklad.value.includes("=")){
            prvniCislo = Number.parseFloat(display.value)
        };
        UlozPrvniHodnotu();
        pocetniOperator = "/";
        if (display.value.length > 0){
            display.value=""
          }
        priklad.value = `${prvniCislo}${pocetniOperator}`
      })
    
      
        
 //Výpočet početních operací
    vypocitej.addEventListener("click", function(event){
        if (priklad.value.includes("=")){
            console.log("Pro výsledek stačí kliknout jednou")
        }
        else if (prvniCislo == null){
            console.log ("Nejdříve zadej příklad")
        } 
        ulozCislo = prvniCislo;
        druheCislo = display.value;
        UlozPrvniHodnotu();
        if (pocetniOperator !==null){
        priklad.value = `${ulozCislo}${pocetniOperator}${druheCislo}=`;
        display.value = prvniCislo;
        pocetniOperator = null;};
  
                  
})

ce.addEventListener("click", function(event){
    display.value=0
})

c.addEventListener("click", function(event){
    display.value=0;
    prvniCislo = null;
    priklad.value=""
})

backspace.addEventListener("click", function(event){
    if (display.value.length == 0){
        console.log("Není co mazat")
    }
    else if (display.value.length == 1){
        display.value = Number.parseFloat(display.value)-Number.parseFloat(display.value)
    }  else if (display.value.length > 1 && priklad.value.includes("=")) {
        zretezeni = display.value;
        String(zretezeni);
        zretezeni = zretezeni.substring(0,zretezeni.length-1);
        display.value = Number.parseFloat(zretezeni);
        prvniCislo = display.value
     } else {
            zretezeni = display.value;
            String(zretezeni);
            zretezeni = zretezeni.substring(0,zretezeni.length-1);
            display.value = Number.parseFloat(zretezeni);
   }
})

//zachytávání kliknutí na čísla a vypisování čísel
jedna.addEventListener("click", function(event){
    pridejCislo()
})

dva.addEventListener("click", function(event){
    pridejCislo()
})

tri.addEventListener("click", function(event){
    pridejCislo()
})

ctyri.addEventListener("click", function(event){
    pridejCislo()
})

pet.addEventListener("click", function(event){
    pridejCislo()
})

sest.addEventListener("click", function(event){
    pridejCislo()
})

sedm.addEventListener("click", function(event){
    pridejCislo()
})

osm.addEventListener("click", function(event){
    pridejCislo()
})

devet.addEventListener("click", function(event){
    pridejCislo()
})

nula.addEventListener("click", function(event){
    pridejCislo()
})

carka.addEventListener("click", function(event){
        if (display.value.length > 0 && (display.value.includes(".") == false)){
            display.value+=".";
        }
        console.log(display.value)
    })


//Zachytávání kliknutí na čísla na klávesnici
document.querySelector("body").addEventListener("keydown", function (event){
    console.log(event.key)
    if (event.key === "1"){
        jedna.click()
    } else if (event.key === "2"){
        dva.click()
    } else if (event.key === "3"){
        tri.click()
    } else if (event.key === "4"){
        ctyri.click()
    } else if (event.key === "5"){
        pet.click()
    } else if (event.key === "6"){
        sest.click()
    } else if (event.key === "7"){
        sedm.click()
    } else if (event.key === "8"){
        osm.click()
    } else if (event.key === "9"){
        devet.click()
    } else if (event.key === "0"){
        nula.click()
    } else if (event.key === "+"){
        plus.click()
    } else if (event.key === "-"){
        minus.click()
    } else if (event.key === "/"){
        deleni.click()
    } else if (event.key === "*"){
        nasobeni.click()
    } else if (event.key === "," || event.key === "."){
        carka.click()
    } else if (event.key === "Backspace"){
        backspace.click()
    }else if (event.key === "Delete"){
            ce.click()
    }else if (event.key === "Enter"){
        vypocitej.click()
    } 
})

