import { createOrder } from "@/app/actions/order.actons";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
    const body = await req.text()
    const signature = req.headers.get("Stripe-Signature") as string

    let event;

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }




    // Create

    const session = event.data.object as Stripe.Checkout.Session
    if (event.type === "checkout.session.completed") {
        const order = {
            stripeId: session.id,
            eventId: session.metadata?.eventId || "",
            buyerId: session.metadata?.buyerId!,
            totalAmount: session.amount_total ? (session.amount_total / 100).toString() : "0",
            createdAt: new Date()
        }
        const newOrder = await createOrder(order)
        return NextResponse.json({ message: "OK", order: newOrder })
    }
    return new Response("", { status: 200 })


}