import React, { useEffect, useState } from 'react';

export function ApiSlowMessage() {
  const [secondsLeft, setSecondsLeft] = useState(45);

  useEffect(() => {
    if (secondsLeft <= 0) {
      // Reload the page when countdown reaches 0
      window.location.reload();
      return;
    }

    const timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  return (
    <div className="fixed inset-0 bg-gray-800/95 flex items-center justify-center z-[90]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[95%] md:w-[60%] lg:w-[40%] text-start">
        <h2 className="text-2xl font-bold mb-4">Server Waking Up</h2>
        <p className="text-lg">
          Our free backend server is starting. Free-tier servers go to sleep when idle, so it may take around 40 seconds to wake up.
        </p>
        <p className="text-lg mt-2">
          Please be patient, the application will load automatically once ready.
        </p>
        <p className="text-lg mt-2 font-semibold">
          Reloading in: {secondsLeft} second{secondsLeft !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}
