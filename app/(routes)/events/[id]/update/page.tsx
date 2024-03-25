import { getEventById } from "@/app/actions/event.actions";
import EventForm from "@/components/event-form";
import Heading from "@/components/ui/heading";
import { auth } from "@clerk/nextjs";
import { Edit } from "lucide-react";

const UpdatePage = async ({ params }: { params: { id: string } }) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const event = await getEventById(params.id);

  return (
    <section>
      <Heading title="UpdateEvent"  icon={Edit} />
      <EventForm
        userId={userId}
        eventId={event.id}
        event={event}
        type="Update"
      />
    </section>
  );
};

export default UpdatePage;
