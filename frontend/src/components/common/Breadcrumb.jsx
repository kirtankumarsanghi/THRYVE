import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const formatLabel = (str) => {
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <nav className="flex items-center gap-2 mb-6">
      <Link 
        to="/" 
        className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
      >
        <span className="material-symbols-outlined text-[18px]">home</span>
      </Link>
      
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <div key={name} className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
              chevron_right
            </span>
            {isLast ? (
              <span className="font-body-sm text-body-sm text-on-surface font-medium">
                {formatLabel(name)}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
              >
                {formatLabel(name)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
