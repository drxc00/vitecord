

interface NotificationBadgeProps {
    count: number;
}

export function NotificationBadge({ count }: NotificationBadgeProps) {

    if (count === 0) return null;

    return (
        <div className="bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {count}
        </div>
    );
}