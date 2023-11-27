import { Image } from "./image.type";
import { PlantCategory } from "./plant-category.type";

export interface Plant {
    id: string,
    name: string,
    description?: string,
    code: string,
    status: string,
    createAt: string,
    images: Image[],
    plantCategories: PlantCategory[],
    scienceName?: string,
    genus?: string,
    species?: string,
    livingCondition?: string,
    distributionArea?: string,
    ph?: string,
    uses?: string,
    fruitTime?: string,
    conservationStatus?: string,
    size?: string,
    discoverer?: string,
}