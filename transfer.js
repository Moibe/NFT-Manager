Moralis.initialize("n3rg89swjLYr3w8QJApUcBJ8XpNlLPYdllWTFuqY"); 
Moralis.serverURL = "https://m02z2ncyupuz.bigmoralis.com:2053/server";
const CONTRACT_ADDRESS = "0x1af3C01a0A47BCc4eb1210C6DFf28f2B840F7b0f";

async function init(){

    let currentUser = Moralis.User.current();
    if(!currentUser){
        windows.location.pathname = "/index.html";

    }

    const urlParams = new URLSearchParams(window.location.search);
    const nftId = urlParams.get("nftId");
    document.getElementById("token_id_input").value = nftId;
           

}

async function transfer(){

    let tokenId = parseInt(document.getElementById("token_id_input").value);
    let address = document.getElementById("address_input").value
    let amount = parseInt(document.getElementById("amount_input").value);
    
    const options = {type: "erc1155",  
                 receiver: address,
                 contractAddress: CONTRACT_ADDRESS,
                 tokenId: tokenId,
                 amount: amount}; 
   
    let result = await Moralis.transfer(options);
    console.log(result);
}


document.getElementById("submit_transfer").onclick = transfer;

init(); 