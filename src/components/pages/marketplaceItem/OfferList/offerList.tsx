import { useEffect, useState } from "react";
import { DropdownContainer } from "../../../shared/containers/dropdownContainer";

import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { MYSTRA_API_URL } from "../../../../constants";
import { useThemeProvider } from "../../../../providers/Theme/useThemeProvider";
import { OfferItem } from "./OfferItem/offerItem";

export interface OfferData {
  active: boolean;
  offer: number;
  address: string;
  account_hash: string;
  date: Date;
  expirationDate: Date;
}

export const OfferList = ({
  owner,
  address,
  tokenId,
  chain,
  isYours,
  nftStandard,
}: {
  owner: string;
  address: string;
  tokenId: string;
  chain: string;
  isYours: boolean;
  nftStandard: string;
}) => {
  const [items, setItems] = useState<OfferData[]>([]);

  useEffect(() => {
    axios
      .get(
        `${MYSTRA_API_URL}/offers?page_number=1&page_size=1000&order_by=timestamp&order_direction=DESC&hide_null_expiration_date=true&contract_hash=${address}&token_id=${tokenId}
    `,
      )
      .then((res) => {
        console.log(res.data.data);

        setItems(
          res.data.data.map((resItem: any) => {
            return {
              account_hash: resItem.buyer,
              offer: Number(resItem.price) / 1000000000,
              address: resItem.buyer,
              active: true,
              date: new Date(resItem.timestamp),
              expirationDate: new Date(resItem.expiration_date),
            };
          }),
        );
      });
  }, []);

  const { textSecondary } = useThemeProvider();

  const handleDelete = (address: string) => {
    setItems((prev) => prev.filter((i) => i.account_hash != address));
  };

  return (
    <>
      <DropdownContainer label="Offers" paddingSize={"0px"}>
        <>
          <TableContainer pt="0px">
            <Table variant="simple">
              <Thead>
                <Tr color={textSecondary}>
                  <Th color={textSecondary}>Price</Th>
                  <Th color={textSecondary}>Date</Th>
                  <Th color={textSecondary}>Expires in</Th>
                  <Th color={textSecondary}>From</Th>
                  <Th color={textSecondary}>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {items
                  .filter((item) => item.offer > 0)
                  .map((item) => {
                    return (
                      <OfferItem
                        nftStandard={nftStandard}
                        address={address}
                        date={item.date}
                        onDelete={() => handleDelete(item.account_hash)}
                        expirationDate={item.expirationDate}
                        chain={chain}
                        isYours={false}
                        canAccept={isYours}
                        tokenId={tokenId}
                        key={item.active + item.account_hash}
                        data={item}
                      />
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
          {items.filter((item) => item.offer > 0).length == 0 && (
            <Box pt="16px" pb="8px" mx="22px">
              No active offers.
            </Box>
          )}
        </>
      </DropdownContainer>
    </>
  );
};
