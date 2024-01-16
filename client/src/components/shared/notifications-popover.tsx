import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button, buttonVariants } from "@/components/ui/button";
import { BellIcon } from "lucide-react";
import { useMyNotifications } from "@/hooks/useMyNotifications";
import { Notification } from "@/lib/validation";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useReadNotificationMutation } from "@/hooks/useReadNotificationMutation";

export const NotificationsPopover = () => {
  const { data: notifications, isSuccess: isSuccessNotifications } = useMyNotifications();
  const unreadNotifications = notifications?.filter(notification => notification.status === 'UNREAD') ?? [];
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <BellIcon className="h-4 w-4" />
          {unreadNotifications.length > 0 && (
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-96" align="end">
        <div className="grid">
          <div className="space-y-2 p-4 pb-0">
            <h4 className="font-medium leading-none">Notifications</h4>
            <p className="text-sm text-muted-foreground">
              Vous avez {unreadNotifications?.length ?? 0} notifications non lues
            </p>
          </div>
          <Separator className="mt-4" />
          <ScrollArea className="h-[250px]">
            <ul className="flex flex-col">
              {isSuccessNotifications && notifications.map(notification => (<NotificationItem key={notification.id} notification={notification} />))}
            </ul>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  )
}

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const { mutate: readNotification } = useReadNotificationMutation(notification);
  return (
    <li
      onClick={() => notification.status === 'UNREAD' ? readNotification() : undefined}
      className={cn(buttonVariants({ variant: 'ghost' }), "inline-block whitespace-normal h-auto text-start list-none space-y-1")}
    >
      <span className={cn("text-sm flex items-center gap-2", notification.status === 'UNREAD' && 'font-semibold')}>
        {notification.status === 'UNREAD' && (
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        )}
        {notification.date}
      </span>
      <span className="block text-sm text-muted-foreground">
        {notification.message}
      </span>
    </li>
  );
}