import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = { width: "100%", height: "400px" };
const defaultCenter = { lat: 9.4041, lng: -0.8428 }; // Tamale center

interface MapProps {
  pickupLocation?: { lat: number; lng: number };
  dropoffLocation?: { lat: number; lng: number };
  driverLocation?: { lat: number; lng: number };
}

export default function Map({
  pickupLocation,
  dropoffLocation,
  driverLocation,
}: MapProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY!,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  // Determine map center: prefer driverLocation, then pickup, then default
  const center = driverLocation || pickupLocation || defaultCenter;

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center}>
      {pickupLocation && <Marker position={pickupLocation} label="R" />}
      {dropoffLocation && <Marker position={dropoffLocation} label="D" />}
      {driverLocation && (
        <Marker position={driverLocation} icon="/truck-icon.png" />
      )}
    </GoogleMap>
  );
}
