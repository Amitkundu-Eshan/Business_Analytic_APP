import asyncHandeler from 'express-async-handler';
import {enterprise} from '../models/enterprise.js';
import {generateToken} from '../utility/GenerateToken.js';


//register a Enterprise================================

export const RegisterEnterprise = asyncHandeler(async(req,res)=>{
    const {enterpriseName,email,password} = req.body;
    console.log(enterpriseName,email,password);
    try{
        const haveEmail = await enterprise.findOne({email:email});
        const haveEnterprisename = await enterprise.findOne({enterpriseName:enterpriseName});
        if(haveEmail){
            return res.status(401).json({'error':'this email already taken.try another email....'});
        }else if(haveEnterprisename){
            return res.status(401).json({'error':'this enterpriseName already reserved.try another enterpriseName....'});
        }else{
            const ent = await enterprise.create({
                enterpriseName,
                password,
                email,
                profilePic:"https://res.cloudinary.com/eshansocial/image/upload/v1636378600/dephoto_sgie4f.png",
            })
            if(ent){
                return res.status(201).json({
                    _id:ent._id,
                    enterpriseName:ent.enterpriseName,
                    email:ent.email,
                    customers:ent.customers,
                    profilePic:"https://res.cloudinary.com/eshansocial/image/upload/v1636378600/dephoto_sgie4f.png",
                    isEmailVerified:ent.isEmailVerified,
                    phone:ent.phone,
                    address:ent.address,
                    token:generateToken(ent._id)
                });
            }
            
        }
    }catch(error){
        return res.status(401).json({'error':'server error'});
    }
})

//========end registration===============

//========login Enterprise================//

export const loginEnterprise = asyncHandeler(async(req,res)=>{
    const {email,password} = req.body;
    try{
        const isEnterprise = await enterprise.findOne({email:email});
        if(isEnterprise && (await isEnterprise.matchPassword(password))){
            return res.status(201).json({
                _id:isEnterprise._id,
                enterpriseName:isEnterprise.enterpriseName,
                email:isEnterprise.email,
                customers:isEnterprise.customers,
                profilePic:isEnterprise.profilePic,
                isEmailVerified:isEnterprise.isEmailVerified,
                phone:isEnterprise.phone,
                address:isEnterprise.address,
                token:generateToken(isEnterprise._id)
            })
        }else{
            return res.status(401).json({'error':'invalid credentials'});
        }


    }catch(error){
        return res.status(401).json({'error':'server error'});
    }
})

//=====end login part ==========//

//get a Enterprise by Enterprisename=======//

export const getByEnterpriseName = asyncHandeler(async(req,res)=>{
    try{
        const enterprisedetail = await enterprise.findOne({enterpriseName:req.params.enterpriseName}).select('-password');
        if(enterprisedetail){
            return res.status(200).json(enterprisedetail);
        }else{
            return res.status(401).json({"message":"no data found"});
        }
        
    }catch(error){
        return res.status(401).json({'error':'server error'});
    }
})

//end of get a Enterprise by Enterprisename=======//

/*//get user by EnterpriseId============//
const getByEnterpriseId = asyncHandeler(async(req,res)=>{
    //console.log(req.params.userId);
    try{
        const userdetail = await User.findOne({_id:req.params.userId}).select('-password');
        return res.status(201).json(userdetail);
    }catch(error){
        return res.status(401).json({'error':'server error'});
    }
})

//=end Enterprise by EnterpriseId==========//*/




//===export part=====//




