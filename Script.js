const Converter_Form = document.getElementById("converter");
const Amount_Inp = document.getElementById("amount");
const From_Currency = document.getElementById("from-currency");
const To_Currency = document.getElementById("to-currency");
const Result_div = document.getElementById("result");

window.addEventListener("load", fetchCurrencies)
Converter_Form.addEventListener("submit", Convert_Currency)


async function fetchCurrencies(){
    // https://api.exchangerate-api.com/v4/latest/USD
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    const data = await response.json();
    // console.log(data);

    const CurrencyOptions = Object.keys(data.rates);
    // console.log(CurrencyOptions);
    
    CurrencyOptions.forEach(currency =>{

        const option1 = document.createElement("option");
        option1.value = currency;
        option1.textContent = currency;
        From_Currency.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = currency;
        option2.textContent = currency;
        To_Currency.appendChild(option2);
    })
}

async function Convert_Currency(e){

    e.preventDefault()

    const amount =parseFloat(Amount_Inp.value);
    const fromCurrency_Value = From_Currency.value;
    const toCurrency_Value = To_Currency.value;

    if (amount<0){
        alert("Please enter a valid amount");
        return;
    }

    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency_Value}`)

    const data = await response.json();

    const rate = data.rates[toCurrency_Value]
    const convertedAmount = (amount * rate).toFixed(2)

    Result_div.textContent = `${amount} ${fromCurrency_Value} = ${convertedAmount} ${toCurrency_Value}`;
}