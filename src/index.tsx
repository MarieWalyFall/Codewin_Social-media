import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import 'styles/index.css';
import App from './App';

import { store } from './store';

// Create root and render the application
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    // </React.StrictMode>
  );
}
