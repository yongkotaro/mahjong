import React from 'react';
import './Highlights.css';
import { FlashOnRounded, RuleRounded, AutoAwesomeRounded } from '@mui/icons-material';
import { Divider } from '@mui/material';

const highlights = [
    {
        icon: <AutoAwesomeRounded />,
        text: "Easy-to-Use Interface",
        description:
            "Simply key in your mahjong hand with the user-friendly keyboard interface.",
    },
    {
        icon: <FlashOnRounded />,
        text: "Faster Rounds",
        description:
            "Eliminate the need to manually think which tiles you are waiting for.",
    },
    {
        icon: <RuleRounded />,
        text: "Win More, Lose Less",
        description:
            "Make less mistakes as TileWaiter shows you which tiles you need to win.",
    }
];

export const Highlights: React.FC = () => {
    return (
        <div className="highlights-container" id='highlights'>
            <div className="highlights-divider">
                <Divider variant='middle' sx={{ padding: '40px 0', width: '70%', margin: 'auto' }}>
                    <span className="divider-text">
                        HIGHLIGHTS
                    </span>
                </Divider>
            </div>
            <div className="highlights-text">
                <h2 className="highlights-heading">
                    Upgrade your {" "}
                    <span className="feature-highlight">
                        mahjong skills
                    </span>
                </h2>
            </div>
            <div className="highlights-list">
                {highlights.map((highlight, index) => (
                    <div key={index}>
                        <div className="highlights-icon-wrapper">
                            <div className="highlights-icon">
                                {highlight.icon}
                            </div>
                            <div>
                                <h5 className="highlights-title">{highlight.text}</h5>
                                <p className="highlights-description">
                                    {highlight.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
