export enum TeamConference {
  EASTERN = "Eastern",
  WESTERN = "Western",
}

export enum TeamDivision {
  ATLANTIC = "Atlantic",
  CENTRAL = "Central",
  SOUTHEAST = "Southeast",
  NORTHWEST = "Northwest",
  PACIFIC = "Pacific",
  SOUTHWEST = "Southwest",
}

export const TEAM_META: Record<
  number,
  { conference: TeamConference; division: TeamDivision }
> = {
  1610612737: {
    conference: TeamConference.EASTERN,
    division: TeamDivision.SOUTHEAST,
  }, // Hawks
  1610612738: {
    conference: TeamConference.EASTERN,
    division: TeamDivision.ATLANTIC,
  }, // Celtics
  1610612739: {
    conference: TeamConference.EASTERN,
    division: TeamDivision.CENTRAL,
  }, // Cavaliers
  1610612740: {
    conference: TeamConference.WESTERN,
    division: TeamDivision.SOUTHWEST,
  }, // Pelicans
  1610612741: {
    conference: TeamConference.EASTERN,
    division: TeamDivision.CENTRAL,
  }, // Bulls
  1610612742: {
    conference: TeamConference.WESTERN,
    division: TeamDivision.SOUTHWEST,
  }, // Mavericks
  1610612743: {
    conference: TeamConference.WESTERN,
    division: TeamDivision.NORTHWEST,
  }, // Nuggets
  1610612744: {
    conference: TeamConference.WESTERN,
    division: TeamDivision.PACIFIC,
  }, // Warriors
  1610612745: {
    conference: TeamConference.WESTERN,
    division: TeamDivision.SOUTHWEST,
  }, // Rockets
  1610612746: {
    conference: TeamConference.WESTERN,
    division: TeamDivision.PACIFIC,
  }, // Clippers
  1610612747: {
    conference: TeamConference.WESTERN,
    division: TeamDivision.PACIFIC,
  }, // Lakers
  1610612748: {
    conference: TeamConference.EASTERN,
    division: TeamDivision.SOUTHEAST,
  }, // Heat
  1610612749: {
    conference: TeamConference.EASTERN,
    division: TeamDivision.CENTRAL,
  }, // Bucks
  1610612750: {
    conference: TeamConference.WESTERN,
    division: TeamDivision.NORTHWEST,
  }, // Timberwolves
  1610612751: {
    conference: TeamConference.EASTERN,
    division: TeamDivision.ATLANTIC,
  }, // Nets
  1610612752: {
    conference: TeamConference.EASTERN,
    division: TeamDivision.ATLANTIC,
  }, // Knicks
  1610612753: {
    conference: TeamConference.EASTERN,
    division: TeamDivision.SOUTHEAST,
  }, // Magic
  1610612754: {
    conference: TeamConference.EASTERN,
    division: TeamDivision.CENTRAL,
  }, // Pacers
  1610612755: {
    conference: TeamConference.EASTERN,
    division: TeamDivision.ATLANTIC,
  }, // 76ers
  1610612756: {
    conference: TeamConference.WESTERN,
    division: TeamDivision.PACIFIC,
  }, // Suns
  1610612757: {
    conference: TeamConference.WESTERN,
    division: TeamDivision.NORTHWEST,
  }, // Trail Blazers
  1610612758: {
    conference: TeamConference.WESTERN,
    division: TeamDivision.PACIFIC,
  }, // Kings
  1610612759: {
    conference: TeamConference.WESTERN,
    division: TeamDivision.SOUTHWEST,
  }, // Spurs
  1610612760: {
    conference: TeamConference.WESTERN,
    division: TeamDivision.NORTHWEST,
  }, // Thunder
  1610612761: {
    conference: TeamConference.EASTERN,
    division: TeamDivision.ATLANTIC,
  }, // Raptors
  1610612762: {
    conference: TeamConference.WESTERN,
    division: TeamDivision.NORTHWEST,
  }, // Jazz
  1610612763: {
    conference: TeamConference.WESTERN,
    division: TeamDivision.SOUTHWEST,
  }, // Grizzlies
  1610612764: {
    conference: TeamConference.EASTERN,
    division: TeamDivision.SOUTHEAST,
  }, // Wizards
  1610612765: {
    conference: TeamConference.EASTERN,
    division: TeamDivision.CENTRAL,
  }, // Pistons
  1610612766: {
    conference: TeamConference.EASTERN,
    division: TeamDivision.SOUTHEAST,
  }, // Hornets
};

export enum SeasonType {
  REGULAR_SEASON = "Regular Season",
  PRE_SEASON = "Pre Season",
  PLAYOFFS = "Playoffs",
}

export const SEASON_TYPES = [
  SeasonType.REGULAR_SEASON,
  SeasonType.PRE_SEASON,
  SeasonType.PLAYOFFS,
] as const;

export const MONTH_OPTIONS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

// Generate list of NBA seasons (last 10 years + current)
export function getAvailableSeasons(): string[] {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  // If we're in October or later, current season has started
  const latestSeasonYear = currentMonth >= 9 ? currentYear : currentYear - 1;

  const seasons: string[] = [];
  // Generate last 10 seasons
  for (let i = 0; i <= 10; i++) {
    const year = latestSeasonYear - i;
    const nextYear = (year + 1) % 100;
    seasons.push(`${year}-${String(nextYear).padStart(2, "0")}`);
  }

  return seasons;
}
