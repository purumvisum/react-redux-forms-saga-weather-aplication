import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import SearchPage from './SearchPage';

import { root } from '../sagas/weatherSaga'

export const store = configureStore();


const Root = () => (
    <Provider store={store}>
        <MuiThemeProvider>
            <SearchPage/>
        </MuiThemeProvider>
    </Provider>
);
export default Root;
