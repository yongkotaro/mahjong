import { Home, Highlights, Header, Footer } from '../containers';
import LoginModal from '../components/LoginModal/LoginModal';
import RegisterModal from '../components/RegisterModal/RegisterModal';
import { useModal } from '../contexts/ModalContext';

const GuestPage = () => {
    const { showModal, setShowModal } = useModal();

    const handleCloseModal = () => {
        setShowModal(null);
    };

    return (
        <>
            <div className="App">
                <Header />
                <Highlights />
                <Home />
                <Footer />
            </div>
            {showModal === 'login' && (
                <LoginModal
                    onClose={handleCloseModal}
                    onRegisterClick={() => setShowModal('register')}
                />
            )}
            {showModal === 'register' && (
                <RegisterModal
                    onClose={handleCloseModal}
                    onLoginClick={() => setShowModal('login')}
                />
            )}
        </>
    );
};

export default GuestPage;
