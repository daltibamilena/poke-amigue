import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  rootElement.style.background = '#221b31';
  rootElement.style.minHeight = '100vh';
}

document.body.style.margin = '0';
document.body.style.background = '#221b31';
document.body.style.minHeight = '100vh';

ReactDOM.createRoot(rootElement!).render(<App />);
