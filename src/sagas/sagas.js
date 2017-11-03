import { getWeatherSaga } from './weatherSaga';
import { getLocationSaga } from './locationSaga';
import { getImagesSaga } from './imagesSaga';
import { all } from 'redux-saga/effects';

export default function* root() {
    yield all([
        getWeatherSaga(),
        getImagesSaga(),
        getLocationSaga()
    ])
}
