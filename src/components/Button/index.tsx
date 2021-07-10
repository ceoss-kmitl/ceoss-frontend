interface IProps {
  children: React.ReactNode
}

export const Button: React.FC<IProps> = ({ children }) => {
  return <button>{children}</button>
}
