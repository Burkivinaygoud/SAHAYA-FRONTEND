import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/DataContext';

export default function Stats() {
  const { stats } = useContext(DataContext);
  const [animatedStats, setAnimatedStats] = useState({ years: 0, children: 0, events: 0, volunteers: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        const statLabels = ['years', 'children', 'events', 'volunteers'];
        statLabels.forEach((label) => {
          const finalValue = stats[label];
          let currentValue = 0;
          const increment = Math.ceil(finalValue / 40);
          const interval = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
              currentValue = finalValue;
              clearInterval(interval);
            }
            setAnimatedStats((prev) => ({ ...prev, [label]: currentValue }));
          }, 30);
        });
      }
    }, { threshold: 0.3 });

    const element = document.querySelector('.stats-bar');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [stats, hasAnimated]);

  return (
    <div className="stats-bar">
      <div className="stats-inner">
        <div className="stat-item">
          <div className="stat-number">{animatedStats.years}<span>+</span></div>
          <div className="stat-label">Years of Service</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{animatedStats.children}<span>+</span></div>
          <div className="stat-label">Children Impacted</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{animatedStats.events}<span>+</span></div>
          <div className="stat-label">Events Conducted</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{animatedStats.volunteers}<span>+</span></div>
          <div className="stat-label">Student Volunteers</div>
        </div>
      </div>
    </div>
  );
}
