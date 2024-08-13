/* eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AboutCollection } from "../../components/pages/collection/AboutCollection/aboutCollection";
import { CollectionHeader } from "../../components/pages/collection/collectionHeader";
import { ItemsTab } from "../../components/pages/collection/ItemsTab/itemsTab";
import { TabAddon } from "../../components/pages/collection/TabAddon/tabAddon";
import { CenterContainer } from "../../components/shared/containers/CenterContainer/centerContainter";
import { TabContainer } from "../../components/shared/containers/tabContainer";
import { MYSTRA_API_URL } from "../../constants";

export const CollectionPage = () => {
  const { collectionAddress } = useParams();

  const [collectionName, setCollectionName] = useState<string>("");
  const [collectionBanner, setCollectionBanner] = useState<string>("");

  const [collectionIcon, setCollectionIcon] = useState<string>("");

  const [collectionDescription, setCollectionDescription] =
    useState<string>("");

  const [creator, setCreator] = useState<string>("");

  useEffect(() => {
    axios
      .get(
        `${MYSTRA_API_URL}/collections?collection_contract_hash=${collectionAddress}&page_number=1&page_size=10&order_by=collection_contract_name&order_direction=DESC`,
      )
      .then((res) => {
        const data = res.data.data[0];
        console.log(data);

        setCollectionDescription(
          data.collection_description ?? "No description provided yet.",
        );

        setCollectionName(
          data.collection_name ? data.collection_name : "Unknown Collection",
        );
        setCollectionBanner(data.collection_banner ?? "Unknown Collection");
        setCollectionIcon(data.collection_icon ?? "Unknown Collection");
        setCreator(data.collection_creator_public_key ?? "0000000");
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <CollectionHeader
        name={
          collectionName ?? "Unknown collection"
        }
        creator={creator}
        iconUrl={collectionIcon}
        bannerUrl={collectionBanner}
      />
      <CenterContainer>
        <AboutCollection
          text={
            
               collectionDescription
              ?? "No description provided yet."
          }
        />
        <TabContainer
          addon={<TabAddon />}
          items={[
            {
              label: "Items",
              content: <ItemsTab />,
            },
          ]}
        />
      </CenterContainer>
    </>
  );
};
