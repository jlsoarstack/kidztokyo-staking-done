/** @jsxImportSource theme-ui */
import Link from "next/link";
import {
  Button,
  Container,
  Flex,
  Input,
  Text,
  Box,
} from "@theme-ui/components";

import WalletManager from "@/components/WalletManager/WalletManager";
import { Dispatch, SetStateAction, useState } from "react";
import { CloseIcon, MenuIcon } from "../icons";

type Props = {
  farmId?: string;
  setFarmId?: Dispatch<SetStateAction<string>>;
};
const Header = ({ farmId, setFarmId }: Props) => {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [isChangingFarmId, setIsChangingFarmId] = useState(false);

  return (
    <Flex
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 9,
        minHeight: 240,
      }}
    >
      <Flex
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 160,
          zIndex: -1,
          background: "url(/images/background.jpg)",
          backgroundSize: "100%",
          backgroundPosition: "center",
        }}
      />
      <Container style={{ maxWidth: "100%" }}>
        <Flex
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
          p=".8rem"
        >
          {/* <Link href="/" passHref> */}
          <Flex sx={{ alignItems: "center", flexDirection: "column" }}>
            <Flex
              sx={{
                "@media (min-width: 768px)": {
                  alignItems: "center",
                  position: "relative",
                  top: 80,
                  left: 20,
                },
                "@media (max-width: 768px)": {
                  display: "block",
                },
              }}
            >
              <img
                sx={{
                  height: 160,
                  width: 160,
                  borderRadius: 100,
                  marginRight: 20,
                  border: "2px solid #fff",
                  "@media (max-width: 768px)": {
                    marginLeft: "calc(50% - 80px)",
                    marginTop: "4rem",
                  },
                }}
                src="/images/logo.gif"
                alt="kidztokyo"
              />
              <Box
                sx={{
                  marginLeft: ".4rem",
                  marginTop: "4rem",

                  "@media (max-width: 768px)": {
                    textAlign: "center",
                    display: "block",
                    marginTop: 0,
                    marginLeft: 0,
                  },
                }}
              >
                <Text as="h1" sx={{ fontWeight: 500 }}>
                  KidzTokyo
                </Text>
                <Text as="p">
                  6500 Kidz on solana chain ready to take over tokyo
                </Text>
              </Box>
            </Flex>
            {/* <Text
                sx={{
                  display: "block",
                }}
                variant="small"
              >
                by Gemworks
              </Text> */}
          </Flex>
          {/* </Link> */}
          {/* <Text
            variant="small"
            sx={{
              marginRight: "auto",
            }}
          >
            &nbsp;&nbsp;&nbsp;&#8226;&nbsp;
            {process.env.NEXT_PUBLIC_CONNECTION_NETWORK}
          </Text> */}

          {/* <Button
            sx={{
              padding: ".8rem",
              "@media(min-width: 768px)": {
                display: "none",
              },
            }}
            onClick={() => setIsMobileMenuActive(true)}
          >
            <MenuIcon />
          </Button> */}
        </Flex>
      </Container>
    </Flex>
  );
};

export default Header;
