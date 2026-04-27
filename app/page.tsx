import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { events } from "@/lib/constants";

export default function Home() {
  return (
    <section>
      <h1 className = "text-center leading-tight">The Hub for Every Dev <br /> Event You Can't Miss</h1>
      <p className = "text-center mt-5" >Hackathons, meetups, and conferences, all in one place.</p>
      
      <ExploreBtn />

      <div className = "mt-20 space-y-6">
        <h3>Feature events</h3>
        <ul className = 'events list-none'>
          {events.map((event) => (
            <li key = {event.title}>
              <EventCard {...event} />
            </li>
          ))} 

        </ul>
      </div>
    </section>
  );
}
