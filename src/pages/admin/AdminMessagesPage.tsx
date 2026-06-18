import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import {
  deleteMessage,
  getMessages,
  markMessageAsRead,
  type ContactMessage,
} from "@/api/messages";
import { MessageDetailModal } from "@/components/admin/MessageDetailModal";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useToast } from "@/context/ToastContext";

type Filter = "all" | "read" | "unread";

export function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await getMessages();
      setMessages(data);
    } catch {
      toast("Failed to load messages", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const filtered = useMemo(() => {
    if (filter === "read") return messages.filter((m) => m.is_read);
    if (filter === "unread") return messages.filter((m) => !m.is_read);
    return messages;
  }, [messages, filter]);

  const handleMarkRead = async (id: number) => {
    try {
      const updated = await markMessageAsRead(id);
      setMessages((prev) => prev.map((m) => (m.id === id ? updated : m)));
      setSelected(updated);
      toast("Marked as read");
    } catch {
      toast("Failed to update message", "error");
    }
  };

  const confirmDelete = async () => {
    if (deleteId === null) return;
    setDeleting(true);
    try {
      await deleteMessage(deleteId);
      setMessages((prev) => prev.filter((m) => m.id !== deleteId));
      setSelected(null);
      setDeleteId(null);
      toast("Message deleted");
    } catch {
      toast("Failed to delete message", "error");
    } finally {
      setDeleting(false);
    }
  };

  const filters: { label: string; value: Filter }[] = [
    { label: "All", value: "all" },
    { label: "Unread", value: "unread" },
    { label: "Read", value: "read" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Button
            key={f.value}
            variant={filter === f.value ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/30 py-16 text-center">
          <p className="text-muted">No messages found</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((message, index) => (
            <motion.button
              key={message.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.04 }}
              onClick={() => setSelected(message)}
              className={cn(
                "flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all hover:border-primary/30 hover:bg-card/60",
                message.is_read
                  ? "border-border/60 bg-card/30"
                  : "border-primary/20 bg-card/50"
              )}
            >
              <div
                className={cn(
                  "mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                  message.is_read ? "bg-surface text-muted" : "bg-primary/15 text-primary"
                )}
              >
                {message.is_read ? (
                  <MailOpen className="h-4 w-4" />
                ) : (
                  <Mail className="h-4 w-4" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p
                    className={cn(
                      "truncate text-sm",
                      message.is_read ? "font-medium text-muted" : "font-semibold text-foreground"
                    )}
                  >
                    {message.name}
                  </p>
                  <span className="text-xs text-muted">
                    {new Date(message.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="truncate text-sm text-muted">{message.email}</p>
                <p className="mt-1 truncate text-sm text-foreground/80">{message.subject}</p>
                <p className="mt-1 line-clamp-1 text-xs text-muted">{message.message}</p>
              </div>

              <div className="flex shrink-0 gap-1">
                {!message.is_read && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkRead(message.id);
                    }}
                    className="rounded-lg p-2 text-muted hover:bg-surface hover:text-primary"
                    title="Mark as read"
                  >
                    <MailOpen className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteId(message.id);
                  }}
                  className="rounded-lg p-2 text-muted hover:bg-red-500/10 hover:text-red-400"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </motion.button>
          ))}
        </div>
      )}

      <MessageDetailModal
        message={selected}
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        onMarkRead={handleMarkRead}
        onDelete={(id) => setDeleteId(id)}
      />

      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && !deleting && setDeleteId(null)}
        title="Delete Message?"
        description="Are you sure you want to delete this message? This action cannot be undone."
        onConfirm={confirmDelete}
        loading={deleting}
      />
    </div>
  );
}
