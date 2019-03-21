export function toArray(error) {
  if (Array.isArray(error)) {
    return error;
  } else {
    return [error];
  }
}

export function getErrorsFromResponse(response, defaultErrors = {}) {
  const errors = { ...defaultErrors };

  if (typeof response === "string") {
    if (Reflect.has(errors, "other")) {
      // If error response is a string, put it to other:
      errors.other = toArray(response);
    }
  } else if (typeof response !== "object" || response === null) {
    // If error response is not an object, there's no response:
    if (Reflect.has(errors, "other")) {
      errors.other = toArray("unauthorized");
    }
  } else {
    // Otherwise, iterate all errors:
    Object.entries(response).forEach(error => {
      const errorField = error[0].toLowerCase();
      const errorValue = error[1];

      if (Reflect.has(errors, errorField)) {
        errors[errorField] = toArray(errorValue);
      }
    });

    if (Reflect.has(errors, "other") && Reflect.has(response, "Error")) {
      errors.other = toArray(response.Error);
    }
  }

  return errors;
}
