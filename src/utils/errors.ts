// 传参错误
export default class ParamError extends Error {
  constructor(message: any) {
    super(message);
    this.message = message ? message : "请检查传入参数!";
    this.name = "ParamError";
  }
}
