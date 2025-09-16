import React from 'react';

// A single link component for cleaner code
const FooterLink = ({ href, name }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-gray-300 hover:text-white transition-colors duration-300"
    >
        {name}
    </a>
);

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="text-center mb-8">
                    <h3 className="font-bold text-xl mb-4">Important Health Resources</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-4 gap-x-6 text-sm">
                        <FooterLink href="https://www.mohfw.gov.in/" name="MoHFW (India)" />
                        <FooterLink href="https://www.icmr.gov.in/" name="ICMR (India)" />
                        <FooterLink href="https://www.who.int/" name="World Health Org. (WHO)" />
                        <FooterLink href="https://www.cdc.gov/" name="CDC (USA)" />
                        <FooterLink href="https://www.unicef.org/" name="UNICEF" />
                        <FooterLink href="https://www.thelancet.com/" name="The Lancet" />
                        <FooterLink href="https://www.nih.gov/" name="NIH (USA)" />
                         <FooterLink href="https://www.nhs.uk/" name="NHS (UK)" />
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-8 text-center">
                    <p className="font-semibold">&copy; {new Date().getFullYear()} ProLyfe. A Smart India Hackathon Project.</p>
                    <p className="text-sm text-gray-400 mt-2">Built with passion by Team BitByBit.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;