import { getAllEvents } from "@/app/actions/event.actions";
import CategoryFilter from "@/components/category-filter";
import EventsList from "@/components/events-list";
import Search from "@/components/search";
import { SearchParamsProps } from "@/types/types";

const eventsPage = async ({ searchParams }: SearchParamsProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";
  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });
  return (
    <div >
      <div className="flex flex-col items-center w-full gap-4 mb-4 md:flex-row">
        <Search />
        <CategoryFilter />
      </div>

      <EventsList
        data={events?.data}
        eventsListType="All_Events"
        emptyDataTitle="No event found"
        emptyDataDescription="please try again"
        limit={6}
        page={page}
        totalPages={events?.totalPages}
      />
    </div>
  );
};
export default eventsPage;
