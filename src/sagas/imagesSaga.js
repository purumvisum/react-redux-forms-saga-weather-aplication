import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

// todo: return placeholder image if 403 or fail

function getImages(searchCriteria) {
    // const d = new Date();
    // console.log('seconds', d.getSeconds());

    const url = `https://api.gettyimages.com/v3/search/images?phrase=${searchCriteria}`;

    return fetch(url, {
        method: 'GET',
        headers: {
            'Api-Key': 'qarq8aet95tsn2pd8vewnwyp'
        }
    }).then(response => response.json())
        .then(response => {
            const data = response;
            data.name = searchCriteria;
            return data;
        });
}

function* callGetImages() {
    const state = yield select();

    const weatherStatesForTheWeekArray = state.weather.forecast.map(
        (item) => item.text
    );

    const weatherStatesForTheWeek = weatherStatesForTheWeekArray.filter(
        (item, pos, self) => self.indexOf(item) === pos
    );

    let excludeFromWeatherSetState;

    if (state.images.size) {
        excludeFromWeatherSetState = weatherStatesForTheWeek.filter(
            (item) => !state.images.get(item)
        );
    } else {
        excludeFromWeatherSetState = weatherStatesForTheWeek;
    }

    // var counter = 1000

    if (excludeFromWeatherSetState.length) {
        const forecastImages = yield excludeFromWeatherSetState.map((item) => call(getImages, item));

        const imagesMap = state.images.size ? state.images : new Map();

        if (forecastImages) {
            forecastImages.forEach(
                item => {
                    if (!imagesMap.get(item.name) && item.images && (item.images.length > 0)) {
                        imagesMap.set(item.name, item.images[0].display_sizes[0].uri);
                    }
                });

            yield put({ type: 'SET_IMAGE_FORECAST', imagesMap });
        }
    }
}

// listen for an action
export default function* getImagesSaga() {
    yield* takeEvery('GET_IMAGES', callGetImages);
}

