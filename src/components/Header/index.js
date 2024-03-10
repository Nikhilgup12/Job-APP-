import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsFillHouseDoorFill} from 'react-icons/bs'
import {FaBriefcase} from 'react-icons/fa'
import {IoIosLogOut} from 'react-icons/io'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <>
      <nav className="nav-container">
        <div className="nav-content">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="nav-logo"
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu">
            <li>
              <Link to="/" className="nav-item">
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="nav-item">
                Jobs
              </Link>
            </li>
          </ul>
          <button
            className="nav-logout-btn"
            onClick={onClickLogout}
            type="button"
          >
            Logout
          </button>
          <ul className="nav-menu-mobile">
            <li>
              <Link to="/" className="nav-item-mobile">
                <BsFillHouseDoorFill />
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="nav-item-mobile">
                <FaBriefcase />
              </Link>
            </li>
            <li className="nav-item-mobile">
              <IoIosLogOut onClick={onClickLogout} />
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default withRouter(Header)
