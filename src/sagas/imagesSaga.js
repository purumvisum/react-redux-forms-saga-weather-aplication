import { takeEvery, delay } from 'redux-saga';
import { call, put, select, all } from 'redux-saga/effects';



function getImages(searchCriteria) {
    var d = new Date()
    console.log('seconds',d.getSeconds())

    let url = `https://api.gettyimages.com/v3/search/images?phrase=${searchCriteria}`;

    return fetch(url, {
        method: 'GET',
        headers: {
            'Api-Key': `qarq8aet95tsn2pd8vewnwyp`
        }
    }).then(response => response.json())
        .then(data => {
            data.name = searchCriteria
            return data});
}

function* callGetImages() {
    const state = yield select();

    console.log(state.weather.forecast)

    // state.images

    const weatherStatesForTheWeekArray = state.weather.forecast.map((item) => item.text )

    const weatherStatesForTheWeek = weatherStatesForTheWeekArray.filter(function(item, pos, self) {
        return (self.indexOf(item) === pos);
    })

    let excludeFromWeatherSetState;

    if( state.images.size ) {

        console.log("state.images", state.images)

        excludeFromWeatherSetState = weatherStatesForTheWeek.filter(function(item, pos, self) {
            return (!state.images.get(item));
        })
    } else {
        excludeFromWeatherSetState = weatherStatesForTheWeek
    }

    // const weatherStatesForTheWeek = weatherStatesForTheWeekArray.filter(function(item, pos, self) {
    //     return (self.indexOf(item) === pos);
    // })

    console.log('weatherStatesForTheWeek', weatherStatesForTheWeek)
    console.log('excludeFromWeatherSetState', excludeFromWeatherSetState)

    // return state.weather.forecast.filter(function(item) {
    //     return  state.weather.forecast.hasOwnProperty(item) ? false : (seen[item] = true);
    // });

    var counter = 1000


    if (excludeFromWeatherSetState.length) {
        let forecastImages = yield excludeFromWeatherSetState.map((item) => {



            let result = call(getImages, item);
            // if (result.images) {
            //     return  result
            // } else {
            //     return call(delay, counter)
            // }
            // counter = counter+2000
            // console.log('counter',counter)
            // result.name = item.text
            return  result
        });

        console.log("forecastImages", forecastImages)

        let imagesMap = state.images.size ? state.images : new Map();

        if (forecastImages ) {
            forecastImages.map(
                item => {
                    if (!imagesMap.get(item.name) && item.images && (item.images.length > 0)) {
                        imagesMap.set(item.name, item.images[0].display_sizes[0].uri);
                    }
                });

            yield put({type: "SET_IMAGE_FORECAST", imagesMap});
        }
    }


    // const locationImage = yield call(getImages, state.location);
    //
    // yield put({type: "SET_IMAGE_LOCATION", locationImage})

}

// listen for an action
export function* getImagesSaga () {
    yield* takeEvery('GET_IMAGES', callGetImages)
}

