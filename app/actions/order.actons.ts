"use server"

import prismaDb from "@/lib/prismaDB"
import { CheckoutOrderProps, CreateOrderProps, GetOrdersByUserProps, GetOrdersByEventProps } from "@/types/types"
import { redirect } from "next/navigation"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
export const checkoutOrder = async (order: CheckoutOrderProps) => {
    const price = order.isFree ? 0 : Number(order.price)
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        unit_amount: price * 100,
                        product_data: {
                            name: order.eventTitle,

                        }
                    },
                    quantity: 1
                },

            ],
            metadata: {
                eventId: order.eventId,
                buyerId: order.buyerId
            },
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}profile`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
        })
        // redirect(session.url!)
        return JSON.parse(JSON.stringify(session.url))
    } catch (error) {
        console.log(error)
    }
}


export const createOrder = async (order: CreateOrderProps) => {
    try {
        const newOrder = await prismaDb.order.create({
            data: {
                stripeId: order.stripeId,
                buyerId: order.buyerId,
                eventId: order.eventId,
                totalAmount: order.totalAmount,
                createdAt: order.createdAt
            }
        })
        return JSON.parse(JSON.stringify(newOrder))
    } catch (error) {
        console.log(error)
    }
}

export const getOrderByUser = async ({ userId, limit = 3, page }: GetOrdersByUserProps) => {
    try {
        const skipAmount = (Number(page) - 1) * limit
        const orders = await prismaDb.order.findMany({

            where: {
                buyerId: userId
            },


            include: {
                event: {
                    include: {
                        organizer: {
                            select: {
                                id: true,
                                first_name: true,
                                last_name: true,
                            }
                        },
                        category: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }, take: limit
        })
        const ordersCount = await prismaDb.order.count({
            where: {
                buyerId: userId
            }
        })
        return { data: JSON.parse(JSON.stringify(orders)), totalPages: Math.ceil(ordersCount / limit) }
    } catch (error) {
        console.log(error)
    }
}

export const getOrdersByEvent = async ({ searchText, eventId }: GetOrdersByEventProps) => {
    try {
        if (!eventId) throw new Error("Event Id is required")


        const searchOrders = await prismaDb.order.findRaw({
            filter: {id: { $regex: searchText } }, options: {
                $options: "i"
            }
        })
        console.log(searchOrders)

  
        const ordersQuery = await prisma?.order.findMany({
            where: {
                eventId
            },
            include: {
                event: {
                    select: {
                        title: true
                    }
                },
                user: {
                    select: {
                        first_name: true,
                        last_name: true,
                        email:true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 10,
        })

        const orders = searchText ? searchOrders : await ordersQuery

        return JSON.parse(JSON.stringify(orders))
    } catch (error) {
        console.log(error)
    }

}