// import { takeEvery, takeLatest,  } from 'redux-saga';
import { fork, call, put, all, cps, takeEvery } from 'redux-saga/effects';

import { actionTypes } from "redux-form";

function userPositionPromised() {
    const position = {}
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition (
            locationInfo  => position.on({locationInfo}),
            error     => position.on({error}),
            { enableHighAccuracy: true }
        )
    }
    return { getLocation: () => new Promise(locationInfo => position.on = locationInfo) }
}


function* detectLocation() {

    const { getLocation } = yield call(userPositionPromised)

    console.log(getLocation)
    const { error, locationInfo } = yield call(getLocation)
    if (error) {
        console.log('Failed to get user position!', error)
    } else {
        var location = '(' +  locationInfo.coords.latitude + ',' +  locationInfo.coords.longitude +')'
    }

    yield put({type: 'FETCH_WEATHER', location})
    yield put({type: 'DEFAULT_LOCATION', location})

}


// listen for an action
export function* getLocationSaga () {
    yield all([
        takeEvery('GET_DEFAULT_LOCATION', detectLocation),
        // takeEvery(actionTypes.SET_SUBMIT_SUCCEEDED , changeLocation)
    ]);
}

