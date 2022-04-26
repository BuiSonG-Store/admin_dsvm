// scroll bar
import 'simplebar/src/simplebar.css';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

//
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import {CookiesProvider} from 'react-cookie';

// ----------------------------------------------------------------------

ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <HelmetProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </HelmetProvider>
        </Provider>
    </CookiesProvider>,
    document.getElementById('root')
);

serviceWorker.unregister();

reportWebVitals();
