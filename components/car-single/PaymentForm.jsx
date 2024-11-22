import React, { forwardRef, useState } from 'react';

const PaymentForm = forwardRef((props, ref) =>{
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [securityCode, setSecurityCode] = useState('');
    const [buttonHover, setButtonHover] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Ajoutez des validations simples ici
        if (cardNumber.length < 16) {
            alert("Le numéro de carte doit contenir 16 chiffres.");
            return;
        }

        if (!/^\d{2}\/\d{2}$/.test(expirationDate)) {
            alert("Veuillez entrer une date d'expiration valide (mm/aa).");
            return;
        }

        // console.log('Données de paiement:', {
        //     cardNumber,
        //     expirationDate,
        //     securityCode,
        // });
    };

    // Styles en ligne
    const formStyle = {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    };

    const titleStyle = {
        textAlign: 'center',
        color: '#333',
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    };

    const buttonStyle = {
        width: '100%',
        padding: '10px',
        backgroundColor: buttonHover ? ' rgb(40, 24, 97)' : '#2c2c74',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    return (
        <div ref={ref} className="border-top-light mt-40 pt-40 mb-40">
            <div style={formStyle}>
                <h5>Données de Paiement</h5>
                <div className="border-top-light mt-10 pt-10 mb-10"></div>
                <p></p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="cardNumber" style={labelStyle}>N° de carte</label>
                        <input
                            type="text"
                            id="cardNumber"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            required
                            style={inputStyle}
                            maxLength={16} // Limite la saisie à 16 chiffres
                        />
                    </div>
                    <div>
                        <label htmlFor="expirationDate" style={labelStyle}>Date d&apos;expiration (mm/aa)</label>
                        <input
                            type="text"
                            id="expirationDate"
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                            required
                            placeholder="mm/aa"
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label htmlFor="securityCode" style={labelStyle}>Code de sécurité</label>
                        <input
                            type="password" // Utiliser password pour le code de sécurité
                            id="securityCode"
                            value={securityCode}
                            onChange={(e) => setSecurityCode(e.target.value)}
                            required
                            style={inputStyle}
                        />
                    </div>
                    <button 
                        type="submit" 
                        style={buttonStyle} 
                        onMouseEnter={() => setButtonHover(true)} 
                        onMouseLeave={() => setButtonHover(false)}
                    >
                        Payer en ligne maintenant
                    </button>
                </form>
            </div>
        </div>
    );
});
PaymentForm.displayName = "PaymentForm"; // Add this line
export default PaymentForm;
