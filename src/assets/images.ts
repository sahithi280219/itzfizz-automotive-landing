// Centralized and production-safe image asset registry for ITZFIZZ
// Uses ES module imports so Vite bundles and hashes them into dist/assets, with public/images fallback
import heroSideAsset from './images/car_hero_side_1791801453337.jpg';
import frontQuarterAsset from './images/car_front_quarter_1791801464880.jpg';
import rearDiffuserAsset from './images/car_rear_diffuser_1791801479952.jpg';
import cockpitAsset from './images/car_cockpit_detail_1791801491801.jpg';
import wheelBrakeAsset from './images/car_wheel_brake_detail_1791802786728.jpg';

export const CAR_IMAGES = {
  heroSide: heroSideAsset || '/images/car_hero_side.jpg',
  frontQuarter: frontQuarterAsset || '/images/car_front_quarter.jpg',
  rearDiffuser: rearDiffuserAsset || '/images/car_rear_diffuser.jpg',
  cockpit: cockpitAsset || '/images/car_cockpit.jpg',
  wheelBrake: wheelBrakeAsset || '/images/car_wheel_brake.jpg',
} as const;

// Fallback image map if any URL fails to load
export const FALLBACK_IMAGES: Record<string, string> = {
  [CAR_IMAGES.heroSide]: '/images/car_hero_side.jpg',
  [CAR_IMAGES.frontQuarter]: '/images/car_front_quarter.jpg',
  [CAR_IMAGES.rearDiffuser]: '/images/car_rear_diffuser.jpg',
  [CAR_IMAGES.cockpit]: '/images/car_cockpit.jpg',
  [CAR_IMAGES.wheelBrake]: '/images/car_wheel_brake.jpg',
};
