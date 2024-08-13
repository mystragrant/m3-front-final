import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Skeleton,
  useColorModeValue,
} from "@chakra-ui/react";
//import { SERVER_BASEURL } from "./../../../../constants";
import { CHAT_SERVER_BASEURL } from "./../../../../constants";

import { BiDownload } from "react-icons/bi";

export const LazyLoadingImage = ({
  width = "10px",
  height = "10px",
  dataId = "",
}: {
  width?: string;
  height?: string;
  dataId?: string;
}) => {
  const [srcData, setSrcData] = useState<string>("");

  const bgColor = useColorModeValue(
    "inputBackground.light",
    "inputBackground.dark",
  );

  useEffect(() => {
    const loadData = async () => {
      if (dataId.length === 0) return;
      fetch(CHAT_SERVER_BASEURL + "/api/Chat/GetUpload?uploadId=" + dataId)
        .then(async (response) => {
          setSrcData(((await response.json()) as any).data ?? "");
        })
        .catch((err) => console.error(err));
    };
    loadData();
  }, []);

  return srcData.length ? (
    <>
      <Box></Box>
    </>
  ) : (
    <Skeleton w={width} h={height} />
  );
};
