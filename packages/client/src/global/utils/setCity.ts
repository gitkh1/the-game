import { GeoApi } from "../../api/Geo";
import { useAppDispatch } from "../hooks";
import { userActions } from "../store/slices/user";

const geoApi = new GeoApi();

const getCurrentPosition = (): Promise<GeolocationPosition> => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  return new Promise((resolve, reject) => {
    return navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export const setUserCityFromGeolocation = async (dispatch: ReturnType<typeof useAppDispatch>) => {
  try {
    const pos = await getCurrentPosition();
    const city = await geoApi.getCity(pos.coords);
    dispatch(userActions.setCity(city));
  } catch (e) {
    return null;
  }
};
