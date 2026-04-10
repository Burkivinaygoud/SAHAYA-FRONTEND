import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';

export default function Events() {
  const { eventsData } = useContext(DataContext);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <section className="events">
      <div className="team-hero">
        <h2 className="team-hero-title">Upcoming <em>Events</em></h2>
        <p className="team-hero-sub">Join Us In Making A Difference</p>
        <div className="team-hero-line"></div>
      </div>

      <div className="container">
        <div className="events-grid">
          {eventsData.map((event, i) => {
            const dt = new Date(event.date);
            return (
              <div key={i} className="event-card">
                <div className="event-date">
                  <div className="day">{String(dt.getDate()).padStart(2, '0')}</div>
                  <div className="month">{months[dt.getMonth()]}</div>
                </div>
                <div className="event-info">
                  <h4>{event.title}</h4>
                  <p>{event.desc}</p>
                  <div className="ev-meta">
                    <span className="ev-chip">📍 {event.loc}</span>
                    <span className="ev-chip">⏰ {event.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
