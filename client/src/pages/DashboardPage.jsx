import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getTasks } from "../api/tasks.api";
import { CheckSquare, Clock, AlertTriangle, TrendingUp } from "lucide-react";

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, todo: 0, inProgress: 0, done: 0 });
  const [recentTasks, setRecentTasks] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getTasks();
        const tasks = res.data.data.tasks;
        setStats({
          total: tasks.length,
          todo: tasks.filter((t) => t.status === "todo").length,
          inProgress: tasks.filter((t) => t.status === "in_progress").length,
          done: tasks.filter((t) => t.status === "done").length,
        });
        setRecentTasks(tasks.slice(0, 5));
      } catch {
        /* stats are non-critical */
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: "Total Tasks", value: stats.total, icon: CheckSquare, color: "from-primary-500 to-violet-500" },
    { label: "To Do", value: stats.todo, icon: Clock, color: "from-yellow-500 to-orange-500" },
    { label: "In Progress", value: stats.inProgress, icon: AlertTriangle, color: "from-blue-500 to-cyan-500" },
    { label: "Completed", value: stats.done, icon: TrendingUp, color: "from-green-500 to-emerald-500" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"},{" "}
          <span className="gradient-text">{user?.name}</span>
        </h1>
        <p className="text-white/50 mt-1">Here's an overview of your tasks</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="glass rounded-xl p-5 hover:scale-[1.02] transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/50">{card.label}</p>
                <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                <card.icon size={22} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent tasks */}
      <div className="glass rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Recent Tasks</h2>
        {recentTasks.length === 0 ? (
          <p className="text-white/40 text-center py-8">No tasks yet. Create your first task!</p>
        ) : (
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <div
                key={task._id}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                      task.status === "done"
                        ? "bg-green-400"
                        : task.status === "in_progress"
                        ? "bg-blue-400"
                        : "bg-yellow-400"
                    }`}
                  />
                  <span className="text-sm text-white truncate">{task.title}</span>
                </div>
                <span
                  className={`text-xs font-medium flex-shrink-0 ${
                    task.priority === "high"
                      ? "text-red-400"
                      : task.priority === "medium"
                      ? "text-amber-400"
                      : "text-emerald-400"
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
