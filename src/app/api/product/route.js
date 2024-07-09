import { getCategoryByIdOrName } from "@/lib/prisma/category-prisma";
import { getAllProduct, insertProduct } from "@/lib/prisma/product-prisma";
import { NextResponse } from "next/server";
import { isUniqueProductName } from "./[proData]/route";

// Insert Product 
export const POST = async (req) => {
    const body = await req.json();  
    // if client post a product but category_id is not found in category table
    const category = await getCategoryByIdOrName(body.category_id);
    if(category != null){
        // check product name is unique or not
        var isUniqueProName = await isUniqueProductName(body.product_name);
        if(isUniqueProName){
            const payload = await insertProduct(body);
            return NextResponse.json({
                status : 201,
                message : "new product has been created successfully",
                payload
            }, {status : 201});
        }
        else{
            return NextResponse.json({
                status : 400,
                message : "product name " + body.product_name + " is not unique"
            }, {status : 400});
        }
        
    }
    else{
        return NextResponse.json({
            status : 404,
            message : "category_id " + body.category_id + " not found in category table"
        }, {status : 404});
    }
    
}

// Get All Product
export const GET = async () => {
    const payload = await getAllProduct();
    return NextResponse.json({
        status : 200,
        message : "all products has been retrieved successfully",
        payload
    }, {status : 200});
}
