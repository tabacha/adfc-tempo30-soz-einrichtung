





function createBaseLayer(map) {
	var layer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery Â© <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'})
	layer.addTo(map);	
	return layer;
}


function Iconsetzen  (feature, latlng) {
	
		if ($('#OhneTempo30').is(':checked')) {
			if (feature.properties.A === '1')  {icon = KitaGelb}
			if (feature.properties.A ==='2') {icon = SchulIcongelb}
			if (feature.properties.A === '3') {icon = AltenheimIcongelb}
			if (feature.properties.A === '4') {icon = KrankenhausIcongelb}
		}
		
		if ($('#MitTempo30').is(':checked')) {
			 if (feature.properties.A === '1')  {icon = KitaGruen}
			 if (feature.properties.A ==='2') {icon = SchulIcongruen}
			 if (feature.properties.A === '3') {icon = AltenheimIcongruen}
			 if (feature.properties.A === '4') {icon = KrankenhausIcongruen}
		}
		
		
		if ($('#Anforderungen').is(':checked')) {
			 if (feature.properties.A === '1')  {icon = KitaIconrot}
			 if (feature.properties.A ==='2') {icon = SchulIconrot}
			 if (feature.properties.A === '3') {icon = AltenheimIconrot}
			 if (feature.properties.A === '4') {icon = KrankenhausIconrot}
		}
		
			return L.marker (latlng, { icon
			});
							}




function Popup (feature, layer) {
		layer.bindPopup (feature.properties.Name+ '<br>' +feature.properties.Straße +' '+feature.properties.Nummer);



}

	var KitaIconrot = L.icon({
			iconUrl: 'iconFarben/kidsrot.png', 
			iconSize: [18, 18],
			iconAnchor: [9, 9],
			popupAnchor: [ 0, 0],
	});	
	
	var KitaGelb = L.icon({
			iconUrl: 'iconFarben/kidsgelb.png', 
			iconSize: [18, 18],
			iconAnchor: [9, 9],
			popupAnchor: [ 0, 0],
		
		
	});	
	
	var KitaGruen = L.icon({
			iconUrl: 'iconFarben/kidsgruen.png', 
			iconSize: [18, 18],
			iconAnchor: [9, 9],
			popupAnchor: [ 0, 0],
			
			
	});	
	
	var SchulIconrot = L.icon({
			iconUrl: 'iconFarben/classroomrot.png', 
			iconSize: [18, 18],
			iconAnchor:[9, 9],
			popupAnchor: [ 0, 0],
			
			
	});	
	
	var SchulIcongruen = L.icon({
			iconUrl: 'iconFarben/classroomgruen.png', 
			iconSize: [18, 18],
			iconAnchor:[9, 9],
			popupAnchor: [ 0, 0],
			
			
	});	
	
	var SchulIcongelb = L.icon({
			iconUrl: 'iconFarben/classroomgelb.png', 
			iconSize: [18, 18],
			iconAnchor:[9, 9],
			popupAnchor: [ 0, 0],
			
			
	});	
	
				
	var AltenheimIconrot = L.icon({
			iconUrl: 'iconFarben/helprot.png', 
			iconSize: [18, 18],
			iconAnchor: [9, 9],
			popupAnchor: [ 0, 0],
			
			
	});	
	
	var AltenheimIcongruen = L.icon({
			iconUrl: 'iconFarben/helpgruen.png', 
			iconSize: [18, 18],
			iconAnchor: [9, 9],
			popupAnchor: [ 0, 0],
		
		
			
	});	
	
	var AltenheimIcongelb = L.icon({
			iconUrl: 'iconFarben/helpgelb.png', 
			iconSize: [18, 18],
			iconAnchor: [9, 9],
			popupAnchor: [ 0, 0],
			
			
	});	
					
	var KrankenhausIconrot = L.icon({
			iconUrl: 'iconFarben/hospitalrot.png', 
			iconSize: [18, 18],
			iconAnchor: [9, 9],
			popupAnchor: [ 0, 0],
		
		
	});				
	
	var KrankenhausIcongruen = L.icon({
			iconUrl: 'iconFarben/hospitalgruen.png', 
			iconSize: [18, 18],
			iconAnchor: [9, 9],
			popupAnchor: [ 0, 0],
			
			
	});				
	
	var KrankenhausIcongelb = L.icon({
			iconUrl: 'iconFarben/hospitalgelb.png', 
			iconSize: [18, 18],
			iconAnchor: [9, 9],
			popupAnchor: [ 0, 0],
			
			
	});				
	
	

function createLayer (map, checkboxID, URL) {
	
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
							'pointToLayer': Iconsetzen 
							
								
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

			
						
	
	
	
jQuery(document).ready(function(){
	var mymap = L.map('mapid').setView([53.55, 10.09], 10);
	var baseLayer = createBaseLayer(mymap);
	

	
	
createLayer(mymap, 'MitTempo30', 'data/MIT_TEMPO30.json');
	
createLayer(mymap, 'OhneTempo30', 'data/KEIN_TEMPO30.json');
	
createLayer(mymap, 'Anforderungen', 'data/trotzdem_nicht_Tempo30.json');	
	
});
	
	
	
	