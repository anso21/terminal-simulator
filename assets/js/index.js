(function(){
    let cursors = document.querySelectorAll(".cursor");
    let comandLines = document.querySelectorAll('.commands');
    let container = document.querySelector('.content');
    let characrters = new Map();
    let username = "miloos@confort";
    comandLine = comandLines[comandLines.length - 1];

    // DEBUT DU PROGRAMME
    document.addEventListener("keyup", function(e){
        if (e.key  == "Backspace") {
            comandLine.textContent = comandLine.textContent.slice(0,comandLine.textContent.length - 1);
        }
        if (!characrters.has(e.keyCode)) {
            comandLine.textContent += e.key;
        }
        if (e.keyCode == 13) {  // la touche entrer est appuyée
            // Création d'une nouvelle ligne de commande
            content = comandLine.textContent;
            let line = createNewLine();
            let elementContent;
            switch (content) {
                case "cmd":
                    elementContent = "Toutes les commandes</br></br> name : Changer de nom</br>    date : Voir la date </br> "+
                                    "   game : Jouer aux jeux</br>"+
                                    "   palindrome : Vérificateur de palindrome</br>  ccipher : Chiffrement de Caesar</br>"+
                                    "   cmd : Pour voir toutes les commandes</br>"+
                                    "   clear : Effacer la console </br>";
                    createElement("div", elementContent, line);
                    break;
                case "name":
                    username = "miloos@"+prompt("Définissez votre nom ! Il sera mis à jour à la prochaine exécution.").toLowerCase();
                    createElement("div", "Nom bien changé !", line);
                    break;
                case "date":
                    elementContent = new Date();
                    createElement("div", elementContent, line);                    
                    break;
                case "clear":
                    clearConsole();                    
                    break;
                case "palindrome":
                    let word = prompt("Saisissez le mot ici !");
                    elementContent = palindromeChecker(word.toLowerCase());
                    createElement("div", elementContent, line);   
                    break;
                case "ccipher":
                    let clearText = prompt("Entrer la phrase").toLowerCase();
                    elementContent = "Text chiffré => " + caesarCipher(clearText);
                    createElement("div", elementContent, line);
                    break;
                default:
                    createElement("div", "Commande invalide", line);
                    break;
            }
        }
    });

    document.querySelector(".fa-square-o").addEventListener("click", function(e) {
        toggleFullScreen();
    }, false);
    
    document.querySelector('.fa-close').addEventListener('click', function(e){
        window.open();
        window.close();
    });
    clignoter();

    addExcludedKeysToTheMap(112, 123);
    addExcludedKeysToTheMap(16, 18);
    addExcludedKeysToTheMap(37, 40);
    addExcludedKeysToTheMap(45, 46);
    addExcludedKeysToTheMap(35, 36);
    addExcludedKeysToTheMap(27, 27);
    addExcludedKeysToTheMap(20, 20);
    addExcludedKeysToTheMap(13, 13);
    addExcludedKeysToTheMap(91, 91);
    addExcludedKeysToTheMap(8, 9);
    
    
    
    // DECLARATION DE TOUTES LES FONCTIONS
    
    /**
     * Permet de créer une nouvelle ligne
     * @return {HTMLElement} line
     */
    function createNewLine() {
        let line = document.createElement("div");
        line.setAttribute("class", "line");
        line.innerHTML = username + "><p class='commands'></p><i class='cursor active'></i>"
        container.appendChild(line);
        return line;
    }

    /**
     * Permet de chiffrer un text
     * 
     * @param {string} clearText la texte à chiffer
     * @returns {string} cipherText
     * 
     */
    function caesarCipher(clearText) {
        let alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
        let cipherText = "";
        let re = new RegExp("[a-zA-Z]");
        if (re.test(clearText)){
            for (let i = 0; i < clearText.length; i++) {
                if (clearText[i] == "'"){
                    cipherText += "'";
                } 
                if (clearText[i] != " ") {
                    let index = alphabet.indexOf(clearText[i]);
                    if (index + 3 > 25) {
                        cipherText += alphabet[ ((index + 3) - 25) - 1 ];
                    } else {
                        cipherText += alphabet[index + 3];
                    }
                } else{
                    cipherText += " ";
                }
            }
        } else{
            document.getElementById('result').textContent = 'Veuillez entrer une text correcte';
        }
        return cipherText;
    }

    /**
     * Supprimer la console
     */
    function clearConsole() {
        for (let i = 0; i < container.children.length; i++) {
            console.log(container.children[i]);
            container.children[i].remove(true);
        }
    }

    /**
     * Permet de créer un élément et de l'ajouter à un conteneur
     * 
     * @param {string} tagName le nome de l'élément
     * @param {string} content Son contenu
     * @param {string} elementSibling L'élément avant lequel il doit être insérer
     */

    function createElement(tagName,content,elementSibling) {
        let element = document.createElement(tagName);
        element.innerHTML = content;
        container.insertBefore(element, elementSibling);
    }

    /**
     * Permet de vérifier si un mot est un palindrome
     * 
     * @param {string} word 
     * @return {sting} result
     */
    function palindromeChecker(word) {
        let reversedWord = "";
        let result ;
        if (word != "") {
            for (let i = word.length -1 ; i >= 0; i--) {
                reversedWord += word[i]; 
            }
            if (reversedWord == word) {
                result = word + " est un palindrome";
            } else{
                result = word + " n'est pas un palindrome";
            }
        } else{
            result = "Entrer un mot valable";
        }
        return result;
    }

    /**
     * Elle se charge de placer le curseur au bon endroit
     */
    function clignoter() {
        setTimeout(() => {
            cursors = document.querySelectorAll(".cursor");
            cursor = cursors[cursors.length - 1];
            for (let i = 0; i < cursors.length-2; i++) {
                cursors[i].classList.remove("cursor");
                cursors[i].classList.remove("active");
            }
            comandLines = document.querySelectorAll(".commands");
            comandLine = comandLines[comandLines.length - 1];
            for (let i = 0; i < comandLines.length-2; i++) {
                comandLines[i].classList.remove("commands");
            }
            cursor.classList.toggle('active');
            clignoter();
        }, 500);
    }

    /**
     * Remplie un map qui contiendra les touches à ne pas afficher 
     * dans la console même en cas d'appuie
     * @param {number} start 
     * @param {number} end 
     */
    function addExcludedKeysToTheMap(start, end) {
        for(let i = start; i <= end; i++){
            characrters.set(i, "");
        }
    }

    /**
     * Bascule en mode plein écran et vis-versa
     */
    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
        if (document.exitFullscreen) {
            document.exitFullscreen(); 
        }
        }
    }
})()