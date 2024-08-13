export const checkMetamaskInstalled = () => {
  if ((window as any).ethereum) {
    if ((window as any).ethereum.isMetaMask) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const checkCasperWalletInstalled = () => {
  if ((window as any).CasperWalletProvider) {
    return true;
  } else {
    return false;
  }
};

export const checkCasperSignerInstalled = () => {
  if ((window as any).casperlabsHelper) {
    return true;
  } else {
    return false;
  }
};
