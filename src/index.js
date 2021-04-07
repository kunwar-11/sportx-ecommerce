import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {DataProvider} from './contexts/DataContext'
import createMockServer from './server/server'
import reportWebVitals from './reportWebVitals';
createMockServer()
ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
        <App />
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
