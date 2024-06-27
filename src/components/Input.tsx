interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: 'primary' | 'secondary'
}

const variantClasses: {
  [key: string]: string
} = {
  primary: 'border-primary',
  secondary: 'border-secondary',
}

const Input = ({ variant, ...props }: InputProps) => {
  const className = `px-4 py-2 text-black border-2 border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${variantClasses[variant]}`
  return <input className={className} {...props} />
}

export default Input
