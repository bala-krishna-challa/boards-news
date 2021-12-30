export enum ServiceStatus {
  Init = "init",
  Loaded = "Loaded",
  Fail = "fail",
  Success = "success",
  Error = "error",
}

interface ServiceInit {
  status: ServiceStatus.Init;
}
interface ServiceLoaded<T> {
  status: ServiceStatus.Loaded;
  payload: T;
}
interface ServiceFail {
  status: ServiceStatus.Fail;
  error: Error;
}
interface ServiceError {
  status: ServiceStatus.Error;
  error: Error;
}
export type Service<TypeOut> =
  | ServiceInit
  | ServiceLoaded<TypeOut>
  | ServiceFail
  | ServiceError;
