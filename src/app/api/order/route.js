import { getCustomerById } from "@/lib/prisma/customer-prisma";
import { getAllOrders, insertOrder } from "@/lib/prisma/order-prisma";
import { getProductByIdOrName } from "@/lib/prisma/product-prisma";
import { NextResponse } from "next/server";

// insert new order
export const POST = async (req) => {
    const body = await req.json();
    // check product exist or not
    const product = await getProductByIdOrName(body.product_id);
    if(product != null){
        // check customer exist or not
        const customer = await getCustomerById(body.customer_id);
        if(customer != null){
            const payload = await insertOrder(body);
            return NextResponse.json({
                status : 201,
                message : "new order has been created successfully",
                payload
            }, {status : 201});
        }
        else
            return NextResponse.json({
                status : 404,
                message : "customer_id " + body.customer_id + " not found in customer table"
            }, {status : 404})
        
    }
    else
        return NextResponse.json({
            status : 404,
            message : "product_id " + body.product_id + " not found in product table"
        }, {status : 404})
    
}

// get all orders
export const GET = async () => {
    const payload = await getAllOrders();
    return NextResponse.json({
        status : 200,
        message : "all orders has been retrieved successfully",
        payload
    }, {status : 200});
}

