/**
 * FinEase Logo Component
 * A modern, scalable SVG logo with a financial growth theme.
 */

const Logo = ({
  className = "",
  size = "default",
  showText = true,
  iconOnly = false,
}) => {
  // Size variants for the icon container
  const sizes = {
    sm: "w-8 h-8",
    default: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const containerSize = sizes[size] || sizes.default;
  const iconSize = size === "xl" ? 32 : size === "lg" ? 24 : 20;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Icon Container */}
      <div
        className={`${containerSize} flex items-center justify-center rounded-xl bg-gradient-primary shadow-glow-sm shrink-0`}
      >
        {/* Abstract "F" / Growth Icon */}
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white transform translate-x-px" // Optical alignment
        >
          {/* Vertical Bar (Stem) */}
          <path
            d="M6 4C6 2.89543 6.89543 2 8 2H10C11.1046 2 12 2.89543 12 4V20C12 21.1046 11.1046 22 10 22H8C6.89543 22 6 21.1046 6 20V4Z"
            fill="currentColor"
            fillOpacity="0.95"
          />
          {/* Top Bar (Arm) */}
          <path
            d="M12 4H18C19.1046 4 20 4.89543 20 6V8C20 9.10457 19.1046 10 18 10H12V4Z"
            fill="currentColor"
            fillOpacity="0.95"
          />
          {/* Middle Bar (Arm) */}
          <path
            d="M12 12H16C17.1046 12 18 12.8954 18 14V16C18 17.1046 17.1046 18 16 18H12V12Z"
            fill="currentColor"
            fillOpacity="0.8" // Slightly lighter for depth
          />
          {/* Decorative Dot/Spark (Growth indicator) */}
          <circle cx="19" cy="19" r="2" fill="currentColor" fillOpacity="0.6" />
        </svg>
      </div>

      {/* Text Brand */}
      {showText && !iconOnly && (
        <span className="text-xl font-bold font-outfit tracking-tight">
          FinEase
        </span>
      )}
    </div>
  );
};

export default Logo;
