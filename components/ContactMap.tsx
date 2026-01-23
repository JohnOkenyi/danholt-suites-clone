'use client'

export default function ContactMap() {
  return (
    <div
      className="h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-xl border border-white/10 relative z-0"
      style={{ height: '500px' }}
    >
      <iframe
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.0642852923!2d7.5548!3d8.9860!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104b6a3b1234567%3A0x1234567890123!2sDanholt%20Suites!5e0!3m2!1sen!2sng!4v1234567890123"
      >
      </iframe>
    </div>
  )
