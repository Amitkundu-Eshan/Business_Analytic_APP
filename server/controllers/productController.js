import asyncHandeler from 'express-async-handler';
import {customer} from "../models/customer.js"
import {enterprise} from '../models/enterprise.js';
import {product} from '../models/product.js';

// create product

export const createProduct = asyncHandeler(async(req,res) => {
    const {productName, category, purchaseRate, selllingRate} = req.body;
    const {enterpriseName} = req.params;
    const validEnterPrise = await enterprise.findOne({enterpriseName:enterpriseName})
    const isExistProduct = await product.findOne({productName:productName})
    try {
        if(validEnterPrise){
            if(!isExistProduct){
            const productCreated =  await product.create({
                    productName:productName,
                    category:category,
                    purchaseRate:purchaseRate,
                    selllingRate:selllingRate,
                    enterpriseName:enterpriseName
                })
                if(productCreated){
                    return res.status(201).json({
                        "success":"successfully added the product."
                    }) 
                }else{
                    return res.status(401).json({
                        "message":"product not created or added. try again...."
                    }) 
                }
            }else{
                return res.status(401).json({
                    "message":"this product or product name already exist. try something new....."
                })
            }
        }else{
            return res.status(401).json({
                "message":"please enter a valid enterPrise name."
            })
    }

    } catch (error) {
        return res.status(401).json({
            "error":"server error."
        })
    }
})

// get all product

export const getAllProduct = asyncHandeler(async(req,res) => {
    const {enterpriseName} = req.params;
    const validEnterPrise = await enterprise.findOne({enterpriseName:enterpriseName})
    const allProduct = await product.find({enterpriseName:enterpriseName});
    try {
        if(validEnterPrise){
            if(allProduct){
                return res.status(200).json(allProduct);
            }else{
                return res.status(401).json({"message":"could not found any record. list up product :)"});
            }
        }else{
            return res.status(401).json({"message":"please enter a valid enterPrise name."});
        }
        
    } catch (error) {
        return res.status(401).json({"error":"server error"});
    }
    
})


// get a product by productName

export const getAProduct = asyncHandeler(async(req,res) => {
    const {enterpriseName, productName} = req.params;
    const validEnterPrise = await enterprise.findOne({enterpriseName:enterpriseName})
    const allProduct = await product.find({productName:productName});
    try {
        if(validEnterPrise){
            if(allProduct){
                return res.status(200).json(allProduct);
            }else{
                return res.status(401).json({"message":"could not found any record. list up product :)"});
            }
        }else{
            return res.status(401).json({"message":"please enter a valid enterPrise name."});
        }
        
    } catch (error) {
        return res.status(401).json({"error":"server error"});
    }
    
})

//update a product field

export const updateProduct = asyncHandeler(async(req,res) => {
    const { category, purchaseRate, selllingRate} = req.body;
    const {enterpriseName,productName} = req.params;
    const validEnterPrise = await enterprise.findOne({enterpriseName:enterpriseName})
    const existProduct = await product.findOne({productName:productName});
    try {
        if(validEnterPrise){
            if(existProduct){
                existProduct.purchaseRate = purchaseRate;
                existProduct.selllingRate = selllingRate;
                existProduct.category = category;

                if(req.body.productName){
                    existProduct.productName = req.body.productName;
                }

                await existProduct.save();
                return res.status(200).json({"success":"uptaed product successfully."})
            }else{
                return res.status(401).json({"message":"could not found any record. list up product :)"});
            }
        }else{
            return res.status(401).json({"message":"please enter a valid enterPrise name."});
        }
        
    } catch (error) {
        return res.status(401).json({"error":"server error"});
    }
    
})


