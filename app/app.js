import { Board, Team } from './board';
import { Subject, Observable } from 'rxjs/Rx';

var board = new Board();
board.draw();

console.log(new Team('Kittens'));



var game = {
    startGame: () => {
        console.log('Game started');
        //this.onNext('startGame');
    },
    onNext: (type) => {

    }
};

var start = new Subject();



var tick = Observable.from( start );
tick.subscribe(game.startGame);

start.subscribe(() => console.log('Sub 1'));
start.subscribe(() => console.log('Sub 2'));
start.subscribe(() => console.log('Sub 5'));

start.next();
