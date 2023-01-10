import Clarifai from "clarifai";
import fetch from "node-fetch";
globalThis.fetch=fetch;


export const handleImageUrl=(req,res)=>{
    const {imageUrl}=req.body;
    const raw = JSON.stringify({
        "user_app_id": {
          "user_id": process.env.USER_ID,
          "app_id": process.env.APP_ID
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
          'Authorization': process.env.AUTHORIZATION
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

