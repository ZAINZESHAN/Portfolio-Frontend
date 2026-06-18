import { useEffect, useState } from "react";
import { Activity, Briefcase, FolderKanban, Mail } from "lucide-react";
import { getMessages } from "@/api/messages";
import { getProjects } from "@/api/projects";
import { StatCard } from "@/components/admin/StatCard";
import { Skeleton } from "@/components/ui/skeleton";

export function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    projects: 0,
    unread: 0,
    totalMessages: 0,
    experience: 2,
  });
  const [chartData, setChartData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const load = async () => {
      try {
        const [projects, messages] = await Promise.all([
          getProjects(),
          getMessages(),
        ]);

        const unread = messages.filter((m) => !m.is_read).length;

        const last7 = Array.from({ length: 7 }, () => 0);
        const now = new Date();
        messages.forEach((m) => {
          const diff = Math.floor(
            (now.getTime() - new Date(m.created_at).getTime()) / (1000 * 60 * 60 * 24)
          );
          if (diff >= 0 && diff < 7) last7[6 - diff]++;
        });

        setStats({
          projects: projects.length,
          unread,
          totalMessages: messages.length,
          experience: 2,
        });
        setChartData(last7);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  const maxChart = Math.max(...chartData, 1);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Projects" value={stats.projects} icon={FolderKanban} />
        <StatCard
          title="New Messages"
          value={stats.unread}
          icon={Mail}
          trend={stats.unread > 0 ? "Unread" : undefined}
        />
        <StatCard title="Total Experience" value={stats.experience} icon={Briefcase} />
        <StatCard title="System Status" value="Active" icon={Activity} trend="Online" />
      </div>

      <div className="rounded-2xl border border-border/80 bg-card/50 p-6 backdrop-blur-md">
        <h2 className="mb-6 text-lg font-semibold text-foreground">
          Messages Activity (Last 7 Days)
        </h2>
        <div className="flex h-48 items-end justify-between gap-2">
          {chartData.map((value, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-lg bg-primary/60 transition-all hover:bg-primary"
                style={{ height: `${(value / maxChart) * 100}%`, minHeight: value > 0 ? "8px" : "4px" }}
              />
              <span className="text-[10px] text-muted">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">
          Total messages received: {stats.totalMessages}
        </p>
      </div>
    </div>
  );
}
