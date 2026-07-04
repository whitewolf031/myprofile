import { useState, useEffect, useMemo } from "react";
import api from "../api";
import "../styles/ActivityHeatmap.css";

const DAYS_TO_SHOW = 30;

function buildLastDays(count, dataMap) {
  const cells = [];
  const today = new Date();

  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    cells.push({
      date: dateStr,
      count: dataMap[dateStr] || 0,
    });
  }
  return cells;
}

function levelFromCount(count) {
  if (!count || count <= 0) return 0;
  if (count === 1) return 1;
  if (count === 2) return 2;
  if (count <= 4) return 3;
  return 4;
}

function ActivityHeatmap() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/api/dev/activities/?days=${DAYS_TO_SHOW}`)
      .then((res) => setActivities(res.data || []))
      .catch(() => setActivities([]))
      .finally(() => setLoading(false));
  }, []);

  const dataMap = useMemo(() => {
    const map = {};
    activities.forEach((a) => {
      map[a.date] = a.count;
    });
    return map;
  }, [activities]);

  const cells = useMemo(
    () => buildLastDays(DAYS_TO_SHOW, dataMap),
    [dataMap]
  );
  const total = activities.reduce((sum, a) => sum + (a.count || 0), 0);

  return (
    <section className="activity-section">
      <div className="activity-card">
        <div className="activity-card-header">
          <h3>Activites</h3>
          <span className="activity-total">
            {total} yangilanish · so'nggi {DAYS_TO_SHOW} kun
          </span>
        </div>

        {loading ? (
          <div className="activity-loading">Yuklanmoqda...</div>
        ) : (
          <div className="activity-grid" onMouseLeave={() => setHovered(null)}>
            {cells.map((cell) => (
              <div
                key={cell.date}
                className={`activity-cell level-${levelFromCount(cell.count)}`}
                onMouseEnter={() => setHovered(cell)}
                title={`${cell.date}: ${cell.count} faoliyat`}
              />
            ))}
          </div>
        )}

        <div className="activity-footer">
          <span className="activity-hover-info">
            {hovered
              ? `${hovered.date} — ${hovered.count} faoliyat`
              : "Kvadratga bosing yoki ustiga keling"}
          </span>
          <div className="activity-legend">
            <span>Kam</span>
            {[0, 1, 2, 3, 4].map((lvl) => (
              <span key={lvl} className={`legend-dot level-${lvl}`} />
            ))}
            <span>Ko'p</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ActivityHeatmap;
