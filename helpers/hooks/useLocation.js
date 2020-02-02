import React from "react";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { usePermissions } from "@use-expo/permissions";

export default function useLocation(
  options = {
    enableHighAccuracy: true
  }
) {
  const [errors, setErrors] = React.useState(null);
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [reverseLocation, setReverseLocation] = React.useState(null);
  const [permission] = usePermissions(Permissions.LOCATION, { ask: true });

  React.useEffect(() => {
    const getCurrentPosition = async options => {
      return await Location.getCurrentPositionAsync(options);
    };

    const getReversePosition = async location => {
      return await Location.reverseGeocodeAsync(location.coords);
    };

    const getPositions = async () => {
      try {
        const currentLocation = await getCurrentPosition(options);
        const reverseLocation = await getReversePosition(currentLocation);

        setCurrentLocation(currentLocation);
        setReverseLocation(reverseLocation);
      } catch (error) {
        setErrors(error);
      }
    };

    if (permission) {
      if (permission.status === "granted") {
        getPositions();
      } else {
        setErrors(new Error("Permissions denied"));
      }
    }
  }, [permission]);

  return [currentLocation, reverseLocation, errors];
}
