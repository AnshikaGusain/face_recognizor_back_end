import Clarifai from "clarifai";
import fetch from "node-fetch";
globalThis.fetch=fetch;

// const app = new Clarifai.App({
//     apiKey: '6e93463d0101470584f9d7a5b13effaa'
// });

export const handleImageUrl=(req,res)=>{
    const {imageUrl}=req.body;
    const raw = JSON.stringify({
        "user_app_id": {
          "user_id": "anshikagusain13_7448",
          "app_id": "a156366dc46c4e40b4e86861d855a057"
        },
        "inputs": [
          {
            "data": {
              "image": {
                "url": imageUrl
              }
            }
          }
        ]
      });
      
      const requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Key e5d0996a8030467ba6edba8bc2f43306'
        },
        body: raw
      };
      
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", requestOptions)
    .then(response => response.text())
    .then(result=>res.send(result))
    .catch(err=>res.json("Unable to work with API" , err))
}




export const image = (req,res,User,Login)=>{
    const {id}=req.body;
    // db("users").increment("entries",1).where({id}).returning("entries")
    // .then(entries=>res.json(entries[0].entries))
    // .catch(err=>res.status(400).res.json("Unable to get entries"));
    User.findOne({_id:id},(err,foundOne)=>{
        if(err)res.status(400).json("Unable to find user");
        else{
            User.updateOne({_id:id},{noOfEntries:foundOne.noOfEntries+1},(err)=>{
                if(err)res.status(400).json("Unable to get entries");
                else{
                    res.json(foundOne.noOfEntries+1);
                }
            })
        }
    })
}

