const responseObject = {
    hello: "Hey! how may I help you today",
    location, where: "please visit the contact page"
   
}


// removing filler words and characters that are unneccessary 
function removeFiller(userInput){

    let userInput = userInput.toLowerCase().replace(/[^\w\s\d]/gi, "");

    const keyWords = ["where", "location", "contact", "calculate", "loan"];

    return userInput;

    userInput = userInput
    
    /*
    .replace(/ a /g, " ")
    .replace(/can/g, " ")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/ I/g, " ")
    .replace(/ can/g, "");
*/
    keyWords.forEach(function(keyWord){
        userInput.match(keyWord);
    });
    console.log
}