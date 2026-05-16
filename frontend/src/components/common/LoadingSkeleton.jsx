export default function LoadingSkeleton({ className = "" }) {
  return (
    <div className={`animate-pulse rounded-lg bg-border/60 ${className}`} />
  );
}
