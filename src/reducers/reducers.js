import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import weather from './weather';
import location from './location';
import images from './images';

const rootReducer = combineReducers({
    form: formReducer,
    weather,
    location,
    images
});

export default rootReducer;