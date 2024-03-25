import EventForm from "@/components/event-form";
import Heading from "@/components/ui/heading";
import { auth } from "@clerk/nextjs";
import { CalendarPlus } from "lucide-react";
import { redirect } from "next/navigation";

const createEventPage = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <section>
      <Heading
        title="Create Event"
        description="create your deram event"
        icon={CalendarPlus}
      />
      <EventForm userId={userId} type="Create" />
    </section>
  );
};

export default createEventPage;
