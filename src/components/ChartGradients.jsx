// SVG Gradient Definitions for Charts with Glossy Effect
export const ChartGradients = () => (
    <defs>
        {/* Blue Glossy Gradient for Bars - More Solid */}
        <linearGradient id="blueGloss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="1" />
            <stop offset="50%" stopColor="#1d4ed8" stopOpacity="1" />
            <stop offset="100%" stopColor="#1e40af" stopOpacity="1" />
        </linearGradient>
        
        {/* Cyan Glossy Gradient - More Solid */}
        <linearGradient id="cyanGloss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
            <stop offset="50%" stopColor="#0891b2" stopOpacity="1" />
            <stop offset="100%" stopColor="#0e7490" stopOpacity="1" />
        </linearGradient>

        {/* Emerald Glossy Gradient - More Solid */}
        <linearGradient id="emeraldGloss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
            <stop offset="50%" stopColor="#059669" stopOpacity="1" />
            <stop offset="100%" stopColor="#047857" stopOpacity="1" />
        </linearGradient>

        {/* Red Glossy Gradient - More Solid */}
        <linearGradient id="redGloss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="1" />
            <stop offset="50%" stopColor="#dc2626" stopOpacity="1" />
            <stop offset="100%" stopColor="#b91c1c" stopOpacity="1" />
        </linearGradient>

        {/* Slate Glossy Gradient - More Solid */}
        <linearGradient id="slateGloss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#64748b" stopOpacity="1" />
            <stop offset="50%" stopColor="#475569" stopOpacity="1" />
            <stop offset="100%" stopColor="#334155" stopOpacity="1" />
        </linearGradient>

        {/* Purple Glossy Gradient - More Solid */}
        <linearGradient id="purpleGloss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="1" />
            <stop offset="50%" stopColor="#7c3aed" stopOpacity="1" />
            <stop offset="100%" stopColor="#6d28d9" stopOpacity="1" />
        </linearGradient>

        {/* Amber Glossy Gradient - More Solid */}
        <linearGradient id="amberGloss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="1" />
            <stop offset="50%" stopColor="#d97706" stopOpacity="1" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="1" />
        </linearGradient>

        {/* Radial gradient for Pie Charts - Emerald */}
        <radialGradient id="pieEmerald">
            <stop offset="30%" stopColor="#34d399" stopOpacity="1" />
            <stop offset="95%" stopColor="#059669" stopOpacity="1" />
        </radialGradient>

        {/* Radial gradient for Pie Charts - Red */}
        <radialGradient id="pieRed">
            <stop offset="30%" stopColor="#f87171" stopOpacity="1" />
            <stop offset="95%" stopColor="#dc2626" stopOpacity="1" />
        </radialGradient>

        {/* Radial gradient for Pie Charts - Slate */}
        <radialGradient id="pieSlate">
            <stop offset="30%" stopColor="#94a3b8" stopOpacity="1" />
            <stop offset="95%" stopColor="#475569" stopOpacity="1" />
        </radialGradient>

        {/* Radial gradient for Pie Charts - Blue */}
        <radialGradient id="pieBlue">
            <stop offset="30%" stopColor="#60a5fa" stopOpacity="1" />
            <stop offset="95%" stopColor="#1d4ed8" stopOpacity="1" />
        </radialGradient>

        {/* Radial gradient for Pie Charts - Cyan */}
        <radialGradient id="pieCyan">
            <stop offset="30%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="95%" stopColor="#0891b2" stopOpacity="1" />
        </radialGradient>

        {/* Emboss filter for bars */}
        <filter id="emboss" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
            <feSpecularLighting in="blur" surfaceScale="2" specularConstant="0.8" specularExponent="20" result="spec" lightingColor="white">
                <fePointLight x="-5000" y="-10000" z="20000" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut" />
            <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
        </filter>

        {/* Shadow filter for depth */}
        <filter id="chartShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="0" dy="2" result="offsetblur" />
            <feComponentTransfer>
                <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>
    </defs>
);

// Color mapping for gradients
export const GRADIENT_COLORS = {
    positive: 'url(#emeraldGloss)',
    negative: 'url(#redGloss)',
    neutral: 'url(#slateGloss)',
    blue: 'url(#blueGloss)',
    cyan: 'url(#cyanGloss)',
    purple: 'url(#purpleGloss)',
    amber: 'url(#amberGloss)',
};

export const PIE_GRADIENT_COLORS = {
    positive: 'url(#pieEmerald)',
    negative: 'url(#pieRed)',
    neutral: 'url(#pieSlate)',
    blue: 'url(#pieBlue)',
    cyan: 'url(#pieCyan)',
};
