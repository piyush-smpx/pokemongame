/**
 * Created by piyush on 25/7/16.
 */
'use strict';
const mysql = require('mysql');

function createConnection() {
    let connection = mysql.createConnection({
        // host: 'sql11.freemysqlhosting.net',
        // user: 'sql11155241',
        // database: 'sql11155241',
        // password: 'UuGBn2zY5R'
        host : 'localhost',
        user : 'pokemonuser',
        database : 'pokemondb'
    });
    return connection
}

module.exports = {
    addPlayer : function(player, callBackFunc){
        const conn = createConnection();
        conn.connect();
        const queryString = 'INSERT INTO pokemonplayers(name,score) VALUES(' +
            '"' + player.name + '"' +
            ',' + player.score + ');';
        conn.query(queryString,function (err,result) {
            callBackFunc(result);
        });
        conn.end();
    },
    updateScore : function (player, callBackFunc) {
        const conn = createConnection();
        conn.connect();
        //UPDATE pokemonplayers SET score=player.score WHERE id=player.id;
        const queryString = 'UPDATE pokemonplayers SET' +
            ' score=' + player.score +
            ' WHERE id=' + player.id + ';';
        conn.query(queryString, function (err, result) {
            callBackFunc(result);
        });
        conn.end();
    },
    fetchPlayers : function(callBackFunc) {
        const conn = createConnection();
        conn.connect();
        const queryString = 'SELECT * FROM pokemonplayers ORDER BY score DESC;';
        conn.query(queryString, function (err, rows, fields) {
            callBackFunc(rows);
        });
        conn.end();
    }
};
