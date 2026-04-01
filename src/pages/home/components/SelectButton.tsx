type select_button = {
  text: string
  checked: string
  value: string
  onClick: () => void
}

const SelectButton = ({ text, onClick, checked, value }: select_button) => {
  const isChecked = checked === value
  return (
    <button className={`flex items-center gap-2 p-2 rounded-lg transition cursor-pointer border w-full ${isChecked ? 'border-blue-500' : 'border-gray-500'}`} onClick={onClick}>
      <span className={`w-2 h-2 rounded-full ${isChecked ? 'bg-blue-500' : 'bg-gray-500'}`}></span>
      {text}
    </button>
  )
}

export default SelectButton
