import prisma from "./prisma"

export const insertProduct = async (product) => {
    const price = parseFloat(product.price);
    const catId = parseInt(product.category_id);
    const payload = prisma.products.create({
        data : {
            category_id : catId,
            product_name : product.product_name,
            price : price
        }
    })
    return payload;
}

export const getAllProduct = async () => {
    const payload = await prisma.products.findMany();
    return payload;
}

// find 1 product by id or name 
export const getProductByIdOrName = async (data) => {
    if(isNaN(data)){
        const payload = await prisma.products.findUnique({
            where : {
                product_name : data
            }
        })
        return payload;
    }
    else {
        const payload = await prisma.products.findUnique({
            where : {
                product_id : parseInt(data)
            }
        })
        return payload;
    }
}

// find products by catId
export const getProductByCatId = async (catId) => {
    const payload = await prisma.products.findMany({
        where : {
            category_id : parseInt(catId)
        }
    })
    return payload;
}

// delete product by id
export const deleteProductById = async (proId) => {
    const payload = await prisma.products.delete({
        where : {
            product_id : parseInt(proId)
        }
    })
    return payload;
}

// update product by id
export const updateProductById = async (proId, data) => {
    const payload = await prisma.products.update({
        where : {
            product_id : parseInt(proId)
        },
        data : {
            product_name : data.product_name,
            price : parseFloat(data.price),
            category_id : parseInt(data.category_id)
        }
    })
    return payload;
}