
let buttonNew = document.querySelector("#new");
let inputText = document.querySelector("#activitati");
let add = document.querySelector("#add");
let cancel = document.querySelector("#cancel");
let deleteMode = document.querySelector("#delete");
let cancelDeleteMode = document.querySelector("#cancelDeleteMode");
let container = document.querySelector("#container");
let count = 0;
let countMinuteToateActivitatile = [];
let indexActivitateInWork;
inputText.style.display = "none";
add.style.display = "none";
cancel.style.display = "none";
deleteMode.style.display = "none";
cancelDeleteMode.style.display = "none";
//prima data cand dau refresh in pagina, aceata variabila este undefined asa cum se prezinta codul pana in acel moment, atentei este vorba despre prima data cand dau refresh in pagina
let min;
console.log(typeof min, "ce este aici?")
//aici evident la ca primul console.log o sa fie undefined, pentru ca am explicat deja, variabila/cuatia a fost declarata a fi cutie, nu a fost initiata cu nimic deci e goala
console.log(min, "1 vreau sa vad cum se foloseste si modifica acest min ca si variabila globala, sa inteleg mai bine care e faza cu variabila globala.")

let calculeazaMinute;

function actualizeazaMin() {
    //aici este al doilea console, din punct de vedere al scrierii, insa aici o sa se ajunga mai tarziu
    // pana acum cateva minute am crezut ceva gresit, si anume ca bucata asta de cod de mai jos presupune reinitializarea variabilei min cu countMinute++
    //ADEVARUL ESTE CA nu are loc nicio reinițializare a variabilei min. Această linie de cod actualizează doar proprietatea innerText a elementului asociat variabilei min, schimbând textul afișat în interiorul acestui element. Variabila min își păstrează referința (NUMARUL 783) către același element din DOM,ASTA INSEAMNA TOTODATA CA FACE REFERIRE ACELASI SPAN SPECIAL PE CARE S-A DAT CLICK PE BUTONUL  iar doar conținutul textului acestui element este actualizat.

    let countMinute = countMinuteToateActivitatile[indexActivitateInWork];
    countMinute++;
    countMinuteToateActivitatile[indexActivitateInWork] = countMinute;

    min.innerText = `${countMinute} min`;
    min;
    console.log(typeof min, "dar aici ce tip de variabila este")
    console.log(min, " 3 dar dupa acst egal, ce valoarea are?")
    console.log(min.innerText);

}


buttonNew.addEventListener("click", function () {
    buttonNew.style.display = "none";
    inputText.style.display = "inline";
    add.style.display = "inline";
    cancel.style.display = "inline";
})

add.addEventListener("click", function () {
    count++;
    countMinuteToateActivitatile.push(0)
    let afisaj = document.createElement("span");
    afisaj.id = "oreSiMin";
    let pElement = document.createElement('p');
    let spanNr = document.createElement("span");
    spanNr.innerText = count;
    let spanText = document.createElement("span");
    spanText.innerText = inputText.value;
    let buttonDelete = document.createElement("button");
    buttonDelete.textContent = "delete";
    buttonDelete.style.display = "none";
    let startWork = document.createElement("button");
    startWork.textContent = "Start Activitate";
    startWork.style.display = "inline";
    startWork.id = "start"
    let stopWork = document.createElement("button");
    stopWork.textContent = "STOP Activitate";
    stopWork.style.display = "none";
    let newMin = document.createElement("span");
    newMin.id = "minutele";
    newMin.style.display = "inline";
    newMin.innerText = `${0} min`;
    container.appendChild(pElement);
    pElement.appendChild(spanNr);
    pElement.appendChild(spanText);
    pElement.appendChild(buttonDelete);
    pElement.appendChild(startWork);
    pElement.appendChild(stopWork);
    afisaj.appendChild(newMin);
    //aici trebuie facut ceva pentru ca atunci cand adaug o noua activitate imi copiasa afisaju cu valorile pe care l-a avut ultima activitate la care adauga si 1
    // corect este sa apara un afisaj de la zero care sa nu inceapa a se executa, automat deci trebuie vazut de ce
    pElement.appendChild(afisaj);
    startWork.addEventListener("click", function () {
        let spanIndex = pElement.querySelector("span:first-child");
        indexActivitateInWork = parseInt(spanIndex.innerText) - 1;
        //aici creea o lista cu paragrafele existente 
        let pElements = container.getElementsByTagName("p");
        console.log("butonup pe care apas=", startWork);
        // console.log("pe ce am apasat, ar trebuie sa fie egal intre ele", e.currentTarget);
        // console.log(startWork === e.currentTarget);
        // let butonApasatDeStartWork = startWork;
        // let paragrafCurent = butonApasatDeStartWork.parentNode;
        let paragrafCurent = startWork.parentNode;
        // let butonApasatDeStartWork = e.currentTarget;
        // let paragrafCurent = butonApasatDeStartWork.parentNode;
        console.log("paragraf curent =", paragrafCurent);

        console.log(min, "4 aici ce valoarea are acest min, este  ca la min  3???")
        //pana la momentul la care o sa am o initalizare cum e cea din urmatorul cod, tot undefined o sa mi apara in consola, acum se schimba pentru ca, chiar o initilizez cu ceva....
        //abia acum o sa initieze referinta catre spanul care este vizat, nu orice span din toata lista de span-uri. deci acum in min regasesc referinta catre span-ul  pe care se lucreaza

        //aici min pune punctul fix pe acel span de care avem nevoie
        //aici min stocheaza referinta catre span-ul #minutele fix din acel paragraf pe care s-a apasat butonul de startWork
        min = paragrafCurent.querySelector("#minutele");
        console.log(typeof min);


        console.log(min, "5, oare ce valoarea are min acum si cum imi internalizez evolutia lui si de ce nu poatea sa fie o variabila locala??")


        //aici zic ca nu mai vreau ca butonul startWork sa mai apara, intrebare este de unde stie,care e butonul care ma intereseaza??
        //oare nu ar trebui sa fie foarte clar la ce button se face referirea?

        startWork.style.display = "none";
        stopWork.style.display = "inline";

        if (stopWork.style.display == "inline")
            calculeazaMinute = setInterval(actualizeazaMin, 5000);
        else {
            for (let i = 0; i < pElements.length; i++) {
                let paragrafSelectat = pElements[i];

                let startWorkIndividual = paragrafSelectat.querySelector("#start");
                startWorkIndividual.style.display = "none";
            }
        }
    })

    stopWork.addEventListener("click", function () {
        let pElements = container.getElementsByTagName("p");
        clearInterval(calculeazaMinute);
        for (let i = 0; i < pElements.length; i++) {
            let paragrafVizat = pElements[i];
            stopWork.style.display = "none";
            let startWorkIndividual = paragrafVizat.querySelector("#start");
            startWorkIndividual.style.display = "inline";

        }
    })
    buttonDelete.addEventListener("click", function () {
        let spanIndex = pElement.querySelector("span:first");
        let indexActivitate = parseInt(spanIndex.innerText) - 1;
        countMinuteToateActivitatile.splice(indexActivitate, 1);
        pElement.remove();
        let pElementsOrdonate = container.getElementsByTagName("p");
        for (let j = 0; j < pElementsOrdonate.length; j++) {
            let numarOrdineCurent = j + 1;
            let paragraf = pElementsOrdonate[j];
            paragraf.firstElementChild.innerText = numarOrdineCurent;
        }
        count--;
        if (count == 0) {
            cancelDeleteMode.style.display = "none";
            deleteMode.style.display = "none";
        }
    });

    inputText.value = "";

    if (count == 1) {
        deleteMode.style.display = "block";
    }
})

cancel.addEventListener("click", function () {
    buttonNew.style.display = "block";
    inputText.style.display = "none";
    add.style.display = "none";
    cancel.style.display = "none";
});
deleteMode.addEventListener("click", function () {
    let pElements = container.getElementsByTagName("p");

    for (let i = 0; i < pElements.length; i++) {
        let paragraf = pElements[i];
        buttonDelete = paragraf.querySelector("button");
        buttonDelete.style.display = "inline";
    }
    deleteMode.style.display = "none";
    cancelDeleteMode.style.display = "block";
});

cancelDeleteMode.addEventListener("click", function () {
    //aici mai jos, am creat o variabila locala care se numeste let pElemets aceasta varibila stocheaza cu ajutorul functiei getElementsByTagName("p"), toate paragrafele din container.
    let pElements = container.getElementsByTagName("p");

    for (let i = 0; i < pElements.length; i++) {
        let ion = pElements[i].querySelector("button");
        ion.style.display = "none";
        if (i == 0) {
            cancelDeleteMode.style.display = "none";
            deleteMode.style.display = "block";
        }

    }
}
)


// let variabilaPrimitivaDeTipNumar = 7;
// console.log(typeof variabilaPrimitivaDeTipNumar);
// let varibilaPrimitivaDeTipBoolean = true;
// console.log(typeof varibilaPrimitivaDeTipBoolean);
// let varibilaPrimitivaDeTipSirDeCaractere = "mama";
// console.log(typeof varibilaPrimitivaDeTipSirDeCaractere)