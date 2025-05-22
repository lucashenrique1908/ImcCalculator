

// IMC DATA
const data = [
  {
    min: 0,
    max: 18.4,
    classification: "Menor que 18,5",
    info: "Magreza",
    obesity: "0",
  },
  {
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
  },
  {
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
  },
  {
    min: 30,
    max: 39.9,
    classification: "Entre 30,0 e 39,9",
    info: "Obesidade",
    obesity: "II",
  },
  {
    min: 40,
    max: 99,
    classification: "Maior que 40,0",
    info: "Obesidade grave",
    obesity: "III",
  },
];

//Seleção de elementos
const imcTable = document.querySelector(".imcTable")
const calcTable = document.querySelector(".calc-container")
const table = document.querySelector(".table-container")
const pSpanInfo = document.querySelector("#imc-info span")
const pSpanNumber = document.querySelector("#imc-number span")
const heightInput = document.querySelector("#height")
const weightInput = document.querySelector("#weight")
const btnCalc = document.querySelector("#calc-btn")
const btnClear = document.querySelector("#clear-btn") 
const backbtn =document.querySelector(".back-btn")

// Funções 
function createTable(data) {
  data.forEach((item)=> {

    const div = document.createElement("div")
    div.classList.add("table-data")
  
    const classification = document.createElement("p")
    classification.innerText = item.classification

    const info = document.createElement("p")
    info.innerText = item.info

    const obesity = document.createElement("p")
    obesity.innerText = item.obesity

    div.appendChild(classification)
    div.appendChild(info)
    div.appendChild(obesity)

    imcTable.appendChild(div)

  })
}
function cleanInputs() {
   heightInput.value= "";
   weightInput.value= "";
   pSpanInfo.classList = ""
  pSpanNumber.classList = ""
}

function validDigits(text) {
  // Permite só dígitos e vírgula, para permitir digitação gradual
  return text.replace(/[^0-9,]/g, "");
}
// Validação para altura (ex: '1,75')
function validHeight(text) {
  const regex = /^[1-2],[0-9]{2}$/;
  return regex.test(text);
}
// Validação para peso (ex: '70,5' ou '45')
function validWeight(text) {
  const regex = /^[0-9]+(,[0-9]+)?$/;
  return regex.test(text);
}

function calcImc(weight, height) {
  const imc = (weight / (height * height)).toFixed(1)
  return imc
  
}
function ShowOrHide() {
  calcTable.classList.toggle("hide")
  table.classList.toggle("hide")
}

// iniciaalizações


createTable(data)
// eventos

if (heightInput && weightInput) {
  [heightInput, weightInput].forEach((el) => {
    el.addEventListener("input", (e) => {
      const updatedValid = validDigits(e.target.value);
      e.target.value = updatedValid;
    });
  });
} else {
  console.error("Campos de input não encontrados — verifique se o HTML está correto.");
}
btnCalc.addEventListener("click", (e)=>{
e.preventDefault()

 const weightRaw = weightInput.value.trim();
const heightRaw = heightInput.value.trim()

  
  // Validação da altura e peso
  if (!validWeight(weightRaw)) {
    alert("Peso inválido. Use somente números e vírgula. Exemplo: 70,5");
    return;
  }
  if (!validHeight(heightRaw)) {
    alert("Altura inválida. Use o formato N,NN (ex: 1,75).");
    return;
  }
  const weight = +weightInput.value.replace(",",".")
  const height = +heightInput.value.replace(",",".")
  
if (!weight || !height) return


const imc = calcImc(weight, height)

let info 

data.forEach((item)=>{
  if(imc >= item.min & imc <= item.max ) {
    info = item.info
  }

})

if(!info) return

pSpanNumber.innerText = imc
pSpanInfo.innerText = info
switch (info) {
  case "Magreza": 
  pSpanInfo.classList.add("low")
  pSpanNumber.classList.add("low")
  break

  case "Normal": 
  pSpanInfo.classList.add("good")
  pSpanNumber.classList.add("good")
  break

  case "Sobrepeso": 
  pSpanInfo.classList.add("low")
  pSpanNumber.classList.add("low")
  break

  case "Obesidade": 
  pSpanInfo.classList.add("medium")
  pSpanNumber.classList.add("medium")
  break

  case "Obesidade grave": 
  pSpanInfo.classList.add("high")
  pSpanNumber.classList.add("high")
  break
}

ShowOrHide()
})


btnClear.addEventListener("click", (e)=>{
  e.preventDefault()
  cleanInputs()
})
backbtn.addEventListener("click", ()=> {
  cleanInputs()
  ShowOrHide()
})
