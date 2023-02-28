//write a function that accepts a string and returns an array of words in the string, uniformly formatted with no numbers or punctuation//
function parseText(str) {
    str = str.replace(/[^a-zA-Z/'/]/g, " ").toLowerCase(); //replaces all non-alphas and converts to lowercase. *^ means not*
    const singleWords = str.split(" "); //splits string into an array or words
    const filteredWords = singleWords.filter(singleWords => singleWords !== ""); //Removes empty strings
    // console.log(filteredWords);
    return filteredWords;
}

function wordPairsGenerator(str) { //function to create markov chain words
    const wordsArray= parseText(str);
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

function writeLine(wordPairs, n) {
    let line = "";
    let keyWord = getRandomWord(Object.keys(wordPairs));
    for (let index = 0; index < n; index++) {
        line += keyWord + " ";
        if (wordPairs[keyWord] && wordPairs[keyWord].length > 0) {
            keyWord = getRandomWord(wordPairs[keyWord]);
        }   else {
            keyWord = getRandomWord(Object.keys(wordPairs));
        }
    }
    //work through the formatting of each line
    line = line.trim();//remove the last space
    return line;
}

function getRandomWord(wordsArray) {
    return wordsArray[Math.floor(Math.random() * wordsArray.length)];
}

function generatePoem(wordPairs, numLines, lineLength) {
    let poem = "";
    for (let index = 0; index < numLines; index++) {
        poem += writeLine(wordPairs, lineLength) + "\n";
    }
    return poem;
}

const str = "Ever since I left the city, you, you, you You and me we just don't get along."
const wordPairs = wordPairsGenerator(str);
const poem = generatePoem(wordPairs, 8, 16);
console.log(poem);