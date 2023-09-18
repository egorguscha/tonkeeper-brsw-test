import { useEffect, useState } from "react";
import {
  TonConnect,
  TonConnectUI,
  Wallet,
  WalletInfoWithOpenMethod,
} from "@tonconnect/ui";

const connector = new TonConnect({
  manifestUrl:
    "https://raw.githubusercontent.com/Tsunami-Exchange/chain-config/main/ton-connect.manifest.json",
});

const tonconnectUi = new TonConnectUI({
  connector,
});

function App() {
  const [wallet, setWallet] = useState<
    Wallet | (Wallet & WalletInfoWithOpenMethod) | null
  >(tonconnectUi?.wallet || null);
  useEffect(() => {
    if (tonconnectUi) {
      return tonconnectUi.onStatusChange(setWallet);
    }
  }, []);

  return (
    <div>
      {!wallet?.account ? (
        <button onClick={() => tonconnectUi.connectWallet()}>connect</button>
      ) : (
        <button onClick={() => tonconnectUi.disconnect()}>disconnect</button>
      )}
      <pre>{JSON.stringify(wallet, null, 2)}</pre>
    </div>
  );
}

export default App;
