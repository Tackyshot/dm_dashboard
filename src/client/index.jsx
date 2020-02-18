import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App';

ReactDom.render(<App />, document.getElementById("App"), () => {
    console.log("React App Mounted");
});
