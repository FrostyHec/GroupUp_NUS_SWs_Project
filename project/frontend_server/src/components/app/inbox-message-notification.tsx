import { Notification } from "../data/inbox-data";
import { formatDistance } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { useNotification } from "@/actions/message";

function InboxMessageNotification(item: Notification) {
  const [notification, setNotification] = useNotification();
  return (
    <div
      key={item.id}
      className={cn(
        "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
        notification.selected === item.id && "bg-muted"
      )}
      onClick={() =>
        setNotification({
          ...notification,
          selected: item.id,
        })
      }
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            {item.ownerAvatar || (
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Vercel</title>
                <path d="M24 22.525H0l12-21.05 12 21.05z" fill="currentColor" />
              </svg>
            )}
            <div className="font-semibold">{item.ownerName}</div>
            {!item.read && (
              <span className="flex h-2 w-2 rounded-full bg-blue-600" />
            )}
          </div>
          <div
            className={cn(
              "ml-auto text-xs",
              notification.selected === item.id
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            {formatDistance(item.date, new Date(), {
              addSuffix: true,
            })}
          </div>
        </div>
        <div className="text-xs font-medium">{item.title}</div>
      </div>
      <div className="line-clamp-2 text-xs text-muted-foreground">
        {item.text}
      </div>
    </div>
  );
}

export default InboxMessageNotification;
