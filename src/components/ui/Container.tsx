interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`max-w-4xl mx-auto px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8 ${className}`}>
      {children}
    </div>
  )
}
