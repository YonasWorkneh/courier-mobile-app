import React, { useRef } from "react";
import { Dimensions, View } from "react-native";
import { WebView } from "react-native-webview";

interface LeafletMapProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
  initialLocation?: { latitude: number; longitude: number };
  height?: number;
}

const { width, height } = Dimensions.get("window");

const LeafletMap: React.FC<LeafletMapProps> = ({
  onLocationSelect,
  initialLocation = { latitude: 9.0192, longitude: 38.7525 }, // Addis Ababa coordinates
  height: mapHeight = height,
}) => {
  const webViewRef = useRef<WebView>(null);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>Leaflet Map</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                overflow: hidden;
            }
            #map {
                height: 100vh;
                width: 100vw;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 1;
            }
            .leaflet-control-container {
                z-index: 1000;
            }
            .location-info {
                position: fixed;
                top: 10px;
                left: 10px;
                right: 10px;
                background: white;
                padding: 10px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                z-index: 10000;
                font-size: 14px;
            }
            .confirm-btn {
                position: fixed;
                bottom: 20px;
                left: 20px;
                right: 20px;
                background: #1141AF;
                color: white;
                border: none;
                padding: 18px;
                border-radius: 12px;
                font-size: 18px;
                font-weight: bold;
                z-index: 999999;
                cursor: pointer;
                box-shadow: 0 6px 20px rgba(17, 65, 175, 0.4);
                display: block;
                width: calc(100vw - 40px);
                margin: 0;
                text-align: center;
            }
            .confirm-btn:active {
                background: #0d2f8a;
            }
        </style>
    </head>
    <body>
        <div class="location-info" id="locationInfo">
            <div>Tap on the map to select a location</div>
            <div id="coordinates"></div>
            <div id="address"></div>
        </div>
        <div id="map"></div>
        <button class="confirm-btn" id="confirmBtn" onclick="confirmLocation()">
            Confirm Location
        </button>

        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <script>
            let map;
            let marker;
            let selectedLocation = null;
            let selectedAddress = '';

            // Initialize map
            function initMap() {
                map = L.map('map').setView([${initialLocation.latitude}, ${initialLocation.longitude}], 13);
                
                // Add OpenStreetMap tiles
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors'
                }).addTo(map);

                // Add initial marker
                marker = L.marker([${initialLocation.latitude}, ${initialLocation.longitude}], {
                    draggable: true
                }).addTo(map);

                selectedLocation = {
                    lat: ${initialLocation.latitude},
                    lng: ${initialLocation.longitude}
                };

                // Update location info
                updateLocationInfo(${initialLocation.latitude}, ${initialLocation.longitude});

                // Handle map clicks
                map.on('click', function(e) {
                    const lat = e.latlng.lat;
                    const lng = e.latlng.lng;
                    
                    // Update marker position
                    marker.setLatLng([lat, lng]);
                    
                    selectedLocation = { lat, lng };
                    updateLocationInfo(lat, lng);
                });

                // Handle marker drag
                marker.on('dragend', function(e) {
                    const lat = e.target.getLatLng().lat;
                    const lng = e.target.getLatLng().lng;
                    
                    selectedLocation = { lat, lng };
                    updateLocationInfo(lat, lng);
                });
            }

            // Update location information display
            function updateLocationInfo(lat, lng) {
                document.getElementById('coordinates').textContent = 
                    'Coordinates: ' + lat.toFixed(6) + ', ' + lng.toFixed(6);
                
                // Simple reverse geocoding (you can replace with a proper service)
                selectedAddress = 'Location: ' + lat.toFixed(4) + ', ' + lng.toFixed(4);
                document.getElementById('address').textContent = selectedAddress;
            }

            // Confirm location selection
            function confirmLocation() {
                if (selectedLocation) {
                    // Send location data to React Native
                    window.ReactNativeWebView.postMessage(JSON.stringify({
                        type: 'locationSelected',
                        latitude: selectedLocation.lat,
                        longitude: selectedLocation.lng,
                        address: selectedAddress
                    }));
                }
            }

            // Initialize map when page loads
            document.addEventListener('DOMContentLoaded', initMap);
        </script>
    </body>
    </html>
  `;

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === "locationSelected") {
        onLocationSelect(data.latitude, data.longitude, data.address);
      }
    } catch (error) {
      console.error("Error parsing WebView message:", error);
    }
  };

  return (
    <View style={{ flex: 1, height: mapHeight, width: width }}>
      <WebView
        ref={webViewRef}
        source={{ html: htmlContent }}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        scalesPageToFit={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        mixedContentMode="compatibility"
        originWhitelist={["*"]}
      />
    </View>
  );
};

export default LeafletMap;
