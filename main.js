Moralis.initialize("n3rg89swjLYr3w8QJApUcBJ8XpNlLPYdllWTFuqY"); 
Moralis.serverURL = "https://m02z2ncyupuz.bigmoralis.com:2053/server";
const CONTRACT_ADDRESS = "0x1af3C01a0A47BCc4eb1210C6DFf28f2B840F7b0f";


function fetchNFTMetadata(NFTs){
    let promises = []; 
    for(let i = 0; i < NFTs.length; i++) {
        let nft = NFTs[i]; 
        let id = nft.token_id; 
        //Call Moralis Function -> Static JSON File
        promises.push(fetch("https://m02z2ncyupuz.bigmoralis.com:2053/server/functions/getNFT?_ApplicationId=n3rg89swjLYr3w8QJApUcBJ8XpNlLPYdllWTFuqY&nftId=" + id)
        .then(res => res.json())
        .then(res => JSON.parse(res.result))
        .then(res => nft.metadata = res)
        .then(res => {
            const options = { address: CONTRACT_ADDRESS, token_id: id, chain: "rinkeby"};
            return Moralis.Web3API.token.getTokenIdOwners(options)
        
        })
        .then(res => {
            nft.owners = [];
            res.result.forEach(element => {
                nft.owners.push(element.owner_of);
            });
            return nft;
        }))
                
    }
    return Promise.all(promises);
    
}

function renderInventory(NFTs){
    const parent = document.getElementById("app");
    for (let i = 0; i < NFTs.length; i++) {
        const nft = NFTs[i];
        let htmlString = `
        <div class="card">
        <img class="card-img-top" src="${nft.metadata.image}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${nft.metadata.name}</h5>
          <p class="card-text">${nft.metadata.description}</p>
          <p class="card-text">Amount: ${nft.amount}</p>
          <p class="card-text">Number of Owners: ${nft.owners.length}</p>
          <a href="/mint.html?nftId=${nft.token_id}" class="btn btn-primary">Mint</a>
          <a href="/transfer.html?nftId=${nft.token_id}" class="btn btn-primary">Transfer</a>
        </div>
        </div>
      `
        let col = document.createElement("div");
        col.className = "col col-md-4";
        col.innerHTML = htmlString;   
        parent.appendChild(col);
    }
}

async function initializeApp() {
    let currentUser = Moralis.User.current();
    if(!currentUser){
        currentUser = await Moralis.Web3.authenticate();
    }
    const options = { address: CONTRACT_ADDRESS, chain: "rinkeby"};
    let NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
    let NFTWithMetadata = await fetchNFTMetadata(NFTs.result);
    renderInventory(NFTWithMetadata);
    

}

initializeApp(); 
