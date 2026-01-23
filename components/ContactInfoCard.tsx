import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ContactInfoCardProps {
    icon: LucideIcon;
    title: string;
    content: string[];
}

export const ContactInfoCard: React.FC<ContactInfoCardProps> = ({ icon: Icon, title, content }) => {
    return (
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
            <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-danholt-midnight" />
                </div>

                <h3 className="text-xl font-bold text-danholt-midnight mb-4 font-serif">
                    {title}
                </h3>

                <div className="space-y-2">
                    {content.map((line, index) => (
                        <p key={index} className="text-gray-500 text-sm md:text-base leading-relaxed">
                            {line}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};
