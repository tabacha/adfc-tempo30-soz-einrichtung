
function createBaseLayer(map) {
	var layer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'})
	layer.addTo(map);	
	return layer;
}

function Popup (feature, layer) {
    layer.bindPopup (feature.properties.Name+ '<br>' +feature.properties.Straße +' '+feature.properties.Nummer);
}

function createLayer (map, checkboxID, URL, iconSet) {
    function iconSetzen(feature, latlng) {
        var icon;
        if (feature.properties.A === '1')  {
            icon = iconSet.Kita;
        } else if (feature.properties.A ==='2') {
            icon = iconSet.Schule;
        } else if (feature.properties.A === '3') {
            icon = iconSet.Altenheim;
        } else {
	    // feature.properties.A === '4'
            icon = iconSet.Krankenhaus;
        }
        return L.marker(latlng, { 'icon': icon });

    }
	var layer;
	var $checkbox = $('#'+checkboxID);
	$checkbox.click (function (){
		if ($checkbox.is(':checked')) {	
			if (layer === undefined) {
				$.ajax({
					dataType: 'json',
					url: URL,
					success: function (data) {
						layer = L.geoJSON(data, {
							'onEachFeature': Popup,
							'pointToLayer': iconSetzen 
							
								
							});
						layer.addTo(map);
					}
					
				})	
			} else {
				layer.addTo(map);
			}
		} else {
			map.removeLayer(layer);
	
		}
	});
}

			
function createIconSet(farbe) {
    var KitaIcon = L.icon({
	iconUrl: 'iconFarben/kids'+farbe+'.png', 
	iconSize: [18, 18],
	iconAnchor: [9, 9],
	popupAnchor: [ 0, 0],
    });
    var SchulIcon = L.icon({
	iconUrl: 'iconFarben/classroom'+farbe+'.png', 
	iconSize: [18, 18],
	iconAnchor:[9, 9],
	popupAnchor: [ 0, 0],
    });	
    var AltenheimIcon = L.icon({
	iconUrl: 'iconFarben/help'+farbe+'.png', 
	iconSize: [18, 18],
	iconAnchor: [9, 9],
	popupAnchor: [ 0, 0],
    });
    var KrankenhausIcon = L.icon({
        iconUrl: 'iconFarben/hospital'+farbe+'.png', 
        iconSize: [18, 18],
        iconAnchor: [9, 9],
        popupAnchor: [ 0, 0],    
    });         
    var iconSet = {
        'Kita':KitaIcon,
        'Schule':SchulIcon,
        'Altenheim':AltenheimIcon,
        'Krankenhaus': KrankenhausIcon
    };
    return iconSet;
}
	
	
	
jQuery(document).ready(function(){
    var mymap = L.map('mapid').setView([53.55, 10.09], 10);
    var baseLayer = createBaseLayer(mymap);
    
    createLayer(mymap, 'MitTempo30', 'data/MIT_TEMPO30.json', createIconSet('gruen'));
    createLayer(mymap, 'OhneTempo30', 'data/KEIN_TEMPO30.json', createIconSet('gelb'));
    createLayer(mymap, 'Anforderungen', 'data/trotzdem_nicht_Tempo30.json', createIconSet('rot'));		
});
	
	
	
	
