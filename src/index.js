import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import store from './redux/store'
import App from './App';
import { Provider } from "react-redux";
import {EmailProvider} from "./components/userPages/EmailContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <EmailProvider>
        <App />
      </EmailProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);



