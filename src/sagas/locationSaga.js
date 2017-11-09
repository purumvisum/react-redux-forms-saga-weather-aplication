import { call, put, all, takeEvery } from 'redux-saga/effects';

function userPositionPromised() {
    const position = {};
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            locationInfo => position.on({ locationInfo }),
            error => position.on({ error }),
            { enableHighAccuracy: true }
        );
    }
    return { getLocation: () => new Promise(locationInfo => { position.on = locationInfo; }) };
}


function* detectLocation() {
    const { getLocation } = yield call(userPositionPromised);
    let location;

    const { error, locationInfo } = yield call(getLocation);
    if (error) {
        console.log('Failed to get user position!', error);
    } else {
        location = `(${locationInfo.coords.latitude},${locationInfo.coords.longitude})`;
    }

    yield put({ type: 'FETCH_WEATHER', location });
    yield put({ type: 'DEFAULT_LOCATION', location });
}

// listen for an action
export default function* getLocationSaga() {
    yield all([
        takeEvery('GET_DEFAULT_LOCATION', detectLocation)
    ]);
}

