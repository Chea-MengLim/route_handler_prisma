import prisma from "./prisma";
import { getProductByIdOrName } from "./product-prisma";

// insert new order
export const insertOrder = async (data) => {
    const date = new Date();
    const time = date.toISOString()
    const pruductByIdInput = await getProductByIdOrName(data.product_id);
    const price = pruductByIdInput.price;
    const total = price * data.order_qty;
    const payload = await prisma.orders.create({
        data : {
            product_id : data.product_id,
            customer_id : data.customer_id,
            order_date : time,
            order_qty : data.order_qty,
            order_total : total   
        }
    })
    return payload;
    
}

// get all orders
export const getAllOrders = async () => {
    const payload  = await prisma.orders.findMany();
    return payload;
}

// get orders by customer id
export const getOrdersByCustomerId = async (cusId) => {
    const payload = await prisma.orders.findMany({
        where : {
            customer_id : parseInt(cusId)
        }
    })
    return payload;
}

// get order by id
export const getOrdersById = async (cusId) => {
    const payload = await prisma.orders.findUnique({
        where : {
            order_id : parseInt(cusId)
        }
    })
    return payload;
}

// delete order by id
export const deleteOrderById = async (orderId) => {
    const payload = await prisma.orders.delete({
        where : {
            order_id : parseInt(orderId)
        }
    })
    return payload;
}

// update order by id
export const updateOrderById = async (id, data) => {
    const product = await getProductByIdOrName(data.product_id);
    const price = product.price;
    const total = price * data.order_qty;
    const payload = await prisma.orders.update({
        where : {
            order_id : parseInt(id)
        },
        data : {
            product_id : data.product_id,
            customer_id : data.customer_id,
            order_qty : data.order_qty,
            order_total : total,
            order_date : data.order_date
        }
    })
    return payload;
}

