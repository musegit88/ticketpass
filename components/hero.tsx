
import Image from "next/image";
import ExploreButton from "./ui/explore-button";

const Hero = () => {
  return (
    <>
      <section className="max-w-7xl lg:mx-auto p-5 xl:px-0 w-full ">
        <div className="flex flex-col-reverse items-center gap-4 md:flex md:flex-row justify-center">
          <div className="flex-1 flex flex-col justify-center gap-5">
            <h1 className="font-bold  text-2xl sm:text-4xl">
              Unlock Knowledge, Empower Growth: Discover Educational Events with
              TicketPass!
            </h1>
            <p className="text-xs sm:text-sm md:text-lg">
              Welcome to TicketPass, your gateway to a world of educational
              enlightenment! Dive into a vibrant array of enriching events
              tailored to fuel your curiosity and foster personal growth.
            </p>
            <ExploreButton className="w-full sm:w-fit" label="Explore events" path="/events"/>
          </div>
          <div className="flex-1">
            <Image
              src="/images/hero.jpg"
              alt="hero"
              width={1000}
              height={1000}
              className="max-h-[70vh] object-cover object-center 2xl:max-h-[50vh] rounded-md"
            />
          </div>
        </div>
      </section>
    </>
  );
};
export default Hero;
