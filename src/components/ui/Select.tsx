interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  id?: string
  value?: string
  defaultValue?: string
  options: SelectOption[]
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  disabled?: boolean
  ref?: React.Ref<HTMLSelectElement>
}

export function Select({ id, value, defaultValue, options, onChange, disabled, ref }: SelectProps) {
  return (
    <select
      id={id}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      disabled={disabled}
      ref={ref}
      className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
