import React from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureStore from '../configureStore';
import SearchPage from './SearchPage';

export const store = configureStore();

const Root = () => (
    <Provider store={store}>
        <MuiThemeProvider>
            <SearchPage />
        </MuiThemeProvider>
    </Provider>
);
export default Root;
