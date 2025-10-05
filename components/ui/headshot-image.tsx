import { getHeadshot } from "@/lib/formatters";

interface HeadshotImageProps {
  personId: number;
  personName: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-20 h-20",
};

export function HeadshotImage({
  personId,
  personName,
  size = "md",
  className = "",
}: HeadshotImageProps) {
  const handleClick = () => {
    window.open(getHeadshot(personId), "_blank");
  };

  return (
    <img
      src={getHeadshot(personId)}
      alt={`${personName} headshot`}
      className={`rounded-full cursor-pointer ${sizeClasses[size]} ${className}`}
      onClick={handleClick}
    />
  );
}
