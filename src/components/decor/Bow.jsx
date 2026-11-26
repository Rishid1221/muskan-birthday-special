// Hand-coded bow silhouette (original shape, not a licensed character asset).
export default function Bow({ className = "", color = "var(--color-blush-500)" }) {
  return (
    <svg viewBox="0 0 100 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M48 30C48 30 40 6 18 6C6 6 2 16 2 22C2 32 14 38 30 32C34 30.5 48 30 48 30Z"
        fill={color}
      />
      <path
        d="M52 30C52 30 60 6 82 6C94 6 98 16 98 22C98 32 86 38 70 32C66 30.5 52 30 52 30Z"
        fill={color}
      />
      <circle cx="50" cy="30" r="10" fill={color} />
      <circle cx="50" cy="30" r="10" fill="black" fillOpacity="0.08" />
    </svg>
  );
}
