// Erstellen einer Karte mithilfe von Mapbpx, Koordinaten sind die Mitte von Berlin
var map = L.map('map').setView([52.520504, 13.5000], 11); // 11 ist der Zoomfaktor

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
    switch(party) {
        case 'CDU':
            return '#000';
            break;
        case 'SPD':
            return '#d71f1d';
            break;
        case 'DIE LINKE':
            return '#bd3075';
            break;
        case 'GRÜNE':
            return '#78bc1b';
            break;
        case 'AfD':
            return '#4176c2';
            break;
        case 'FDP':
            return '#ffcc00';
            break;
        default:
            return '#707173';
            break;

    }
       
}



/* gibt die gewonnen Direktmandate des jeweiligen Wahlkreises zurueck */
function getWinner(wahlkreis) { // wahlkreis ist eine Zahl wie 75 fuer Mitte

    switch(wahlkreis) {
        case 75:
            return getPartyColor('SPD');
            break;
        case 76:
            return getPartyColor('DIE LINKE');
            break;
        case 77:
            return getPartyColor('CDU');
            break;
        case 78:
            return getPartyColor('SPD');
            break;
        case 79:
            return getPartyColor('CDU');
            break;
        case 80:
            return getPartyColor('CDU');
            break;
        case 81:
            return getPartyColor('CDU');
            break;
        case 82:
            return getPartyColor('SPD');
            break;
        case 83:
            return getPartyColor('GRÜNE');
            break;
        case 84:
            return getPartyColor('DIE LINKE');
            break;
        case 85:
            return getPartyColor('DIE LINKE');
            break;
        case 86:
            return getPartyColor('DIE LINKE');
            break;

        default:
            return getPartyColor('');
            break;
    }
    
}

// Gestaltung des Layers, der die Wahlbezirksgrenzen aufzeigt
function style(feature) {
    return {
        fillColor: getWinner(feature.properties.WKR_NR),
        weight: 2, // Dicke der Grenzen
        opacity: 1, // Transparenz der weissen Grenzen
        color: 'white', // Linien der Grenzen sind weiss
        fillOpacity: 0.7 // Transparenz der eingefaerbten Staaten (1 ist blickdicht)
    };
}

function highlightFeature(e) {
    wahlergebnisse.update(e.target.feature.properties);
}

function resetHighlight(e) {
    wahlergebnisse.update(e.target.feature.properties);
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
    });
}


// Hinzufuegen der Wahlbezirksgrenzen und der Gestaltung
L.geoJson(wkData, {style: style, onEachFeature: onEachFeature}).addTo(map);

var wahlergebnisse = L.control();
wahlergebnisse.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'wahlergebnis'); // Div mit Klasse "wahlergebnis" wird erstellt
    return this._div;
}

wahlergebnisse.update = function (props) {
    try {
        console.log(props.WKR_NR);
        var wkrnr = props.WKR_NR;
       this._div.innerHTML ='<img src =\'Balkendiagramme/' + wkrnr + '.png\' height=\'350\'>';
    } catch(err) {
        console.log(err);
    }

}

wahlergebnisse.addTo(map);
