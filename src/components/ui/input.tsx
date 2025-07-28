'use client'
import * as React from "react"

import { cn } from "@/lib/utils"
import { Eye } from "lucide-react"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
    const [visible, setVisible] = React.useState(false);
    return (
        <div className={cn(
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex items-center h-9 w-full min-w-0 rounded-md border bg-transparent text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                className
            )} 
            aria-invalid={props["aria-invalid"]}
            aria-describedby={props["aria-describedby"]}>
            <input type={type === 'password' ? (visible ? 'text' : type) : type}
                data-slot="input"
                className="w-full shadow-none px-3 py-1 outline-none"
                {...props}
            />
            { 
                type === 'password' ? 
                    <span className={cn("pr-2 cursor-pointer text-gray-400", { "text-primary": visible })} 
                          onClick={() => setVisible(!visible)}>
                        <Eye size={20} />
                    </span> : null 
            }
        </div>
    )
}

export { Input }
