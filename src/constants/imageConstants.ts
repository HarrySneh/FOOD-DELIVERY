// Get the base path from Vite (e.g., '/' in dev, '/FOOD-DELIVERY/' in production)
const base = import.meta.env.BASE_URL;

// Helper to ensure trailing slash consistency
const assetPath = (filePath: string) => `${base}${filePath.replace(/^\//, "")}`;

export const RESTAURANT_IMAGES = {
  tuoZaafiPalace: assetPath("assets/images/restaurants/tuo-zaafi-palace.jpg"),
  tamaleChopBar: assetPath("assets/images/restaurants/tamale-chop-bar.jpg"),
  northernDelight: assetPath("assets/images/restaurants/northern-delight.jpg"),
  savannaRestaurant: assetPath(
    "assets/images/restaurants/savanna-restaurant.jpg",
  ),
  zongoJunction: assetPath("assets/images/restaurants/zongo-junction.jpg"),
  dagbaniKitchen: assetPath("assets/images/restaurants/dagbani-kitchen.jpg"),
  tastyJollof: assetPath("assets/images/restaurants/tasty-jollof.jpg"),
  bankuParadise: assetPath("assets/images/restaurants/banku-paradise.jpg"),
  waakyeHouse: assetPath("assets/images/restaurants/waakye-house.jpg"),
  kumasiFufuSpot: assetPath("assets/images/restaurants/kumasi-fufu-spot.jpg"),
  gardenCityEats: assetPath("assets/images/restaurants/garden-city-eats.jpg"),
};

export const DISH_IMAGES = {
  jollofRice: assetPath("assets/images/dishes/jollof-rice.jpg"),
  bankuTilapia: assetPath("assets/images/dishes/banku-tilapia.jpg"),
  waakye: assetPath("assets/images/dishes/waakye.jpg"),
  tuoZaafi: assetPath("assets/images/dishes/tuo-zaafi.jpg"),
  freshVegetables: assetPath("assets/images/dishes/fresh-vegetables.jpg"),
  riceBag: assetPath("assets/images/dishes/rice-bag.jpg"),
};

export const ICON_IMAGES = {
  appStore: assetPath("assets/images/icons/app-store.png"),
  playStore: assetPath("assets/images/icons/play-store.png"),
  step1: assetPath("assets/images/icons/step1.svg"),
  step2: assetPath("assets/images/icons/step2.svg"),
  step3: assetPath("assets/images/icons/step3.svg"),
  phoneMockup: assetPath("assets/images/icons/phone-mockup.png"),
};

export const HERO_IMAGES = [
  assetPath("assets/images/hero/hero1.jpg"),
  assetPath("assets/images/hero/hero2.jpg"),
  assetPath("assets/images/hero/hero3.jpg"),
];
