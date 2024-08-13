import { Wrapper, NetworkLogo, NetworkName } from "./styled";
import Network from "../../../../type/Network";

function NetworkInfo({
  network,
}: {
  network: Network | undefined;
}): JSX.Element {
  return (
    <Wrapper>
      {network ? (
        <>
          <NetworkLogo
            src={
              network.logoURI ? network.logoURI : "/assets/images/unknown.svg"
            }
            alt={network.name}
          />
          <NetworkName>{network.name}</NetworkName>
        </>
      ) : (
        <>
          <NetworkLogo
            src={"/assets/images/unknown.svg"}
            alt="Unknown network"
          />
          <NetworkName>Unknown network</NetworkName>
        </>
      )}
    </Wrapper>
  );
}

export default NetworkInfo;
