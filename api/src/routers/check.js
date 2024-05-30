import {Router } from "express";
import Pastry from "../models/pastries.js";

const checkRouter = Router();


checkRouter.get('/', async (req, res) => {
    try {
        const pastries = await Pastry.findOne({stock:{$gt:0}});
        if(pastries){
            res.status(200).json({available:true})
        }else{
            res.status(200).json({available:false})
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

export default checkRouter