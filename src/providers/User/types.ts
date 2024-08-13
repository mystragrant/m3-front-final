export enum JWT_TYPES {
  EVM = "EVM",
  CASPER = "CASPER",
  WEB2 = "WEB2",
}

export const stringToTokenType = (token: string): JWT_TYPES => {
  switch (token) {
    case "EVM":
      return JWT_TYPES.EVM;
    case "CASPER":
      return JWT_TYPES.CASPER;
    case "WEB2":
      return JWT_TYPES.WEB2;
    default:
      return JWT_TYPES.WEB2;
  }
};
