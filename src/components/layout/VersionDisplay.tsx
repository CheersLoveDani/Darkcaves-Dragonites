// filepath: e:\development\Darkcaves-Dragonites\src\components\layout\VersionDisplay.tsx
import React from "react";

interface VersionDisplayProps {
  className?: string;
}

export const VersionDisplay: React.FC<VersionDisplayProps> = ({
  className = "",
}) => {
  // Get version from build-time environment variable (injected from package.json)
  const version = __APP_VERSION__ || "0.3.0";

  return (
    <div
      className={`fixed bottom-2 right-2 text-xs text-gray-500 dark:text-gray-400 font-mono bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-2 py-1 rounded shadow-sm z-50 ${className}`}
      title={`Darkcaves & Dragonites v${version}`}
    >
      v{version}
    </div>
  );
};

export default VersionDisplay;
