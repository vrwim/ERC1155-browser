let contract;

function loadContract() {
    let abi = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "indexed": false, "internalType": "uint256[]", "name": "values", "type": "uint256[]" }], "name": "TransferBatch", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "TransferSingle", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "value", "type": "string" }, { "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "URI", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "accounts", "type": "address[]" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }], "name": "balanceOfBatch", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeBatchTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "uri", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }];
    contract = new web3.eth.Contract(abi, document.getElementById("contract").value);
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

    ethereum.on('chainChanged', chainChanged);

    await loadContract();

    accountChangedCallback(web3.eth.defaultAccount);
    chainChanged(await web3.eth.getChainId());
}

function init() {
    document.getElementById("networks").addEventListener("change", networkSelected);
    document.getElementById("contract").addEventListener("change", contractAddressChanged);

    loadWeb3();
}

async function accountChangedCallback(newAccount) {
    document.getElementById("metamask-acc").innerHTML = `${newAccount}`;
}

function chainChanged(chainId) {
    console.log(`chain changed to ${chainId}`)
    switch (chainId) {
        case 1:
        case "1":
        case `0x${(1).toString(16)}`: // ethereum
            document.getElementById("networks").selectedIndex = 0;
            break;
        case 246:
        case "246":
        case `0x${(246).toString(16)}`: // energyweb
            document.getElementById("networks").selectedIndex = 1;
            break;
        case 3:
        case "3":
        case `0x${(3).toString(16)}`: // ropsten
            document.getElementById("networks").selectedIndex = 2;
            break;
        case 4:
        case "4":
        case `0x${(4).toString(16)}`: // rinkeby
            document.getElementById("networks").selectedIndex = 3;
            break;
        case 42:
        case "42":
        case `0x${(42).toString(16)}`: // kovan
            document.getElementById("networks").selectedIndex = 4;
            break;
        case 5:
        case "5":
        case `0x${(5).toString(16)}`: // goerli
            document.getElementById("networks").selectedIndex = 5;
            break;
        case 73799:
        case "73799":
        case `0x${(73799).toString(16)}`: // volta
            document.getElementById("networks").selectedIndex = 6;
            break;
        default:
            console.log(`Unknown network: ${chainId}`);
            break;
    }

    retrieveTransferEvents();
}

function networkSelected(event) {
    switch (event.target.selectedOptions[0].value) {
        case "ethereum":
            changeToNetwork(1);
            break;
        case "energyweb":
            changeToNetwork(246);
            break;
        case "ropsten":
            changeToNetwork(3);
            break;
        case "rinkeby":
            changeToNetwork(4);
            break;
        case "kovan":
            changeToNetwork(42);
            break;
        case "goerli":
            changeToNetwork(5);
            break;
        case "volta":
            changeToNetwork(73799);
            break;
    }
}

function changeToNetwork(id) {
    ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${(id).toString(16)}` }],
    });
}

function contractAddressChanged(event) {
    loadContract();
}

function pad(num) {
    return num.toString(16).padStart(64, 0);
}

async function retrieveTransferEvents() {
    let transferEvents = await contract.getPastEvents('TransferSingle', { fromBlock: 0, toBlock: "latest" });
    console.log(transferEvents);

    let uris = (await Promise.all(transferEvents.map((item) => {
        return contract.methods.uri(item.returnValues.id).call();
    }))).map(function (uri, i) {
        return { uri: uri, id: transferEvents[i].returnValues.id };
    });

    uris.forEach(async (object) => {
        let id = object.id;
        let dataUrl = object.uri.replace("{id}", pad(id));
        fetch(dataUrl)
            .then((res) => res.json())
            .then((data) => {
                let output = `
                <article class="flex-item-db">
                    <img src="${data.image}">
                    <a href=${dataUrl}>
                        <h2>${data.name} </h2>
                    </a>
                    <p>${data.description}</p>
                    <p class="id">#${id}</p>
                </article>`;

                document.getElementById('output').innerHTML += output;

            }).catch(function (err) {
                console.log(err);
            });
    });
}

init();