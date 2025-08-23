'use client'
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

interface SubpageLayoutProps {
    children: React.ReactNode;
}

const SubpageLayout = ({ children }: SubpageLayoutProps) => {
    const t = useTranslations();
    
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with back button */}
            <div className="bg-white border-b border-gray-200 px-4 py-3">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">{t('back')}</span>
                </button>
            </div>
            
            {/* Page content */}
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
};

export default SubpageLayout;