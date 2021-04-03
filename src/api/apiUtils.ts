export function handleError(error: Error) {
  console.error("API call failed. " + error);
  throw error;
}
