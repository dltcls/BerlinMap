/* pars(e)t je Wahlkreis die Erststimmen2013.CSV-Datei nach dem hoechsten
Prozentsatz */
/*function getWinner() { // wahlkreis ist eine Zahl
        var erststimme2013 = d3.csv("erststimme2013.csv", function (d) {
            console.log(d[0]);
        });
        /!*return {
            wahlkreisnummer: +d.Wahlkreisnummer,
            bundestagswahlkreis: d.Bundeswahlkreis,
            cdu: +d.CDU,
            spd: +d.SPD,
            linke: +d.Linke,
            gruene: +d.GRÜNE,
            afd: +d.AfD,
            fdp: +d.FDP,
            sonstige: +d.Sonstige
        };
    }, function (error, rows) {
        alert(rows);
    });*!/

        console.log(erststimme2013);

}*/

d3.csv("erststimme2013.csv", function(data) {
    console.log(data[0]);
});