import {v2 as cloudinary} from "cloudinary"


export const addProduct = async(req,res)=>{
try {
    
    let productData=JSON.parse(req.body.productData)
    const images=req.files

    const imagesUrl=await Promise.all(
        images.map(async (item)=>{
            let result=await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
            return result.secure_url
        })
    )
    await Product.create({...productData, image: imagesUrl})
} catch (error) {
    
}
}