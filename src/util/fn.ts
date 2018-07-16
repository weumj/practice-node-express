export const pipe = (...fns: Array<(...params: any[]) => any>) => (input: any | undefined) =>
  fns.reduce((res, fn) => fn(res), input);
