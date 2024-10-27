"use client";
import { APP_ENV } from "@/appEnv";
import { Layout } from "@/modules/common/layout";
import { DiscoverPage } from "@/modules/discover";
import { KEPLR_AUTOCONNECT_KEY, connectAndromedaClient, initiateKeplr, useAndromedaStore } from "@/zustand/andromeda";
import { updateConfig } from "@/zustand/app";
import React, { FC, useEffect } from "react"
import { CopilotPopup } from "@copilotkit/react-ui";
import { useCopilotReadable } from "@copilotkit/react-core";

interface Props {
}

const DefaultApp: FC<Props> = (props) => {
    const { } = props;
    const isConnected = useAndromedaStore(state => state.isConnected)
    const chainId = useAndromedaStore(state => state.chainId)
    const isLoading = useAndromedaStore(state => state.isLoading)
    const keplr = useAndromedaStore(state => state.keplr)

    useCopilotReadable({
        description: "Connection to wallet",
        value: isConnected,
    });

    useCopilotReadable({
        description: "Connected chain id",
        value: chainId,
    });

    useCopilotReadable({
        description: "Keplr",
        value: keplr,
    });

    useEffect(() => {
        initiateKeplr();
    }, []);

    useEffect(() => {
        const autoconnect = localStorage.getItem(KEPLR_AUTOCONNECT_KEY);
        if (!isLoading && typeof keplr !== "undefined" && autoconnect === keplr?.mode) {
            if (!isConnected || (isConnected && chainId !== APP_ENV.DEFAULT_CONFIG.chainId)) {
                connectAndromedaClient(APP_ENV.DEFAULT_CONFIG.chainId);
            }
        }
    }, [keplr, isConnected, isLoading, chainId]);

    useEffect(() => {
        updateConfig(APP_ENV.DEFAULT_CONFIG);
    }, [])

    return (
        <Layout>
            <DiscoverPage />
            <CopilotPopup
                instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
                labels={{
                    title: "Andromeda Assistant",
                    initial: "Need any help?",
                }}
            />
        </Layout>
    )
}

export default DefaultApp