import { getAllCustomer, insertCustomer } from "@/lib/prisma/customer-prisma";
import { NextResponse } from "next/server";

// insert customer
export const POST = async (req) => {
    const body = await req.json();
    const payload = await insertCustomer(body);
    return NextResponse.json({
        status : 201,
        message : "new customer has been created successfully",
        payload
    }, {status : 201});
}

// get all customers
export const GET = async () => {
    const payload = await getAllCustomer();
    return NextResponse.json({
        status : 200,
        message : "Get all customers successfully",
        payload
    }, {status : 200});
}