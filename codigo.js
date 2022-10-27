const btnAddNote = document.querySelector(".header_container");
const cardsContainer = document.querySelector(".section_container");
const dataHeaderContainer = document.querySelector(".header_container h2");

let newCard = false;
let editedCard = false;
let deletedCard = false;

loadCardsInLocalStorage();

btnAddNote.addEventListener("click", ()=>{

    let i = setIdCards();
    newCard = true;

        cardsContainer.innerHTML += `
    
        <div class="card" id="card-${i}">
            <div class="card_header">
                <button type="button" class="btnEdit"><i class="fa-solid fa-pen-to-square"></i></button>
                <button type="button" class="btnDelete"><i class="fa-solid fa-trash"></i></button>
            </div>

            <div class="card_container">
                <textarea rows="5" cols="2" disabled>Ingrese texto</textarea>
            </div>
        </div>
    
    `;
    
    actionAds();
    editCard();
    deleteCard();
    newCard = false;
});


function editCard(){

    editedCard = true;
    const btnsEdit = document.querySelectorAll(".btnEdit");
    let cardsStorage = getLocalStorage();

    btnsEdit.forEach(function(btnEdit){

        btnEdit.addEventListener("click", ()=>{

            let cardId = btnEdit.parentElement.parentElement.id;
            const cardFinalId = cardId.slice(5);

            let cardTextArea = btnEdit.parentElement.parentElement.children[1].children[0];
            cardTextArea.disabled = false;

            let cardContainerBtns = btnEdit.parentElement.parentElement.children[0];
            cardContainerBtns.innerHTML +=  `<button type="button" class="btnFinishEdit">✓</button>`;

            const btnFinishEdit = document.querySelector(".btnFinishEdit");

            btnFinishEdit.addEventListener("click", ()=>{

                for (let i = 0; i < cardsStorage.length; i++){
                    console.log(cardFinalId, cardsStorage[i].id)
                    if (cardFinalId == cardsStorage[i].id){
                        cardsStorage[i].text = cardTextArea.value;
                        localStorage.setItem("list", JSON.stringify(cardsStorage));
                    }

                }

                cardContainerBtns.children[2].remove();
                cardTextArea.innerHTML = cardTextArea.value;
                cardTextArea.disabled = true;

                actionAds();
                editCard();
                deleteCard();
                editedCard = false;
            });
        });

    });

}

function deleteCard(){

    deletedCard = true;
    const btnsDelete = document.querySelectorAll(".btnDelete");
    let cardsStorage = getLocalStorage();

    btnsDelete.forEach(function(btnDelete){

        btnDelete.addEventListener("click", ()=>{

        btnDelete.parentElement.parentElement.remove();

        const cardId = btnDelete.parentElement.parentElement.id.slice(5);

        for (let i = 0; i < cardsStorage.length; i++){

            if (cardId == cardsStorage[i].id){
                const index = cardsStorage.indexOf(cardsStorage[i])
                
                cardsStorage.splice(index, 1);

                localStorage.setItem("list", JSON.stringify(cardsStorage));

            }

        }
        actionAds();
        deletedCard = false;
        });

    });

}

function addCardToLocalStorage(id, text){

    let cardsStorage = getLocalStorage();

    const card = {id: id, text:  text};

    cardsStorage.push(card);

    localStorage.setItem("list", JSON.stringify(cardsStorage));

}

function getLocalStorage(){
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
}

function setIdCards(){

    let cardsStorage = getLocalStorage();

        if (cardsStorage == null){
            let contador = 1;
            contador++
            addCardToLocalStorage(contador, "Ingrese texto");
            return contador;
        } else {
            let contador = cardsStorage.length;
            contador++
            addCardToLocalStorage(contador, "Ingrese texto");
            return contador;
        }

}

function loadCardsInLocalStorage(){

    let cardsStorage = getLocalStorage();

    for (let i = 0; i < cardsStorage.length; i++){
        cardsContainer.innerHTML += `

        <div class="card" id="card-${cardsStorage[i].id}">
            <div class="card_header">
                <button type="button" class="btnEdit"><i class="fa-solid fa-pen-to-square"></i></button>
                <button type="button" class="btnDelete"><i class="fa-solid fa-trash"></i></button>
            </div>

            <div class="card_container">
                <textarea rows="5" cols="2" disabled>${cardsStorage[i].text}</textarea>
            </div>
        </div>
    
    `;

    }

    actionAds();
    editCard();
    deleteCard();
}


function actionAds(){

    let cardsStorage = getLocalStorage();

    window.addEventListener("DOMContentLoaded", ()=>{

        dataHeaderContainer.innerHTML = `${cardsStorage.length} notes were created ✅`;

        setTimeout(()=>{
            dataHeaderContainer.classList.add("show-data");
        }, 500);
    
        setTimeout(()=>{
            dataHeaderContainer.classList.remove("show-data");
        }, 2000);
    
    });


    if (newCard === true){
        dataHeaderContainer.innerHTML = `1 note has been successfully created ✅`;
        dataHeaderContainer.classList.add("show-data");

        setTimeout(()=>{
            dataHeaderContainer.classList.remove("show-data");
        }, 1000);
    }

    if (editedCard === true){
        dataHeaderContainer.innerHTML = `1 note has been successfully edited ✅`;
        dataHeaderContainer.classList.add("show-data");

        setTimeout(()=>{
            dataHeaderContainer.classList.remove("show-data");
        }, 1000);
    }

    if (deletedCard === true){
        dataHeaderContainer.innerHTML = `1 note has been successfully deleted ✅`;
        dataHeaderContainer.classList.add("show-data");

        setTimeout(()=>{
            dataHeaderContainer.classList.remove("show-data");
        }, 1000);
    }

}