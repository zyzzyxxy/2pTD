
class Player{
    constructor(symbol, coordinate, playerId, side){
        this.symbol = symbol;
        // this.color = color;
        this.coordinate = coordinate;
        this.oldCoordinate = coordinate;
        this.playerId = playerId;
        this.side = side;
        let towers = {};
    }
}

module.exports = Player;