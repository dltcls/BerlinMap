
// Erstellen einer Karte mithilfe von Mapbpx, Koordinaten sind die Mitte von Berlin
var map = L.map('map').setView([52.520504, 13.350000], 11); // 11 ist der Zoomfaktor

// AccesToken fuer Mapbox-Karte
var accesToken = 'pk.eyJ1IjoidHJuZyIsImEiOiJjajloZGh3aDgzN3JpMnFyd3R5cnh3bnJ2In0.NCncO8OwCFLCxsrVctdlSA';

// Laden der grauen Karte
L.tileLayer('http://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + accesToken, {
    id: 'mapbox.light',
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>'
}).addTo(map);



// Farbe der jeweiligen Parteien, fuer spaetere Funktion
function getPartyColor(party) {
    return 
        party == 'CDU' ? '#000' :
        party == 'SDP' ? '#d71f1d' :
        party == 'DIE LINKE' ? '#bd3075' :
        party == 'GRÜNE' ? '#78bc1b' :
        party == 'AfD' ? '#4176c2' :
        party == 'FDP' ?  '#ffcc00' :
        '#707173'; // Sonstige
}

/* pars(e)t je Wahlkreis die Erststimmen2013.CSV-Datei nach dem hoechsten
Prozentsatz */
function getWinner(wahlkreis) { // wahlkreis ist eine Zahl wie 75 fuer Mitte
    var erststimme2013 = d3.csv("erststimme2013.csv", function (d) {
      return {
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
    });

    console.log(erststimme2013)

}

// Gestaltung des Layers, der die Wahlbezirksgrenzen aufzeigt
function style(feature) {
    return {
        fillColor: '#dd3497',
        weight: 2, // Dicke der Grenzen
        opacity: 1, // Transparenz der weissen Grenzen
        color: 'white', // Linien der Grenzen sind weiss
        //dashArray: '10', // Abstand der gestrichelten Linien,
        fillOpacity: 0.7 // Transparenz der eingefaerbten Staaten (1 ist blickdicht)
    };
}

// Hinzufuegen der Wahlbezirksgrenzen und der Gestaltung
L.geoJson(wkData, {style: style}).addTo(map);


