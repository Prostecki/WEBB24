import EventList from "./EventList";
import EventForm from "./EventForm";
import FilterButtons from "./FilterButtons";
import { useState, useEffect } from "react";
import "./EventCalendar.css";

import { useUserContext } from "../../context/UserContext";
export default function EventCalendar() {
  const { user } = useUserContext();

  const [tasks, setTasks] = useState(() => {
    if (!user) return [];

    const savedTasks = localStorage.getItem(user.username);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    if (user && tasks.length > 0) {
      localStorage.setItem(user.username, JSON.stringify(tasks));
    }
  }, [tasks, user]);

  return (
    <section className="event-calendar">
      <div className="event-form-container">
        <h1 className="event-headline">Event Calendar</h1>
        <EventForm />
      </div>
      <div className="event-content-container">
        <FilterButtons />
        <EventList />
      </div>
    </section>
  );
}