import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const axiosTest = () => {
        console.log('test')
    }
    const handleHomeClick = () => {
        navigate('/');
    }
    const navigate = useNavigate();

    return (
        <header className="header">
            <h1 className="header_logo" onClick={handleHomeClick}><span>STUDY</span>CAFE</h1>
            <h2 onClick={axiosTest}>1호점</h2>
        </header>
    )
}

export default Header;