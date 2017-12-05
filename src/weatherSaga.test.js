import test from 'tape';

import { fetchWeather } from '../actions/actions';

import { put, delay, take, call, takeEvery } from 'redux-saga/effects';
import getLocationSaga from '../sagas/locationSaga'
import getWeatherSaga from '../sagas/weatherSaga'

// test('getLocationSaga Saga tests', (assert) => {
//     const generator = getLocationSaga()
//
//     assert.deepEqual(
//         generator.next().value,
//         console.log(generator.next().value),
//         take('GET_DEFAULT_LOCATION'),
//         'it should wait for getting default location'
//     );
//
//     assert.end()
// });

// let generator;

describe('My Saga', () => {

    const detectLocationGenerator = detectLocation();

    it('should call detectLocation when GET_DEFAULT_LOCATION action', () => {
        const generator = getLocationSaga();
        const action = () => ({ type: 'GET_DEFAULT_LOCATION' })

        const actualYield = generator.next(action()).value;
        // if there some action it is nessessary to call 'detectLocation' function
        expect(actualYield).toEqual(takeEvery('GET_DEFAULT_LOCATION', detectLocation));
    });

    it ('should call userPositionPromised when called detectLocation', () => {
        // const detectLocationGenerator = detectLocation();

        const actualYield = detectLocationGenerator.next().value;

        expect(actualYield).toEqual(call(userPositionPromised))
    });

    it ('should call userPositionPromised when called detectLocsdgdfgation', () => {

        let getLocation = {
            getLocation: () => new Promise(locationInfo => { position.on = locationInfo; })
        }

        const actualYield = detectLocationGenerator.next(getLocation).value;
        // console.warn(actualYield)

        expect(actualYield).toEqual(call(getLocation.getLocation))
    })

    it ('123', () => {

        // let error = () => { return false};
        // let locationInfo = {
        //     coords: {
        //         latitude:53.893237299999996,
        //         longitude:27.5379579
        //     }
        // }
        // let location = `(${locationInfo.coords.latitude},${locationInfo.coords.longitude})`;

        let location = 'Minsk';

        const actualYield = detectLocationGenerator.next().next(fetchWeather(location));

        console.warn(actualYield)

        expect(actualYield).toEqual(put(fetchWeather(location)))
    })
});


// .next()
//     .call(myFunc)
//
//     .next(myFuncResult)
//     .put({type: 'RESULT_DATA', payload: 'hi from sync'})
