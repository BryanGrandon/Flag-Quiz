type button = {
  text: string
  onClick: () => void
  moreClasses?: string
}

const Button = ({ text, onClick, moreClasses = '' }: button) => {
  return (
    <button onClick={onClick} className={`p-2 rounded-lg transition cursor-pointer ${moreClasses}`}>
      {text}
    </button>
  )
}

export default Button
