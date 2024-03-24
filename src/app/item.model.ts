import { KeyValue } from "@angular/common";
import { ItemType } from "./itemType.enum";

export interface Item {
    title: string,
    year: string,
    imdbID: string,
    type: ItemType,
    poster: string
}