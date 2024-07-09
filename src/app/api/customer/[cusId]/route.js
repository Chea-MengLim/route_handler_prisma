import { deleteCustomerById, getCustomerById, updateCustomerById } from "@/lib/prisma/customer-prisma";
import { NextResponse } from "next/server";

// get customer by id
export const GET = async (req, {params}) => {
    const payload = await getCustomerById(params.cusId);
    if(payload != null)
        return NextResponse.json({
            message : `customer id ${params.cusId} has found successfully`,
            status : 200,
            payload
        }, {status  :200})
    else
        return NextResponse.json({
            message : `customer id : ${params.cusId} is not found`,
            status : 404
        }, {status  :404})
}

// delete customer by id
export const DELETE = async (req, {params}) => {
    // check customer exsist or not
    const customer = await getCustomerById(params.cusId);
    if(customer != null){
        const payload = await deleteCustomerById(params.cusId);
        return NextResponse.json({
            status : 200,
            message :  `customer id ${params.cusId} has been deleted successfully`
        }, {status : 200})
    }
    else{
        return NextResponse.json({
            status : 404,
            message : `customer id ${params.cusId} is not found`
        }, {status : 404})
    }
}

// update customer by id
export const PUT = async (req, {params}) => {
    const body = await req.json();
    const id = parseInt(params.cusId);
    const customer = await getCustomerById(id);   
    if(customer != null){
        const payload = await updateCustomerById(id, body);
        return NextResponse.json({
            status : 200,
            message : `customer id ${params.cusId} has been updated successfully`,
            payload
        }, {status : 200})
    }
    else{
        return NextResponse.json({
            status : 404,
            message : `customer id ${params.cusId} is not found`
        }, {status : 404})
    }
    
}