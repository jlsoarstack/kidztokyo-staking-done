/** @jsxImportSource theme-ui */
import { Container, Heading, Text, Spinner, Flex, Button } from "theme-ui";
import CollectionItem from "@/components/CollectionItem/CollectionItem";
import useGemFarmStaking from "hooks/useGemFarmStaking";
import { useWallet } from "@solana/wallet-adapter-react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Header from "@/components/Header/Header";
import { LoadingIcon } from "@/components/icons/LoadingIcon";
import { useState } from "react";
import WalletManager from "@/components/WalletManager/WalletManager";
import { ErrorIcon } from "react-hot-toast";

const StakePage = () => {
  const [farmId, setFarmId] = useState(
    process.env.NEXT_PUBLIC_GEMFARM_ID || ""
  );

  const {
    handleWalletItemClick,
    handleStakeButtonClick,
    handleUnstakeButtonClick,
    handleClaimButtonClick,
    handleMoveToVaultButtonClick,
    handleVaultItemClick,
    handleMoveToWalletButtonClick,
    handleInitStakingButtonClick,
    handleRefreshRewardsButtonClick,
    walletNFTs,
    feedbackStatus,
    farmerVaultAccount,
    selectedWalletItems,
    isLocked,
    availableA,
    availableB,
    selectedVaultItems,
    farmerStatus,
    whitelistWarning,
    farmerVaultNFTs,
    farmerAccount,
  } = useGemFarmStaking(farmId);

  const { publicKey } = useWallet();

  return (
    <Container
      sx={{
        margin: "2rem auto",
        background: "#ffffff",
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      <Header farmId={farmId} setFarmId={setFarmId} />

      <Flex
        sx={{
          flexDirection: "column",
          marginTop: "3.2rem",
          alignItems: "center",
          padding: "0 1.6rem",
        }}
      >
        <Heading
          sx={{
            paddingBottom: "6px",
            paddingLeft: 12,
            paddingRight: 12,
            borderBottom: "3px solid #8C9B5A",
          }}
        >
          $Kidz Staking
        </Heading>
        <Flex mt="2rem" mb="2rem">
          <WalletManager />
        </Flex>
        {publicKey && (
          <Text>Below you can stake, unstake and collect $KIDZ.</Text>
        )}

        {!publicKey ? (
          <Text
            sx={{
              textAlign: "center",
              margin: "3.2rem 0",
            }}
          >
            Connect your wallet to check the balance of $KIDZ, and the
            corresponding SOL value you staked.
          </Text>
        ) : !farmerAccount ? (
          <Text mt="1.6rem">Farm ID is not configured.</Text>
        ) : farmerAccount && !farmerAccount?.identity ? (
          <Button
            sx={{
              margin: "3.2rem 0",
            }}
            onClick={handleInitStakingButtonClick}
          >
            Create Account
          </Button>
        ) : (
          <>
            {farmerAccount?.identity ? (
              <>
                <Flex
                  sx={{
                    flexDirection: "column",
                    margin: "1.6rem 0",
                  }}
                >
                  <Flex
                    sx={{
                      gap: ".4rem",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text>
                      NFTs staked:&nbsp;
                      {farmerAccount?.gemsStaked.toNumber()}
                    </Text>
                  </Flex>
                  <Text
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    Vault state: <b>{isLocked ? "locked" : "unlocked"}</b>
                    <br />
                  </Text>
                  <Text
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    Account status: <b>{farmerStatus}</b>
                    <br />
                  </Text>
                </Flex>

                <Flex
                  sx={{
                    gap: "1.6rem",
                    margin: "1.6rem 0",
                    flexWrap: "wrap",
                    alignItems: "center",
                    alignSelf: "stretch",
                    justifyContent: "center",

                    "@media (min-width: 768px": {
                      flexDirection: "row",
                    },
                  }}
                >
                  <Button
                    onClick={handleStakeButtonClick}
                    disabled={
                      !(farmerStatus === "unstaked" && farmerVaultNFTs?.length)
                    }
                  >
                    Stake
                  </Button>
                  <Button
                    onClick={handleUnstakeButtonClick}
                    disabled={
                      !(
                        farmerStatus === "staked" ||
                        farmerStatus === "pendingCooldown"
                      )
                    }
                  >
                    {farmerStatus === "pendingCooldown"
                      ? "End cooldown"
                      : "Unstake"}
                  </Button>
                  <Button
                    onClick={handleClaimButtonClick}
                    disabled={!Number(availableA)}
                  >
                    Claim &nbsp;
                    {availableA ? (
                      <b>{(availableA / 1000000000).toFixed(2)}</b>
                    ) : (
                      0
                    )}
                  </Button>
                  <Button onClick={handleRefreshRewardsButtonClick}>
                    Refresh
                  </Button>
                </Flex>
                <Flex
                  sx={{
                    alignItems: "center",
                    gap: ".8rem",
                    margin: ".8rem 0",
                  }}
                >
                  {feedbackStatus ? (
                    <>
                      <LoadingIcon size="1.6rem" />
                      {"  "} <Text variant="small">{feedbackStatus}</Text>
                    </>
                  ) : (
                    ""
                  )}
                  &nbsp;
                </Flex>
                <Flex
                  sx={{
                    alignItems: "center",
                    gap: ".8rem",
                    margin: ".8rem 0",
                  }}
                >
                  {whitelistWarning ? (
                    <>
                      <ErrorIcon />
                      {"  "} <Text variant="small">{whitelistWarning}</Text>
                    </>
                  ) : (
                    ""
                  )}
                  &nbsp;
                </Flex>
              </>
            ) : null}

            <Tabs
              sx={{
                margin: "3.2rem 0",
                alignSelf: "stretch",
                minHeight: "48rem",
              }}
            >
              <TabList>
                <Tab>Your wallet</Tab>
                <Tab>Your vault</Tab>
              </TabList>

              <TabPanel>
                {walletNFTs ? (
                  walletNFTs.length ? (
                    <Flex
                      sx={{
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        sx={{
                          display: "grid",
                          gridTemplateColumns:
                            walletNFTs.length > 1 ? "1fr 1fr" : "1fr",
                          gap: "1.6rem",
                          alignItems: "center",

                          "@media (min-width: 768px)": {
                            gridTemplateColumns:
                              walletNFTs.length > 9
                                ? "1fr 1fr 1fr 1fr 1fr 1fr 1fr"
                                : walletNFTs.length > 4
                                ? "1fr 1fr 1fr 1fr 1fr"
                                : walletNFTs.map(() => "1fr").join(" "),
                          },
                        }}
                      >
                        {walletNFTs.map((item) => {
                          const isSelected = selectedWalletItems.find(
                            (NFT) =>
                              NFT.onchainMetadata.mint ===
                              item.onchainMetadata.mint
                          );

                          return (
                            <CollectionItem
                              key={item.onchainMetadata.mint}
                              item={item}
                              onClick={
                                !isLocked ? handleWalletItemClick : () => true
                              }
                              sx={{
                                maxWidth: "16rem",
                                "> img": {
                                  border: "3px solid transparent",
                                  borderColor: isSelected
                                    ? "primary"
                                    : "transparent",
                                },
                              }}
                            />
                          );
                        })}
                      </div>
                      {walletNFTs.length && !isLocked ? (
                        <Text
                          sx={{
                            margin: "3.2rem 0 .8rem 0",
                          }}
                          variant="small"
                        >
                          Select NFTs to move them to your Vault.
                        </Text>
                      ) : null}
                      <Text>
                        {selectedWalletItems?.length && !isLocked ? (
                          <Button onClick={handleMoveToVaultButtonClick}>
                            Deposit selected
                          </Button>
                        ) : null}
                      </Text>
                    </Flex>
                  ) : (
                    <Flex
                      sx={{
                        justifyContent: "center",
                        alignSelf: "stretch",
                      }}
                    >
                      <Text>There are no NFTs on your wallet.</Text>
                    </Flex>
                  )
                ) : publicKey ? (
                  <Flex
                    sx={{
                      justifyContent: "center",
                      alignSelf: "stretch",
                    }}
                  >
                    <Spinner variant="styles.spinnerLarge" />
                  </Flex>
                ) : null}
              </TabPanel>
              <TabPanel>
                {farmerVaultAccount ? (
                  <>
                    {farmerVaultNFTs ? (
                      farmerVaultNFTs.length ? (
                        <Flex
                          sx={{
                            flexDirection: "column",
                            justifyContent: "center",
                            alignSelf: "stretch",
                            alignItems: "center",
                          }}
                        >
                          <div
                            sx={{
                              display: "grid",
                              gridTemplateColumns:
                                farmerVaultNFTs.length > 1 ? "1fr 1fr" : "1fr",
                              gap: "1.6rem",

                              "@media (min-width: 768px)": {
                                gridTemplateColumns:
                                  farmerVaultNFTs.length > 9
                                    ? "1fr 1fr 1fr 1fr 1fr 1fr 1fr"
                                    : farmerVaultNFTs.length > 4
                                    ? "1fr 1fr 1fr 1fr 1fr"
                                    : farmerVaultNFTs
                                        .map(() => "1fr")
                                        .join(" "),
                              },
                            }}
                          >
                            {farmerVaultNFTs.map((item) => {
                              const isSelected = selectedVaultItems.find(
                                (NFT) =>
                                  NFT.onchainMetadata.mint ===
                                  item.onchainMetadata.mint
                              );

                              return (
                                <CollectionItem
                                  key={item.onchainMetadata.mint}
                                  item={item}
                                  onClick={
                                    !isLocked
                                      ? handleVaultItemClick
                                      : () => true
                                  }
                                  sx={{
                                    maxWidth: "16rem",
                                    "> img": {
                                      border: "3px solid transparent",
                                      borderColor: isSelected
                                        ? "primary"
                                        : "transparent",
                                    },
                                  }}
                                />
                              );
                            })}
                          </div>
                          {farmerVaultNFTs.length && !isLocked ? (
                            <Text
                              sx={{
                                margin: "3.2rem 0 .8rem 0",
                              }}
                              variant="small"
                            >
                              Select NFTs to withdraw them to your wallet.
                            </Text>
                          ) : null}

                          {selectedVaultItems && selectedVaultItems.length ? (
                            <>
                              {!isLocked ? (
                                <Button onClick={handleMoveToWalletButtonClick}>
                                  Withdraw selected
                                </Button>
                              ) : null}
                            </>
                          ) : null}
                        </Flex>
                      ) : (
                        <Flex
                          sx={{
                            justifyContent: "center",
                            alignSelf: "stretch",
                          }}
                        >
                          <Text>There are no NFTs on your vault.</Text>
                        </Flex>
                      )
                    ) : publicKey ? (
                      <Flex
                        sx={{
                          justifyContent: "center",
                          alignSelf: "stretch",
                        }}
                      >
                        <Spinner variant="styles.spinnerLarge" />
                      </Flex>
                    ) : null}
                  </>
                ) : null}
              </TabPanel>
            </Tabs>
          </>
        )}
      </Flex>
    </Container>
  );
};

export default StakePage;
