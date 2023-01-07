const handleRegister=(req,res,bcrypt,User,Login)=>{
    const {name,email,password}=req.body;
    if(!email|| !name|| !password){
        return res.status(400).json("Incorrect form submission");
    }
    const hash=bcrypt.hashSync(password,10);
    

    // db.transaction(trx=>{
    //     trx.insert({
    //         hash:hash,
    //         email:email
    //     })
    //     .into("login")
    //     .returning("email")
    //     .then(loginEmail=>{
    //         return trx('users')
    //         .insert({
    //             name:name,
    //             email:loginEmail[0].email,
    //             joined:new Date()
    //         })
    //         .returning("*")
    //         .then(user=>res.json(user[0]))
    //     }
    //     )
    //     .then(trx.commit)
    //     .catch(trx.rollback)
    // })
    // .catch((err)=>res.status(400).json("Unable to register"))
    User.findOne({name:name},(err,foundOne)=>{
        if(err)res.status(400).json("error");
        // console.log(foundOne);
        if(!foundOne){
            const user=new User({
                name:name,
                email:email,
                noOfEntries:0,
                joined: new Date()
            });
            user.save();
            const login=new Login({
                email:email,
                hashPassword:hash
            })
            login.save();
            res.redirect(307,"/register");
        }
        else{
            res.json(foundOne);
            // console.log(foundOne);
        }
    })
    
}

export default handleRegister;