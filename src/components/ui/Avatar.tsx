"use client";

import { useState } from "react";

interface AvatarProps {
  name: string;
  avatarUrl?: string | null;
}

export function Avatar({ name, avatarUrl }: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const showImage = avatarUrl && !imgError;

  return (
    <div className="flex items-center gap-2">
      {showImage ? (
        <img
          src={avatarUrl}
          alt={name}
          width={24}
          height={24}
          className="w-6 h-6 rounded-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-6 h-6 rounded-full bg-[#ffc008] flex items-center justify-center text-white text-xs font-medium">
          {name[0].toUpperCase()}
        </div>
      )}
      <span className="text-sm text-gray-700 dark:text-gray-300">{name}</span>
    </div>
  );
}
