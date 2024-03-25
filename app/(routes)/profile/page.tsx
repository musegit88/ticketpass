import { getEventByUser } from "@/app/actions/event.actions";
import { getOrderByUser } from "@/app/actions/order.actons";
import EventsList from "@/components/events-list";
import Heading from "@/components/ui/heading";
import { SearchParamsProps } from "@/types/types";
import { auth } from "@clerk/nextjs";
import { ClipboardList, TicketCheck } from "lucide-react";

const ProfilePage = async ({ searchParams }: SearchParamsProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.ordersPage) || 1;

  const myEvents = await getEventByUser({ userId, page: eventsPage });
  const myTickets = await getOrderByUser({ userId, page: ordersPage });
  const myTicketsEvent = myTickets?.data.map((order: any) => order.event) || [];
  return (
    <>
      <section>
        <Heading
          title="My Tickets"
          description="Lorem epsem"
          icon={TicketCheck}
        />
        <div>
          <EventsList
            data={myTicketsEvent}
            eventsListType="My_tickets"
            emptyDataTitle="No event tickets purchased yet"
            emptyDataDescription="grab your ticket"
            link={"/events"}
            linkTitle="Explore events"
            limit={3}
            page={ordersPage}
            totalPages={myTickets?.totalPages}
            urlParamName="ordersPage"
          />
        </div>
      </section>
      <section className="mt-5">
        <Heading
          title="My Events"
          description="Lorem epsem"
          icon={ClipboardList}
        />
        <div>
          <EventsList
            data={myEvents?.data}
            eventsListType="Events_organized"
            emptyDataTitle="No event have been created yet"
            emptyDataDescription="create event now "
            link={"/events/create"}
            linkTitle="Create event"
            limit={6}
            page={eventsPage}
            totalPages={myEvents?.totalPages}
            urlParamName="eventsPage"
          />
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
