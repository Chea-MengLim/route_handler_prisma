import { getCustomerById } from "@/lib/prisma/customer-prisma";
import { deleteOrderById, getOrdersById, updateOrderById } from "@/lib/prisma/order-prisma";
import { getProductByIdOrName } from "@/lib/prisma/product-prisma";
import { NextResponse } from "next/server";

// get order by id
export const GET = async (req, {params}) => {
    const payload = await getOrdersById(params.orderId);
    if(payload != null)
        return NextResponse.json({
            message : `order id ${params.orderId} is found successfully`,
            status : 200,
            payload
        }, {status : 200});
    else
        return NextResponse.json({
            message : `order id ${params.orderId} is not found`,
            status : 404
        }, {status : 404});
}

// delete order by id
export const DELETE = async (req, {params}) => {
    const order = await getOrdersById(params.orderId);
    if(order != null){
        const payload = await deleteOrderById(params.orderId);
        return NextResponse.json({
            status : 200,
            message :  `order id ${params.orderId} has been deleted successfully`
        }, {status : 200});
    }
    else
        return NextResponse.json({
            status : 404,
            message : `order id ${params.orderId} is not found`,
        }, {status : 404})
    
}

// update order by id

export const PUT = async (req, {params}) => {
    const body = await req.json();
    const id = parseInt(params.orderId);
    const order = await getOrdersById(id);
    if(order != null){
        const product = await getProductByIdOrName(body.product_id);
        if(product != null){
            const customer = await getCustomerById(body.customer_id);
            if(customer != null){
                const payload = await updateOrderById(id, body);
                return NextResponse.json({
                    status : 200,
                    message : `order id ${params.orderId} has been updated successfully`,
                    payload
                }, {status : 200});
            }
            else
                return NextResponse.json({
                    status : 404,
                    message : `customer id : ${body.customer_id} is not found`,
                }, {status : 404})
           
        }
        else{
            return NextResponse.json({
                status : 404,
                message : `product id : ${body.product_id} is not found`,
            }, {status : 404})
        }
        
    }
    else{
        return NextResponse.json({
            status : 404,
            message : `order id : ${id} is not found`,
        }, {status : 404})
    }
    
}