import React, { useState, useEffect } from 'react';
// import useFetch from '../hooks/useFetch';
import { useDispatch ,useSelector} from 'react-redux';
import { fetchPopup } from '../common/popupSlice';

const ScrollPopup = () => {
    const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.popup);

  useEffect(() => {
    dispatch(fetchPopup());
  }, [dispatch]);

    const [isVisible, setIsVisible] = useState(false);
    const [hasShownPopup, setHasShownPopup] = useState(false); // Track if popup has been shown



    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = 300; // Trigger the popup after scrolling 300px
            if (window.scrollY > scrollThreshold && !hasShownPopup) {
                setIsVisible(true);
                setHasShownPopup(true); // Prevent popup from showing again
            }
        };

        const disableScroll = () => {
            document.body.style.overflow = isVisible ? 'hidden' : 'auto';
        };

        window.addEventListener('scroll', handleScroll);
        disableScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.style.overflow = 'auto'; // Re-enable scrolling on unmount
        };
    }, [isVisible, hasShownPopup]);

    return (
        <>
            {isVisible && (
                <div style={overlayStyle}>
                    <div style={popupStyle}>
                        <button style={closeButtonStyle} onClick={() => setIsVisible(false)}>
                            &times;
                        </button>
                        <div style={contentStyle}>
                            <h3 style={titleStyle}>Hold up! Grab this</h3>
                            <p style={subtitleStyle}>Special bonus!</p>
                            <img
                                src={data?.image}// Replace with the actual image path
                                alt="Salad Bowl"
                                style={imageStyle}
                            />
                            <button
                                style={buttonStyle}
                                onClick={() => window.open(`${data?.bonusLink}`, "_blank", "noopener,noreferrer")}
                            >
                                Get Bonus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

// Styles
const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
};

const popupStyle = {
    position: 'relative',
    backgroundColor: '#e6f4f1',
    borderRadius: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    width: '300px',
    padding: '20px',
    textAlign: 'center',
    zIndex: 1001,
};

const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
};

const contentStyle = {
    padding: '20px',
};

const titleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
};

const subtitleStyle = {
    fontSize: '14px',
    color: '#666',
    marginBottom: '20px',
};

const imageStyle = {
    width: '100%',
    height: 'auto',
    marginBottom: '20px',
};

const buttonStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#b2dfdb',
    color: '#000',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
};

export default ScrollPopup;