import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Terms as TermsComponent } from '../components/Terms/Terms';
import '../components/Terms/Terms.css';

const TermsPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', paddingY: 4 }}>
            <Container maxWidth="md">
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                    sx={{
                        marginBottom: 3,
                        textTransform: 'none',
                        fontSize: '1rem',
                        color: '#1976d2',
                        '&:hover': {
                            backgroundColor: 'rgba(25, 118, 210, 0.08)',
                        },
                    }}
                >
                    Back
                </Button>
                <TermsComponent />
            </Container>
        </Box>
    );
};

export default TermsPage;

