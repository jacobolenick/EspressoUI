import React from "react";

// ── Icon assets from Figma (valid 7 days) ─────────────────────
const trashIconNeutral =
  "https://www.figma.com/api/mcp/asset/c8315beb-7a02-4a53-aeda-d83a725b8103";
const trashIconDestructive =
  "https://www.figma.com/api/mcp/asset/744f1c1b-d701-4885-aeeb-29685fef7705";

// ── Types ─────────────────────────────────────────────────────
export type AlertDialogVariant = "default" | "destructive";
export type AlertDialogSize = "default" | "sm";

export interface AlertDialogProps {
  /** Visual tone of the dialog */
  variant?: AlertDialogVariant;
  /**
   * Layout size.
   * - `default` — 384px, horizontal icon + text, right-aligned buttons
   * - `sm`      — 317px, centered icon + text, full-width buttons
   */
  size?: AlertDialogSize;
  /** Show the leading trash icon */
  icon?: boolean;
  /** Dialog headline */
  title?: string;
  /** Supporting body copy */
  description?: string;
  /** Cancel button label */
  cancelLabel?: string;
  /** Confirm button label */
  confirmLabel?: string;
  /** Called when Cancel is clicked */
  onCancel?: () => void;
  /** Called when the confirm action is clicked */
  onConfirm?: () => void;
  className?: string;
}

/**
 * AlertDialog — modal confirmation dialog with optional icon,
 * body text, and two action buttons.
 *
 * Supports light and dark mode via `[data-theme="dark"]` on a
 * parent element or `<html>`.
 *
 * @example
 * // Default (neutral)
 * <AlertDialog
 *   title="Are you sure?"
 *   description="This action cannot be undone."
 *   onCancel={() => setOpen(false)}
 *   onConfirm={handleSave}
 * />
 *
 * // Destructive, small
 * <AlertDialog
 *   variant="destructive"
 *   size="sm"
 *   confirmLabel="Delete"
 *   onConfirm={handleDelete}
 * />
 */
export default function AlertDialog({
  variant = "default",
  size = "default",
  icon = true,
  title = "Are you sure?",
  description =
    "This is an action that cannot be undone. Make sure that's something you are okay with as your data will be deleted forever.",
  cancelLabel = "Cancel",
  confirmLabel,
  onCancel,
  onConfirm,
  className,
}: AlertDialogProps) {
  const isDestructive = variant === "destructive";
  const isSm = size === "sm";

  // Derived confirm label
  const resolvedConfirmLabel =
    confirmLabel ?? (isDestructive ? "Delete" : "Continue");

  // Icon background & tint from Figma tokens
  const iconBg = isDestructive
    ? "var(--destructive-red-50, #fef2f2)"
    : "var(--neutral-100, #f5f5f5)";
  const iconSrc = isDestructive ? trashIconDestructive : trashIconNeutral;

  // Confirm button: destructive = red, default = neutral-950
  const confirmBg = isDestructive
    ? "var(--destructive-red-600, #dc2626)"
    : "var(--dialog-btn-primary-bg, #0a0a0a)";
  const confirmColor = isDestructive
    ? "var(--destructive-red-50, #fef2f2)"
    : "var(--dialog-btn-primary-text, #fafafa)";

  const containerStyle: React.CSSProperties = {
    backgroundColor: "var(--dialog-bg, #ffffff)",
    border: "1px solid var(--dialog-border, #e5e5e5)",
    borderRadius: 16,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: isSm ? "center" : "flex-start",
    overflow: "hidden",
    width: isSm ? 317 : 384,
    boxSizing: "border-box",
    fontFamily: "'Inter', sans-serif",
  };

  const titleStyle: React.CSSProperties = {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: "24px",
    color: "var(--dialog-title, #0a0a0a)",
    margin: 0,
    width: "100%",
    textAlign: isSm ? "center" : "left",
  };

  const descStyle: React.CSSProperties = {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: "20px",
    color: "var(--dialog-desc, #737373)",
    margin: 0,
    width: "100%",
    textAlign: isSm ? "center" : "left",
  };

  const dividerStyle: React.CSSProperties = {
    width: "100%",
    height: 1,
    background: "var(--dialog-border, #e5e5e5)",
    margin: "12px 0 0",
    flexShrink: 0,
  };

  const btnBaseStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    padding: "0 10px",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 500,
    fontFamily: "'Inter', sans-serif",
    cursor: "pointer",
    border: "none",
    whiteSpace: "nowrap",
    transition: "opacity 0.15s",
  };

  return (
    <div style={containerStyle} className={className} role="alertdialog" aria-modal="true" aria-labelledby="dialog-title" aria-describedby="dialog-desc">
      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: isSm ? "column" : "row",
          alignItems: isSm ? "center" : "flex-start",
          gap: isSm ? 8 : 16,
          width: "100%",
        }}
      >
        {/* Icon */}
        {icon && (
          <div
            style={{
              backgroundColor: iconBg,
              borderRadius: 8,
              padding: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <img src={iconSrc} alt="" width={24} height={24} style={{ display: "block" }} />
          </div>
        )}

        {/* Text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 15,
            flex: isSm ? undefined : "1 0 0",
            minWidth: 0,
            width: isSm ? "100%" : undefined,
          }}
        >
          <p id="dialog-title" style={titleStyle}>{title}</p>
          <p id="dialog-desc" style={descStyle}>{description}</p>
        </div>
      </div>

      {/* Divider */}
      <div style={dividerStyle} aria-hidden="true" />

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginTop: 12,
          width: isSm ? "100%" : undefined,
          alignSelf: isSm ? undefined : "flex-end",
        }}
      >
        <button
          onClick={onCancel}
          style={{
            ...btnBaseStyle,
            flex: isSm ? "1 0 0" : undefined,
            backgroundColor: "var(--dialog-btn-cancel-bg, #ffffff)",
            border: "1px solid var(--dialog-btn-cancel-border, #e5e5e5)",
            color: "var(--dialog-btn-cancel-text, #0a0a0a)",
          }}
        >
          {cancelLabel}
        </button>
        <button
          onClick={onConfirm}
          style={{
            ...btnBaseStyle,
            flex: isSm ? "1 0 0" : undefined,
            backgroundColor: confirmBg,
            color: confirmColor,
          }}
        >
          {resolvedConfirmLabel}
        </button>
      </div>
    </div>
  );
}
