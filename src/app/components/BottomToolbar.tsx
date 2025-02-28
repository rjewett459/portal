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
    const responsiveClasses = "w-36 h-12 rounded-full sm:w-14 sm:h-14 sm:rounded-full";
    
    if (isConnected) {
      return `bg-red-600 hover:bg-red-700 ${cursorClass} ${baseClasses} ${responsiveClasses}`;
    }
    return `bg-black hover:bg-gray-900 ${cursorClass} ${baseClasses} ${responsiveClasses}`;
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-4">
      {/* Logo and Title */}
      <div className="flex flex-col items-center w-full">
        <img src="/logo.png" alt="ChatSites Logo" className="w-16 h-16 mb-2" />
        <h1 className="text-lg font-semibold text-center">ChatSites™ AI Portal</h1>
      </div>

      {/* Dropdown Menus */}
      <div className="flex flex-col w-full max-w-xs gap-2 mt-4">
        <select className="p-2 border rounded-md">{/* Industry dropdown */}</select>
        <select className="p-2 border rounded-md">{/* Agent dropdown */}</select>
      </div>

      {/* Text Box with More Space */}
      <div className="flex-1 w-full max-w-md mt-4 p-4 border rounded-lg overflow-y-auto bg-white shadow-md">
        <p>Type a message...</p>
      </div>

      {/* Toolbar Positioned Lower */}
      <div className="fixed bottom-[-50px] left-0 w-full p-4 flex flex-col items-center sm:relative sm:bottom-0">
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
    </div>
  );
}

export default BottomToolbar;
