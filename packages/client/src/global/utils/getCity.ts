import { GeoApi, T_Coords } from "../../api/Geo";
import { dispatch } from "../store";
import { userActions } from "../store/actions";

const geoApi = new GeoApi();

type T_Pos = Record<"coords", T_Coords>;

export const getCity = () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  const success = async (pos: T_Pos) => {
    if (!("coords" in pos)) {
      return;
    }
    const { coords } = pos;
    const latitude = coords?.latitude;
    const longitude = coords?.longitude;

    const city = await geoApi.getCity({ longitude, latitude });
    dispatch(userActions.setCity(city));
  };
  const error = (e: unknown) => {
    console.log(e);
  };

  navigator.geolocation.getCurrentPosition((pos: unknown) => void success(pos as T_Pos), error, options);
};
