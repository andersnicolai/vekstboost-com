import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Eye, EyeOff, Search, X } from "lucide-react"

const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-gray-200 focus:border-primary",
        filled: "bg-gray-100 border-transparent focus:bg-white focus:border-primary",
        flushed: "border-0 border-b-2 rounded-none focus:border-primary",
        unstyled: "border-0 focus:ring-0 focus:border-0",
      },
      size: {
        default: "h-10",
        sm: "h-8 text-xs",
        lg: "h-12 text-base",
      },
      state: {
        default: "",
        error: "border-red-500 focus:border-red-500 focus:ring-red-500",
        success: "border-green-500 focus:border-green-500 focus:ring-green-500",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  icon?: React.ReactNode
  error?: string
  clearable?: boolean
  onClear?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant, 
    size, 
    state, 
    icon, 
    error, 
    clearable, 
    onClear,
    type = "text",
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)
    
    const inputType = type === "password" && showPassword ? "text" : type
    const hasError = state === "error" || error
    const currentState = hasError ? "error" : state
    
    return (
      <div className="relative w-full">
        <div className={cn(
          "relative flex items-center",
          isFocused && "ring-2 ring-ring ring-offset-2 rounded-md",
          hasError && "ring-red-500"
        )}>
          {icon && (
            <div className="absolute left-3 text-gray-400">
              {icon}
            </div>
          )}
          <input
            type={inputType}
            className={cn(
              inputVariants({ variant, size, state: currentState, className }),
              icon && "pl-10",
              clearable && "pr-10",
              type === "password" && "pr-24"
            )}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          
          {clearable && props.value && (
            <button
              type="button"
              className="absolute right-3 text-gray-400 hover:text-gray-600"
              onClick={onClear}
            >
              <X size={16} />
            </button>
          )}
          
          {type === "password" && (
            <button
              type="button"
              className="absolute right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>
        
        {error && (
          <motion.p 
            className="mt-1 text-xs text-red-500"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants } 