interface PlaceholderImageProps {
  alt: string;
  className?: string;
  label?: string;
}

export default function PlaceholderImage({
  alt,
  className = "",
  label,
}: PlaceholderImageProps) {
  return (
    <div
      className={`bg-[#E0E0E0] flex items-center justify-center ${className}`}
      role="img"
      aria-label={alt}
    >
      <div className="flex flex-col items-center gap-2 text-[#999] select-none">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-60"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        {label && (
          <span className="text-xs font-medium tracking-wider uppercase opacity-50">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
