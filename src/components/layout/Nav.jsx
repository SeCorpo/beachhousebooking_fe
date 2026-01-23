import React, {useEffect, useState} from "react";
import "../../assets/styles/components/nav.css"

// Nav is not inside the header
export default function Nav({
                                children,
                                ariaLabel = "Steps",
                                className = "",
                            }) {

    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const mobileNow = window.innerWidth <= 768;

            setIsMobile((prevMobile) => {
                // When switched from mobile to desktop, close the drawer
                if (prevMobile && !mobileNow) {
                    setIsOpen(false);
                }
                return mobileNow;
            });
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);


    return (
        <>
            { isMobile ? (
                <>
                    <button className="hamburger"
                            onClick={() => setIsOpen((prev) => !prev)}>
                        {isOpen ? "×" : "☰"}
                    </button>

                    { isOpen && (
                        <nav aria-label={ariaLabel} className={`app-nav nav-mobile ${className}`.trim()}>
                            <ul className="nav-list" role="list">
                                {children}
                            </ul>
                        </nav>
                    )}
                </>
            ) : (
                <nav aria-label={ariaLabel} className={`app-nav ${className}`}>
                    <ul className="nav-list" role="list">
                        {children}
                    </ul>
                </nav>
            )}
        </>
    )
}
