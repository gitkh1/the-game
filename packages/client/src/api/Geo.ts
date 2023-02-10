/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unsafe-return */
export async function streamToArrayBuffer(stream: ReadableStream<Uint8Array>): Promise<Uint8Array> {
  let result = new Uint8Array(0);
  const reader = stream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    const newResult = new Uint8Array(result.length + value.length);
    newResult.set(result);
    newResult.set(value, result.length);
    result = newResult;
  }
  return result;
}

export type T_Coords = {
  longitude: string;
  latitude: string;
};

export class GeoApi {
  private url = (coords: T_Coords) =>
    `https://geocode-maps.yandex.ru/1.x/?apikey=0b1ae83c-cabe-4a13-94d9-9910b90ef315&format=json&geocode=${coords.longitude}, ${coords.latitude}&kind=locality&results=1`;

  getCity = async (coords: T_Coords) => {
    const DEFAULT_CITY = "Москва";
    let city = DEFAULT_CITY;
    try {
      const response = await fetch(this.url(coords));
      if (!response.body) {
        return city;
      }
      const buffer = await streamToArrayBuffer(response.body);
      const text = new TextDecoder().decode(buffer);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const json = await JSON.parse(text);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      city = (json?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject?.name as string) || DEFAULT_CITY;
    } catch (e) {
      console.log(e);
    }
    return city;
  };
}
