import React from "react";
import { Platform } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { usePermissions } from "@use-expo/permissions";

export default function useLocation(
  options = {
    enableHighAccuracy: Platform.OS !== "ios",
  }
) {
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [reverseLocation, setReverseLocation] = React.useState(null);
  const [permission] = usePermissions(Permissions.LOCATION, { ask: true });

  React.useEffect(() => {
    const getCurrentPosition = async (options) => {
      return await Location.getCurrentPositionAsync(options);
    };

    const getReversePosition = async (location) => {
      return await Location.reverseGeocodeAsync(location.coords);
    };

    const getPositions = async () => {
      try {
        const currentLocation = await getCurrentPosition(options);
        const reverseLocation = await getReversePosition(currentLocation);
        const reverseLocationData = reverseLocation.length
          ? reverseLocation[0]
          : reversePositionMock();

        setCurrentLocation(currentLocation);
        setReverseLocation(reverseLocationData);
      } catch (error) {
        setCurrentLocation(currentPositionMock());
        setReverseLocation(reversePositionMock());
      }
    };

    if (permission) {
      if (permission.status === "granted") {
        getPositions();
      } else {
        setCurrentLocation(currentPositionMock());
        setReverseLocation(reversePositionMock());
      }
    }
  }, [permission]);

  return [currentLocation, reverseLocation];
}

function currentPositionMock() {
  return {
    coords: {
      accuracy: 5,
      altitude: 0,
      altitudeAccuracy: -1,
      heading: -1,
      latitude: 52.2297,
      longitude: 21.0122,
      speed: -1,
    },
    timestamp: Date.now(),
  };
}

function reversePositionMock() {
  return {
    city: "Warsaw",
    country: "Poland",
    isoCountryCode: "PL",
    name: "00-001",
    postalCode: "00-001",
    region: "Masovia",
    street: null,
  };
}
