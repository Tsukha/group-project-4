export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  cca3: string;
  capital: string[];
  region: string;
  subregion: string;
  population: number;
  area: number;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  languages: {
    [key: string]: string;
  };
  timezones: string[];
  continents: string[];
}

export interface Trip {
  id: string;
  name: string;
  countries: Country[];
  createdAt: string;
}

export interface TripPlannerContextType {
  currentTrip: Country[];
  savedTrips: Trip[];
  favorites: Country[];
  isOpen: boolean;
  addToTrip: (country: Country) => void;
  removeFromTrip: (countryCode: string) => void;
  saveTrip: (name?: string) => void;
  toggleFavorite: (country: Country) => void;
  openPlanner: () => void;
  closePlanner: () => void;
  showSuccess: (message: string) => void;
}