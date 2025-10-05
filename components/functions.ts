export function formatExperience(experience: string | null) {
  if (!experience || experience === "0") return "—";
  if (experience === "R") return "Rookie";
  return `${experience} years`;
}
export function getTeamLogoUrl(teamId: number) {
  return `https://cdn.nba.com/logos/nba/${teamId}/global/L/logo.svg`;
}

export function getTeamLogoByAbbreviation(abbreviation: string) {
  return `https://cdn.nba.com/logos/nba/${abbreviation}/global/L/logo.svg`;
}
function getTeamIdByAbbr(abbr: string): number {
  const map: Record<string, number> = {
    ATL: 1610612737,
    BOS: 1610612738,
    CLE: 1610612739,
    NOP: 1610612740,
    CHI: 1610612741,
    DAL: 1610612742,
    DEN: 1610612743,
    GSW: 1610612744,
    HOU: 1610612745,
    LAC: 1610612746,
    LAL: 1610612747,
    MIA: 1610612748,
    MIL: 1610612749,
    MIN: 1610612750,
    BKN: 1610612751,
    NYK: 1610612752,
    ORL: 1610612753,
    IND: 1610612754,
    PHI: 1610612755,
    PHX: 1610612756,
    POR: 1610612757,
    SAC: 1610612758,
    SAS: 1610612759,
    OKC: 1610612760,
    TOR: 1610612761,
    UTA: 1610612762,
    MEM: 1610612763,
    WAS: 1610612764,
    DET: 1610612765,
    CHA: 1610612766,
  };
  return map[abbr] || 0;
}

export function getHeadshot(personId: number) {
  return `https://cdn.nba.com/headshots/nba/latest/1040x760/${personId}.png`;
}

export const integerFormatter = new Intl.NumberFormat("en-US");
export const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
  minimumFractionDigits: 1,
});
export const decimalFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 1,
});

export function formatPercent(value: number) {
  if (!Number.isFinite(value)) return "—";
  return percentFormatter.format(value);
}

export function formatDecimal(value: number) {
  if (!Number.isFinite(value)) return "—";
  return decimalFormatter.format(value);
}

export function formatInteger(value: number) {
  if (!Number.isFinite(value)) return "—";
  return integerFormatter.format(value);
}

export function formatPlusMinus(value: number) {
  if (!Number.isFinite(value)) return "—";
  const magnitude = decimalFormatter.format(Math.abs(value));
  if (value > 0) return `+${magnitude}`;
  if (value < 0) return `-${magnitude}`;
  return "0.0";
}
