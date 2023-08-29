// 传参错误
export default class ParamError extends Error {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message: any) {
    super(message);
    this.message = message ? message : "请检查传入参数!";
    this.name = "ParamError";
  }
}
