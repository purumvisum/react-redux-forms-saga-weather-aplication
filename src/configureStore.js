// import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form'
import rootReducer from './reducers/reducers'
import createSagaMiddleware from 'redux-saga'

import root from './sagas/sagas'

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware()

    const middleware = applyMiddleware(
        sagaMiddleware
    );

    const createStoreWithMiddleware = compose(
        middleware,
        window.devToolsExtension ? window.devToolsExtension() : f => f
    );

    const store = createStoreWithMiddleware(createStore)(rootReducer);

    sagaMiddleware.run(root)

    return store;
}
