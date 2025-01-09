import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function FormControl({ children, className }: { children: React.ReactNode, className?: string }) {
    return <div className={cn("flex flex-col gap-2", className)}>{children}</div>;
}

export function FormLabel({ children, ...props }: { children?: React.ReactNode } & React.LabelHTMLAttributes<HTMLLabelElement>) {
    return <label className="text-xs text-primary-foreground font-semibold" {...props}>{children}</label>;
}

export function FormInput({ children, ...props }: { children?: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
    return <Input className="bg-darker border-none rounded-sm focus-visible:ring-transparent text-primary-foreground" {...props} />;
}