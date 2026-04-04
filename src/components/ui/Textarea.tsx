import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: React.Ref<HTMLTextAreaElement>;
}

export function Textarea({ className = "", ref, ...props }: TextareaProps) {
  return (
    <textarea
      ref={ref}
      className={`border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-[#ffc008] ${className}`}
      {...props}
    />
  );
}
