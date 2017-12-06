//////////////////////////////////////////////////////////////////////////
//																		//
//		Caitlin Everett		Dec 6 2017			NWBC - M/w Cohort		//
//																		//
//		---------------------------										//
//      Hangman Game - CODE SUMMARY										//
//		---------------------------										//
//																		//
//		//on document ready, app picks game theme and word				//
//		//creates HTML structure										//
//																		//
//		//on keyUp, player chooses letters 								//
//			//UI shows current letter choice							//
//			//short delay before next step 								//
//																		//
//			//letter is registered as correct or incorrect guesses 		//
//			//short delay before next step								//
//																		//
//			//if letter completes word, register win!					//
//			//play congratulations stuff								//
//			//restart game with new word and ui theme 					//
//			//make sure not to choose previous word or theme			//
//																		//
//			//if guess is not a win, # guesses left decrements  		//
//			//letter registers to correct or incorrect UI sprout 		//
//																		//
//			//prompt user to enter another letter in ui 				//
//			//keyUp cycle loops											//
//																		//
//																		//
//////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////
////////////global objects and variables
/////////////////////////////////////////
//for choosing a word at random
var plantGame = {
	wordArray: [`shrub`, `tree`, `sprout`, `seed`, `forest`],
}

var arrayIndex = 1; //helps pick a word
var currentGame = plantGame; //sets to random game style
var word = currentGame.wordArray[arrayIndex]; //easier to access var for switching contexts
var correctGuesses = 0;  //counts correct guesses for current word
var guessNum = word.length;
var wins = 0;
var losses = 0;
var guesses = 0;
var wrongLetters = "";

//regex function to check if input is a letter
function isAlpha(str) {
  return /^[a-zA-Z]+$/.test(str);
}



///////////////////////////////////////////////////////////////////
////////////ui setup 
/////////////////////////////////////////
//on document ready, app will pick game theme & word randomly & create HTML structure
$(`document`).ready(function(){
	//for each letter in the current word
	var letWidth = (($(`#letters`).width()/word.length)-40);

	//set guess cap to word length
	guesses = word.length + 3;

	//set UI up with blank score card
	$(`#wins`).text(wins);
	$(`#losses`).text(losses);
	$(`#guesses`).text(guesses);

	//for each letter in the current word
	for (var i = 0; i < word.length; i++) {
			var newLetter = $(`<div>`);
			newLetter.addClass(`letter letter${i}`);		
			$(`#letters`).append(newLetter);
			$(`.letter`).width(letWidth);
		};	


	//resizes letter div on document size change
	$(window).resize(function(){
		var letWidth = (($(`#letters`).width()/word.length)-40);
		$(`.letter`).width(letWidth);
	//console.log(`resize happened`)
	});

});


///////////////////////////////////////////////////////////////////
////////////game code  -- starts when keypress event happens
/////////////////////////////////////////

////////////////////////////////////////
//on keyUp, player has chosen first letter
//main event handler
////////////////////////////////////////
	$(document).keypress(function(event){
		//console.log(`keyup`);

		//var for contents of keypress event
		var key = event.key;

		//if the entry is not alphabetical, tell user `use a letter!`
		if(! isAlpha(key)){
			$(`#keyPress`).text(`You must enter a letter to play`);
		}
		//if the entry is not alphabetical, get user to enter correct type
		else{
			//show the letter in the UI
			$(`#keyPress`).text(`You have entered ${key}`);

			//compare it to contents of current word
			compareString(key);
		}


		///////////////////////////////
		//COMPARE INPUT TO WORD
		function compareString(key){
			//comparison variable

			if(word.indexOf(key) > -1){
				foundLetter(key);
			}else{
				noMatch(key);
			}
		};

		///////////////////////////////
		//THERE IS A MATCH 
		function foundLetter(key){
			for (var i = 0; i < word.length; i++) {

				//if there is a match in one or more places in the word array
				if(key.toLowerCase() == word[i]){

					//change text in UI
					$(`.letter${i}`).text(key);	
					correctGuesses +=1;

					//check to see if user has won yet
					//congratulate them if they did win
					if(correctGuesses == word.length){
						$(`#keyPress`).text(`You win!`);
						wins +=1;
						$(`#wins`).text(wins);
						$(`#letters`).empty;
					}
				}

			}
		}

		///////////////////////////////
		//THERE IS NOT A MATCH 
		function noMatch(key){	

			guesses -=1; 
			$(`#guesses`).text(guesses);

			if(wrongLetters.indexOf(key) <= -1){
				var wrongLetter = $(`<div>`);
				wrongLetter.addClass(`wrongLetter`);
				wrongLetter.text(key);		
				$(`#guessWell`).append(wrongLetter);
				wrongLetters += key;
			}

			if(guesses == 0){
				$(`#keyPress`).text(`Better luck next time`);
				losses +=1;
				$(`#losses`).text(losses);
			}
			


		};
		
	});


	//UI shows current letter choice
	//short delay before next step 

	//letter is registered as correct or incorrect guess
	//short delay before next step

	//if letter completes word, register win!
	//play congratulations stuff
	//restart game with new word and ui theme
	//make sure not to choose previous word or theme

	//if guess is not a win, # guesses left decrements 
	//letter registers to correct or incorrect UI spot

	//prompt user to enter another letter in UI
	//keyUp cycle loops



