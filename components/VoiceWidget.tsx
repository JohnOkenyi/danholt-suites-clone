'use client';

import Script from 'next/script';

export default function VoiceWidget() {
  return (
    <>
      <div dangerouslySetInnerHTML={{
        __html: `<elevenlabs-convai agent-id="agent_4701kfynh9t9fwsrvabne3hs7f3f"></elevenlabs-convai>`
      }} />
      <Script
        src="https://elevenlabs.io/convai-widget/index.js"
        strategy="afterInteractive"
      />
    </>
  );
}
