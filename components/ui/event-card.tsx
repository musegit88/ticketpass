import { cn } from "@/lib/utils";
import { EventProps } from "@/types/types";
import { auth } from "@clerk/nextjs";
import { ArrowRight, Edit } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import DeleteModal from "./deleteModal";

type EventCardProps = {
  event: EventProps;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const EventCard = ({ event, hasOrderLink, hidePrice }: EventCardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isEventOrganizer = userId === event.organizer?.id;
  const hasEventEnded = new Date(event.endTime) < new Date();
  return (
    <div className="group relative flex flex-col w-full max-w-[400px] min-h-[380px] md:min-h-[438px] shadow-md overflow-hidden rounded-xl transition-all hover:shadow-lg">
      <Link
        href={`/events/${event.id}`}
        style={{ backgroundImage: ` url(${event.imageUrl})` }}
        className="flex items-center justify-center flex-grow bg-slate-400/20 bg-cover bg-center text-muted-foreground cursor-pointer"
      />
      {isEventOrganizer && !hidePrice && (
        <div className="absolute top-2 right-2 flex flex-col gap-4 ">
          <Link
            href={`/events/${event.id}/update`}
            className="bg-white rounded-md p-2 shadow-sm transition-all"
          >
            <Edit size={14} />
          </Link>
          <DeleteModal eventId={event.id} eventName={event.title} />
        </div>
      )}
      <div className="flex flex-col min-h-[180px] gap-3 md:gap-4 p-5 ">
        <div className="flex items-center justify-between">
          {!hidePrice && (
            <div className="flex gap-2">
              <span
                className={cn(
                  event.isFree
                    ? "font-medium bg-green-500/20 text-sm text-green-700 px-2 py-1 rounded-md"
                    : "font-medium bg-blue-500/20 text-sm text-blue-700 px-2 py-1 rounded-md"
                )}
              >
                {event.isFree ? "Free" : `$${event.price}`}
              </span>
              <p className="font-medium bg-slate-400/20 text-sm text-muted-foreground px-2 py-1 rounded-md line-clamp-1 mr-1">
                {event.category?.name}
              </p>
            </div>
          )}
          <div>
            <p className="text-sm leading-5 md:text-base md:leading-6 text-green-700">
              {event.organizer?.first_name} {event.organizer?.last_name}
            </p>
          </div>
        </div>
        {hasEventEnded ? (
          <span className="font-medium bg-red-500/20 text-sm text-red-700 px-2 py-1 rounded-md w-fit">
            Expired
          </span>
        ) : (
          <p className="text-sm leading-6">
            {moment(event.startTime).format("llll")}
          </p>
        )}

        <Link
          href={`/events/${event.id}`}
          className="text-base font-medium leading-6 md:text-xl md:font-semibold md:leading-7 flex-1 line-clamp-2"
        >
          {event.title}
        </Link>
        <div className="flex items-center justify-center">
          {hasOrderLink && (
            <Link href={`/orders?eventId=${event.id}`} className="flex gap-2">
              <p>Order Details</p>
              <ArrowRight />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
