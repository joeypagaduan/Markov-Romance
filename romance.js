//write a function that accepts a string and returns an array of words in the string, uniformly formatted with no numbers or punctuation//
function parseText(str) {
    str = str.replace(/[^a-zA-Z/'/]/g, " ").toLowerCase(); //replaces all non-alphas and converts to lowercase. *^ means not*
    const singleWords = str.split(" "); //splits string into an array or words
    const filteredWords = singleWords.filter(singleWords => singleWords !== ""); //Removes empty strings
    // console.log(filteredWords);
    return filteredWords;
}

function wordPairsGenerator(str) { //function to create markov chain words
    const wordsArray = parseText(str);
    const wordPairs = {}; //init. empty obj. to store markov chain
    //loop through the created array (filteredWords)
    for (let index = 0; index < wordsArray.length - 1; index++) {
        let keyWord = wordsArray[index]; //init. current (keyWord) word
        let nextWord = wordsArray[index + 1]; //init. the next word

        if (!wordPairs[keyWord]) { //if the current(keyWord) is not already a key in the array, add it
            wordPairs[keyWord] = []; 
        }

        wordPairs[keyWord].push(nextWord); //Add the next word to the array for the current word
    }
    // console.log(wordPairs);
    return wordPairs;
}
// wordPairsGenerator("Ever since I left the city, you, you, you You and me we just don't get along")

function writeLine(wordPairs, lineLength) {
    let line = ""; //init. empty string for each line
    let keyWord = getRandomWord(Object.keys(wordPairs));
    for (let index = 0; index < lineLength; index++) {
        line += keyWord + " ";
        if (wordPairs[keyWord] && wordPairs[keyWord].length > 0) { //checks to see if the current word (keyWord) exists in the wordPairs array as a key AND that the array following that word is not empty
            keyWord = getRandomWord(wordPairs[keyWord]); //getRandomWord (next function) will randomly select a word from the array that followed the keyWord in the orig. text. The NEW WORD will then become the keyWord and the loop continues.
        }   else {
            keyWord = getRandomWord(Object.keys(wordPairs)); //this is for when we have a word that doesn't have any following words. In this case, we will get a random word from wordPairs.
        }
    }
    //work through the formatting of each line
    line = line.trim();//remove the last space
    return line;
}

function getRandomWord(wordsArray) { //inputs wordsArray as parameter
    return wordsArray[Math.floor(Math.random() * wordsArray.length)]; //Math.random() generates a random # bet. 0 & 1. Then it's multiplied by the length of the array (wordsArray.length) so that the generated index is within the bounds of the array. Math.floor() rounds the result down to the nearest integer which corresponds to the new random word's index. Then it returns that word.
}

function generatePoem(wordPairs, numLines, lineLength) {
    let poem = "";
    for (let index = 0; index < numLines; index++) {
        poem += writeLine(wordPairs, lineLength) + "\n";
    }
    return poem;
}

function generatePoemFromForm(event) {
    event.preventDefault(); // Prevent the form from submitting and reloading the page
  
    // Get the values from the form fields
    const str = document.getElementById('string-input').value;
    const numLines = document.getElementById('num-lines').value;
    const lineLength = document.getElementById('line-length').value;
  
    // Parse the text and generate the poem
    const wordPairs = wordPairsGenerator(str);
    const poem = generatePoem(wordPairs, numLines, lineLength);
  
    // Display the generated poem in the HTML
    const poetryOutput = document.getElementById('poetry-output');
    poetryOutput.innerHTML = '<pre>' + poem + '</pre>';
  }
  
  document.getElementById('poetry-form').addEventListener('submit', generatePoemFromForm);


// const str = "Ever since I left the city, you, you, you You and me we just don't get along."
// const wordPairs = wordPairsGenerator(str);
// const poem = generatePoem(wordPairs, 8, 8);
// console.log(poem);