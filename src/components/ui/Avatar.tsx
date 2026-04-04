import Image from "next/image"

interface AvatarProps {
  name: string
  avatarUrl?: string | null
}

export function Avatar({ name, avatarUrl }: AvatarProps) {
  return (
    <div className="flex items-center gap-2">
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={name}
          width={6}
          height={6}
          className="w-6 h-6 rounded-full object-cover"
        />
      ) : (
        <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-medium">
          {name[0].toUpperCase()}
        </div>
      )}
      <span className="text-sm text-gray-700 dark:text-gray-300">{name}</span>
    </div>
  )
}
