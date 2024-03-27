import { EventProps } from "@/types/types";
import { Button } from "./ui/button";
import { Ticket, TicketPlus } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { checkoutOrder } from "@/app/actions/order.actons";
import { useRouter } from "next/navigation";

type CheckoutProps = {
  event:EventProps
  hasTicket:boolean
  userId:string
}

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Checkout = ({ event, hasTicket,userId}:CheckoutProps) => {
  
  const router = useRouter()
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const handleCheckout = async () => {
    if(hasTicket){
      return;
    }
    const order = {
      eventTitle: event.title,
      eventId: event.id,
      isFree: event.isFree,
      price: event.price,
      buyerId: userId,
    };

    const url = await checkoutOrder(order);
    router.push(url)
  };

  return (
    <form action={handleCheckout} method="post">
      <Button type="submit" role="link" disabled={hasTicket}>
        {hasTicket ? <span className="flex items-center gap-2"><Ticket/><p>You have ticket for this event</p></span> : <span className="flex items-center gap-2"><TicketPlus />
        <p>{event.isFree ? "Get Ticket" : "Buy Ticket"}</p></span>}
        
      </Button>
    </form>
  );
};

export default Checkout;
