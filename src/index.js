import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import * as process from 'process';

import reportWebVitals from './reportWebVitals';
import router from './router/router';
import { RouterProvider } from 'react-router';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
	palette: {
		mode: 'dark'
	}
});
window.global = window;
window.process = process;
window.Buffer = [];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	//TODO: Uncomment StrictMode later during deployment
	// <React.StrictMode>
	<ThemeProvider theme={darkTheme}>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</ThemeProvider>
	/* </React.StrictMode> */
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
