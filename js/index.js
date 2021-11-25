let contract;
let contractAddress = "0xf7520104d06324B34DB083f5f88599719b225c62";

async function loadContract() {
    let abi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"TransferBatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"TransferSingle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"value","type":"string"},{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"URI","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"balanceOfBatch","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeBatchTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"uri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}];
    contract = new web3.eth.Contract(abi, contractAddress);
}

async function loadWeb3() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else {
        alert("MetaMask not found!");
        return;
    }

    let accounts = await web3.eth.getAccounts();
    web3.eth.defaultAccount = accounts[0];

    ethereum.on('accountsChanged', function (accounts) {
        let newAccount = accounts[0];
        web3.eth.defaultAccount = newAccount;
        accountChangedCallback(newAccount);
    });

    await loadContract();

    accountChangedCallback(web3.eth.defaultAccount);
}

function accountChangedCallback(newAccount) {
    document.getElementById("metamask-acc").innerHTML = `${newAccount}`;

    retrieveTransferEvents();
}

function pad(num) {
    return num.toString(16).padStart(64, 0);
}

async function retrieveTransferEvents() {
    let transferEvents = await contract.getPastEvents('TransferSingle', { fromBlock: 0, toBlock: "latest" });
    console.log(transferEvents);
    transferEvents.forEach(async (entry) => {
        let dataUrl = (await contract.methods.uri(entry.returnValues.id).call()).replace("{id}", pad(entry.returnValues.id));
        console.log(dataUrl);
        fetch(dataUrl)
            .then((res) => res.json())
            .then((data) => {
                let output = "";
                console.log(data.image);

                output += `<div class="flex-item-db"><a href=${dataUrl}><img src="${data.image}" </a><h2>${data.name} </h2><p>${data.description} </p>`

                document.getElementById('output').innerHTML += output;

            }).catch(function (err) {
                console.log(err);
            });
    });
}

loadWeb3();