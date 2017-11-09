import { all } from 'redux-saga/effects';
import getWeatherSaga from './weatherSaga';
import getLocationSaga from './locationSaga';
import getImagesSaga from './imagesSaga';

export default function* root() {
    yield all([
        getWeatherSaga(),
        getImagesSaga(),
        getLocationSaga()
    ]);
}
