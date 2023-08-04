import { Admin } from "./admin.entity";

import { Tour } from "./tour.entity";
import { TourTranslation } from "./tour-translation.entity";

import { Gallery } from "./gallery.entity";
import { GalleryTranslation } from "./gallery-translation.entity";

import { Slider } from "./slider.entity";
import { SliderTranslation } from "./slider-translation.entity";

const entities = [Admin, Tour, TourTranslation, Gallery, GalleryTranslation, Slider, SliderTranslation];

export { Admin, Tour, TourTranslation, Gallery, GalleryTranslation, Slider, SliderTranslation };
export default entities;
