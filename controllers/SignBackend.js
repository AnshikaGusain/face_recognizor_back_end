const handleSignin=(req,res,bcrypt,User,Login)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json("Incorrect form submission");
    }
    // db("login").select("email","hash").where("email", "=", req.body.email)
    // .then(data=>{
    //     const isValid = bcrypt.compareSync(req.body.password,data[0].hash)
    //     if(isValid){
    //         return db("users").select("*").where("email", "=", req.body.email)
    //         .then(user=>{
    //             res.json(user[0])
    //         })
    //         .catch(err=> res.status(400).json("Unable to get user"))
    //     }
    //     else{
    //         res.status(400).json("Wrong Credentials")
    //     }
    // })
    // .catch(err=> res.status(400).json("Wrong Credentials"))
    Login.findOne({email:email},(err,foundOne)=>{
        if(err){
            res.status(400).json("cannot get login details");
        };
        if(foundOne){
            const isValid = bcrypt.compareSync(password,foundOne.hashPassword);
            if(isValid){
                User.findOne({email:email},(err,user)=>{
                    if(err)res.status(400).json("cannot get user details");
                    else{
                        res.json(user);
                    }
                })
            }
            else{
                res.status(400).json("Wrong Credentials");
            }
        }
        else{
            res.status(400).json("User not registered yet");
        }
    })
}

export default handleSignin;