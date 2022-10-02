
//UI VARIABLE DECLARATIONS

//Information board variables

let kofteScore = 0;
let tavukScore = 0;

const kofteScorePara = document.getElementById('kofte-score');
const tavukScorePara = document.getElementById('tavuk-score');
const kofteStockError = document.getElementById('error-kofte');
const tavukStockError = document.getElementById('error-tavuk');
const kofteOrderMessage = document.getElementById('order-message-kofte');
const tavukOrderMessage = document.getElementById('order-message-tavuk');

//Choice Button variables

const kofteChoice = document.getElementById('kofte');
const tavukChoice = document.getElementById('tavuk');

//Order modal variables

//ARRAY variable declarations for Stock

let ekmek = 11; //ekmek is always required to be added and to see the final error message of burgers are out of stock, it was changed to "11"
let marul = 5;
let tursu = 5;
let sogan = 5;
let domates = 5;
let patates = 5;
let paketSos = 5;
let cola =  5;

let ekmekValue = document.querySelector('[ekmekValue]');
let marulValue = document.querySelector('[marulValue]');
let tursuValue = document.querySelector('[tursuValue]');
let soganValue = document.querySelector('[soganValue]');
let domatesValue = document.querySelector('[domatesValue]');
let patatesValue = document.querySelector('[patatesValue]');
let paketSosValue = document.querySelector('[paketSosValue]');
let colaValue = document.querySelector('[colaValue]');

const ingredientsModal = document.getElementById('ingredients-modal');
const orderButton = document.querySelector('[start-btn]');

const ingredientCheckboxes = document.querySelectorAll('#checkBox');
orderButton.addEventListener('click', passToBurgerChoice);

ingredientCheckboxes.forEach(ingredient => 
    {ingredient.addEventListener('change', (e) => {
        let ingredientName = e.target.nextElementSibling.textContent;
        if(ingredient.checked) {
            if(ingredientName === "Ekmek") {
                if(isMaterialOver("Ekmek")) {
                    return;
                } else {
                ekmek -= 1;
                ekmekValue.textContent = ekmek;
                }
            } else if(ingredientName === "Marul"){
                if(isMaterialOver("Marul")) {
                    return;
                } else {
                marul -= 1;
                marulValue.textContent = marul;
                }
            } else if(ingredientName === "Tursu"){
                if(isMaterialOver("Tursu")) {
                    return;
                } else {
                tursu -= 1;
                tursuValue.textContent = tursu;
                }
            } else if(ingredientName === "Sogan") {
                if(isMaterialOver("Sogan")) {
                    return;
                } else {
                sogan -= 1;
                soganValue.textContent = sogan;
                }
            } else if(ingredientName === "Domates") {
                if(isMaterialOver("Domates")) {
                    return;
                } else {
                domates -= 1;
                domatesValue.textContent = domates;
                }
            } else if(ingredientName === "Patates") {
                if(isMaterialOver("Patates")) {
                    return;
                } else {
                patates -= 1;
                patatesValue.textContent = patates;
                }
            } else if(ingredientName === "Paket Sos") {
                if(isMaterialOver("Paket Sos")) {
                    return;
                } else {
                paketSos -= 1;
                paketSosValue.textContent = paketSos;
                }
            } else if(ingredientName === "Cola") {
                if(isMaterialOver("Cola")) {
                    return;
                } else {
                cola -= 1;
                colaValue.textContent = cola;
                }
            }
        } else {
            if(ingredientName === "Ekmek") {
                ekmek += 1;
                ekmekValue.textContent = ekmek;
            } else if(ingredientName === "Marul"){
                marul += 1;
                marulValue.textContent = marul;
            } else if(ingredientName === "Tursu") {
                tursu += 1;
                tursuValue.textContent = tursu;
            } else if(ingredientName === "Sogan") {
                sogan += 1;
                soganValue.textContent = sogan;
            } else if(ingredientName === "Domates") {
                domates += 1;
                domatesValue.textContent = domates;
            } else if(ingredientName === "Patates") {
                patates += 1;
                patatesValue.textContent = patates;
            } else if(ingredientName === "Paket Sos") {
                paketSos += 1;
                paketSosValue.textContent = paketSos;
            } else if(ingredientName === "Cola") {
                cola += 1;
                colaValue.textContent = cola;
            }
        }
    })
})

//Error modal variables

const overlayWindow = document.getElementById('overlayWindow');

const errorModal = document.getElementById('errorModal');
const okBtn = document.getElementById('okBtn');
const errorMessage = document.getElementById('errorMessage');


const materialErrorModal = document.getElementById('materialErrorModal');
const materialErrorMessage = document.getElementById('materialErrorMessage');
const returnBtn = document.getElementById('returnBtn');

//Event Listeners

overlayWindow.addEventListener('click', closeAllModals);
okBtn.addEventListener('click', renewStocks);
returnBtn.addEventListener('click', closeMaterialErrorModal);
kofteChoice.addEventListener('click', () => pushClick('kofte'));
tavukChoice.addEventListener('click', () => pushClick('tavuk'));

/*--------------new function-----------------------------------
Functions allowing the user make a choice and check constraints
---------------------------------------------------------------*/

function pushClick(orderSelection) {
    openOrderMessage(orderSelection);
    setTimeout(() => {
        takeOrder(orderSelection)
    }, 1000);
}

function checkStocks(orderSelection) {
    if (isStockOver()) {
        openErrorModal();
        setFinalMessage();
        return;
    } else if(orderSelection === 'kofte' && isKofteOver()) {
        openKofteStockErrorMessage();
    } else if(orderSelection === 'tavuk' && isTavukOver()) {
        openTavukStockErrorMessage();
    }
    closeOrderMessage(orderSelection);
    setTimeout(() => {
        closeKofteStockErrorMessage();
        closeTavukStockErrorMessage();
    }, 3000);
}

function takeOrder(orderSelection) {
    setTimeout(() => {
        checkStocks(orderSelection)
        countOrder(orderSelection)
    }, 3000);
}

function isStockOver() {
    return kofteScore === 5 && tavukScore === 5;
}

function isKofteOver() {
    return kofteScore === 5;
}

function openKofteStockErrorMessage() {
    kofteStockError.classList.add('active');
}

function closeKofteStockErrorMessage() {
    kofteStockError.classList.remove('active');
}

function isTavukOver() {
    return tavukScore === 5;
}

function openTavukStockErrorMessage() {
    tavukStockError.classList.add('active');
}

function closeTavukStockErrorMessage() {
    tavukStockError.classList.remove('active');
}

function openErrorModal() {
    errorModal.classList.add('active')
    overlayWindow.classList.add('active')
}

function closeErrorModal() {
    errorModal.classList.remove('active');
    overlayWindow.classList.remove('active');
}

function openMaterialErrorModal() {
    materialErrorModal.classList.add('active');
    overlayWindow.classList.add('active')
}

function closeMaterialErrorModal() {
    materialErrorModal.classList.remove('active');
    overlayWindow.classList.remove('active');
}

function closeAllModals() {
    closeErrorModal();
    closeMaterialErrorModal();
}

function setFinalMessage() {
    errorMessage.textContent = 'Opps!! We are out of order and can NOT take new orders';
}

function setMaterialErrorMessage() {
    materialErrorMessage.textContent = `Opps!! We are out of some materials you have chosen and can NOT add anymore`;
}

function setMissingEkmekErrorMessage() {
    materialErrorMessage.textContent = `Opps!! Ekmek is a required material and needs to be added`; 
}

function openOrderMessage(orderSelection) {
    if(orderSelection === 'kofte') {
        kofteOrderMessage.classList.add('active');
    } else if(orderSelection === 'tavuk') {
        tavukOrderMessage.classList.add('active');
    }
}

function  closeOrderMessage(orderSelection) {
    if(orderSelection === 'kofte') {
        kofteOrderMessage.classList.remove('active');
    } else if(orderSelection === 'tavuk') {
        tavukOrderMessage.classList.remove('active');
    }
}

/*--------------new function---------------
Define a function for order counting logic
-------------------------------------------*/

function updateScoreParas(kofteScore, tavukScore) {
    kofteScorePara.textContent = `Kofte: ${kofteScore}`;
    tavukScorePara.textContent = `Tavuk: ${tavukScore}`;
}

function countOrder(orderSelection) {
    if (orderSelection === 'kofte' && kofteScore !== 5){
      kofteScore++;
      openKofteChoiceModal();
    } else if (orderSelection === 'tavuk' && tavukScore !== 5){
      tavukScore++;
      startTavukCooking();
    }
    updateScoreParas(kofteScore, tavukScore);
}

const kofteChoiceModal = document.getElementById('kofte-choice-modal');
const choiceButton = document.querySelector('[choice-btn]');
choiceButton.addEventListener('click', startKofteCooking);

function openKofteChoiceModal() {
    kofteChoiceModal.classList.add('active');
    overlayWindow.classList.add('active');
}

function closeKofteChoiceModal() {
    kofteChoiceModal.classList.remove('active');
    overlayWindow.classList.remove('active');
}

function startKofteCooking() {
    const choiceModalAzRadioButton = document.getElementById('radioAz');
    const choiceModalOrtaRadioButton = document.getElementById('radioOrta');
    const choiceModalCokRadioButton = document.getElementById('radioCok');

    if(choiceModalAzRadioButton.checked === false && choiceModalOrtaRadioButton.checked === false && choiceModalCokRadioButton.checked === false) {
    return;
    } else {
    if(choiceModalAzRadioButton.checked) {
        cookAzPismis();
    } else if(choiceModalOrtaRadioButton.checked) {
        cookOrtaPismis();
    } else if(choiceModalCokRadioButton.checked) {
        cookCokPismis();
    }
    closeKofteChoiceModal();
    choiceModalCokRadioButton.checked = false;
    choiceModalAzRadioButton.checked = false;
    choiceModalOrtaRadioButton.checked = false;
    }
}

function cookAzPismis() {
    let req1 = new Promise(function(resolve, reject) { 
        // A mock async action using setTimeout
        setTimeout(() => {
            azPismisKofteCooked();
        }, 2000);
    })
    let req2 = new Promise(function(resolve, reject) { 
        // A mock async action using setTimeout
        setTimeout(() => {
            completePotatoForKofteOrder();
        }, 5000);
    })
    let req3 = new Promise(function(resolve, reject) {
        setTimeout(() => {
            prepareDrinkForKofteOrder();
        }, 3000);
    })
    let req4 = new Promise(function(resolve, reject) {
        setTimeout(() => {
            materialsAreReadyForKofte();
        }, 4000);
    })
    
    Promise.all([req1, req2, req3, req4]).then(setTimeout(() => {
        kofteOrderMessage.textContent = "Your Az Pismis Kofte Burger order is ready to eat";
        kofteOrderMessage.classList.add('active');
    }, 10000)).then(setTimeout(() => {
        openOrderModal();
        kofteOrderMessage.textContent = "Thank you for your order!";
        kofteOrderMessage.classList.remove('active');
        uncheckCheckBoxes();
    }, 15000))
}

function uncheckCheckBoxes() {
    ingredientCheckboxes.forEach(ingredient => {
        ingredient.checked = false;
    })
}

function cookOrtaPismis() {
    let req1 = new Promise(function(resolve, reject) { 
        // A mock async action using setTimeout
        setTimeout(() => {
            ortaPismisKofteCooked();
        }, 3000);
    })
    let req2 = new Promise(function(resolve, reject) { 
        // A mock async action using setTimeout
        setTimeout(() => {
            completePotatoForKofteOrder();
        }, 5000);
    })
    let req3 = new Promise(function(resolve, reject) {
        setTimeout(() => {
            prepareDrinkForKofteOrder();
        }, 2000);
    })
    let req4 = new Promise(function(resolve, reject) {
        setTimeout(() => {
            materialsAreReadyForKofte();
        }, 4000);
    })
    
    Promise.all([req1, req2, req3, req4]).then(setTimeout(() => {
        kofteOrderMessage.textContent = "Your Orta Pismis Kofte Burger order is ready to eat";
        kofteOrderMessage.classList.add('active');
    }, 10000)).then(setTimeout(() => {
        openOrderModal();
        kofteOrderMessage.textContent = "Thank you for your order!";
        kofteOrderMessage.classList.remove('active');
        uncheckCheckBoxes();
    }, 15000))
}

function cookCokPismis() {
    let req1 = new Promise(function(resolve, reject) { 
        // A mock async action using setTimeout
        setTimeout(() => {
            cokPismisKofteCooked();
        }, 4000);
    })
    let req2 = new Promise(function(resolve, reject) { 
        // A mock async action using setTimeout
        setTimeout(() => {
            completePotatoForKofteOrder();
        }, 5000);
    })
    let req3 = new Promise(function(resolve, reject) {
        setTimeout(() => {
            prepareDrinkForKofteOrder();
        }, 2000);
    })
    let req4 = new Promise(function(resolve, reject) {
        setTimeout(() => {
            materialsAreReadyForKofte();
        }, 3000);
    })
    
    Promise.all([req1, req2, req3, req4]).then(setTimeout(() => {
        kofteOrderMessage.textContent = "Your Cok Pismis Kofte Burger order is ready to eat";
        kofteOrderMessage.classList.add('active');
    }, 10000)).then(setTimeout(() => {
        openOrderModal();
        kofteOrderMessage.textContent = "Thank you for your order!";
        kofteOrderMessage.classList.remove('active');
        uncheckCheckBoxes();
    }, 15000))
}

function azPismisKofteCooked() {
    kofteOrderMessage.textContent = "Az Pismis Kofte has been cooked";
    kofteOrderMessage.classList.add('active');
};

function ortaPismisKofteCooked() {
    kofteOrderMessage.textContent = "Orta Pismis Kofte has been cooked";
    kofteOrderMessage.classList.add('active');
};

function cokPismisKofteCooked() {
    kofteOrderMessage.textContent = "Cok Pismis Kofte has been cooked";
    kofteOrderMessage.classList.add('active');
}

function materialsAreReadyForKofte() {
    kofteOrderMessage.textContent = "Other Materials added";
    kofteOrderMessage.classList.add('active');
}

function completePotatoForKofteOrder() {
    const potatoCheckbox = document.querySelector('[potato]');
    if(potatoCheckbox.checked === false) {
        kofteOrderMessage.textContent = "You have NOT ordered potato chips!";
        kofteOrderMessage.classList.add('active');
    } else {
        kofteOrderMessage.textContent = "Potato chips are ready";
        kofteOrderMessage.classList.add('active');
    }
}

function prepareDrinkForKofteOrder() {
    const colaCheckbox = document.querySelector('[cola]');
    if(colaCheckbox.checked === false) {
        kofteOrderMessage.textContent = "You have NOT ordered any beverage!";
        kofteOrderMessage.classList.add('active');
    } else {
        kofteOrderMessage.textContent = "Your beverage is ready";
        kofteOrderMessage.classList.add('active');
    }
}

function startTavukCooking() {
    let req1 = new Promise(function(resolve, reject) { 
        // A mock async action using setTimeout
        setTimeout(() => {
            tavukCooked();
        }, 3000);
    })
    let req2 = new Promise(function(resolve, reject) { 
        // A mock async action using setTimeout
        setTimeout(() => {
            completePotatoForTavukOrder();
        }, 5000);
    })
    let req3 = new Promise(function(resolve, reject) {
        setTimeout(() => {
            prepareDrinkForTavukOrder();
        }, 2000);
    })
    let req4 = new Promise(function(resolve, reject) {
        setTimeout(() => {
            materialsAreReadyForTavuk();
        }, 4000);
    })
    
    Promise.all([req1, req2, req3, req4]).then(setTimeout(() => {
        tavukOrderMessage.textContent = "Your Tavuk Burger order is ready to eat";
        tavukOrderMessage.classList.add('active');
    }, 10000)).then(setTimeout(() => {
        openOrderModal();
        tavukOrderMessage.textContent = "Thank you for your order!";
        tavukOrderMessage.classList.remove('active');
        uncheckCheckBoxes();
    }, 15000))
}

function tavukCooked() {
    tavukOrderMessage.textContent = "Tavuk has been cooked";
    tavukOrderMessage.classList.add('active');
}

function materialsAreReadyForTavuk() {
    tavukOrderMessage.textContent = "Other Materials added";
    tavukOrderMessage.classList.add('active');
}

function completePotatoForTavukOrder() {
    const potatoCheckbox = document.querySelector('[potato]');
    if(potatoCheckbox.checked === false) {
        tavukOrderMessage.textContent = "You have NOT ordered potato chips!";
        tavukOrderMessage.classList.add('active');
    } else {
        tavukOrderMessage.textContent = "Potato chips are ready";
        tavukOrderMessage.classList.add('active');
    }
}

function prepareDrinkForTavukOrder() {
    const colaCheckbox = document.querySelector('[cola]');
    if(colaCheckbox.checked === false) {
        tavukOrderMessage.textContent = "You have NOT ordered any beverage!";
        tavukOrderMessage.classList.add('active');
    } else {
        tavukOrderMessage.textContent = "Your beverage is ready";
        tavukOrderMessage.classList.add('active');
    }
}

/*--------------new function---------------------
Define a function for restarting to renew stocks
------------------------------------------------*/

function renewStocks() {
  kofteScore = 0;
  tavukScore = 0;
  ekmek = 11;
  marul = 5;
  tursu = 5;
  sogan = 5;
  domates = 5;
  patates = 5;
  paketSos = 5;
  cola =  5;
  ekmekValue.textContent = ekmek;
  marulValue.textContent = marul;
  tursuValue.textContent = tursu;
  soganValue.textContent = sogan;
  domatesValue.textContent = domates;
  patatesValue.textContent = patates;
  paketSosValue.textContent = paketSos;
  colaValue.textContent = cola;
  uncheckCheckBoxes();
  kofteScorePara.textContent = 'Kofte: 0';
  tavukScorePara.textContent = 'Tavuk: 0';
  kofteOrderMessage.classList.remove('active');
  tavukOrderMessage.classList.remove('active');
  closeKofteStockErrorMessage();
  closeTavukStockErrorMessage();
  closeAllModals();
  setTimeout(() => {
    openOrderModal();
  }, 1000);
}

function openOrderModal() {
    overlayWindow.classList.add('active');
    ingredientsModal.classList.add('active');
}

function passToBurgerChoice() {
    const requiredEkmek = document.querySelector('[required]');
    if(requiredEkmek.checked === false) {
        setTimeout(() => {
            openMaterialErrorModal();
            setMissingEkmekErrorMessage();
        }, 1000);
        return;
    } else {
        if(checkMaterials()) {
            setTimeout(() => {
                openMaterialErrorModal();
                setMaterialErrorMessage();
            }, 3000);
        } else {setTimeout(() => {
            closeOrderModal();
        }, 1000)
    }
    }
}

function checkMaterials() {
    return ekmek < 0 || marul < 0 || tursu < 0 || sogan < 0 || domates < 0 || patates < 0 || paketSos < 0 || cola < 0;
}

function closeOrderModal() {
    overlayWindow.classList.remove('active');
    ingredientsModal.classList.remove('active');
}

function isMaterialOver(ingredientName) {
   if(ingredientName === "Ekmek") {
    return ekmek === -1
   } else if (ingredientName === "Marul") {
    return marul === -1
   } else if (ingredientName === "Tursu") {
    return tursu === -1
   } else if (ingredientName === "Sogan") {
    return sogan === -1
   } else if (ingredientName === "Domates") {
    return domates === -1
   } else if (ingredientName === "Patates") {
    return patates === -1
   } else if (ingredientName === "Paket Sos") {
    return paketSos === -1
   } else if (ingredientName === "Cola") {
    return cola === -1
   }
}

openOrderModal();