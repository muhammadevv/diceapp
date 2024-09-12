import { Route, Routes } from "react-router-dom";
import Loading from "./Loading";
import HomePage from "./HomePage";
import * as TonConnectUI from '@tonconnect/ui';
import React, { useState, useEffect } from 'react';
import TonConnect from '@tonconnect/sdk';

const App = () => {
  const [tonConnect, setTonConnect] = useState(null);
  const [wallets, setWallets] = useState([]);
  const [connectedWallet, setConnectedWallet] = useState(null);


  useEffect(() => {
    const initTonConnect = async () => {
      const tonConnectInstance = new TonConnect();
      setTonConnect(tonConnectInstance);

      // Walletlarni olish
      const availableWallets = await tonConnectInstance.getWallets();
      setWallets(availableWallets);
    };

    initTonConnect();
  }, []);

  const connectWallet = async (wallet) => {
    try {
      await tonConnect.connect({ jsBridgeKey: wallet.jsBridgeKey }); // connect funksiyasi ishlatiladi
      setConnectedWallet(wallet);
      console.log('Ulangan wallet:', wallet);
    } catch (error) {
      console.error('Wallet ulashda xatolik:', error);
    }
  };


  return (
    <div>
      <h1>TonConnect bilan Wallet ulash</h1>

      {connectedWallet ? (
        <div>
          <h2>Ulangan wallet: {connectedWallet.name}</h2>
        </div>
      ) : (
        <div>
          <h2>Wallet tanlang:</h2>
          {wallets.length > 0 ? (
            <select onChange={(e) => connectWallet(wallets[e.target.value])}>
              <option value="">Wallet tanlang</option>
              {wallets.map((wallet, index) => (
                <option key={wallet.name} value={index}>
                  {wallet.name}
                </option>
              ))}
            </select>
          ) : (
            <p>Walletlar yuklanmoqda...</p>
          )}
        </div>
      )}
    </div>







    // {/* <Routes>
    //   <Route path="/" element={<Loading />} />
    //   <Route path="/home" element={<HomePage />} />
    // </Routes> */}
  );
};

export default App;
