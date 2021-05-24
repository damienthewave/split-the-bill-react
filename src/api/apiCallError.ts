class ApiCallError extends Error {
  constructor(public responseCode: number, public message: string) {
    super(message);
    this.name = "ApiCallError";
    this.responseCode = responseCode;
    this.stack = (<any>new Error()).stack;
  }

  equals(other: ApiCallError): boolean {
    return (
      this.responseCode === other.responseCode && this.message === other.message
    );
  }
}

// Controlled api errors
export const NoPersonAssignedError = new ApiCallError(
  400,
  "User account has no person assigned."
);
export const NoPersonFoundError = new ApiCallError(
  404,
  "This person does not exist."
);

export default ApiCallError;
