document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes(e){
    // get the user input
    const number = document.getElementById('number').value;
    
    const xhr = new XMLHttpRequest();
    //get the amount of jokes requested by the user
    xhr.open('GET', `https://api.icndb.com/jokes/random/${number}`, true);
    xhr.onload = function(){
        //check if the json was loaded
        if(xhr.status === 200){
            //validate input
            if(number === ""){
                alert("Please enter a number.");
                clearFields();
            } else if (number == 0){
                alert("Please enter a number greater than 0.");
                clearFields();
            } else {
                const response = JSON.parse(this.responseText);
                
                let output = '';
                //check if the response was valid
                if (response.type === 'success'){
                    response.value.forEach(function(joke){
                        //get the joke and make ut the output
                        output += `
                        <p>${joke.joke}</p>
                        <hr>
                        `
                    });
                    
                } else {
                    output += '<p>Something went wrong</p>'
                };

                //finally attach the html "p" to the existing div
                document.querySelector('.jokes').innerHTML = output;

                //after displaying the jokes, clear the number
                clearFields();
            };
        };
    };
    xhr.send();

    e.preventDefault();
}

//function to clear the number of jokes requested
function clearFields(){
    document.getElementById('number').value = '';
}