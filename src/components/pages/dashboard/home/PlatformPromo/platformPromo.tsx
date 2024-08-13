import { Grid, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { PromoItem } from "./PromoItem/promoItem";

export const PlatformPromo = () => {
  const navigate = useNavigate();

  return (
    <Grid templateColumns="1fr 1fr 1fr" gap="20px">
      <PromoItem
        header={"Invest in Mystra"}
        primaryAction={() => navigate("/buy-ticket")}
        secondaryAction={() => navigate("/buy-ticket")}
        primaryActionText="Learn More"
        secondaryActionText=""
        description="Buy an NFT Ticket and unlock all the platform's possibilities!"
        image={
          <Image
            src="/assets/elements/promo/ticket.png"
            pos="absolute"
            right="0"
            w="270px"
            bottom="0px"
          />
        }
        color="#9F74FFEE"
      />
      <PromoItem
        header={"Buy Crypto"}
        primaryAction={() => navigate("/fiat-gateway")}
        secondaryAction={() => navigate("/buy-ticket")}
        primaryActionText="Buy now"
        secondaryActionText=""
        description="Purchase crypto on the lowest&nbsp;fees with credit card!"
        image={
          <Image
            src="/assets/elements/promo/crypto.png"
            pos="absolute"
            right="-10px"
            w="230px"
            top="0px"
          />
        }
        color="#FF3D3DEE"
      />
      <PromoItem
        header={"Stake CSPR"}
        primaryAction={() => navigate("/staking")}
        secondaryAction={() => navigate("/staking")}
        color="#28CC9AEE"
        primaryActionText="Stake & Earn"
        secondaryActionText=""
        description="Delegate your CSPR and earn passively!"
        image={
          <Image
            src="/assets/elements/promo/login.png"
            pos="absolute"
            right="-10px"
            w="250px"
            bottom="0px"
          />
        }
      />
    </Grid>
  );
};
