import React from 'react';
import './Terms.css';
import { Divider } from '@mui/material';

export const Terms: React.FC = () => {
    return (
        <div className="terms-container">
            <h1 className="terms-title">Terms and Conditions</h1>

            <p className="terms-paragraph">
                Welcome to our Mahjong game website. By using this website, you agree to the following terms and conditions.
            </p>

            <h2 className="terms-subtitle">1. No Liability for Game Losses</h2>
            <p className="terms-paragraph">
                This website is not liable for any losses incurred during a game of Mahjong. The outcome of any game falls on the responsibility of the players involved.
            </p>

            <h2 className="terms-subtitle">2. User Responsibility for Input Accuracy</h2>
            <p className="terms-paragraph">
                It is the user’s responsibility to key in the correct hand information when using our website. Any errors in input can lead to incorrect game outcomes or scoring, for which this website is not accountable.
            </p>

            <h2 className="terms-subtitle">3. Variations in Mahjong Rules</h2>
            <p className="terms-paragraph">
                Mahjong is a game with many variations, and different regions or groups may follow different house rules. This website generally adheres to Singapore-style Mahjong rules, but it is important for users to be aware of and understand the rules being used in their specific game context.
            </p>

            <p className="terms-paragraph">
                By continuing to use this website, you acknowledge that you have read and understood these terms and conditions.
            </p>
        </div>
    );
};


