export type PropertyType = {
    id: string;
    [key: string]: string | number;
}

export type GeometryPointType = {
    type: "Point";
    coordinates: number[];
    center: number[];
}