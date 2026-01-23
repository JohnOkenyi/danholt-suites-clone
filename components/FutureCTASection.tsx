'use client'

import React from 'react'

export default function FutureCTASection() {
    return (
        <section className="hero" style={{
            width: '100%',
            height: '50vh', // Reduced from 100vh
            minHeight: '400px', // Ensure it doesn't get too small
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            backgroundColor: '#020617',
            fontFamily: "'Poppins', sans-serif",
            color: 'white',
            overflow: 'hidden',
            margin: 0,
            padding: '80px 0', // Added padding
            boxSizing: 'border-box'
        }}>
            {/* Import Font */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap');
                
                /* RESPONSIVE STYLES */
                @media (max-width: 768px) {
                    .hero-heading {
                        font-size: 30px !important;
                    }
                    .chat-icon {
                        width: 50px !important;
                        height: 50px !important;
                        bottom: 30px !important;
                        right: 30px !important;
                    }
                    .accent-line {
                        width: 3px !important;
                    }
                }

                @media (max-width: 480px) {
                    .hero-heading {
                        font-size: 24px !important;
                    }
                    .cta-button {
                        font-size: 14px !important;
                        padding: 12px 24px !important;
                    }
                }
            `}</style>

            <div className="accent-line" style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '5px',
                height: '100%',
                background: '#c9a961',
                zIndex: 1
            }}></div>

            <div className="content" style={{
                textAlign: 'center',
                maxWidth: '1000px',
                padding: '0 20px'
            }}>
                <h1 className="hero-heading" style={{
                    fontSize: '36px',
                    fontWeight: 300,
                    lineHeight: 1.6,
                    marginBottom: '60px',
                    letterSpacing: '0.05em',
                    color: '#ffffff',
                    margin: '0 0 60px 0'
                }}>
                    The future of hospitality isn't impersonal.<br />
                    <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>It's human.</span>
                </h1>

                <button className="cta-button" style={{
                    display: 'inline-block',
                    background: '#c9a961',
                    color: '#1a1f3a',
                    padding: '14px 32px',
                    borderRadius: '35px',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '16px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#b8975a';
                        e.currentTarget.style.transform = 'scale(1.08)';
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(201, 169, 97, 0.6), 0 0 40px rgba(201, 169, 97, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#c9a961';
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                    }}
                >
                    Book Your Stay
                </button>
            </div>

            <div className="chat-icon" style={{
                position: 'fixed',
                bottom: '40px',
                right: '40px',
                width: '60px',
                height: '60px',
                background: '#c9a961',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                zIndex: 10
            }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{
                    width: '24px',
                    height: '24px',
                    color: '#ffffff'
                }}>
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            </div>
        </section>
    )
}
