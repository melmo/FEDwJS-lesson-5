jQuery(document).ready(function($) {
	var activePlayer;
	var gameInProgress = false;
	var draw = false;
	var squares = [-1,-1,-1,-1,-1,-1,-1,-1,-1];
	var messages = {
		'oturn': 'Player O\'s turn.<br>Click a square to play.',
        'xturn': 'Player X\'s turn.<br>Click a square to play.',
        'owins': 'Player O wins.<br><a href="#" id="start">Play again?</a>',
        'xwins': 'Player X wins.<br><a href="#" id="start">Play again?</a>',
        'draw': 'It\'s a draw.<br><a href="#" id="start">Play again?</a>',
        'instructions': 'Click a square to play.',
        'select': 'Select',
        'error' : 'You can\'t click there.',
        'nogameerror' : 'Click Start Game to begin.<br><a href="#" id="start">Start Game</a>'
	};

	

	function startGame() {
		// reset the game
		squares = [-1,-1,-1,-1,-1,-1,-1,-1,-1];
		$('.square').removeClass('x').removeClass('o').removeClass('set');
		gameInProgress = true;
		draw = false;
		// select a starting player
		activePlayer = Math.floor(Math.random(2)); // 0 for O, 1 for X
		// show instructions
		showPlayerTurn(activePlayer);
		
	}

	function playerTurn(e) {

		if (!gameInProgress || draw) {
			showMessage('nogameerror');
			return; // exit early if no game in progress
		}

		var square = $(e.currentTarget);
		
		if (square.hasClass('set')) {
			showMessage('error');
			return; // exit early if invalid move
		}

		// mark the square
		if (activePlayer === 0) {
			square.addClass('o set');
		} else {
			square.addClass('x set');
		}

		// store the values in our array
		var id = square.data('id');
		squares[id] = activePlayer; // set the clicked square to 1 or 0
		// check if there is a winner
		// horizontal winner?
		for (var i = 0; i < 3; i++) {
			if ( (squares[i * 3] !== -1) &&
				 (squares[i * 3] === squares[i * 3  + 1]) && 
				 (squares[i * 3] === squares[i * 3  + 2]) ) {
				// theres a winner
				showWinner(activePlayer);
				gameInProgress = false;
				return; // exit because the game is over
			}
		}
		// vertical winner?
		for (var i = 0; i < 3; i++) {

			if ( (squares[i] !== -1) &&
				 (squares[i] === squares[i + 3]) && 
				 (squares[i + 3] === squares[i + 6]) ) {
				// theres a winner
				showWinner(activePlayer);
				gameInProgress = false;
				return; // exit because the game is over
			}
		}

		// left top to right bottom diagonal
		if ( (squares[0] !== -1) &&
			(squares[0] === squares[4]) &&
			(squares[4] === squares[8]) ) {
			// theres a winner
			showWinner(activePlayer);
			gameInProgress = false;
			return; // exit because the game is over
		}

		// left top to right bottom diagonal
		if ( (squares[2] !== -1) &&
			(squares[2] === squares[4]) &&
			(squares[4] === squares[6]) ) {
			// theres a winner
			showWinner(activePlayer);
			gameInProgress = false;
			return; // exit because the game is over
		}

		// check for draw
		draw = true;
		for (var i = 0; i < 9; i++) {
			if (squares[i] === -1) {
				draw = false;
				break; // exit the loop early if there's an empty square
			}
		}

		if (draw) {
			// it's a draw
			showMessage('draw');
			return; // exit because the game is over
		}


		// if no winner, swap to the new player
		activePlayer = activePlayer === 0 ? 1 : 0;
		
		showPlayerTurn(activePlayer);
	}

	function showWinner(winner) {
		if (winner === 0) {
			showMessage('owins');
		} else {
			showMessage('xwins');
		}
	}

	function showPlayerTurn(activePlayer) {
		if (activePlayer === 0) {
			showMessage('oturn');
		} else {
			showMessage('xturn');
		}
	}

	function showMessage(i) {
		$('.game-info').html(messages[i]);
	}

	// bind to the DOM to start
	$('body').on('click','#start',startGame);
	$('.square').on('click',function(e) {
		playerTurn(e);
	});
});