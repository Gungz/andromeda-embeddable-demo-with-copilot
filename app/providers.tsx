"use client"
import { apolloClient } from "@/lib/graphql";
import { GlobalModalProvider } from "@/modules/modals";
import theme, { ThemeStorageManager } from "@/theme";
import { ApolloProvider } from "@apollo/client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { CopilotKit } from "@copilotkit/react-core";
import React, { FC, ReactNode } from "react"

interface Props {
    children?: ReactNode;
}

const Providers: FC<Props> = (props) => {
    const { children } = props;

    return (
        <ApolloProvider client={apolloClient}>
            <CacheProvider>
                <ChakraProvider theme={theme} colorModeManager={ThemeStorageManager}>
                    <GlobalModalProvider>
                        <CopilotKit runtimeUrl="/api/copilotkit">
                            {children}
                        </CopilotKit>
                    </GlobalModalProvider>
                </ChakraProvider>
            </CacheProvider>
        </ApolloProvider>
    )
}

export default Providers