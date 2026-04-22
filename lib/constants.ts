export interface Event {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string; 
  time: string;
}
    
export const events: Event[] = [
  {
    title: "React Conference 2026",
    image: "/images/event1.png",
    slug: "react-conf-2026",
    location: "Denver, Colorado",
    date: "May 15-17, 2026",
    time: "9:00 AM",
  },
  {
    title: "Web Summit Europe",
    image: "/images/event2.png",
    slug: "web-summit-europe",
    location: "Lisbon, Portugal",
    date: "June 8-11, 2026",
    time: "8:00 AM",
  },
  {
    title: "DevOps Days NYC",
    image: "/images/event3.png",
    slug: "devops-days-nyc",
    location: "New York, USA",
    date: "June 22-23, 2026",
    time: "9:30 AM",
  },
  {
    title: "Tech Crunch Disrupt",
    image: "/images/event4.png",
    slug: "techcrunch-disrupt-2026",
    location: "San Francisco, California",
    date: "September 21-23, 2026",
    time: "10:00 AM",
  },
  {
    title: "JavaScript Summit",
    image: "/images/event5.png",
    slug: "javascript-summit",
    location: "Berlin, Germany",
    date: "July 14-16, 2026",
    time: "9:00 AM",
  },
  {
    title: "AI & Machine Learning Expo",
    image: "/images/event6.png",
    slug: "ai-ml-expo-2026",
    location: "Boston, Massachusetts",
    date: "August 10-12, 2026",
    time: "8:30 AM",
  },
];
