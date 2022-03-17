import Item from '../models/Item.js';
import multer from 'multer';
export var getItems = async(req,res)=>{
    try{
        let allItems = await Item.find().sort({date:-1});
        return res.json(allItems);
    }
    catch(errors){
        console.log(errors);
    }
}


//var upload = multer({ dest: './uploads' }).single('image');
export var postItemImage =  async(req, res)=>{
    try{
        console.log(req.file);
        const imageName = req.file.filename;
        return res.json(imageName);
    }
    catch{
        console.log(errors);
    }
}

export var postItem = async(req, res)=>{
    try{
       

    let newItem = await Item(req.body);
    let savedItem = await newItem.save();
        return res.json(savedItem);
    }
    catch(errors){
        console.log(errors);
    }
}

export const updateItem = async(req, res)=>{
    try{
        let updatedItem = await Item.findByIdAndUpdate({_id: req.params.id}, req.body, {'returnDocument': 'after'});
        return res.status(200).json(updatedItem);
    }
    catch(errors){
        res.status(404).json({error: 'A selected item cannot be updated'});
    }
}
export const deleteItem = async(req, res)=>{
    try{
        let deletedItem = await Item.findByIdAndDelete({_id: req.params.id});    
         return res.json({success: 'true'});
    }
    catch(errors){
        //res.status(deletedItem.status).json({error: 'A selected item cannot be deleted'});
        console.log(errors);
        res.status(404).json({error: 'A selected item cannot be deleted'});
    }
}

