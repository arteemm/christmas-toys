type request = {
  resource: string | null | undefined,
  id: string | null | undefined,
  verb: string | null | undefined,
}

type routesTypeObj = {
  [key: string]: object;
}

interface routesTypeFunc extends Object  {
  render(): Promise<string>;
}




export { request, routesTypeFunc, routesTypeObj };