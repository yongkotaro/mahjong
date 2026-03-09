import React, { createContext, useState, ReactNode, useMemo } from 'react';

type ModalType = 'login' | 'register' | null;

interface ModalContextType {
    showModal: ModalType;
    setShowModal: (modal: ModalType) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [showModal, setShowModal] = useState<ModalType>(null);
    const value = useMemo(() => {
        return { showModal, setShowModal };
    }, [showModal]);
    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = React.useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within ModalProvider');
    }
    return context;
};
