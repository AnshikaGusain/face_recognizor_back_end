const profile=(req,res,User,Login)=>{
    const {id}=req.params;
    // db("users").select("*").where("id",id)
    //     .then(user=>{
    //         if(user.length){
    //             res.json(user[0]);
    //         }
    //         else{
    //             res.status(400).json("Not Found");
    //         }
    //     })
    //     .catch(err=>res.status(400).json("Error getting user"));
    User.findOne({_id:id},(err,user)=>{
        if(err)res.status(400).json("Error getting user");
        else res.json(user);
    })
}
export default profile;