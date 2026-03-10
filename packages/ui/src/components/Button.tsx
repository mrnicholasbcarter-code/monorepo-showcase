import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, HTMLMotionProps } from "framer-motion"

import { cn } from "../utils/cn"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground shadow hover:bg-primary/90",
                destructive:
                    "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
                outline:
                    "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
    hover?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, hover = true, ...props }, ref) => {
        if (asChild) {
            return (
                <Slot
                    className={cn(buttonVariants({ variant, size, className }))}
                    ref={ref as any}
                    {...props}
                />
            )
        }

        const Component = hover ? motion.button : "button"
        const motionProps = hover
            ? ({
                whileHover: { scale: 1.02 },
                whileTap: { scale: 0.98 },
            } as HTMLMotionProps<"button">)
            : {}

        return (
            <Component
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref as any}
                {...motionProps}
                {...(props as any)}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
