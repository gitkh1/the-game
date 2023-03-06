import { GEO_URL } from "./constants";

interface I_YaGeoObject {
  GeoObject: {
    name: string;
  };
}
interface I_YaGeoResponse {
  response: {
    GeoObjectCollection: {
      featureMember: I_YaGeoObject[];
    };
  };
}

export type T_GeoCoords = Pick<GeolocationCoordinates, "latitude" | "longitude">;

export class GeoApi {
  private url = (coords: T_GeoCoords) => `${GEO_URL}/?geocode=${coords.longitude}, ${coords.latitude}&kind=locality&results=1`;

  getCity = async (coords: T_GeoCoords) => {
    const DEFAULT_CITY = "Москва";
    let city = DEFAULT_CITY;
    try {
      const response = await fetch(this.url(coords));
      const json = (await response.json()) as I_YaGeoResponse;
      city = json?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject?.name || DEFAULT_CITY;
    } catch (e) {
      console.log(e);
    }
    return city;
  };
}
