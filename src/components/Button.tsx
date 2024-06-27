interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void
  variant: 'primary' | 'secondary' | 'warning' | 'danger' | 'info' | 'success'
  children: React.ReactNode
}

const variantClasses: {
  [key: string]: string
} = {
  primary: 'bg-slate-500 text-white',
  secondary: 'bg-slate-200 text-slate-800',
  warning: 'bg-yellow-500 text-white',
  danger: 'bg-red-500 text-white',
  info: 'bg-blue-500 text-white',
  success: 'bg-green-500 text-white',
} as const

const Button = ({ onClick, variant, children, ...props }: ButtonProps) => {
  const className = `px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${variantClasses[variant]}`

  return (
    <button onClick={onClick} className={className} {...props}>
      {children}
    </button>
  )
}

export default Button
