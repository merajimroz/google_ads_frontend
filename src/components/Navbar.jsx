
import { Link } from "react-router-dom"
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom"
import Button from '@mui/material/Button'

import AllegiantLogo from '../assets/allegiant.png'
import "./components.css"

const Navbar = () => {
    const [token, setToken, removeToken] = useCookies(['token'])
    const navigate = useNavigate()

    const handleLogout = () => {
        removeToken('token')
        navigate('/login')
    }

    return (
        <div className="navbar" style={{ backgroundColor: 'white', borderBottom: '2px solid rgb(19, 57, 120)' }}>
            <div className="brand_name">
                <Link to="/" className="brand" href="/#">
                    <img src={AllegiantLogo} alt="Allegiant Global" width="60%" height="auto"></img>
                </Link>
            </div>
                <div className="items_wrapper" id="navbarResponsive" align='center'>
                    <ul className="items">
                        <li className="nav-item">
                            <Link to="/" className="nav-link" activeClassName="nav-link--active" aria-current="page" href="/#" >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/googleads" className="nav-link" href="/#" activeClassName="nav-link--active">
                                Google Ads
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link" href="/#" activeClassName="nav-link--active" >
                                About
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* if there is a cookie called 'mytoken', then show Logout because user is logged in, 
                if not show Login/Register */}
              
                    <div className="logout">
                       <Button variant='outlined' color='primary' onClick={handleLogout}>Logout</Button>
                    </div> 
        </div>
    )
}

export default Navbar