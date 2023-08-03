import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import  EntriesContext  from './components/EntriesContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <EntriesContext.Provider> 
    <React.StrictMode>
      <App />
    </React.StrictMode>
  // </EntriesContext.Provider>
);

