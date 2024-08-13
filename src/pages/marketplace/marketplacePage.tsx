import { ChosenNFT } from "../../components/pages/marketplace/ChosenNFT/chosenNFT";
import { CollectionBanner } from "../../components/pages/marketplace/CollectionBanner/collectionBanner";
import { Collections } from "../../components/pages/marketplace/Collections/collections";
import { MarketplaceHeader } from "../../components/pages/marketplace/MarketplaceHeader/marketplaceHeader";
import { PageContainer } from "../../components/shared/containers/pageContainer";

export const MarketplacePage = () => {
  return (
    <PageContainer>
      <MarketplaceHeader />
      <Collections />
      <CollectionBanner />
      <ChosenNFT label="New Listings" filter="listing" />
      <ChosenNFT label="New Auctions" filter="auction" />
    </PageContainer>
  );
};
