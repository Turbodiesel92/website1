// My test array of words because I can't seem to get an array of words from the API.
myArrayOfWords = ['Hot', 'Cold', 'Close', 'Far', 'Quiet', 'Loud', 'Missing', 'Help'];

document.addEventListener('DOMContentLoaded', async () => {
    // This will choose a random first word from the array of words and make it the current word.
    let myRandomNumber = Math.floor(Math.random() * myArrayOfWords.length);
    let currrentWord = myArrayOfWords[myRandomNumber];
    // My remote Url
    const remoteUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"
    // Place Holders for GameType and GameScore
    // Will replace with dynamic values when we get to them.
    let gameType = `Fill in the Blanks`
    let gameScore = `100`;

    // Gather up the Troops(HTML elements)
    const listContainer = document.querySelector('.synonym-List')
    const titleBar = document.querySelector('.titlebar')
    const gameTypeTitle = document.querySelector('.difficulty')
    const gamePointScore = document.querySelector('.score')
    const hintText = document.querySelector('.hint')

    // This is for fill in the blank gamestyle
    function getWordFillInBlanks(myWord) {
        fetch(`${remoteUrl}${myWord}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        .then(response => response.json()) 
        .then(myWord => {
            myWord.forEach(element => {
                element.meanings.forEach(myMeanings => {
                    if (myMeanings.synonyms.length > 0) {
                        myMeanings.synonyms.forEach(mySynonym => {
                            if (mySynonym.includes(" ")) {
                                // Skip words with spaces
                            } else {
                                let li = document.createElement('li')
                                li.innerHTML = '????'
                                li.classList.add('list-Item','notFound')
                                li.id = `${mySynonym}`;

                            // This code is for if I want to add back in the tooltip
                                // let span = document.createElement('span')
                                // span.classList.add('toolTip')
                                // span.innerHTML = 'Click for hint!'
                                // li.appendChild(span)
                            // This code is for if I want to add back in the tooltip
                                
                                // This will get the definition of the synonym and display it in the 'hint' section
                                li.addEventListener('click', (e) => {
// Will want to figure out a way to dynamically change dashes to letters for extra hints.
                                    // Add Dashes for the number of letters
                                    let placeholder = e.target.id[0]
                                    for (let i = 0; i < mySynonym.length -1; i++) {
                                        placeholder += '-'
                                    }
                                    // Sets Text in the Box to hangman version of the word
                                    e.target.innerHTML = placeholder
                                    // This fetch is to get the definition of the synonym and display it in the 'hint' section
                                    fetch(`${remoteUrl}${e.target.id}`, {
                                        method: "GET",
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Accept': 'application/json'
                                        },
                                    })
                                    .then(response => response.json())
                                    .then(mySynonymWord => {
                                        mySynonymWord.forEach(element => {
                                            hintText.innerHTML = element.meanings[0].definitions[0].definition
                                        })
                                    })
                                })
                                listContainer.appendChild(li)
                                //console.log(mySynonym)
                            }
                            
                        })
                    }
                })
            })
            
            // This should eventually get the word from the dictionary and make it the current word
            let newWord = currrentWord
            adjustMainWord(newWord)
        })
    };

    function adjustMainWord() {
        titleBar.innerHTML = currrentWord
    }

    function setGameType() {
        gameTypeTitle.innerHTML = gameType;
    }

    function setPoints() {
        gamePointScore.innerHTML = gameScore;
    }
    //getWordList();
    setGameType();
    setPoints();
    getWordFillInBlanks(currrentWord);
})