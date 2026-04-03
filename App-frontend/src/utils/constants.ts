export const GHANA_CUISINES = [
  "Banku & Tilapia",
  "Waakye",
  "Jollof Rice",
  "Kelewele",
  "Fufu & Light Soup",
  "Red Red",
  "Kenkey & Fish",
  "Grilled Chicken",
  "Pizza",
  "Burgers",
];

export const DELIVERY_ZONES = [
  { name: "Accra Central", fee: 10, lat: 5.6037, lng: -0.187 },
  { name: "Accra East", fee: 12, lat: 5.6098, lng: -0.164 },
  { name: "Accra West", fee: 12, lat: 5.586, lng: -0.205 },
  { name: "Kumasi", fee: 15, lat: 6.6666, lng: -1.6163 },
  { name: "Tema", fee: 12, lat: 5.6697, lng: -0.0166 },
];

export const ORDER_STATUS = {
  pending: "Pending",
  confirmed: "Confirmed",
  preparing: "Preparing",
  ready_for_pickup: "Ready for Pickup",
  assigned: "Assigned to Driver",
  picked_up: "Picked Up",
  delivered: "Delivered",
} as const;
