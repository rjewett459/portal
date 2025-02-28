"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import Image from "next/image";

// UI components
import Transcript from "./components/Transcript";
import Events from "./components/Events";
import BottomToolbar from "./components/BottomToolbar";

// Types
import { AgentConfig, SessionStatus } from "@/app/types";

// Context providers & hooks
import { useTranscript } from "@/app/contexts/TranscriptContext";
import { useEvent } from "@/app/contexts/EventContext";
import { useHandleServerEvent } from "./hooks/useHandleServerEvent";

// Utilities
import { createRealtimeConnection } from "./lib/realtimeConnection";

// Agent configs
import { allAgentSets, defaultAgentSetKey } from "@/app/agentConfigs";

function App() {
  const searchParams = useSearchParams();

  const { transcriptItems, addTranscriptMessage, addTranscriptBreadcrumb } =
    useTranscript();
  const { logClientEvent, logServerEvent } = useEvent();

  const [selectedAgentName, setSelectedAgentName] = useState<string>("");
  const [selectedAgentConfigSet, setSelectedAgentConfigSet] =
    useState<AgentConfig[] | null>(null);

  const [dataChannel, setDataChannel] = useState<RTCDataChannel | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const [sessionStatus, setSessionStatus] =
    useState<SessionStatus>("DISCONNECTED");

  const [isEventsPaneExpanded, setIsEventsPaneExpanded] =
    useState<boolean>(true);
  const [userText, setUserText] = useState<string>("");
  const [isPTTActive, setIsPTTActive] = useState<boolean>(false);
  const [isPTTUserSpeaking, setIsPTTUserSpeaking] = useState<boolean>(false);
  const [isAudioPlaybackEnabled, setIsAudioPlaybackEnabled] =
    useState<boolean>(true);

  useEffect(() => {
    let finalAgentConfig = searchParams.get("agentConfig");
    if (!finalAgentConfig || !allAgentSets[finalAgentConfig]) {
      finalAgentConfig = defaultAgentSetKey;
      const url = new URL(window.location.toString());
      url.searchParams.set("agentConfig", finalAgentConfig);
      window.location.replace(url.toString());
      return;
    }

    const agents = allAgentSets[finalAgentConfig];
    const agentKeyToUse = agents[0]?.name || "";

    setSelectedAgentName(agentKeyToUse);
    setSelectedAgentConfigSet(agents);
  }, [searchParams]);

  return (
    <div className="text-base flex flex-col h-screen bg-gray-100 text-gray-800 relative overflow-hidden">  
      {/* Logo & Header */}
      <div className="flex flex-col items-center pt-4">
        <Image src="/chatsites-logo.png" alt="ChatSites Logo" width={80} height={80} className="mb-2" />
        <div className="text-xl font-semibold">ChatSites™ AI <span className="text-gray-500">Portal</span></div>
      </div>

      {/* Dropdowns */}
      <div className="flex justify-center gap-4 py-3">
        <select
          value={searchParams.get("agentConfig") || "default"}
          onChange={(e) => {
            const url = new URL(window.location.toString());
            url.searchParams.set("agentConfig", e.target.value);
            window.location.replace(url.toString());
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 cursor-pointer font-normal focus:outline-none"
        >
          {Object.keys(allAgentSets).map((agentKey) => (
            <option key={agentKey} value={agentKey}>{agentKey}</option>
          ))}
        </select>
        
        {selectedAgentConfigSet && (
          <select
            value={selectedAgentName}
            onChange={(e) => setSelectedAgentName(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 cursor-pointer font-normal focus:outline-none"
          >
            {selectedAgentConfigSet.map((agent) => (
              <option key={agent.name} value={agent.name}>{agent.name}</option>
            ))}
          </select>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col px-2 overflow-hidden relative">
        <Transcript
          userText={userText}
          setUserText={setUserText}
          onSendMessage={() => {}}
          canSend={sessionStatus === "CONNECTED" && dcRef.current?.readyState === "open"}
          className="flex-grow"
        />
        <Events isExpanded={isEventsPaneExpanded} />
      </div>

      {/* Bottom Toolbar (Sticky at the bottom) */}
      <div className="sticky bottom-0 left-0 right-0 bg-white shadow-lg p-2 flex justify-center">
        <BottomToolbar
          sessionStatus={sessionStatus}
          onToggleConnection={() => {}}
          isPTTActive={isPTTActive}
          setIsPTTActive={setIsPTTActive}
          isPTTUserSpeaking={isPTTUserSpeaking}
          handleTalkButtonDown={() => {}}
          handleTalkButtonUp={() => {}}
          isEventsPaneExpanded={isEventsPaneExpanded}
          setIsEventsPaneExpanded={setIsEventsPaneExpanded}
          isAudioPlaybackEnabled={isAudioPlaybackEnabled}
          setIsAudioPlaybackEnabled={setIsAudioPlaybackEnabled}
        />
      </div>
    </div>
  );
}

export default App;
