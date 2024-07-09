import prisma from "./prisma"

export const insertCustomer = async (data) => {
    const payload = await prisma.customers.create({
        data : {
            first_name : data.first_name,
            last_name : data.last_name,
            birth_date : data.birth_date,
            money_spent : parseFloat(data.money_spent)
        }
    })
    return payload;
}

// get all customers
export const getAllCustomer = async () => {
    const payload = await prisma.customers.findMany();
    return payload;
}

// get customer by id
export const getCustomerById = async (cusId) => {
    const payload = await prisma.customers.findUnique({
        where : {
            customer_id : parseInt(cusId)
        }
    })
    return payload;
}

// delete customer by id
export const deleteCustomerById = async (cusId) => {
    const payload = await prisma.customers.delete({
        where : {
            customer_id : parseInt(cusId)
        }
    })
    return payload;
}

// update customer by id
export const updateCustomerById = async (cusId, data) => {
    const payload = await prisma.customers.update({
        where : {
            customer_id : parseInt(cusId)
        },
        data : {
            first_name : data.first_name,
            last_name : data.last_name,
            birth_date : data.birth_date,
            money_spent : parseFloat(data.money_spent)
        }
    })
    return payload;
}