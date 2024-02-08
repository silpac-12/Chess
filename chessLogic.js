var board = null
var game = new Chess()
var blackEval = 1000;
var whiteEval = -1000;
var pieces = [];
var currentPosition = [];
var count = 0;


function init() {
    //for (let i = 0; i < 32; i++) {
    //    pieces[i] = board.position();
    //}
    //pieces = board.position();
}


function pieceEval() {
    count = 0;
    const currentPosition = Object.values(board.position());
    
    const takenPieces = [];
    console.log("Initial Pieces: ",pieces)
    console.log("Current Pieces: ",currentPosition)
    for (const square in currentPosition) {
        //console.log(`Piece on square ${square}: ${position[square]}`);
        count++;
    }

    console.log(count)
    if (count == 32) {
        console.log("All pieces on board");
        return;
    } else {
        console.log("piece taken")

        //takenPieces.push(pieces.filter(piece => !currentPosition.includes(piece)));

        for (let i = 0; i < pieces.length; i++) {
            if (currentPosition.includes(pieces[i])) {

            } else {
                takenPieces.push(pieces[i]);
            }
        }

    }
    // Output the taken pieces
    console.log('Taken pieces:', takenPieces);
}

function onDragStart(source, piece, position, orientation) {
    // do not pick up pieces if the game is over
    if (game.game_over()) return false

    // only pick up pieces for White
    if (piece.search(/^b/) !== -1) return false
    
}

function makeRandomMove() {
    var possibleMoves = game.moves()

    // game over
    if (possibleMoves.length === 0) return

    var randomIdx = Math.floor(Math.random() * possibleMoves.length)
    game.move(possibleMoves[randomIdx])
    board.position(game.fen())
    pieceEval();
}

function onDrop(source, target) {
    // see if the move is legal
    
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
    })

    // illegal move
    if (move === null) return 'snapback'

    // make random legal move for black

    //New
    //console.log('Current position as an Object:')
    //console.log(board.position())
    //console.log(board.position())
    //console.log("Fen")
    //console.log(board.fen());
    //console.log(game.board());
    

    //

    window.setTimeout(makeRandomMove, 250)
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd() {
    board.position(game.fen())
    //pieceEval();
}

var config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
}
board = Chessboard('myBoard', config)
pieces = Object.values(board.position());
//for (piece in initialPieces) {
//    pieces.push(piece);
//}
$('#startBtn').on('click', board.start)
$('#clearBtn').on('click', board.clear)