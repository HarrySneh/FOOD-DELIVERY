// Use the base path from Vite (e.g., '/' in development, '/FOOD-DELIVERY/' in production)
const base = import.meta.env.BASE_URL;

// Helper to build asset path (ensures no double slashes)
const asset = (path: string) => `${base}${path.replace(/^\//, "")}`;

export const RESTAURANT_IMAGES = {
  tuoZaafiPalace: asset("assets/images/restaurants/Egusi.jpg"),
  tamaleChopBar: asset("assets/images/restaurants/Ofada Sauce.jpg"),
  northernDelight: asset("assets/images/restaurants/Ogbono.jpg"),
  savannaRestaurant: asset("assets/images/restaurants/Red Stew with Assorted Meat.jpg"),
  zongoJunction: asset("assets/images/restaurants/One_Pan_Potatoes_and_Eggs.jpg"),
  dagbaniKitchen: asset("assets/images/restaurants/Fried Plantain.jpg"),
  tastyJollof: asset("assets/images/restaurants/Seasoned Vegetables Medley.jpg"),
  bankuParadise: asset("assets/images/restaurants/Salmon Nuggets.jpg"),
  waakyeHouse: asset("assets/images/restaurants/Honey Suya Wings.jpg"),
  kumasiFufuSpot: asset("assets/images/restaurants/Classic Caeser Salad.jpg"),
  gardenCityEats: asset("assets/images/restaurants/Waffles.jpg"),
};

export const DISH_IMAGES = {
  jollofRice: asset("assets/images/dishes/Jollof.png"),
  bankuTilapia: asset("assets/images/dishes/Banku.png"),
  waakye: asset("assets/images/dishes/Waakye.png"),
  tuoZaafi: asset("assets/images/dishes/Tuozaafi.png"),
  freshVegetables: asset("assets/images/dishes/Avocado_Toast.jpg"),
  riceBag: asset("assets/images/dishes/Rice.png"),
};

export const ICON_IMAGES = {
  appStore: asset("assets/images/icons/app-store.png"),
  playStore: asset("assets/images/icons/play-store.png"),
  step1: asset("assets/images/icons/step1.svg"),
  step2: asset("assets/images/icons/step2.svg"),
  step3: asset("assets/images/icons/step3.svg"),
  phoneMockup: asset("assets/images/icons/phone-mockup.png"),
};

export const HERO_IMAGES = [
  asset("assets/images/hero/Chicken Breast.jpg"),
  asset("assets/images/hero/Meaty Baked Beans.jpg"),
  asset("assets/images/hero/Suya.jpg"),
];
