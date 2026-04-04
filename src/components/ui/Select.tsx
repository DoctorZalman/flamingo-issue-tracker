interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  options: SelectOption[]
  id?: string
  name?: string
  value?: string
  defaultValue?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  disabled?: boolean
  "aria-label"?: string
  ref?: React.Ref<HTMLSelectElement>
}

export function Select({
  id,
  name,
  value,
  defaultValue,
  options,
  onChange,
  disabled,
  ref,
  "aria-label": ariaLabel,
}: SelectProps) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      className="appearance-none text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 pr-8 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ffc008] disabled:opacity-50 bg-no-repeat bg-[right_0.5rem_center] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')]"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
