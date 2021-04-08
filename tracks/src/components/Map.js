import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

const Map = () => {
    let points = [];

    for (let i = 0; i < 5; i++) {
        points.push({
            latitude: 10.762622 + i*0.01,
            longitude: 106.660172 + i*0.02
        })
    }

    return <MapView
        style={styles.map}
        initialRegion={{
            latitude: 10.762622,
            longitude: 106.660172,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
        }}
    >
        <Polyline
            coordinates={points}
        />
    </MapView>
};

const styles = StyleSheet.create({
    map: {
        height: 300
    }
});

export default Map;