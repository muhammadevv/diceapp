import React, { useEffect, useState } from "react";
import { TonConnectButton } from "@tonconnect/ui-react";
import "./HomePage.css";



const HomePage = () => {
  const [walletPopup, setWalletPopup] = useState(false);

  const doubleCloser = () => {
    setWalletList(false);
    setWalletPopup(false);
  };


  // useEffect(() => {
  //   if (tonAddress) {
  //     if (location.search) {
  //       navigate(location.search.substring(1));
  //     } else {
  //       navigate("/");
  //     }
  //   }
  // })


  // useEffect(() => {
  //   // Получаем список доступных кошельков и сохраняем в состоянии
  //   tonConnect.getWallets().then((availableWallets) => {
  //     setWallets(availableWallets);
  //   });
  // }, []);

  // const connectWallet = async () => {
  //   try {
  //     await connector.connect();
  //     const walletInfo = connector.wallet;
  //     setWallet(walletInfo);
  //     console.log("Wallet connected:", walletInfo);
  //   } catch (error) {
  //     setError("Connection failed. Please try again.");
  //     console.error("Connection failed:", error);
  //   }
  // };

  // const connectWallet = async () => {
  //   // console.log(wallet);
  //   try {
  //     await connector.connect();
  //     const walletInfo = connector.wallet;
  //     setWallet(walletInfo);
  //     console.log("Wallet connected:", walletInfo);
  //   } catch (error) {
  //     console.error("Connection failed:", error);
  //   }
  // };

  // const connectWallet = async (wallet) => {
  //   console.log(wallet);
  //   try {
  //     console.log(`Connecting to wallet: ${wallet.name}`);
  //     await tonConnect.connect({ jsBridgeKey: wallet.jsBridgeKey });
  //     console.log(`${wallet.name} подключен!`);
  //   } catch (error) {
  //     console.error("Ошибка при подключении кошелька:", error);
  //   }
  // };

  return (
    <div className="main-wrapper">
      <div className="container">
        <div className="background-image">
          <div className="user-info__wrapper">
            <div className="mini-logo__wrapper">
              <img src="logotip.svg" alt="" />
              <div className="massage-icon">
                <img src="message.png" alt="" />
              </div>
            </div>

            <div className="user-info__profile">
              <div
                onClick={() => setWalletPopup(true)}
                className="user-info__balance"
              >
                <div>
                  <p>Total Balance </p>
                  <img
                    src="wallet.png"
                    alt="wallet"
                    className="wallet-symbol"
                  />
                </div>
                <div>
                  <img
                    src="tickets.png"
                    alt="ticket"
                    className="ticket-symbol"
                  />
                  <p>4.5</p>
                </div>
                <div>
                  <img src="ton.png" alt="ton" className="ton-symbol" />
                  <p>452.500</p>
                </div>
              </div>
              <div className="user-info__lvl">
                <div className="hero-icon">
                  <p>Lvl. 1</p>
                  <img src="hero-icon.png" alt="" />
                </div>
              </div>
            </div>
          </div>

          <div className={walletPopup ? "none" : "price-wrapper"}>
            <div className="referrals-button">
              <p>Referrals</p>
            </div>

            <div className="daily-prices">
              <div className="timer_and_claim-wrapper">
                <div className="timer">
                  <img src="watch.png" alt="" />
                  <p>20:08:41</p>
                </div>
                <button className="claim-button">Claim</button>
              </div>
              <div className="info-price">
                <div>
                  <p>Your 24h income: 0.1</p>
                  <img
                    src="ticket bl.png"
                    alt="ticket"
                    className="ticket-symbol"
                  />
                </div>
                <div>
                  <p>Unclaimed ref bonus: 1.56</p>
                  <img
                    src="ticket bl.png"
                    alt="ticket"
                    className="ticket-symbol"
                  />
                </div>
                <p className="plus">+</p>

                <div className="line"></div>

                <div className="count">
                  <p>= 1.66</p>
                  <img
                    src="ticket bl.png"
                    alt="ticket"
                    className="ticket-symbol"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={walletPopup ? "none" : "navbar"}>
            <div className="frame linked-button__animation-1">
              <img src="home.png" className="image-in-frame" />
            </div>

            <div className="frame linked-button__animation-2">
              <img src="map.png" className="image-in-frame" />
            </div>

            <div className="frame linked-button__animation-3">
              <img src="users.png" className="image-in-frame" />
            </div>

            <div className="frame linked-button__animation-4">
              <img src="paper.png" className="image-in-frame" />
            </div>
          </div>
        </div>

        <div className={walletPopup ? "connect-wallet" : "none"}>
          <div className="connect-wallet__title-wrapper">
            <div className="connect-wallet__title">
              <p>Your TON wallet</p>
            </div>
            <div
              onClick={() => doubleCloser()}
              className="connect-wallet__closer"
            >
              <img src="xmark.svg" alt="" />
            </div>
          </div>

          <div className="connect-wallet__main">
            <div className="wallet-img">
              <img className="wallet" src="wallet-real.png" alt="" />
              <img className="ton-wallet" src="ton_blue.png" alt="" />
            </div>

            <TonConnectButton />


          </div>
        </div>

        {/* <div className={walletList ? "wallet-list" : "down"}>
          {
            userFriendlyAddress && (
              <div>
                <span>User-friendly address: {userFriendlyAddress}</span>
                <span>Raw address: {rawAddress}</span>
              </div>
            )}


          {
            wallet && (
              <div>
                <span>Connected wallet: {wallet.name}</span>
                <span>Device: {wallet.device.appName}</span>
              </div>
            )
          }
        </div> */}

      </div>
    </div>
  );
};

export default HomePage;
