import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Input,
  Spinner,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CenterContainer } from "../../components/shared/containers/CenterContainer/centerContainter";
import { PageContainer } from "../../components/shared/containers/pageContainer";
import { TabContainer } from "../../components/shared/containers/tabContainer";
import { NFTItem } from "../../components/shared/NFTItem/NFTitem";
import { MYSTRA_API_URL } from "../../constants";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useThemeProvider } from "../../providers/Theme/useThemeProvider";
import { INFTData } from "../wallet/nft";
import { NETWORK_TYPE, WalletItem } from "./WalletItem/walletItem";
import { useUserProvider } from "../../providers/User/userProvider";
import { CustomModal } from "../../components/shared/CustomModal/customModal";
import { MystraAPI } from "../../services/mystra-api";
import { AvatarSettings } from "../../components/pages/account/AvatarSettings/avatarSettings";
import { BannerSettings } from "../../components/pages/account/BannerSettings/bannerSettings";

const LabeledItem = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: React.ReactNode | string;
}) => {
  const { textSecondary } = useThemeProvider();

  return (
    <Flex flexDir="column" gap="8px">
      <Box fontSize="14px" color={textSecondary} fontFamily="Inter">
        {label}
      </Box>
      {children}
    </Flex>
  );
};

interface UserData {
  nickname: string;
  casper_address: string;
  evm_address: string;
  tickets_amount: number;
  joined: Date;
  lastVisited: Date;
  telegramNickname: string;
  verified: boolean;
  visitCounter: number;
  points: {
    investments: number;
    governance: number;
    platform: number;
    telegram: number;
    discord: number;
    staking: number;
    mission: number;
  };
  title: string;
  bio: string;
  banner: string;
  avatar: string;
  totalPoints: number;
}

export const ProfilePage = () => {
  const { backgroundPrimary, textSecondary, backgroundTertiary } =
    useThemeProvider();

  const { id } = useParams();

  const { id: userId, token } = useUserProvider();

  const [loading, setLoading] = useState<boolean>(true);
  const [errorOccured, setErrorOccurred] = useState<boolean>(false);

  const [userData, setUserData] = useState<UserData | null>(null);

  const [titleInput, setTitleInput] = useState<string>("");
  const [bioInput, setBioInput] = useState<string>("");

  useEffect(() => {
    axios
      .get(`${MYSTRA_API_URL}/Accounts/GetPublicUserData/id?id=${id}`)
      .then((res) => {
        const data = res.data;

        console.log(data);

        setUserData({
          nickname: data.nickname ?? "Newcomer",
          casper_address: data.casper_public_key_wallet ?? "",
          evm_address: data.evm_wallet ?? "",
          tickets_amount:
            data.callup_tickets_on_binance +
            data.callup_tickets_on_casper +
            data.callup_tickets_on_polygon +
            data.callup_tickets_on_ethereum,
          joined: new Date(data.created),
          lastVisited: new Date(data.last_visited),
          telegramNickname: data.telegram_user_name ?? "",
          verified: data.is_verified,
          visitCounter: data.visit_counter,
          points: {
            investments: data.points_dao_investments_user,
            governance: data.points_dao_governance_user,
            platform: data.points_platform_actions_user,
            telegram: data.points_telegram_user,
            discord: data.points_discord_user,
            staking: data.points_staking_user,
            mission: data.points_social_mission_commitment_user,
          },

          title: data.title ?? "Mystra User",
          bio: data.bio ?? "",
          banner: data.profile_banner ?? "",
          avatar: data.avatar ?? "/assets/brand/default-avatar.jpg",
          totalPoints:
            data.points_dao_investments_user +
            data.points_dao_governance_user +
            data.points_platform_actions_user +
            data.points_telegram_user +
            data.points_discord_user +
            data.points_staking_user +
            data.points_social_mission_commitment_user,
        });
        setTitleInput(data.title ?? "Mystra User");
        setBioInput(data.bio ?? "");
      })
      .catch((e) => {
        setErrorOccurred(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const {
    isOpen: isBannerOpen,
    onOpen: onBannerOpen,
    onClose: onBannerClose,
  } = useDisclosure();

  const setCurrentBanner = (newBanner: string) => {
    if (userData) {
      const newUserData = { ...userData, banner: newBanner };
      setUserData(newUserData);
    }
  };

  const handleSaveBio = () => {
    if (userData) {
      setProcessingTitle(true);
      MystraAPI.setBio(bioInput, userId, token)
        .then(() => {
          const newUserData = { ...userData, bio: bioInput };
          setUserData(newUserData);
          setIsEditingBio(false);
        })
        .finally(() => {
          setProcessingTitle(false);
        });
    }
  };

  const [processingTitle, setProcessingTitle] = useState<boolean>(false);

  const handleSaveTitle = () => {
    if (userData) {
      setProcessingTitle(true);
      MystraAPI.setTitle(titleInput, userId, token)
        .then(() => {
          const newUserData = { ...userData, title: titleInput };
          setUserData(newUserData);
          setIsEditingTitle(false);
        })
        .finally(() => {
          setProcessingTitle(false);
        });
    }
  };

  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [isEditingBio, setIsEditingBio] = useState<boolean>(false);

  const [userNFTs] = useLocalStorage<INFTData[]>("userNFT", []);

  return loading && !userData ? (
    <CenterContainer>
      <Flex h="calc(100vh - 74px)" align="center" justify="center">
        <Spinner color="brandSecondary.500" />
      </Flex>
    </CenterContainer>
  ) : errorOccured ? (
    <CenterContainer>
      <Flex h="calc(100vh - 74px)" align="center" justify="center">
        <Box color="error.500">No account found. </Box>
      </Flex>
    </CenterContainer>
  ) : (
    <PageContainer noTopMargin>
      <Flex flexDir="column" maxW="908px">
        <Flex
          mt="20px"
          bg="gray"
          w="920px"
          h="200px"
          bgColor={backgroundTertiary}
          borderRadius="8px"
          transform="translateX(-12px)"
          bgImage={userData?.banner ?? ""}
          bgSize="cover"
          bgPos="center"
        >
          {userId.toString() === id && (
            <Flex
              opacity="0"
              pos="absolute"
              _hover={{ bg: "rgba(0,0,0,0.2)", opacity: "1" }}
              w="100%"
              cursor="pointer"
              h="100%"
              align="center"
              justify="center"
              onClick={onBannerOpen}
            >
              <Flex
                fontFamily="Inter"
                fontSize="14px"
                align="center"
                gap="10px"
              >
                Edit banner <EditIcon />
              </Flex>
            </Flex>
          )}
          <BannerSettings
            isOpen={isBannerOpen}
            setCurrentBanner={setCurrentBanner}
            onClose={onBannerClose}
            onOpen={onBannerOpen}
          />
          <Box
            boxSize="100px"
            bg="gray"
            pos="absolute"
            bottom="-35px"
            left="12px"
            border="4px solid"
            borderRadius="50%"
            borderColor={backgroundPrimary}
          >
            {userId.toString() === id ? (
              <AvatarSettings />
            ) : (
              <Box
                boxSize="92px"
                borderRadius="50%"
                bgImage={userData?.avatar}
                bgPos="center"
                bgSize="cover"
              />
            )}
          </Box>
        </Flex>
        <Flex justify="flex-end" gap="30px" mt="30px">
          {/* <Image src="/assets/icons/chat.svg" />
          <Image src="/assets/icons/share.svg" />
          <Image src="/assets/icons/more-horizontal.svg" /> */}
          <Flex align="center" gap="10px">
            <Flex fontFamily="Inter" fontSize="14px" color={textSecondary}>
              Joined:{" "}
            </Flex>
            <Box fontFamily="Space Mono" fontSize="14px">
              12 Jan 2023
            </Box>
          </Flex>
        </Flex>
        <Flex flexDir="column" mt="10px" role="group" fontFamily="Inter">
          <Box fontSize="24px" fontWeight="600">
            {userData?.nickname}
          </Box>
          <Flex align="center" gap="10px">
            <Box
              w="auto"
              pl="0px"
              minW="10px"
              py="2px"
              border="None"
              h="24px"
              _focus={{ border: "none", outline: "none", boxShadow: "none" }}
              fontSize="14px"
            >
              {userData?.title}
            </Box>
            {!isEditingTitle && (
              <EditIcon
                opacity={0}
                onClick={() => setIsEditingTitle(true)}
                _groupHover={{ opacity: 1 }}
                cursor="pointer"
              />
            )}
            <CustomModal
              isOpen={isEditingTitle}
              header={"Change your profile title"}
              onClose={() => {
                setIsEditingTitle(false);
                setTitleInput(userData?.title ?? "");
              }}
              onOpen={() => setIsEditingTitle(true)}
              body={
                <>
                  <Input
                    value={titleInput}
                    maxLength={64}
                    onChange={(e) => setTitleInput(e.target.value)}
                  />
                  <Grid templateColumns="1fr 1fr" mt="20px" gap="16px">
                    <Button
                      bg="none"
                      border="1px solid white"
                      color="white"
                      fontWeight="400"
                      disabled={processingTitle}
                      fontFamily="Inter"
                      fontSize="14px"
                      onClick={() => {
                        setIsEditingTitle(false);
                        setTitleInput(userData?.title ?? "");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      border="1px solid #EFEFEF"
                      bg="#EFEFEF"
                      disabled={processingTitle}
                      fontWeight="400"
                      color="black"
                      fontFamily="Inter"
                      fontSize="14px"
                      onClick={handleSaveTitle}
                    >
                      {processingTitle ? <Spinner color="black" /> : "Save"}
                    </Button>
                  </Grid>
                </>
              }
            ></CustomModal>
          </Flex>
        </Flex>
        <Flex justify="space-between" mt="30px" align="center">
          <Flex>
            <LabeledItem label="Connected Wallets">
              <Flex gap="10px">
                {userData?.casper_address !== "" && (
                  <WalletItem
                    networkType={NETWORK_TYPE.CASPER}
                    address={userData?.casper_address ?? ""}
                  />
                )}
                {userData?.evm_address !== "" && (
                  <WalletItem
                    networkType={NETWORK_TYPE.EVM}
                    address={userData?.evm_address ?? ""}
                  />
                )}
              </Flex>
            </LabeledItem>
          </Flex>
          <Flex gap="50px">
            <LabeledItem label="Rating">
              <Flex
                align="center"
                gap="4px"
                fontFamily="Space Mono"
                fontSize="14px"
              >
                {userData?.totalPoints}
                <Image boxSize="14px" src="/assets/brand/star-white.svg" />
                {"   "}
              </Flex>
            </LabeledItem>
            {/* <LabeledItem label="Joined">
              <Box fontFamily="Space Mono" fontSize="14px">
                12 Jan 2023
              </Box>
            </LabeledItem> */}
            <LabeledItem label="Tickets">
              <Flex
                align="center"
                gap="8px"
                fontFamily="Space Mono"
                fontSize="14px"
              >
                <Box
                  boxSize="10px"
                  borderRadius="50%"
                  bg="brandSecondary.500"
                />{" "}
                {userData?.tickets_amount}
              </Flex>
            </LabeledItem>
            <LabeledItem label="Global Rank">
              <Box fontSize="14px" fontFamily="Space Mono">
                #74
              </Box>
            </LabeledItem>
            <LabeledItem label="Guild">
              <Box
                opacity="0.5"
                fontSize="14px"
                fontFamily="INter"
                color={textSecondary}
              >
                Soon
              </Box>
            </LabeledItem>
          </Flex>
        </Flex>

        <Flex flexDir="column" mt="30px">
          <TabContainer
            openedTab={0}
            items={[
              {
                label: "Description",
                content: (
                  <Grid
                    templateColumns="1fr auto"
                    fontSize="14px"
                    gap="10px"
                    fontFamily="Inter"
                    role="group"
                    color={textSecondary}
                  >
                    <Box>
                      {userData?.bio && userData?.bio.length > 0
                        ? userData?.bio
                        : "No description provided."}
                    </Box>

                    <EditIcon
                      boxSize="20px"
                      color="white"
                      opacity={0}
                      onClick={() => setIsEditingBio(true)}
                      _groupHover={{ opacity: 1 }}
                      cursor="pointer"
                    />

                    <CustomModal
                      isOpen={isEditingBio}
                      header={"Change your profile bio"}
                      onClose={() => {
                        setIsEditingBio(false);
                        setBioInput(userData?.bio ?? "");
                      }}
                      onOpen={() => setIsEditingBio(true)}
                      body={
                        <>
                          <Textarea
                            maxH="40vh"
                            value={bioInput}
                            maxLength={400}
                            placeholder={"Your profile bio"}
                            onChange={(e) => setBioInput(e.target.value)}
                          />
                          <Grid templateColumns="1fr 1fr" mt="20px" gap="16px">
                            <Button
                              bg="none"
                              border="1px solid white"
                              color="white"
                              fontWeight="400"
                              disabled={processingTitle}
                              fontFamily="Inter"
                              fontSize="14px"
                              onClick={() => {
                                setIsEditingBio(false);
                                setBioInput(userData?.bio ?? "");
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              border="1px solid #EFEFEF"
                              bg="#EFEFEF"
                              disabled={processingTitle}
                              fontWeight="400"
                              color="black"
                              fontFamily="Inter"
                              fontSize="14px"
                              onClick={handleSaveBio}
                            >
                              {processingTitle ? (
                                <Spinner color="black" />
                              ) : (
                                "Save"
                              )}
                            </Button>
                          </Grid>
                        </>
                      }
                    ></CustomModal>
                  </Grid>
                ),
              },
              {
                label: "NFTs",
                content: (
                  <Grid templateColumns={"1fr 1fr 1fr 1fr"} gap="16px">
                    {userNFTs.map((item) => {
                      return (
                        <NFTItem
                          loadNfts={() => {}}
                          data={item}
                          hide={() => {}}
                          unhide={() => {}}
                          deleteNFT={() => {}}
                          price={-1}
                        />
                      );
                    })}
                  </Grid>
                ),
              },
            ]}
          />
        </Flex>
      </Flex>
    </PageContainer>
  );
};
