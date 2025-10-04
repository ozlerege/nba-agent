import Image from "next/image";
import { getTeamLogoByAbbreviation, getTeamLogoUrl } from "@/components/functions";

export function TeamLogo({
  teamId,
  size = "md",
  className = "",
}: {
  teamId: string | number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const px = { sm: 32, md: 48, lg: 96 } as const;

  const idNum =
    typeof teamId === "number"
      ? teamId
      : /^[0-9]+$/.test(teamId)
      ? Number(teamId)
      : null;

  const src = idNum !== null ? getTeamLogoUrl(idNum) : getTeamLogoByAbbreviation(String(teamId));

  return (
    <Image
      src={src}
      alt={`${teamId} logo`}
      width={px[size]}
      height={px[size]}
      className={`object-contain ${className}`}
    />
  );
}
