'use client'

export default function ContactMap() {
  return (
    <div className="h-[500px] w-full rounded-2xl overflow-hidden shadow-xl border border-white/10 relative z-0 bg-gray-100">
      <iframe
        src="https://maps.google.com/maps?q=8.9860,7.5548+(Danholt%20Suites)&z=15&output=embed&iwloc=near"
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: '500px' }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full"
      ></iframe>
    </div>
  )
}
