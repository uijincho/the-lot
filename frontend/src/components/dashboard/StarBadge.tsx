const LABELS: Record<number, string> = {
  3: 'Matched',
  2: 'Strong Fit',
  1: 'Worth a Look',
}

function Star({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.13L8 10.4l-3.71 2.15L5 8.42 2 5.5l4.15-.75z" />
    </svg>
  )
}

interface Props {
  stars: 1 | 2 | 3
  size?: 'sm' | 'md'
}

export default function StarBadge({ stars, size = 'sm' }: Props) {
  const px = size === 'md' ? 14 : 11
  return (
    <span
      className="inline-flex items-center gap-0.5 text-accent"
      title={LABELS[stars]}
      aria-label={`${stars} star${stars > 1 ? 's' : ''}: ${LABELS[stars]}`}
    >
      {Array.from({ length: stars }, (_, i) => <Star key={i} size={px} />)}
    </span>
  )
}
