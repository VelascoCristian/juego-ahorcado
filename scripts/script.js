let elementRain = document.getElementById("letterRain");
let ctxRain = elementRain.getContext("2d");

let width = document.body.clientWidth;
let height = document.body.clientHeight;

elementRain.width = width;
elementRain.height = height;

let position = Array(300).join(0).split("");

let words = "Justicia Clavícula Aplaudir Acrobático Cuchillo Ballet Tripulación Arándano Vivir Minuto Procedimiento Prohibir Torpe Producción Ilimitado Polenta Rizado Rol Mermelada Amar Cañón Alternativo Admisión Gansos Bonus Gloria Cuarto Libro Huésped Jefe Derretido Rico Caída Barricada Mágico Aritmética Insensible Legendario ";
words = words.split(" ");

function rainWords(){
    let gradient = ctxRain.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "#EFEFEF");
    gradient.addColorStop(1, "#C0C0C0");
    ctxRain.fillStyle = gradient;
	ctxRain.fillRect(0, 0, width, height);
	ctxRain.fillStyle = "#000000";
	ctxRain.font = "8pt san-serif";
	position.map(function(y, index){
		let text = words[Math.floor(Math.random() * words.length)];
		let x = (index * 15) + 2;
		letterRain.getContext("2d").fillText(text, x, y);
		if(y > 100 + Math.random() * 1e5){
			position[index] = 0;
		}else{
			position[index] = y + 15;
		}
	})
}

setInterval(rainWords, 180);

//-------------------game-----------------------//
const wordHiddenContainer = document.getElementById("wordHidden");
const dashesContainer = document.getElementById("dashes");
const pressedLettersContainer = document.getElementById("pressedLetters");
const advice = document.getElementById("containerAdvice");
const allWords = ["hola", "sol", "azucar", "Controvertido", "Brutalmente", "Guapo", "Aplicar", "Hojalata", "Cuarenta", "Departamento", "Enviar", "Tumba", "Descubrir", "Gato", "Perro", "Frontera", "Brumoso", "Cazar", "Electrodo", "Escapar", "Enterrar", "Abordo", "Refugio", "Prestar", "Juez", "Favor", "Cementerio", "Verde", "Pobre", "Considerar", "Piano", "Probar", "Impulsar", "Deslizar", "Nebuloso", "Domo", "Disculparse", "Picadillo", "Medir", "Aficionado", "Apartamento", "Corteza", "Animar", "Firme", "Simio", "Refugiado", "Evento", "Pera", "Paciencia", "Animado", "Arcilla", "Calle", "Obstaculizar", "Lagartos", "Picante", "Relicario", "Pelea", "Pelotas", "Hierba", "Diamante", "Gobernar", "Descubrir", "Hilarante", "Conjetura", "Examen", "Eficaz", "Molesto", "Planta", "Sorpresa", "Discutir", "Paisaje", "Rosquilla", "Temerario", "Equilibrio", "Conservador", "Calcular", "Hija", "Lloroso", "Pasta", "Impar", "Rayado", "Agraciado", "Cansado", "Elefante", "Pellizco", "Ordinario", "Cripta", "Encanto", "Colmena", "Pendenciero", "Tobillo", "Bacteria", "Juicio", "Conquista", "Cocinar", "Inculcar", "Total", "Agarrando", "Querer", "Ojos", "Enorme", "Dirigible", "Lento", "Molecular", "Donar", "Trauma", "Glaciar", "Arte", "Misterioso", "Fenomenal", "Ver", "Inicial", "Memoria", "Abajo", "Difuso", "Bolsa", "Historia", "Coincidencia", "Infectar", "Considerar", "Mortal", "Eliminar", "Cubo", "Satisfacer", "Cargar", "Elfo", "Suplicar", "Ciega", "Soberbio", "Empujar", "Nuevo", "Atrocidad", "Borde", "Contener", "Pasear", "Calor", "Festival", "Privilegio", "Salsa", "Carga", "Basura", "Departamento", "Aceptar", "Multitud", "Hombre", "Bestial", "Encogerse", "Mimar", "Elegante", "Sufrir"];


//Subir a github
//Formulario de One next

let hits;
let mistakes;
let pressedLetters;
let wordHidden;
let dictionary = {};
let wrongInput = false;

const hiddenAddWord = () => {
    gallow();
    document.getElementById("containerAdvice").style.display = "none";
    document.getElementById("inputWord").style.display = "none";
    document.getElementById("inputWordBtn").style.display = "none";
    
    wordHidden = document.getElementById("inputWord").value.toUpperCase();

    if(wordHidden.match(/[0-9]/gi) || wordHidden.length > 8 || wordHidden.length == 0) {
        wrongInput = true;
        document.removeEventListener("keydown", inputLetter);
        document.getElementById("inputWord").remove();
        document.getElementById("inputWordBtn").remove();
        home();
    } else {
        giveUp();
        addWordGame();
        document.getElementById("inputWordBtn").remove();
        document.getElementById("inputWord").remove();
    }
}

const selectRandomWord = () => {
    if(wrongInput == false) {
        var word = allWords[Math.floor((Math.random() * allWords.length))].toUpperCase();
        //console.log("Esto es una ayuda, la palabra es: " + word);
        wordHidden = word.split("");
        wordHidden = wordHidden.join("");
    }
    
}

const drawDashes = () => {
    let sizeWordHidden = wordHidden.length;
    if (hits > 0) {
        dashesContainer.innerHTML = "";
        for(let i = 0; i < sizeWordHidden; i++) {
            if(dictionary[i] >="A" && dictionary[i] <= "Z") {
                dashesContainer.innerHTML += dictionary[i];
            } else {
                dashesContainer.innerHTML += "_ ";
            }
        }
    } else {
        for(let i = 0; i < sizeWordHidden; i++){
            dashesContainer.innerHTML += "_ ";
        }
    }
}

const addLetter = letter => {
    pressedLettersContainer.innerHTML += letter + " ";
}

const wrongLetter = letter => {
    mistakes++;
    if(mistakes < 6) {
        hangBody(mistakes);
    } else {
        hangBody(mistakes);
        setTimeout(endGame, 250)
    }
}

const hangBody = bodyPart => {

    switch (bodyPart) {
        case 1:
            document.getElementById("face").style.display = "block";
            break;
        case 2:
            document.getElementById("body").style.display = "block";
            break;
        case 3:
            document.getElementById("leftArm").style.display = "block";
            break;
        case 4:
            document.getElementById("rightArm").style.display = "block";
            break;
        case 5:
            document.getElementById("leftLeg").style.display = "block";
            break;
        case 6:
            document.getElementById("rightLeg").style.display = "block";
            break;
        default:
            break;
    }
}

const correctLetter = letter => {
    let sizeWordHidden = wordHidden.length;
    dashesContainer.innerHTML = "";
    for(let i = 0; i < sizeWordHidden; i++) {
        if(wordHidden[i] == letter) {
            dictionary[i] = letter;
            hits++;
        }
    }
    drawDashes();
    if(hits == wordHidden.length) {
        endGame();
    }
}

const checkTheInput = letter => {
    if(wordHidden.includes(letter)) {
        correctLetter(letter);
    } else {
        wrongLetter(letter);
    }
    addLetter(letter);
}

const inputLetter = event => {
    if(wrongInput == false) {
        let newLetter = event.key.toUpperCase();
        if(newLetter.match(/^[A-Z]$/i) && !pressedLetters.includes(newLetter)) {
            pressedLetters.push(newLetter);
            checkTheInput(newLetter);
        }
    }
}

const endGame = () => {
    const button = document.createElement("button"); 
    const textResult = document.createElement("input");
    const textWord = document.createElement("input");
    pressedLettersContainer.innerHTML = "";
    dashesContainer.innerHTML = "";
    document.getElementById("exit").remove();
    document.removeEventListener("keydown", inputLetter);
    if(mistakes == 6) {
        textResult.type = "text"; 
        textResult.setAttribute("id", "result");
        textResult.setAttribute("value", "Uh!, lástima perdiste"); 
        document.body.appendChild(textResult);
    } else if (hits == wordHidden.length) {
        textResult.type = "text"; 
        textResult.setAttribute("id", "result");
        textResult.setAttribute("value", "Felicitaciones Ganaste"); 
        document.body.appendChild(textResult); 
    }
    
    hideGallow();
    hideBody();

    textWord.type = "text"; 
    textWord.setAttribute("id", "theWordWas");
    textWord.setAttribute("value", "La palabra era: " + wordHidden);   
    document.body.appendChild(textWord); 

    button.type = "button"; 
    button.setAttribute("id", "accept");
    button.innerText = "Aceptar";
    button.setAttribute("onclick", "home()"); 
    document.body.appendChild(button); 
}



const inputWord = () => {
    playBtn.style.display = "none";
    addWordBtn.style.display = "none";
    advice.style.display = "block";

    hits = 0;
    mistakes = 0;
    pressedLetters = [];
    dictionary = {};
    wordHidden = "";
    wrongInput = false;

    wordHiddenContainer.innerHTML = "";
    pressedLettersContainer.innerHTML = "";
    dashesContainer.innerHTML = "";

    wordHiddenContainer.style.display = "block";
    pressedLettersContainer.style.display = "block";
    dashesContainer.style.display = "block";

    const inputAddWordBtn = document.createElement("button");
    const inputAddWord = document.createElement("input");

    inputAddWord.type = "input"; 
    inputAddWord.setAttribute("id", "inputWord");
    inputAddWord.setAttribute("value", "");
    inputAddWord.setAttribute("placeholder", "Ingresa la palabra: ");
    document.body.appendChild(inputAddWord);

    inputAddWordBtn.type = "button"; 
    inputAddWordBtn.setAttribute("id", "inputWordBtn");
    inputAddWordBtn.innerText = "Aceptar";
    inputAddWordBtn.setAttribute("onclick", "hiddenAddWord()");
    document.body.appendChild(inputAddWordBtn);
    mobileInput();
}

const addWordGame = () => {
    drawDashes();
    if(wrongInput == false) {
        document.addEventListener("keydown", inputLetter);
    }
}

const giveUp = () => {
    const exitBtn = document.createElement("button");
    exitBtn.type = "button"; 
    exitBtn.setAttribute("id", "exit");
    exitBtn.innerText = "Desistir";
    exitBtn.setAttribute("onclick", "turnWrongInput()");
    document.body.appendChild(exitBtn);
    
}

const turnWrongInput = () => {
    wrongInput = true;
    document.getElementById("exit").remove();
    document.removeEventListener("keydown", inputLetter);
    home();
    hideBody();
}

const playGame = () => {
    hits = 0;
    mistakes = 0;
    pressedLetters = [];
    dictionary = {}
    wrongInput = false;

    gallow();

    wordHiddenContainer.innerHTML = "";
    pressedLettersContainer.innerHTML = "";
    dashesContainer.innerHTML = "";

    wordHiddenContainer.style.display = "block";
    pressedLettersContainer.style.display = "block";
    dashesContainer.style.display = "block";

    playBtn.style.display = "none";
    addWordBtn.style.display = "none";
    
    giveUp();
    selectRandomWord();
    drawDashes();
    document.addEventListener("keydown", inputLetter);
}

const home = () => {
    if(wrongInput == false) {
        document.getElementById("result").remove();
        document.getElementById("accept").remove();
        document.getElementById("theWordWas").remove();
    } else {
        wordHidden="";
        hideGallow();
    }
    
    wrongInput = false;
    wordHiddenContainer.style.display = "none";
    pressedLettersContainer.style.display = "none";
    dashesContainer.style.display = "none";

    playBtn.style.display = "block";
    addWordBtn.style.display = "block";
}

const gallow = () => {
    document.getElementById("mast").style.display = "block";
    document.getElementById("floor").style.display = "block";
    document.getElementById("upper").style.display = "block";
    document.getElementById("downToHead").style.display = "block";
}

const hideGallow = () => {
    document.getElementById("mast").style.display = "none";
    document.getElementById("floor").style.display = "none";
    document.getElementById("upper").style.display = "none";
    document.getElementById("downToHead").style.display = "none";

}

const hideBody = () => {
    document.getElementById("face").style.display = "none";
    document.getElementById("body").style.display = "none";
    document.getElementById("leftArm").style.display = "none";
    document.getElementById("rightArm").style.display = "none";
    document.getElementById("leftLeg").style.display = "none";
    document.getElementById("rightLeg").style.display = "none";

}

const mobileInput = () => {
    const mobile = document.createElement("button");

    mobile.type = "input"; 
    mobile.setAttribute("id", "inputMobile");
    mobile.setAttribute("value", "");
    mobile.setAttribute("autofocus", "");
    mobile.setAttribute("placeholder", "Ingresa la palabra: ");
    document.body.appendChild(mobile);
}