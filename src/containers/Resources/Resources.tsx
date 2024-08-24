import React, { useState } from 'react';
import './Resources.css';
import { Terms, Links } from '../../components';
import { Divider } from '@mui/material';

export const MoreSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'terms' | 'links'>('terms');

    return (
        <div className="tabbed-section" id='more'>
            <Divider variant='middle' sx={{ padding: '40px 0' }}>
                <span className="divider-text">
                    RESOURCES
                </span>
            </Divider>
            <div className="tab-header">
                <button
                    className={`tab-button ${activeTab === 'terms' ? 'active' : ''}`}
                    onClick={() => setActiveTab('terms')}
                >
                    Terms and Conditions
                </button>
                <button
                    className={`tab-button ${activeTab === 'links' ? 'active' : ''}`}
                    onClick={() => setActiveTab('links')}
                >
                    Links
                </button>
            </div>
            <div className="tab-content">
                {activeTab === 'terms' && <Terms />}
                {activeTab === 'links' && <Links />}
            </div>
        </div>
    );
};

