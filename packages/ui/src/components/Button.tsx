import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, HTMLMotionProps, AnimatePresence } from "framer-motion"

import { cn } from "../utils/cn"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-black uppercase tracking-widestAlpha transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
    {
        variants: {
            variant: {
                default: "bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10",
                destructive: "bg-rose-600 text-white shadow-sm hover:bg-rose-500 shadow-rose-900/20",
                outline: "border border-white/10 bg-transparent text-white hover:bg-white/5",
                secondary: "bg-white/5 text-white border border-white/5 hover:bg-white/10",
                ghost: "text-slate-400 hover:text-white hover:bg-white/5",
                link: "text-ocean-400 underline-offset-4 hover:underline",
                ocean: "bg-ocean-600 text-white shadow-lg shadow-ocean-950/40 hover:bg-ocean-500 border border-ocean-400/20",
                glass: "bg-white/[0.03] backdrop-blur-md border border-white/10 text-white hover:bg-white/[0.08]",
            },
            size: {
                default: "h-11 px-6 py-2",
                sm: "h-9 rounded-lg px-4 text-[10px]",
                lg: "h-14 rounded-2xl px-10 text-base",
                icon: "h-11 w-11",
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
    glow?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, hover = true, glow = false, ...props }, ref) => {
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
                transition: { type: "spring", stiffness: 400, damping: 17 }
            } as HTMLMotionProps<"button">)
            : {}

        return (
            <Component
                className={cn(
                    buttonVariants({ variant, size, className }),
                    glow && "shadow-[0_0_20px_rgba(14,165,233,0.3)] border-ocean-400/20"
                )}
                ref={ref as any}
                {...motionProps}
                {...(props as any)}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
