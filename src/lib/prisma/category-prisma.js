const { default: prisma } = require("./prisma")


// Get All Category from database
export const getAllCategory = async () => {
    const payload = prisma.categories.findMany();
    return payload;
}

// Get Category by Id or Name
export const getCategoryByIdOrName = async (data) => {
    if(isNaN(data)){
        const payload = prisma.categories.findUnique({
            where : {
                category_name : data
            }
        })
        return payload;
    }
    else{
        const payload = prisma.categories.findUnique({
            where : {
                category_id : parseInt(data)
            }
        })
        return payload;
    } 
}

// Insert Category to database
export const insertCategory = async (categoryDatas) => {
        const payload = prisma.categories.createMany({
            data : categoryDatas
        })
        return payload;
}

// Update Category by Id
export const updateCategory = async (catId, catData) => {
    const payload = await prisma.categories.update({
        where : {
            category_id : parseInt(catId)
        },
        data : {
            category_name : catData.category_name
        }
    })
    return payload;
}