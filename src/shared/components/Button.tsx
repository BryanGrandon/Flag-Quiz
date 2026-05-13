import type { JSX } from 'react'

type ButtonProps = {
  title: string
  icon?: JSX.Element
  onClick: () => void
  className?: string
}

const Button = ({ title, onClick, icon, className = 'bg-gray-800 hover:bg-gray-700' }: ButtonProps) => {
  return (
    <button onClick={onClick} className={`flex item-center gap-2 px-6 py-2 rounded-lg transition overflow-hidden shadow shadow-gray-900 cursor-pointer ${className}`} title={title}>
      {typeof icon !== 'undefined' ? <>{icon}</> : null}
      <span className='overflow-hidden whitespace-nowrap text-ellipsis'>{title}</span>
    </button>
  )
}

export default Button
