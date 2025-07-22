import '@/Components/User/Style/MiniPopup.css';

const MiniPopup = ({ onClose, children }) => {
    return (
        <div className="mini-popup-overlay">
            <div className="mini-popup-content">
                {children}
                <button className="close-btn" onClick={onClose}>✕</button>
            </div>
        </div>
    );
};

export default MiniPopup;
