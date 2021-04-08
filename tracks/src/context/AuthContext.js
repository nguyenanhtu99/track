import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { AsyncStorage } from 'react-native';
import { navigate } from '../navigationRef'

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error': 
            return { ...state, errorMessage: action.payload };
        case 'signin':
            return { errorMessage: '', token: action.payload };
        case 'clearErrorMessage':
            return { ...state, errorMessage: ''}
        case 'signout':
            return { token: null, errorMessage: '' }
        default:
            return state;
    }
}

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({ type: 'signin', payload: token });
        navigate('TrackList');
    } else {
        navigate('Signup')
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clearErrorMessage' });
}

const signup = dispatch => async ({ email, password }, callback) => {
        // make api request to sign up with that email and password

        // if we sign up, modify our state, and say that we are authenticated
        // if signing up fails, we probably need to reflect an error message somewhere
        try {
            const response = await trackerApi.post('/signup', { email, password });
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: 'signin', payload: response.data.token });

            // navigate to main flow
            navigate('TrackList');
        } catch (err) {
            console.log(err.message);
            dispatch({ type: 'add_error', payload: "Something went wrong with sign up"});
        }
    }

const signin = (dispatch) => async ({ email, password }, callback) => {
        // Try to signin
        // Handle success by updating state
        // Handle failure by showing error message (somehow)
        try {
            const response = await trackerApi.post('/signin', { email, password});
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: 'signin', payload: response.data.token});

            navigate('TrackList');
        } catch (err) {
            console.log(err.message);
            dispatch({ type: 'add_error', payload: "Something went wrong with sign in" });
        }
    }

const signout = (dispatch) => async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'signout' });
        navigate('loginFlow');
    }

export const { Provider, Context } = createDataContext(
    authReducer,
    { signup, signin, signout, clearErrorMessage, tryLocalSignin },
    { token: null, errorMessage: '' }
)