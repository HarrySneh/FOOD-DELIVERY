import { createContext, useState, ReactNode, useEffect } from "react";

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface LocationContextType {
  location: Location | null;
  setLocation: (loc: Location) => void;
  isLoading: boolean;
  error: string | null;
}

export const LocationContext = createContext<LocationContextType | undefined>(
  undefined,
);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: "Current Location",
          });
          setIsLoading(false);
        },
        (err) => {
          setError(err.message);
          setIsLoading(false);
        },
      );
    } else {
      setError("Geolocation not supported");
      setIsLoading(false);
    }
  }, []);

  return (
    <LocationContext.Provider
      value={{ location, setLocation, isLoading, error }}
    >
      {children}
    </LocationContext.Provider>
  );
};
