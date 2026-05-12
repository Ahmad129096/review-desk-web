import { Activity, AlertTriangle, Clock, CreditCard, Home, LogOut, MessageSquareText, RefreshCw, Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Task } from "../types";
import { EmptyState, TaskItem } from "../components/SharedComponents";
import { useTasks, useUpdateTask } from "../api-query";

interface TasksPageProps {
  user: any;
  onLogout: () => void;
}

export function TasksPage({ user, onLogout }: TasksPageProps) {
  const navigate = useNavigate();
  const { data: tasks = [], isLoading, error, refetch } = useTasks();
  const updateTaskMutation = useUpdateTask();
  const [task, setTask] = useState<Task | null>(null);

  const openTasks = tasks.filter((task) => task.status !== "DONE").length;

  const handleLogoutClick = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <>
      <header className="topbar" style={{
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: 'white',
        padding: '24px 32px',
        borderRadius: '16px',
        marginBottom: '32px',
        border: 'none',
        boxShadow: '0 10px 30px rgba(245, 87, 108, 0.2)'
      }}>
        <div>
          <h1 style={{ color: 'white', marginBottom: '4px' }}>Task Management 📋</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', margin: 0 }}>
            {user.name} · {user.email} · {tasks.length} total tasks
          </p>
        </div>
        <button
          className="iconButton"
          onClick={() => refetch()}
          aria-label="Refresh tasks"
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: 'white'
          }}
        >
          <RefreshCw size={18} />
        </button>
      </header>


      {isLoading && <div className="notice" style={{
        marginBottom: '24px',
        padding: '16px 20px',
        borderRadius: '12px',
        background: '#f8fafc',
        border: '1px solid #e8eaed'
      }}>Loading latest data...</div>}

      <section className="metrics" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
          padding: '24px',
          borderRadius: '16px',
          border: 'none',
          boxShadow: '0 10px 30px rgba(245, 87, 108, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>Total Tasks</div>
              <div style={{ fontSize: '32px', fontWeight: '800', lineHeight: '1' }}>{tasks.length}</div>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AlertTriangle size={24} />
            </div>
          </div>
          <div style={{ fontSize: '14px', opacity: 0.8 }}>
            <Activity size={16} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }} />
            All tasks
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          color: 'white',
          padding: '24px',
          borderRadius: '16px',
          border: 'none',
          boxShadow: '0 10px 30px rgba(79, 172, 254, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>Open Tasks</div>
              <div style={{ fontSize: '32px', fontWeight: '800', lineHeight: '1' }}>{openTasks}</div>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Clock size={24} />
            </div>
          </div>
          <div style={{ fontSize: '14px', opacity: 0.8 }}>
            <Zap size={16} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }} />
            {openTasks > 0 ? 'Requires attention' : 'All done!'}
          </div>
        </div>
      </section>

      <section className="list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onUpdated={refetch} />
        ))}
        {!tasks.length && (
          <div style={{
            padding: '48px',
            background: 'white',
            borderRadius: '16px',
            border: '1px solid #e8eaed',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
          }}>
            <AlertTriangle size={48} style={{ color: '#f5576c', marginBottom: '16px' }} />
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>No Tasks Yet</h3>
            <p style={{ margin: 0, color: '#667085', fontSize: '16px' }}>
              Negative or urgent reviews will create follow-up tasks here.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
