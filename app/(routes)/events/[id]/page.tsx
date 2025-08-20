import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/app/actions/event.actions";
import { cn } from "@/lib/utils";
import { CalendarDays, Edit, Laptop, MapPinIcon } from "lucide-react";
import Image from "next/image";
import moment from "moment";
import EventsList from "@/components/events-list";
import { SearchParamsProps } from "@/types/types";
import CheckoutButton from "@/components/ui/checkout-button";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/app/actions/user.actions";
import DeleteModal from "@/components/ui/deleteModal";
import Link from "next/link";

const EventDetailsPage = async ({
  params: { id },
  searchParams,
}: SearchParamsProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const event = await getEventById(id);
  const user = await getUserById(userId);

  const author = event.organizer.id === userId;

  const formatedUser: any[] = user?.order.map((order: any) => ({
    orderEventId: order.eventId,
  }));

  const userTicket = formatedUser?.filter(
    (ticket) => ticket.orderEventId === id
  );

  const hasTicket =
    userTicket && (userTicket[0]?.orderEventId as string) === id;

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category.id,
    eventId: event.id,
    page: searchParams.page as string,
  });
  return (
    <>
      <section className="flex justify-center bg-contain">
        <div className="grid grid-cols-1 2xl:max-w-7xl">
          <div className="relative">
            <Image
              src={event?.imageUrl}
              alt="event image"
              width={1000}
              height={1000}
              className="w-full h-full min-h-[300px] object-cover object-center rounded-lg"
            />
            {author && (
              <div className="absolute top-2 right-2 flex flex-col gap-4 ">
                <Link
                  href={`/events/${event.id}/update`}
                  className="bg-white/40 rounded-md p-2 shadow-sm transition-all"
                >
                  <Edit size={14} className="text-green-500" />
                </Link>
                <DeleteModal eventId={event.id} eventName={event.title} />
              </div>
            )}
          </div>
          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-5">
              <h2 className="capitalize font-bold text-3xl leading-[40px] lg:text-4xl lg:leading-[60px] xl:text-6xl xl:leading-[74px]">
                {event.title}
              </h2>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="flex gap-2">
                  <p
                    className={cn(
                      event.isFree
                        ? "font-semibold bg-green-500/20 text-green-700 px-5 py-2 rounded-md"
                        : "font-semibold bg-blue-500/20 text-blue-700 px-5 py-2 rounded-md"
                    )}
                  >
                    {event.isFree ? "Free" : `$${event.price}`}
                  </p>
                  <p className="font-medium bg-slate-400/20 text-muted-foreground px-5 py-2 rounded-md line-clamp-1">
                    {event.category.name}
                  </p>
                </div>
                <p className="font-semibold leading-7 ml-2 mt-2 sm:mt-0">
                  by{" "}
                  <span className="text-green-700">
                    {event.organizer.first_name} {event.organizer.last_name}
                  </span>
                </p>
              </div>
            </div>
            {author ? (
              ""
            ) : (
              <CheckoutButton event={event} hasTicket={hasTicket} />
            )}

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 md:gap-4">
                <CalendarDays color="green" />
                <div className="flex flex-wrap gap-2 items-center text-sm lg:text-lg leading-[30px] tracking-[2%]">
                  <p>{moment(event.startTime).format("llll")}</p> -
                  <p>{moment(event.endTime).format("llll")}</p>
                </div>
              </div>
              {event && event.isOnline ? (
                <div className="flex items-center gap-2 md:gap-4">
                  <Laptop color="green" />
                  <p className="text-sm lg:text-lg leading-[30px] tracking-[2%]">
                    Online
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-2 md:gap-4">
                  <MapPinIcon color="green" />
                  <p className="text-sm lg:text-lg leading-[30px] tracking-[2%]">
                    {event.location}
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-4">
                <p className="font-bold text-xl leading-[30px] tracking-[2%] text-slate-500">
                  About the event
                </p>
                <p className="font-normal text-sm leading-6 lg:text-lg">
                  {event.description}
                </p>
                <p className="font-normal text-sm leading-6 lg:text-lg truncate underline text-green-700">
                  <a href={event.url} target="_blank">
                    {event.url}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl lg:mx-auto p-5 xl:px-0 w-full flex flex-col gap-8 md:gap-12 my-8">
        <h2 className="font-semibold text-3xl leading-10 lg:text-4xl  xl:text-5xl xl:leading-[48px]">
          Related Events
        </h2>
        <EventsList
          data={relatedEvents?.data}
          eventsListType="All_Events"
          emptyDataTitle="No event found"
          emptyDataDescription="No event found related with this event"
          limit={3}
          page={searchParams.page as string}
          totalPages={relatedEvents?.totalPages}
        />
      </section>
    </>
  );
};

export default EventDetailsPage;
