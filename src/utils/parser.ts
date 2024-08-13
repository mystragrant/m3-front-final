export const buildIpfsGateway = <T = any>(ipfs: T | string) =>
  typeof ipfs === "string"
    ? ipfs.match(/^ipfs:\/\//gm)
      ? `https://ipfs.io/ipfs/${ipfs.slice(7)}`
      : ipfs
    : ipfs;

export const chainIdToName = (id: string | number) => {
  switch (id) {
    case 1:
    case "1":
      return "ethereum";
    default:
      return "casper";
  }
};
