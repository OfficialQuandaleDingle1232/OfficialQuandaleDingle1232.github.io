document.querySelector(".bannerClose").addEventListener("click", function () {
    this.closest(".banner").style.display = "none";
  });

// Opening the chat box
  function setVisible(){
    if (document.getElementById("textbox").style.visibility === "hidden"){
      document.getElementById("textbox").style.visibility = "visible";
    } else{
      document.getElementById("textbox").style.visibility = "hidden";
    }
    
  }


// Chat bot code  
const chatBody = document.querySelector(".chat__body");
const txtInput = document.querySelector("#txtinput");
const send = document.querySelector(".chat__send");
const loadingEle = document.querySelector(".loading")
 
// Send message with enter key
txtInput.addEventListener("keyup", () => {
    if(event.keyCode === 13){
        renderUserMessage();
    }
});


send.addEventListener("click", () => renderUserMessage())
 
// getting user input
const renderUserMessage = () => {
    const userInput = txtInput.value;
    renderMessageEle(userInput, "user");
    txtInput.value = ""
    renderChatBotResponse(userInput);
};
 
// rendering the response
const renderChatBotResponse = (userInput) => {
    const res = getChatBotResponse(userInput);
    renderMessageEle(res);
}


// rendering a message element 
const renderMessageEle = (txt, type) => {
        let className = "chat__user__message";
        if(type !== "user"){
            className= "chatbot__message"
        }
    const MessageEle = document.createElement("div");
    const txtNode = document.createTextNode(txt);
    MessageEle.classList.add(className);
    MessageEle.append(txtNode);
    chatBody.append(MessageEle);
};

// how chat bot reponds to input
const getChatBotResponse = (userInput) => {
  removeFiller(userInput);
    return responseObject[userInput] == undefined? "I do not understand what you are asking of me, please respond with something else": responseObject[userInput];
};
 
// loading animation
const toggleLoading = (show) => loadingEle.classList.toggle("hide", show);



const loanAmountInput = document.querySelector(".loan-amount");
const interestRateInput = document.querySelector(".interest-rate");
const loanTenureInput = document.querySelector(".loan-tenure");

const loanEMIValue = document.querySelector(".loan-emi .value");
const totalInterestValue = document.querySelector(".total-interest .value");
const totalAmountValue = document.querySelector(".total-amount .value");

const calculateBtn = document.querySelector(".calculate-btn");

let loanAmount = parseFloat(loanAmountInput.value);
let interestRate = parseFloat(interestRateInput.value);
let loanTenure = parseFloat(loanTenureInput.value);

let interest = interestRate / 12 / 100;

let myChart;

function checkValues() {
  let loanAmountValue = loanAmountInput.value;
  let interestRateValue = interestRateInput.value;
  let loanTenureValue = loanTenureInput.value;

  let regexNumber = /^[0-9]+$/;
  if (!loanAmountValue.match(regexNumber)) {
    loanAmountInput.value = "10000";
  }

  if (!loanTenureValue.match(regexNumber)) {
    loanTenureInput.value = "12";
  }

  let regexDecimalNumber = /^(\d*\.)?\d+$/;
  if (!interestRateValue.match(regexDecimalNumber)) {
    interestRateInput.value = "7.5";
  }
}

const displayChart = (totalInterestPayableValue) => {
  const ctx = document.getElementById("myChart").getContext("2d");
  myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Total Interest", "Principal Loan Amount"],
      datasets: [
        {
          data: [totalInterestPayableValue, loanAmount],
          backgroundColor: ["#e63946", "#14213d"],
          borderWidth: 0,
        },
      ],
    },
  });
};

const updateChart = (totalInterestPayableValue) => {
  myChart.data.datasets[0].data[0] = totalInterestPayableValue;
  myChart.data.datasets[0].data[1] = loanAmount;
  myChart.update();
};

const refreshInputValues = () => {
  loanAmount = parseFloat(loanAmountInput.value);
  interestRate = parseFloat(interestRateInput.value);
  loanTenure = parseFloat(loanTenureInput.value);
  interest = interestRate / 12 / 100;
};

const calculateEMI = () => {
  checkValues();
  refreshInputValues();
  let emi =
    loanAmount *
    interest *
    (Math.pow(1 + interest, loanTenure) /
      (Math.pow(1 + interest, loanTenure) - 1));

  return emi;
};

const updateData = (emi) => {
  loanEMIValue.innerHTML = Math.round(emi);

  let totalAmount = Math.round(loanTenure * emi);
  totalAmountValue.innerHTML = totalAmount;

  let totalInterestPayable = Math.round(totalAmount - loanAmount);
  totalInterestValue.innerHTML = totalInterestPayable;

  if (myChart) {
    updateChart(totalInterestPayable);
  } else {
    displayChart(totalInterestPayable);
  }
};

const init = () => {
  let emi = calculateEMI();
  updateData(emi);
};

init();

calculateBtn.addEventListener("click", init);

let image = document.getElementById("changingImg");
let images = ["https://th.bing.com/th/id/OIP.4Ted4pUY5hyW-QHPpXrFDwHaD4?pid=ImgDet&rs=1", "https://th.bing.com/th/id/R.5f5d4ed54dced87f76878ca94de377d5?rik=lsX1P9NllWVkvw&pid=ImgRaw&r=0"];
let index = 1;
setInterval(function(){
    image.src = images[index];
    index = index + 1;
}, 800);
