import { getOrdersByCustomerId } from "@/lib/prisma/order-prisma";
import { NextResponse } from "next/server";

// get orders by customer id
export const GET = async (req, {params}) => {
    const payload = await getOrdersByCustomerId(params.cusId);
    if(payload.length > 0)
        return NextResponse.json({
            status : 200,
            messeage : `Get Orders by customer id ${params.cusId} successfully`,
            payload
        }, {status : 200})
    else if(payload.length === 0)   
        return NextResponse.json({
            status : 404,
            messeage : `Get Orders by customer id ${params.cusId} is not found`
        }, {status : 404})
}