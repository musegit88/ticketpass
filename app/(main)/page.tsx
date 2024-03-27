import EventsList from "@/components/events-list";
import Hero from "@/components/hero";
import { getAllEvents, getNewEvents } from "../actions/event.actions";
import { Button } from "@/components/ui/button";
import ExploreButton from "@/components/ui/explore-button";

export default async function Home() {
  const events = await getNewEvents();
  return (
    <>
      <Hero />
     
      <section className="max-w-7xl lg:mx-auto p-5 xl:px-0 w-full">
        <div className="flex flex-col items-center gap-4 my-4">
          <EventsList
            data={events?.data}
            eventsListType="All_Events"
            emptyDataTitle="No event found"
            emptyDataDescription="please try again"
            page={1}
          />
          
          <ExploreButton className="mt-4" label="Find your next event" path="/events"/>
        </div>
      </section>
    </>
  );
}
