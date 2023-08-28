document.getElementById("createWallet").addEventListener("click", async () => {
  const seed = document.getElementById("seed").value;
  const password = document.getElementById("password").value;
  const ip = document.getElementById("ip").value;

  const response = await fetch(
    "https://wallet-manager-kkmh.onrender.com/wallet/store",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ seed, password, ip }),
    }
  );

  if (response.ok) {
    alert("Wallet created successfully!");
    document.getElementById("seed").value = "";
    document.getElementById("password").value = "";
    document.getElementById("ip").value = "";
  } else {
    alert("Failed to create wallet.");
  }
});

document
  .getElementById("retrieveWallets")
  .addEventListener("click", async () => {
    const secret = document.getElementById("secret").value;

    const response = await fetch(
      "https://wallet-manager-kkmh.onrender.com/wallet/retrieve",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ secret }),
      }
    );

    if (response.ok) {
      document.getElementById("secret").value = "";

      const wallets = await response.json();
      const walletsDiv = document.getElementById("wallets");
      const title = document.createElement("h3");
      title.innerHTML = '<h3 class="text-xl font-medium mb-2">Wallets:</h3>';
      walletsDiv.appendChild(title);
      wallets.forEach((wallet) => {
        const seed = `${wallet.seed.slice(0, 4)}...${wallet.seed.slice(-4)}`;
        const password = `${wallet.password.slice(
          0,
          4
        )}...${wallet.password.slice(-4)}`;

        const walletContainer = document.createElement("div");
        const containerHeader = document.createElement("div");
        containerHeader.innerHTML = `<strong>Seed:</strong> ${seed} | <strong>Password:</strong> ${password}`;

        const ipInput = document.createElement("input");
        ipInput.setAttribute("type", "text");
        ipInput.setAttribute("value", wallet.ip);
        ipInput.classList.add(["p-2", "w-full", "border", "rounded-md"]);

        const excelIdInput = document.createElement("input");
        excelIdInput.setAttribute("type", "text");
        excelIdInput.setAttribute("value", wallet.excel_id);
        excelIdInput.classList.add(["p-2", "w-full", "border", "rounded-md"]);

        const inputContainer = document.createElement("div");
        inputContainer.classList.add(["flex", "flex-col", "gap-2", "mb-2"]);
        inputContainer.appendChild(ipInput);
        inputContainer.appendChild(excelIdInput);

        const updateButton = document.createElement("button");
        updateButton.innerHTML = "Update";
        updateButton.classList.add([
          "p-2",
          "w-full",
          "border",
          "rounded-md",
          "bg-green-500",
          "text-white",
        ]);
        updateButton.addEventListener("click", async () => {
          const response = await fetch(
            "https://wallet-manager-kkmh.onrender.com/wallet/update",
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: wallet.id,
                ip: ipInput.value,
                excelId: excelIdInput.value,
              }),
            }
          );

          if (response.ok) {
            alert("Wallet updated successfully!");
          } else {
            alert("Failed to update wallet.");
          }
        });

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.classList.add([
          "p-2",
          "w-full",
          "border",
          "rounded-md",
          "border-red-500",
          "text-red-500",
        ]);
        deleteButton.addEventListener("click", async () => {
          const response = await fetch(
            "https://wallet-manager-kkmh.onrender.com/wallet/delete",
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: wallet.id,
              }),
            }
          );

          if (response.ok) {
            alert("Wallet deleted successfully!");
            walletsDiv.removeChild(walletContainer);
          } else {
            alert("Failed to delete wallet.");
          }
        });

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add([
          "w-full",
          "flex",
          "items-center",
          "gap-2",
        ]);

        buttonContainer.appendChild(updateButton);
        buttonContainer.appendChild(deleteButton);

        walletContainer.appendChild(containerHeader);
        walletContainer.appendChild(inputContainer);
        walletContainer.appendChild(buttonContainer);

        walletsDiv.appendChild(walletContainer);
      });
    } else {
      alert("Failed to retrieve wallets.");
    }
  });
