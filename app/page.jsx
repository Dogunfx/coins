"use client";

import { ToastContainer, toast } from "react-toastify";
import dynamic from "next/dynamic";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { List } from "react-virtualized";
const Coin = dynamic(() => import("./coin"));

export default function Page() {
  const [appState, setAppState] = useState({
    initialCoins: [],
    coinsState: [{ id: 1, name: "nan" }],
    isLoading: true,
    steps: 1000,
    start: 0,
    end: 1000,
    search: "",
  });

  async function getCoins() {
    const res = await fetch(`https://api.coinpaprika.com/v1/coins`);
    const coins = await res.json();
    setAppState((prev) => ({ ...prev, initialCoins: coins }));
    var newC = [];
    for (let index = appState.start; index < appState.steps; index++) {
      newC.push(coins[index]);
    }
    setAppState((prev) => ({
      ...prev,
      isLoading: false,
      coinsState: newC,
    }));
  }

  function filterCoins(search = "") {
    setAppState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    var newC = [];

    for (let index = appState.start; index < appState.end; index++) {
      const coin = appState.initialCoins[index];
      if (coin) {
        newC.push(coin);
      }
    }
    setAppState((prev) => ({
      ...prev,
      isLoading: false,
      coinsState: newC,
    }));
  }

  useEffect(() => {
    getCoins();
  }, []);

  useEffect(() => {
    filterCoins();
  }, [appState.end]);

  return (
    <main>
      <h1>List of Crypto Currency Coins</h1>
      <p>Search for your specify coin you need</p>
      <div className="form">
        <input
          list="coins"
          placeholder="Search by the coin name"
          onChange={(evt) => {
            // alert(evt.target.value);
            setAppState((prev) => ({
              ...prev,
              search: evt.target.value,
            }));
          }}
        />
        <datalist id="coins">
          {appState.coinsState.map((coin, index) => (
            <option value={coin.id} key={coin.id}>
              {coin.name}
            </option>
          ))}
        </datalist>
        <button className="btn">clear Search</button>
      </div>
      <div className="page-buttons">
        <button
          className="prev"
          onClick={() => {
            setAppState((prev) => ({
              ...prev,
              start: prev.start - prev.steps,
              end: prev.end - prev.steps,
            }));
          }}
        >
          Prev
        </button>
        <button
          onClick={() => {
            setAppState((prev) => ({
              ...prev,
              start: prev.start + prev.steps,
              end: prev.end + prev.steps,
            }));
          }}
        >
          Next
        </button>
      </div>

      <div className="page-desc">
        <p className="left">
          Total Items : <strong>{appState.initialCoins.length}</strong>
        </p>
        <p>
          Current Page :
          <strong>
            {appState.start} - {appState.end}
          </strong>
        </p>
      </div>

      <div className="coin-list">
        {appState.isLoading ? (
          <p>Still loading coins....</p>
        ) : (
          appState.coinsState.map((coin, index) => (
            <Coin
              coinSymbol={coin.symbol}
              coinId={coin.id}
              coinName={coin.name}
              key={index}
            />
          ))
        )}
      </div>
      <ToastContainer />
    </main>
  );
}
