import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Button, SafeAreaView } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from 'expo-location';

const Home = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
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
      setLocation(location.coords);

      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }, 300); // Reduced duration to 300ms
      }

      // Register captain's location
      const response = await fetch('https://api.example.com/register-captain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: captainId,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }),
      });
      const data = await response.json();
      console.log('Captain registered:', data);

      // Fetch captains near the user's location
      const responseCaptains = await fetch(`https://api.example.com/captains?lat=${location.coords.latitude}&lon=${location.coords.longitude}`);
      const dataCaptains = await responseCaptains.json();
      setCaptains(dataCaptains);
    })();
  }, [captainId]);

  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 300); // Reduced duration to 300ms
    }
  }, [location]);

  const recenterMap = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);

    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 300); // Reduced duration to 300ms
    }
  };

  const handleRegister = () => {
    // Generate a unique ID for the captain
    const id = `captain_${Date.now()}`;
    setCaptainId(id);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: location ? location.latitude : 37.78825,
          longitude: location ? location.longitude : -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {location && (
          <>
            <Marker
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title={"My Location"}
              description={"This is where I am"}
            />
            <Circle
              center={{ latitude: location.latitude, longitude: location.longitude }}
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
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default Home;
