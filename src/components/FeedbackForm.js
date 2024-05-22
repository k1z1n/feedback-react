import React, { useState } from 'react';
import axios from 'axios';
import './FeedbackForm.css';

const FeedbackForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5001/api/feedback', { email, message });
            setResponse(res.data);
        } catch (error) {
            setResponse('Ошибка отправки сообщения.');
        }
    };

    return (
        <div className="feedback-form">
            <h2>Форма обратной связи</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Сообщение:</label>
                    <textarea 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Отправить</button>
            </form>
            {response && <p>{response}</p>}
        </div>
    );
};

export default FeedbackForm;