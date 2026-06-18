import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ContactMessage } from "@/api/messages";

interface MessageDetailModalProps {
  message: ContactMessage | null;
  open: boolean;
  onClose: () => void;
  onMarkRead: (id: number) => void;
  onDelete: (id: number) => void;
}

export function MessageDetailModal({
  message,
  open,
  onClose,
  onMarkRead,
  onDelete,
}: MessageDetailModalProps) {
  if (!message) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{message.subject}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-surface/50 p-4">
            <p className="text-sm font-medium text-foreground">{message.name}</p>
            <p className="text-sm text-muted">{message.email}</p>
            <p className="mt-2 text-xs text-muted">
              {new Date(message.created_at).toLocaleString()}
            </p>
          </div>

          <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
            {message.message}
          </p>

          <div className="flex justify-end gap-3">
            {!message.is_read && (
              <Button variant="outline" onClick={() => onMarkRead(message.id)}>
                Mark as Read
              </Button>
            )}
            <Button
              variant="outline"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
              onClick={() => onDelete(message.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
