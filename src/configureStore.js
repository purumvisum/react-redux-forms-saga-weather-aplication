import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/reducers';

import root from './sagas/sagas';

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();

    const middleware = applyMiddleware(
        sagaMiddleware
    );

    const createStoreWithMiddleware = compose(
        middleware,
        window.devToolsExtension ? window.devToolsExtension() : f => f
    );

    const store = createStoreWithMiddleware(createStore)(rootReducer);

    sagaMiddleware.run(root);

    return store;
}
