// import Clarifai from "clarifai";
// import fetch from "node-fetch";
// globalThis.fetch=fetch;

// const app = new Clarifai.App({
//     apiKey: '6e93463d0101470584f9d7a5b13effaa'
// });

// export const handleImageUrl=(req,res)=>{
//     const {requestOptions}=req.body;
//     fetch("https://api.clarifai.com/v2/models/face-detection/outputs", requestOptions)
//     .then(response=>{
//         // console.log("image back end===>",response);
//         res.status(200).json(response); 
//     })
//     .catch(err=>res.json("Unable to work with API" , err))
// }




export const image = (req,res,db)=>{
    const {id}=req.body;
    db("users").increment("entries",1).where({id}).returning("entries")
    .then(entries=>res.json(entries[0].entries))
    .catch(err=>res.status(400).res.json("Unable to get entries"));
}

