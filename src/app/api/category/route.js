// Get all category

import { getAllCategory, getCategoryByIdOrName, insertCategory } from "@/lib/prisma/category-prisma"
import { NextResponse } from "next/server";

export const GET = async () => {
    // calling product-prisma
    const payload = await getAllCategory();
    return NextResponse.json({
        status : 200,
        message : "Categories have been found successfully !",
        payload
    }, {status : 200});
}

// Insert  new categories
export const POST = async (req) => {
    const body = await req.json();  

    // check category name in multiple request and in database
    var isUniqueCatName = await isUniqueCatNameInDatabaseAndMultiRequest(body);

    if(isUniqueCatName){
        const payload = await insertCategory(body);      
        return NextResponse.json({
            status : 201,
            message : "new category has been created successfully",
            payload : {
                count : payload
            }
        }, {status : 201});
    }
    else{
        return NextResponse.json({
            status : 400,
            message : "Category name already exists"
        }, {status : 400});
    }
}






// methods that help to write logic in this file

function isUniqueCatName(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i].category_name == array[j].category_name) {
                return false; 
            }
        }
    }
    return true;
}

async function isUniqueCatNameInDatabaseAndMultiRequest(array){
    // get all categories from database
    const allCategories = await getAllCategory();
    // combine these two arrays 
    var combineArray = [...array, ...allCategories];
    return isUniqueCatName(combineArray);
}