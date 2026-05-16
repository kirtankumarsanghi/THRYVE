import { useNavigate } from "react-router-dom";

export default function BackButton({ to, label = "Back" }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-4 py-2 text-on-surface-variant hover:text-primary transition-colors rounded-lg hover:bg-surface-variant/30 group"
    >
      <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">
        arrow_back
      </span>
      <span className="font-body-sm text-body-sm">{label}</span>
    </button>
  );
}
