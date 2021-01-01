import React from 'react';
import {Provider} from 'react-redux';

import './App.css';
import store from './redux/store';
import Application from './containers/Application';
import {BrowserRouter} from 'react-router-dom';

const App = () => {
    return (
        <div>
            <Provider store={store}>
                <BrowserRouter>
                    <Application />
                </BrowserRouter>
            </Provider>
        </div>
    );
};

export default App;
