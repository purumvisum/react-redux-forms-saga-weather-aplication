import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

function getWeather(location) {
    const url = `${'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.' +
            'forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)' +
            '%20where%20text%3D%22'}${location
            }%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys%27%29%20and%20u%3D%27c%27`;

    return fetch(url, {
        method: 'GET'
    }).then(response => response.json())
        .then(data => data);
}

function normalizeResults(result) {
    const normalizedResults = {};
    normalizedResults.forecast = result.query.results.channel.item.forecast;
    normalizedResults.currentCondition = result.query.results.channel.item.condition;
    normalizedResults.currentCondition.title = result.query.results.channel.item.title;

    return normalizedResults;
}


function* callGetWeather(action) {
    const location = action.location;
    const result = yield call(getWeather, location);

    // todo: if no results
    const normalizedResults = yield call(normalizeResults, result);

    if (result.query.results) {
        yield put({ type: 'WEATHER_FETCHED', normalizedResults });
        yield put({ type: 'LOCATION_CHANGED', location });
        yield put({ type: 'GET_IMAGES', result });
        action.resolve ? yield call(action.resolve) : true;
    } else {
        action.reject ? yield call(action.reject, { location: 'No data for that location' }) : true;
    }
    yield put({ type: 'FETCH_WEATHER_DONE', result });
}

// listen for an action
export default function* getWeatherSaga() {
    yield* takeEvery('FETCH_WEATHER', callGetWeather);
}
