import asyncHandeler from 'express-async-handler';
import {customer} from "../models/customer.js"
import {enterprise} from '../models/enterprise.js';

// add customers of an enterprise

export const createCustomer = asyncHandeler(async(req,res)=>{
    const {enterpriseName} = req.params;
    console.log(req.params);
    try{
        const isEnterpriseExist = await enterprise.findOne({enterpriseName:enterpriseName});
        const alreadyACustomer = await customer.findOne({email:req.body.email});
        //console.log(isEnterpriseExist);
        if(isEnterpriseExist){
            if(alreadyACustomer){
                return res.status(401).json({'error':'please enter a unique customer emailID'});
            }else{
            const customers = await customer.create({
                enterpriseName:enterpriseName,
                email: req.body.email,
                customerName: req.body.customerName,
                location:req.body.location,
                contactNo:req.body.contactNo
            })
           await isEnterpriseExist.customers.push(customers._id);
           await isEnterpriseExist.save();
            if(customers){
            return res.status(201).json({
               customers
            })
            }
        }
        }else{
            return res.status(401).json({'error':'invalid credentials'});
        }
    }catch(error){
        return res.status(401).json({'error':'server error'});
    }
})

// get all customer of an enterprise

export const getAllCustomer = asyncHandeler(async(req,res)=>{
    const {enterpriseName} = req.params;
    try{
        const allCustomer = await customer.find({enterpriseName:enterpriseName});
        if(allCustomer){
            return res.status(201).json(allCustomer);
        }else{
            return res.status(401).json({'message':'there have no data. make your customer :)'});
        }
    }catch(error){
        return res.status(401).json({'error':'server error'});
    }
})

// get a single customer details of an enterprise

export const getAcustomer = asyncHandeler(async(req,res)=>{
   // console.log("akiy");
    const {enterpriseName,email} = req.params;
    console.log(req.params);
    try{
        const aCustomer = await customer.findOne({email:email});
        console.log(aCustomer);
        if(aCustomer.enterpriseName == enterpriseName){
            return res.status(201).json(aCustomer);
        }else{
            return res.status(401).json({'message':'there have no data.'});
        }
    }catch(error){
        return res.status(401).json({'error':'server error'});
    }
})

// update(customerName,location,contactNo) a customer details of an enterprise

export const updateAcustomer = asyncHandeler(async(req,res)=>{
    // console.log("akiy");
     const {enterpriseName,email} = req.params;
     console.log(req.params);
     try{
         const existCustomer = await customer.findOne({email:email});
         console.log(existCustomer);
         if(existCustomer.enterpriseName == enterpriseName){

            existCustomer.customerName= req.body.customerName;
            existCustomer.location = req.body.location;
            existCustomer.contactNo = req.body.contactNo;

            await existCustomer.save();
            return res.status(201).json(existCustomer);
         }else{
             return res.status(401).json({'message':'there have no data.'});
         }
     }catch(error){
         return res.status(401).json({'error':'server error'});
     }
 })

 // delete a customer 
 
 export const deleteAcustomer = asyncHandeler(async(req,res)=>{
      const {enterpriseName,email} = req.params;
      console.log(req.params);
      try{
        //const existEnterprise = await enterprise.findOne({enterpriseName:enterpriseName});
          const existCustomer = await customer.findOne({email:email});
          console.log(existCustomer);
          if(existCustomer.enterpriseName == enterpriseName){
 
             await existCustomer.deleteOne();
             return res.status(201).json({"message":"successfully deleted customer data"});
          }else{
              return res.status(401).json({'message':'there have no data.'});
          }
      }catch(error){
          return res.status(401).json({'error':'server error'});
          console.log("Amit");
      }
  })



