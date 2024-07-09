import { getCategoryByIdOrName } from "@/lib/prisma/category-prisma";
import { deleteProductById, getAllProduct, getProductByIdOrName, updateProductById } from "@/lib/prisma/product-prisma";
import { NextResponse } from "next/server";

// get product by id or name
export const GET = async (req, {params}) => {
    const payload = await getProductByIdOrName(params.proData);
    // if product is found in database
    if(payload != null) 
        return NextResponse.json({
            status : 200,
            // dynamic message response
            messeage: `Get Product ${
                isNaN(params.proData)
                  ? "name : " + params.proData
                  : "id : " + params.proData
              }  successfully`,
            payload
        }, {status : 200});
    else
        return NextResponse.json({
            status : 404,
            // dynamic message response
            message : `Get product by product ${isNaN(params.proData) ? "name" : "id"} ${params.proData} is not found`,
        }, {status : 404});
}

// delete product by proId
export const DELETE = async (req, {params}) => {

    // check product exist or not

    const product = await getProductByIdOrName(params.proData);
    if(product != null){
        const payload = await deleteProductById(params.proData);
        return NextResponse.json({
            status : 200,
            message : `Product id ${params.proData} has been deleted successfully`,
        }, {status : 200})
    }
    else{
        return NextResponse.json({
            status : 404,
            message : `Product id ${params.proData} is not found`,
        }, {status : 404})
    }
    
}

// update product by proId

export const PUT = async (req, {params}) => {
    const body = await req.json();
    const id = parseInt(params.proData);

    // check product exist or not
    const product = await getProductByIdOrName(id);
    if(product != null){
        // check category id exist or not
        var category = await getCategoryByIdOrName(body.category_id);
        if(category != null){
            // check product name is unique or not
            var isUniqueProName = await isUniqueProductName(body.product_name);
            if(isUniqueProName){
                const payload = await updateProductById(id, body);
                return NextResponse.json({
                    status : 200,
                    messeage : `Update Product id ${params.proData} successfully`,
                    payload
                }, {status : 200});
            }
            else{
                return NextResponse.json({
                    status : 400,
                    message : `Product name ${body.product_name} already exist in database`
                }, {status : 400})
            }
        }  
        else{
            return NextResponse.json({
                status : 404,
                message : `Category id ${body.category_id} is not found`,
            }, {status : 404})
        }      
    }
    else{
        return NextResponse.json({
            status : 404,
            message : `Product id ${id} is not found`,
        }, {status : 404})
    }
}








// check unique product name with products table in database
export async function isUniqueProductName(productName){
    const allProducts = await getAllProduct();
    for(let i = 0; i < allProducts.length; i++){
        if(productName === allProducts[i].product_name)
            return false;
    }
    return true;
}