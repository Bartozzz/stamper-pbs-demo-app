import { formatDate } from "../../helpers/date";

export function ExpirationDate({ isValid, expirationDate }) {
  if (isValid && expirationDate) {
    return formatDate(expirationDate);
  } else {
    return "--/--/----";
  }
}

export default ExpirationDate;
