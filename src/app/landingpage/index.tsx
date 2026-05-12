import { useNavigate } from "react-router-dom";
import { User } from "../../types";
import { useState, useEffect } from "react";
import "./styles/LandingPage.css";

import { AnimatedBackground } from "./AnimatedBackground";
import { Navigation } from "./Navigation";
import { HeroSection } from "./HeroSection";
import { StatsSection } from "./StatsSection";
import { FeaturesSection } from "./FeaturesSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { TestimonialSection } from "./TestimonialSection";
import { TrustSection } from "./TrustSection";
import { CTASection } from "./CTASection";
import { Footer } from "./Footer";

interface LandingPageProps {
    onAuthed?: (user: User, token: string) => void;
}

export function LandingPage({ onAuthed }: LandingPageProps) {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="landingPage">
            <AnimatedBackground mousePosition={mousePosition} />
            <Navigation scrolled={scrolled} onRequestAccess={() => navigate("/register")} />
            <HeroSection onRequestAccess={() => navigate("/register")} />
            <StatsSection />
            <FeaturesSection />
            <HowItWorksSection />
            <TestimonialSection />
            <TrustSection />
            <CTASection onRequestAccess={() => navigate("/register")} />
            <Footer />
        </div>
    );
}