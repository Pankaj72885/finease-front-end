import { Button } from "@/components/ui/button";
import { Link } from "react-router";

/**
 * Reusable Empty State Component
 * @param {Object} props
 * @param {React.ReactNode} props.icon - Lucide icon component
 * @param {string} props.title - Main heading
 * @param {string} props.description - Supporting text
 * @param {string} [props.actionLabel] - Button text
 * @param {string} [props.actionLink] - Button link
 * @param {Function} [props.onAction] - Button click handler
 */
const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionLink,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Icon Container */}
      {Icon && (
        <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-6">
          <Icon size={36} className="text-muted-foreground" />
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-semibold font-outfit mb-2 text-center">
        {title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-center max-w-sm mb-6">
        {description}
      </p>

      {/* Action Button */}
      {actionLabel && actionLink && (
        <Link to={actionLink}>
          <Button className="rounded-xl bg-gradient-primary hover:opacity-90">
            {actionLabel}
          </Button>
        </Link>
      )}

      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="rounded-xl bg-gradient-primary hover:opacity-90"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
