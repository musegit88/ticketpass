import { EventProps } from "@/types/types";
import EventCard from "./ui/event-card";
import GoTo from "./ui/go-to";
import Pagination from "./ui/pagination";

type EventListProps = {
  data: EventProps[];
  eventsListType: "Events_organized" | "My_tickets" | "All_Events";
  emptyDataTitle: string;
  emptyDataDescription: string;
  link?: string;
  linkTitle?: string;
  limit?: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
};

const EventsList = ({
  data,
  eventsListType,
  emptyDataTitle,
  emptyDataDescription,
  link,
  linkTitle,
  page,
  totalPages = 0,
  urlParamName,
}: EventListProps) => {
  return (
    <>
      {data?.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10 w-full">
            {data.map((event) => {
              const hasOrderLink = eventsListType === "Events_organized";
              const hidePrice = eventsListType === "My_tickets";

              return (
                <li key={event.id} className="flex justify-center">
                  {!event.isArchived && (
                    <EventCard
                      event={event}
                      hasOrderLink={hasOrderLink}
                      hidePrice={hidePrice}
                    />
                  )}
                </li>
              );
            })}
          </ul>
          {totalPages > 1 && (
            <div className="">
              <Pagination
                urlParamName={urlParamName}
                page={page}
                totalPages={totalPages}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center gap-2 text-center min-h-[200px]">
          <h4 className="font-bold text-xl leading-7 tracking-[2%] md:text-3xl md:leading-9">
            {emptyDataTitle}
          </h4>

          {link ? (
            <GoTo
              description={emptyDataDescription}
              to={link}
              linkTitle={linkTitle}
            />
          ) : (
            <p className="text-sm leading-5">{emptyDataDescription}</p>
          )}
        </div>
      )}
    </>
  );
};

export default EventsList;
