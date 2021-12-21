export enum ServiceStatus {
  Init = "init",
  Loaded = "Loaded",
  Fail = "fail",
  Success = "success",
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
export type Service<T> = ServiceInit | ServiceLoaded<T> | ServiceFail;
