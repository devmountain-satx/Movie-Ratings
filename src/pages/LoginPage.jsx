import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm.jsx';

export default function LoginPage() {
    const navigate = useNavigate();
    const handleLogin = async (e, formData) => {
        e.preventDefault();

        const res = await axios.post('/api/auth', formData);

        if (res.data.success) {
            navigate('/me');
        }
    };

    return (
        <>
            <div className="login-container">
                <div className="login-text">
                    <h2>
                        Illuminates the path for generations yet unborn
                    </h2>
                    <p>
                        Leave your enduring testament to the profound impact that movies have on humanity's collective soul, and their significance echoes through the corridors of time, guiding future generations of moviegoers towards a world of endless wonder and untold tales
                    </p>
                </div>
                <div className="login-form">
                    <LoginForm onLogin={handleLogin} />
                </div>
            </div>
        </>
    );
}