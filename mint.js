Moralis.initialize("n3rg89swjLYr3w8QJApUcBJ8XpNlLPYdllWTFuqY"); 
Moralis.serverURL = "https://m02z2ncyupuz.bigmoralis.com:2053/server";
const CONTRACT_ADDRESS = "0x1af3C01a0A47BCc4eb1210C6DFf28f2B840F7b0f";
let web3; 

async function init(){

    let currentUser = Moralis.User.current();
    if(!currentUser){
        windows.location.pathname = "/index.html";

    }

    web3 = await Moralis.Web3.enable(); 
    console.log(web3);
    let accounts = await web3.eth.getAccounts(); 
      
   

    const urlParams = new URLSearchParams(window.location.search);
    const nftId = urlParams.get("nftId");
    document.getElementById("token_id_input").value = nftId;
    document.getElementById("address_input").value = accounts[0];
       

}

async function mint(){

    let tokenId = parseInt(document.getElementById("token_id_input").value);
    let address = document.getElementById("address_input").value
    let amount = parseInt(document.getElementById("amount_input").value)
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
    console.log(contract);
    //Así estás llamando a la función int dentro del contrato en la blockchain, debes de poner los params que pide. 
    contract.methods.mint(address, tokenId, amount).send({from: accounts[0], value: Moralis.Units.ETH("0")})
    .on("receipt", function(receipt)
    {
        alert("Mint Done"); 
    })
}

document.getElementById("submit_mint").onclick = mint;

init(); 