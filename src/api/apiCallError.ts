class ApiCallError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "ApiCallError";
    this.stack = (<any>new Error()).stack;
  }
}

export default ApiCallError;
