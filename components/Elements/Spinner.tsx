import clsx from "clsx";

const sizes = {
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
};

const variants = {
  light: "light",
  primary: "text-blue-600",
};

export type SpinnerProps = {
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
  className?: string;
};

export const Spinner = ({
  size = "md",
  variant = "primary",
  className = "spinner",
}: SpinnerProps) => {
  return (
    <>
      <svg
        className={clsx("spinner", sizes[size], variants[variant], className)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        data-testid="loading"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">Loading</span>
    </>
  );
};
