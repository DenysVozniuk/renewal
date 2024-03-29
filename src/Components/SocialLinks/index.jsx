import React from "react";
import { facebookIcon, instagramIcon, telegramIcon, YouTubeIcon } from "../../img/SocialLinks";

const SocialLinks = (props) => {
    const { isTelegram = true, isInstagram = true, isFacebook = true, isYouTube = true } = props;
    return (
    <div className="social-buttons-links">
        { isYouTube && (<a target="_blank" rel='noreferrer' href="https://www.youtube.com/@departament_osvity" className="social-buttons-link youtube"><span>{YouTubeIcon}</span></a>)}
        { isTelegram && (<a target="_blank" rel='noreferrer' href="https://t.me/departament_osvity_UK" className="social-buttons-link telegram"><span>{telegramIcon}</span></a>)}
        { isInstagram && (<a target="_blank" rel='noreferrer' href="https://www.instagram.com/departament_osvity/" className="social-buttons-link instagram"><span>{instagramIcon}</span></a>)}
        { isFacebook && (<a target="_blank" rel='noreferrer' href="https://www.facebook.com/education.pentecostal.church" className="social-buttons-link facebook"><span>{facebookIcon}</span></a>)}
    </div>

    );
}

export default SocialLinks;