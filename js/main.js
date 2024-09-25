fetch("https://api.currencyfreaks.com/v2.0/rates/latest?apikey=48b2e99f11404969b306694e2610df9c")
.then((result)=>{

    // Convert The Response From API to Java Script Object

    let currency = result.json();

    return currency;
})
.then((currency)=>{        
    // Get Access to Prices

    currencyRates = currency.rates;

    // Get Access to EGP and SAR price From API

    let egpPrice = currencyRates["EGP"]; 
    let sarPrice = currencyRates["SAR"];

    // Get Access to EGP and SAR Inputs

    let usdInput = document.getElementById("usd");
    let egpOutput = document.getElementById("egp");
    let sarOutput = document.getElementById("sar");

    // Declare a Function To Calc the Output Of EGP and sar From the USD Value

    function calcTheOutput(){
        // Filter the usdInput value From Strings

        let usdValue = parseFloat(usdInput.value);

        // Condition if the result is not a number or Empty to reset the egp and sar output to Zero 

        if(isNaN(usdValue) || usdInput === ""){
            egpOutput.value  = "0";
            sarOutput.value  = "0";
            return;
        };

        // Calc Process and i use tofixed() to make the result float  in 2 index After Decimal point like   100.15

        let egpValue = (usdValue * egpPrice).toFixed(2);
        let sarValue = (usdValue * sarPrice).toFixed(2);

        // Update the output values to new values after calc Process

        egpOutput.value = egpValue;
        sarOutput.value = sarValue;
    };

    // call the Function on event "Typing in input Field" ==> input
 
    usdInput.addEventListener("input",calcTheOutput);


    

    // Using Catch to catch the Error and print it in console 

}).catch((error)=>{
    console.error("Error fetching currency rates:",error);
});

// function use to stop the default action in form "Reload The page" and Save the Values To continue calc Process

function doNotGo(event) {
  event.preventDefault();
};