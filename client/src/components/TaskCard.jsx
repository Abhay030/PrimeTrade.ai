import { Pencil, Trash2, Clock, AlertTriangle, CheckCircle } from "lucide-react";

const statusConfig = {
  todo: { label: "To Do", color: "text-yellow-400 bg-yellow-400/10", icon: Clock },
  in_progress: { label: "In Progress", color: "text-blue-400 bg-blue-400/10", icon: AlertTriangle },
  done: { label: "Done", color: "text-green-400 bg-green-400/10", icon: CheckCircle },
};

const priorityConfig = {
  low: { label: "Low", color: "text-emerald-400" },
  medium: { label: "Medium", color: "text-amber-400" },
  high: { label: "High", color: "text-red-400" },
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  const status = statusConfig[task.status];
  const priority = priorityConfig[task.priority];
  const StatusIcon = status.icon;

  return (
    <div className="glass rounded-xl p-5 hover:border-primary-500/30 transition-all duration-300 group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate group-hover:text-primary-300 transition-colors">
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-white/50 mt-1 line-clamp-2">{task.description}</p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-primary-400 transition-colors cursor-pointer"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 rounded-lg hover:bg-red-500/10 text-white/50 hover:text-red-400 transition-colors cursor-pointer"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Status & priority badges */}
      <div className="flex items-center gap-2 mt-3">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
          <StatusIcon size={12} />
          {status.label}
        </span>
        <span className={`text-xs font-medium ${priority.color}`}>
          ● {priority.label}
        </span>
      </div>

      {/* Owner info for admin view */}
      {task.user?.name && (
        <p className="text-xs text-white/30 mt-3">
          Assigned to: <span className="text-white/50">{task.user.name}</span>
        </p>
      )}
    </div>
  );
};

export default TaskCard;
