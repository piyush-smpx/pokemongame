/**
 * Created by piyush on 31/1/17.
 */
'use strict';
const fs = require('fs');

function readDb() {
    let players = fs.readFileSync('./pokemonplayers.json');
    if(players != '') {
        players = JSON.parse(players);
        players.sort(function (a, b) {
            return b.score - a.score;
        });
        return players;
    }
    return [];
}

module.exports = {
    addPlayer : function(data, callBackFunc){
        let players = readDb();
        const newPlayer = {
            id : (players != '') ? (players[players.length - 1].id + 1) : 1,
            name : data.name,
            score : data.score
        };
        players.push(newPlayer);
        players = JSON.stringify(players);
        fs.writeFile('./pokemonplayers.json', players, function (err) {
            if(err)
                console.log(err);
            callBackFunc({insertId : newPlayer.id});
        });
    },
    updateScore : function (data, callBackFunc) {
        let players = readDb();
        for(let i=0; i<players.length; i++){
            if(players[i].id == data.id){
                players[i].score = data.score;
                break;
            }
        }
        players = JSON.stringify(players);
        fs.writeFile('./pokemonplayers.json', players, function (err) {
            if(err)
                console.log(err);
            callBackFunc('score updated');
        });
    },
    fetchPlayers : function(callBackFunc) {
        callBackFunc(readDb());
    }
};
