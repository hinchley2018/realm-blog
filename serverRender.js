import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';

import App from './src/components/App';

const serverRender = () =>
    axios.get('/')
        .then(res => {
            //const initialData = getInitialData(contestId, res.data);
            return {
                initialMarkup: ReactDOMServer.renderToString(
                    <App />
                )
            };
        });


export default serverRender;