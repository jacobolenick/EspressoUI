import React from "react";

// Asset URLs from Figma (valid for 7 days)
const iconInfoNeutral =
  "https://www.figma.com/api/mcp/asset/1603ae7f-f076-43c9-99ee-c8b8e0a398d6";
const iconInfoDestructive =
  "https://www.figma.com/api/mcp/asset/a66ec8d5-c408-44db-8b4d-4b902181f9d5";

// ─── Button ──────────────────────────────────────────────────────────────────

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

function Button({ children = "Button", onClick, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex items-center justify-center gap-1",
        "h-8 px-2.5 py-2",
        "bg-white border border-neutral-200 rounded-md",
        "font-medium text-xs text-neutral-950 whitespace-nowrap",
        "hover:bg-neutral-50 transition-colors",
        "shrink-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
}

// ─── Alert ───────────────────────────────────────────────────────────────────

export type AlertVariant = "default" | "destructive" | "success";

export interface AlertProps {
  /** Visual style of the alert */
  variant?: AlertVariant;
  /** Whether to show the leading icon */
  icon?: boolean;
  /** Alert headline */
  title?: string;
  /** Supporting text below the title */
  description?: string;
  /** Action button label; pass null to hide */
  actionLabel?: string | null;
  /** Called when the action button is clicked */
  onAction?: () => void;
  className?: string;
}

/**
 * Alert — surface-level notification with optional icon, text, and action.
 *
 * @example
 * <Alert title="Heads up!" description="Your trial ends in 3 days." />
 * <Alert variant="destructive" title="Error" description="Something went wrong." actionLabel="Retry" onAction={retry} />
 */
export default function Alert({
  variant = "default",
  icon = true,
  title = "Alert Title Text",
  description = "Alert description text",
  actionLabel = "Button",
  onAction,
  className,
}: AlertProps) {
  const isDestructive = variant === "destructive";
  const isSuccess = variant === "success";

  // Colors from Figma variables:
  //   Success green/700 → #15803d  (title)
  //   Success green/600 → #16a34a  (description)
  //   Success green/500 → #22c55e  (icon tint via filter)
  const textColor = isDestructive
    ? "text-red-600"
    : isSuccess
    ? "text-[#15803d]"
    : "text-neutral-950";
  const subColor = isDestructive
    ? "text-red-500"
    : isSuccess
    ? "text-[#16a34a]"
    : "text-neutral-500";
  const iconSrc = isDestructive ? iconInfoDestructive : iconInfoNeutral;
  // Tint the neutral icon green for the success state
  const iconStyle: React.CSSProperties =
    isSuccess
      ? {
          filter:
            "invert(40%) sepia(90%) saturate(400%) hue-rotate(100deg) brightness(90%)",
        }
      : {};

  return (
    <div
      className={[
        "flex items-center gap-6",
        "w-full p-3",
        "bg-white border border-neutral-300 rounded-[10px]",
        "overflow-hidden",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="alert"
      aria-live={isDestructive ? "assertive" : "polite"}
      aria-label={isSuccess ? "Success" : isDestructive ? "Error" : undefined}
    >
      {/* Main content */}
      <div className="flex items-start gap-6 flex-1 min-w-0">
        {/* Icon */}
        {icon && (
          <div className="shrink-0 size-6" aria-hidden="true">
            <img
              src={iconSrc}
              alt=""
              className="size-full object-contain"
              style={iconStyle}
            />
          </div>
        )}

        {/* Text */}
        <div className="flex flex-col gap-1">
          {title && (
            <p
              className={`font-semibold text-lg leading-7 ${textColor}`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {title}
            </p>
          )}
          {description && (
            <p
              className={`font-normal text-sm leading-5 ${subColor}`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Action */}
      {actionLabel !== null && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}
