import { getProductByCatId } from "@/lib/prisma/product-prisma"
import { NextResponse } from "next/server";

export const GET = async (req, {params}) => {
    const payload = await getProductByCatId(params.catId);
    if(payload.length > 0)
        return NextResponse.json({
            status : 200,
            messeage : `Get Products by category id ${params.catId} successfully`,
            payload
        }, {status : 200})    
    else if(payload.length === 0)
        return NextResponse.json({
            status : 404,
            messeage : `get product by category id ${params.catId} is not found`,
        }, {status : 404})
}