import { Box, Grid, useColorModeValue } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { FloatingChat } from "./components/global/FloatingChat/floatingChat";
import { Navbar } from "./components/global/Navbar/navbar";
import { TopMenu } from "./components/global/TopMenu/topMenu";
import { MyProfilePage } from "./pages/account/myprofile";
import { SettingsPage } from "./pages/account/settings";
import { VerificationPage } from "./pages/account/verification";
import { BridgePage } from "./pages/bridge/bridgePage";
import { BuyTicketPage } from "./pages/buy-ticket/stakingPage";
import { CreatorStudioPage } from "./pages/creator-studio/home";
import { CreatorStudioNFtsPage } from "./pages/creator-studio/nfts";
import { CreateDaoPage } from "./pages/dao/createDao/createDao";
import { DaoPage } from "./pages/dao/dao";
import { ChangelogPage } from "./pages/dashboard/changelog/dashboardPage";
import { DashboardPage } from "./pages/dashboard/dashboardPage";
import { LeaderboardsPage } from "./pages/dashboard/leaderboards/leaderboardsPage";
import { FiatGatewayPage } from "./pages/fiat-gateway/fiatGatewayPage";
import { ForgotPasswordPage } from "./pages/forgotPassword/forgotPasswordPage";
import { CollectionPage } from "./pages/marketplace/collectionPage";
import { MarketplaceItemPage } from "./pages/marketplace/MarketplaceItemPage";
import { MarketplacePage } from "./pages/marketplace/marketplacePage";
import { ProfilePage } from "./pages/profile/profilePage";
import { ResetPasswordPage } from "./pages/resetPassword/resetPasswordPage";
import { CalculatorPage } from "./pages/staking/calculatorPage";
import { MyDelgationsPage } from "./pages/staking/myDelegationsPage";
import { StakingPage } from "./pages/staking/stakingPage";
import { StakingRankingPage } from "./pages/staking/stakingRankingPage";
import { ToolsPage } from "./pages/tools/home";
import { CoinPage } from "./pages/wallet/coins";
import { NFTPage } from "./pages/wallet/nft";
import { useUserProvider } from "./providers/User/userProvider";

export const AppWrapper = () => {
  const appBg = useColorModeValue("background.light", "background.dark");
  const { isLogged } = useUserProvider();

  return (
    <Router>
      <Grid
        fontFamily="Sora, sans-serif"
        templateColumns="66px auto"
        zIndex="0"
      >
        <Box />
        {isLogged && <FloatingChat />}
        <Navbar />
        <Box overflowY="auto" h="100vh" bg={appBg}>
          <>
            <TopMenu />
            <Box padding="0px 0px" maxW="2000px" margin="0 auto">
              <Routes>
                <Route path="/account/settings" element={<SettingsPage />} />
                <Route path="/account">
                  <Route path="verification" element={<VerificationPage />} />
                </Route>
                <Route path="/bridge" element={<BridgePage />}></Route>
                <Route path="/changelog" element={<ChangelogPage />}></Route>
                <Route
                  path="/dashboard/leaderboards"
                  element={<LeaderboardsPage />}
                ></Route>

                <Route path="/account/me" element={<MyProfilePage />}></Route>

                <Route path="/staking" element={<StakingPage />} />
                <Route
                  path="/staking/calculator"
                  element={<CalculatorPage />}
                />
                <Route
                  path="/staking/ranking"
                  element={<StakingRankingPage />}
                />
                <Route
                  path="/staking/delegations"
                  element={<MyDelgationsPage />}
                />
                <Route path="/creator-studio" element={<CreatorStudioPage />} />
                <Route
                  path="/creator-studio/nfts"
                  element={<CreatorStudioNFtsPage />}
                />
                <Route path="/tools" element={<ToolsPage />} />
                <Route path="/wallet/coins" element={<CoinPage />} />
                <Route path="/wallet/nft" element={<NFTPage />} />
                <Route path="/wallet" element={<NFTPage />} />

                <Route path="/createDao" element={<CreateDaoPage />} />
                <Route path="/dao" element={<DaoPage />}></Route>
                <Route path="/dao/:id" element={<DaoPage />}></Route>

                {/* {process.env.REACT_APP_ENVIRONMENT == "testnet" && (
                  <Route
                    path="chat"
                    element={
                      <ChatProvider>
                        <ChatPage />
                      </ChatProvider>
                    }
                  /><
                )} */}

                <Route path="/" element={<DashboardPage />}></Route>
                {/* <Route path="/news" element={<NewsPage />}></Route> */}
                <Route
                  path="/fiat-gateway"
                  element={<FiatGatewayPage />}
                ></Route>
                <Route
                  path="/marketplace/:chainName/:collectionAddress/:id"
                  element={<MarketplaceItemPage />}
                ></Route>
                <Route
                  path="/marketplace/:chainName/:collectionAddress"
                  element={<CollectionPage />}
                ></Route>
                <Route path="/users/:id" element={<ProfilePage />}></Route>

                {/* <Route
                  path="/explorer/casper"
                  element={<ExplorerCasperPage />}
                ></Route> */}

                <Route path="/buy-ticket" element={<BuyTicketPage />}></Route>

                <Route
                  path="/marketplace"
                  element={<MarketplacePage />}
                ></Route>

                <Route
                  path="/forgot-password"
                  element={<ForgotPasswordPage />}
                ></Route>
                <Route
                  path="/reset-password"
                  element={<ResetPasswordPage />}
                ></Route>
              </Routes>
            </Box>
          </>
        </Box>
      </Grid>
    </Router>
  );
};
