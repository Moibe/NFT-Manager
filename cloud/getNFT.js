Moralis.Cloud.define("getNFT", async (request) => {
    
    const logger = Moralis.Cloud.getLogger()

    let NFTid = request.params.nftId; 
    let hexId = parseInt(NFTid).toString(16); 
    let paddedHex = ("0000000000000000000000000000000000000000000000000000000000000000" + hexId).slice(64)
    logger.info(paddedHex);
    return Moralis.Cloud.httpRequest({ url: "https://m02z2ncyupuz.bigmoralis.com/" + paddedHex + ".json"})
    .then(function(httpResponse){
        return httpResponse.text; 
    })

})