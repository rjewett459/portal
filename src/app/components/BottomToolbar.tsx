import React from "react";
import { SessionStatus } from "@/app/types";

interface BottomToolbarProps {
  sessionStatus: SessionStatus;
  onToggleConnection: () => void;
  isPTTActive: boolean;
  setIsPTTActive: (val: boolean) => void;
  isPTTUserSpeaking: boolean;
  handleTalkButtonDown: () => void;
  handleTalkButtonUp: () => void;
  isEventsPaneExpanded: boolean;
  setIsEventsPaneExpanded: (val: boolean) => void;
  isAudioPlaybackEnabled: boolean;
  setIsAudioPlaybackEnabled: (val: boolean) => void;
}

export default function BottomToolbar({
  sessionStatus,
  onToggleConnection,
  isPTTActive,
  setIsPTTActive,
  isPTTUserSpeaking,
  handleTalkButtonDown,
  handleTalkButtonUp,
  isEventsPaneExpanded,
  setIsEventsPaneExpanded,
  isAudioPlaybackEnabled,
  setIsAudioPlaybackEnabled,
}: BottomToolbarProps) {
  const isConnected = sessionStatus === "CONNECTED";
  const isConnecting = sessionStatus === "CONNECTING";

  const connectionLabel = isConnected
    ? "Disconnect"
    : isConnecting
    ? "Connecting..."
    : "Connect";

  // Example: unify button styles
  const baseButtonClasses = "rounded-full py-2 px-4 text-sm font-medium";

  const connectionButtonClasses = [
    baseButtonClasses,
    isConnected
      ? "bg-red-600 text-white"
      : "bg-black text-white",
    isConnecting ? "cursor-not-allowed opacity-70" : "cursor-pointer",
  ].join(" ");

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-2 sm:p-4 z-50">
      {/* Connection Button */}
      <button
        onClick={onToggleConnection}
        className={connectionButtonClasses}
        disabled={isConnecting}
      >
        {connectionLabel}
      </button>

      {/* Push to Talk Section */}
      <div className="flex items-center gap-2">
        <label className="cursor-pointer flex items-center gap-1">
          <input
            id="push-to-talk"
            type="checkbox"
            checked={isPTTActive}
            onChange={e => setIsPTTActive(e.target.checked)}
            disabled={!isConnected}
          />
          <span className="text-sm">Push to talk</span>
        </label>

        <button
          onMouseDown={handleTalkButtonDown}
          onMouseUp={handleTalkButtonUp}
          onTouchStart={handleTalkButtonDown}
          onTouchEnd={handleTalkButtonUp}
          disabled={!isPTTActive}
          className={[
            baseButtonClasses,
            "bg-gray-200 text-black",
            !isPTTActive && "opacity-50 cursor-not-allowed",
            isPTTUserSpeaking && "bg-gray-300",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          Talk
        </button>
      </div>

      {/* Audio Playback */}
      <div className="flex items-center gap-2">
        <label className="cursor-pointer flex items-center gap-1">
          <input
            id="audio-playback"
            type="checkbox"
            checked={isAudioPlaybackEnabled}
            onChange={e => setIsAudioPlaybackEnabled(e.target.checked)}
            disabled={!isConnected}
          />
          <span className="text-sm">Audio</span>
        </label>
      </div>

      {/* Logs */}
      <div className="flex items-center gap-2">
        <label className="cursor-pointer flex items-center gap-1">
          <input
            id="logs"
            type="checkbox"
            checked={isEventsPaneExpanded}
            onChange={e => setIsEventsPaneExpanded(e.target.checked)}
          />
          <span className="text-sm">Logs</span>
        </label>
      </div>
    </div>
  );
}
