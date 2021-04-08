import { useState, useEffect } from 'react';
import { 
    Accuracy,
    requestPermissionsAsync,
    watchPositionAsync
} from 'expo-location';

export default (shouldTrack, callback) => {
    const [ err, setErr ] = useState(null);
    const [subscriber, setSubcriber] = useState(null);

    const startWatching = async () => {
        try {
        await requestPermissionsAsync();
        const sub = await watchPositionAsync({
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10
            },
            callback
            );
        setSubcriber(sub);
        } catch (err) {
        setErr(err);
        }
    }

    useEffect(() => {
        if (shouldTrack) {
            startWatching();
        } else {
            subscriber.remove();
            setSubcriber(null);
        }
    }, [shouldTrack]);

    return [err];
}