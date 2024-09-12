import React from 'react'
import ReactDOM from 'react-dom/client'
import './patch-local-storage-for-github-pages';
import './polyfills';
import App from './App';
import './main.css';
import { BrowserRouter } from 'react-router-dom';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

async function enableMocking() {
  const host = document.baseURI.replace(/\/$/, '');

  return new Promise(async (resolve) => {
    const { worker } = await import('./server/worker');

    const startMockWorker = () => worker.start({
      onUnhandledRequest: 'bypass',
      quiet: false,
      serviceWorker: {
        url: `${import.meta.env.VITE_GH_PAGES ? '/dice-paradise' : ''}/mockServiceWorker.js`,
      },
    });

    let serviceWorkerRegistration = await startMockWorker();
    resolve(serviceWorkerRegistration);

    const verifyAndRestartWorker = runSingleInstance(async () => {
      try {
        const serviceWorkerRegistrations = await navigator.serviceWorker?.getRegistrations() || [];

        const isServiceWorkerOk = serviceWorkerRegistrations.length > 0;
        const isApiOk = await fetch(`${host}/api/healthz`)
          .then(r => r.status === 200 ? r.json().then(p => p.ok).catch(() => false) : false)
          .catch(() => false);

        if (!isServiceWorkerOk || !isApiOk) {
          await serviceWorkerRegistration?.unregister().catch(() => { });
          serviceWorkerRegistration = await startMockWorker().catch(() => null);
        }
      } catch (error) {
        console.error('Error in verifyAndRestartWorker:', error);
        serviceWorkerRegistration = await startMockWorker().catch(() => null);
      }
    });

    setInterval(verifyAndRestartWorker, 1000);
  });
}

ReactDOM.createRoot(document.querySelector('#root')).render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
)
