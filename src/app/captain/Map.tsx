import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Button } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from 'expo-location';

interface MapComponentProps {
  setLocation: (location: { latitude: number; longitude: number }) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ setLocation }) => {
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [captains, setCaptains] = useState<{ id: string; latitude: number; longitude: number; title: string; description: string }[]>([]);
  const mapRef = useRef<MapView>(null);
  const [captainId, setCaptainId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setCurrentLocation(coords);
      setLocation(coords);

      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }, 300);
      }

      try {
        // Register captain's location
        const response = await fetch('https://api.example.com/register-captain', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: captainId,
            latitude: coords.latitude,
            longitude: coords.longitude,
          }),
        });
        const data = await response.json();
        console.log('Captain registered:', data);

        // Fetch captains near the user's location
        const responseCaptains = await fetch(`https://api.example.com/captains?lat=${coords.latitude}&lon=${coords.longitude}`);
        const dataCaptains = await responseCaptains.json();
        setCaptains(dataCaptains);
      } catch (error) {
        console.error('API Error:', error);
      }
    })();
  }, [captainId, setLocation]);

  const recenterMap = async () => {
    let location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setCurrentLocation(coords);
    setLocation(coords);

    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 300);
    }
  };

  const handleRegister = () => {
    const id = `captain_${Date.now()}`;
    setCaptainId(id);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: currentLocation?.latitude ?? 37.78825,
          longitude: currentLocation?.longitude ?? -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {currentLocation && (
          <>
            <Marker
              coordinate={currentLocation}
              title="My Location"
              description="This is where I am"
            />
            <Circle
              center={currentLocation}
              radius={100}
              strokeColor="rgba(0, 150, 255, 0.5)"
              fillColor="rgba(0, 150, 255, 0.2)"
            />
          </>
        )}
        {captains.map((captain) => (
          <Marker
            key={captain.id}
            coordinate={{ latitude: captain.latitude, longitude: captain.longitude }}
            title={captain.title}
            description={captain.description}
          />
        ))}
      </MapView>
      <View style={styles.buttonContainer}>
        <Button title="Recenter" onPress={recenterMap} />
        <Button title="Register as Captain" onPress={handleRegister} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 25,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    gap: 8,
  },
});

export default MapComponent;

