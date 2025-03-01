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

function BottomToolbar({
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

  function getConnectionButtonLabel() {
    if (isConnected) return "Disconnect";
    if (isConnecting) return "Connecting...";
    return "Connect";
  }

  function getConnectionButtonClasses() {
    const baseClasses = "text-white text-base p-2 flex items-center justify-center transition-all duration-300";
    const cursorClass = isConnecting ? "cursor-not-allowed" : "cursor-pointer";
    const responsiveClasses = "w-36 h-12 rounded-full sm:w-24 sm:h-14 sm:rounded-full";
    
    if (isConnected) {
      return `bg-red-600 hover:bg-red-700 ${cursorClass} ${baseClasses} ${responsiveClasses}`;
    }
    return `bg-black hover:bg-gray-900 ${cursorClass} ${baseClasses} ${responsiveClasses}`;
  }

  return (
    // Added transform, scale-50, and origin-bottom classes to scale the toolbar to half its size.
    <div className="transform scale-50 origin-bottom fixed bottom-[-10px] left-0 w-full p-4 flex flex-col items-center sm:relative sm:bottom-0">
      <button
        onClick={onToggleConnection}
        className={getConnectionButtonClasses()}
        disabled={isConnecting}
      >
        <span className="text-sm sm:text-xs">{getConnectionButtonLabel()}</span>
      </button>

      <div className="flex flex-wrap items-center gap-2 mt-4">
        <input
          id="push-to-talk"
          type="checkbox"
          checked={isPTTActive}
          onChange={e => setIsPTTActive(e.target.checked)}
          disabled={!isConnected}
          className="w-4 h-4"
        />
        <label htmlFor="push-to-talk" className="cursor-pointer">Push to talk</label>
        <button
          onMouseDown={handleTalkButtonDown}
          onMouseUp={handleTalkButtonUp}
          onTouchStart={handleTalkButtonDown}
          onTouchEnd={handleTalkButtonUp}
          disabled={!isPTTActive}
          className={`py-1 px-4 rounded-full ${
            isPTTUserSpeaking ? "bg-gray-300" : "bg-gray-200"
          } ${!isPTTActive ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "cursor-pointer"}`}
        >
          Talk
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-4">
        <input
          id="audio-playback"
          type="checkbox"
          checked={isAudioPlaybackEnabled}
          onChange={e => setIsAudioPlaybackEnabled(e.target.checked)}
          disabled={!isConnected}
          className="w-4 h-4"
        />
        <label htmlFor="audio-playback" className="cursor-pointer">Audio playback</label>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-4">
        <input
          id="logs"
          type="checkbox"
          checked={isEventsPaneExpanded}
          onChange={e => setIsEventsPaneExpanded(e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="logs" className="cursor-pointer">Logs</label>
      </div>
    </div>
  );
}

export default BottomToolbar;
