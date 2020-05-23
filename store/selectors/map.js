export function getDataForLocation(data, lat, lng) {
  return data.filter((item) => {
    const eps = 0.00001;
    const latDiff = Math.abs(item.lat - lat);
    const lngDiff = Math.abs(item.lng - lng);

    return latDiff < eps && lngDiff < eps;
  });
}

export function getUniqueData(data) {
  return data.reduce((acc, curr) => {
    const index = acc.findIndex((element) => element.id === curr.id);

    if (index === -1) {
      return [...acc, curr];
    } else {
      return acc;
    }
  }, []);
}
