import { useEffect, useMemo, useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("http://localhost:5000/applications", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setApplications(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const stats = useMemo(() => {
    const total = applications.length;

    const byStatus = {
      Applied: 0,
      Interviewing: 0,
      Negotiating: 0,
      Accepted: 0,
    };

    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);

    let last7Days = 0;
    let withNotes = 0;

    applications.forEach((app) => {
      if (byStatus[app.status] !== undefined) {
        byStatus[app.status] += 1;
      }

      if (app.notes && app.notes.trim().length > 0) {
        withNotes += 1;
      }

      if (app.date_applied) {
        const d = new Date(app.date_applied);
        if (!isNaN(d) && d >= sevenDaysAgo) {
          last7Days += 1;
        }
      }
    });

    const active =
      byStatus.Applied + byStatus.Interviewing + byStatus.Negotiating;

    const responseRate =
      total === 0
        ? 0
        : Math.round(
            ((byStatus.Interviewing + byStatus.Negotiating + byStatus.Accepted) /
              total) *
              100
          );

    return {
      total,
      active,
      last7Days,
      responseRate,
      withNotes,
      byStatus,
    };
  }, [applications]);

  const recentActivity = useMemo(() => {
    const sorted = [...applications].sort((a, b) => {
      const da = new Date(a.date_applied || 0);
      const db = new Date(b.date_applied || 0);
      return db - da;
    });
    return sorted.slice(0, 5);
  }, [applications]);

  const upcoming = [
    {
      label: "Follow up with latest application",
      when: "In 2 days",
    },
    {
      label: "Review CV & portfolio",
      when: "This week",
    },
    {
      label: "Plan next 5 job applications",
      when: "This weekend",
    },
  ];

  return (
    <PageWrapper>
      <div className="dashboard-page">
        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-title">
              Here&apos;s your job search overview
            </h1>
            <p className="dashboard-subtitle">
              Track how your applications are progressing and what to focus on
              next.
            </p>
          </div>

          <button
            className="dashboard-cta-btn"
            onClick={() => {
              window.location.href = "/applications";
            }}
          >
            + Add New Job
          </button>
        </header>

        <section className="dashboard-kpi-row">
          <div className="kpi-card">
            <div className="kpi-label">Total Applications</div>
            <div className="kpi-value">{stats.total}</div>
            <div className="kpi-meta">
              {stats.last7Days} added in the last 7 days
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-label">Active Pipeline</div>
            <div className="kpi-value">{stats.active}</div>
            <div className="kpi-badges">
              <span>Applied: {stats.byStatus.Applied}</span>
              <span>Interviewing: {stats.byStatus.Interviewing}</span>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-label">Response Rate</div>
            <div className="kpi-value">
              {stats.responseRate}
              <span className="kpi-unit">%</span>
            </div>
            <div className="kpi-progress">
              <div
                className="kpi-progress-bar"
                style={{ width: `${stats.responseRate}%` }}
              />
            </div>
            <div className="kpi-meta">
              Interviews / offers out of all applications
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-label">Applications with Notes</div>
            <div className="kpi-value">{stats.withNotes}</div>
            <div className="kpi-meta">
              Keep notes updated after interviews
            </div>
          </div>
        </section>

        <section className="dashboard-main-grid">
          <div className="dashboard-main-left">
            <div className="dashboard-card chart-card">
              <div className="card-header">
                <h2>Applications over time</h2>
                <span className="chip chip-muted">Last 30 days</span>
              </div>
              <div className="chart-bars">
                {[20, 50, 80, 40, 65, 90, 35].map((h, idx) => (
                  <div
                    key={idx}
                    className="chart-bar"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="dashboard-split-row">
              <div className="dashboard-card status-card">
                <div className="card-header">
                  <h2>Status breakdown</h2>
                </div>
                <ul className="status-list">
                  <li>
                    <span className="status-dot status-applied" />
                    Applied
                    <span className="status-count">
                      {stats.byStatus.Applied}
                    </span>
                  </li>
                  <li>
                    <span className="status-dot status-interview" />
                    Interviewing
                    <span className="status-count">
                      {stats.byStatus.Interviewing}
                    </span>
                  </li>
                  <li>
                    <span className="status-dot status-negotiating" />
                    Negotiating
                    <span className="status-count">
                      {stats.byStatus.Negotiating}
                    </span>
                  </li>
                  <li>
                    <span className="status-dot status-accepted" />
                    Accepted
                    <span className="status-count">
                      {stats.byStatus.Accepted}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="dashboard-card activity-card">
                <div className="card-header">
                  <h2>Recent activity</h2>
                </div>
                {loading && <p className="muted">Loading...</p>}
                {!loading && recentActivity.length === 0 && (
                  <p className="muted">
                    No activity yet. Start by adding your first application.
                  </p>
                )}
                <ul className="activity-list">
                  {recentActivity.map((app) => (
                    <li key={app.id} className="activity-item">
                      <div className="activity-main">
                        <span className="activity-title">{app.title}</span>
                        <span className="activity-company">
                          {app.company}
                        </span>
                      </div>
                      <div className="activity-meta">
                        <span className={`badge badge-${app.status}`}>
                          {app.status}
                        </span>
                        <span className="activity-date">
                          {app.date_applied
                            ? new Date(
                                app.date_applied
                              ).toLocaleDateString()
                            : "-"}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside className="dashboard-main-right">
            <div className="dashboard-card goals-card">
              <div className="card-header">
                <h2>This week&apos;s goals</h2>
                <span className="chip chip-primary">Job Search</span>
              </div>

              <ul className="goals-list">
                <li>
                  <div className="goal-text">
                    Apply to 10 jobs this week
                  </div>
                  <div className="goal-progress">
                    <div
                      className="goal-progress-bar"
                      style={{
                        width:
                          stats.last7Days >= 10
                            ? "100%"
                            : `${(stats.last7Days / 10) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="goal-meta">
                    {stats.last7Days}/10 applications
                  </span>
                </li>
                <li>
                  <div className="goal-text">
                    Add notes for each interview
                  </div>
                  <span className="goal-meta">
                    {stats.withNotes} applications with notes
                  </span>
                </li>
                <li>
                  <div className="goal-text">
                    Move at least 1 job to &quot;Interviewing&quot;
                  </div>
                  <span className="goal-meta">
                    {stats.byStatus.Interviewing > 0
                      ? "Goal reached ✅"
                      : "Not yet"}
                  </span>
                </li>
              </ul>
            </div>

            <div className="dashboard-card upcoming-card">
              <div className="card-header">
                <h2>Upcoming</h2>
              </div>
              <ul className="upcoming-list">
                {upcoming.map((item, idx) => (
                  <li key={idx} className="upcoming-item">
                    <div className="upcoming-dot" />
                    <div>
                      <div className="upcoming-text">{item.label}</div>
                      <div className="upcoming-when">{item.when}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </PageWrapper>
  );
}
