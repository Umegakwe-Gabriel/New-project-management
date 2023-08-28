export enum STATUSCODE {
  OK = 200,
  CREATE = 201,
  BAD = 404,
}

interface myError {
  errorName: string;
  errorMessage: string;
  errorStatus: STATUSCODE;
  success: boolean;
}

export class ErrorNotifier extends Error {
  public readonly errorName: string;
  public readonly errorMessage: string;
  public readonly errorStatus: STATUSCODE;
  public readonly success: boolean = false;

  constructor(args: myError) {
    super(args.errorMessage);

    Object.setPrototypeOf(this, new.target.prototype);

    this.errorName = args.errorName;
    this.errorMessage = args.errorMessage;
    this.errorStatus = args.errorStatus;

    if (this.success !== undefined) {
      this.success = args.success;
    }

    Error.captureStackTrace(this)
  }
}
