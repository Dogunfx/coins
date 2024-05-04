import { toast } from "react-toastify";

export default function Coin({ coinName, coinId, coinSymbol }) {
  return (
    <div className="coin-item">
      <div className="coin-desc">
        <h4>{coinName}</h4>
        <p>{coinId}</p>
        <p>{coinSymbol}</p>
      </div>
      <div className="coin-action">
        <button
          onClick={() => {
            navigator.clipboard.writeText(coinId);
            toast(coinName + " id copied");
          }}
        >
          copy
        </button>
      </div>
    </div>
  );
}
