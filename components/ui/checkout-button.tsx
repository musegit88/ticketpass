"use client";

import { EventProps } from "@/types/types";
import { SignInButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";

import Checkout from "../checkout";
import { UserRound } from "lucide-react";

type CheckoutButtonProps = {
  event:EventProps
  hasTicket:boolean
}

const CheckoutButton = ({ event ,hasTicket}:CheckoutButtonProps) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasEventEnded = new Date(event.endTime) < new Date();

  const handelPath = () => {
    if (typeof window !== "undefined") {
      const path = window.location.href;

      return path;
    }
  };
  return (
    <div className="flex items-center gap-2">
      {hasEventEnded ? (
        <p>Sorry event eneded, tickets are no longer available.</p>
      ) : (
        <>
          <SignedOut>
            <div className="flex items-center gap-2 bg-green-400 text-primary-foreground hover:bg-green-400/90 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2">
              <UserRound />
              <SignInButton
                afterSignInUrl={handelPath()}
                afterSignUpUrl={handelPath()}
              >
                Sign in to grab Your Tickets
              </SignInButton>
            </div>
          </SignedOut>
          <SignedIn>
            <Checkout event={event} userId={userId} hasTicket={hasTicket}/>
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
