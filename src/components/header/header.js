import { withRouter } from "react-router";
import { Link, NavLink } from "react-router-dom";
import React, { useState, useEffect, Fragment } from "react";
import styles from './header.module.scss'
import userService from "../../services/user-service"

const Header = ({ match, history }) => {

    const { params: { searchQuery } } = match
    const [search, setSearch] = useState(searchQuery || '')
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        userService.profile()
            .then((currentUser) => {
                setCurrentUser(currentUser)
            })
    }, [history, history.location])

    const searchRoute = () => history.push(`/search/${search}`)

    const logout = () => {
        userService.logout()
            .then(() => {
                history.push("/")
                setCurrentUser({})
            })
    }

    return (<nav className="nav navbar">
        <Link to="/" className='navbar-brand'>
            Bookify
        </Link>
        <div className={styles["nav__contents"]}>
            <form className="form-inline"
                onSubmit={searchRoute}>
                <div className={`mr-2 ${styles["search-bar__wrapper"]}`}>
                    <input className="form-control"
                        onChange={(event) => setSearch(event.target.value)}
                        value={search} />
                </div>
                <button className="btn btn-primary"
                    type="submit">
                    Search
                </button>
            </form>
            <div>
                {currentUser && currentUser.username ? <Fragment>
                    <NavLink className="btn btn-primary mr-2"
                        to="/profile"
                        activeClassName="btn-dark">
                        Profile
                </NavLink>
                    <button className="btn btn-primary"
                    onClick={logout}>
                        Logout
                </button>
                </Fragment>
                    : <NavLink className="btn btn-primary"
                        to="/login"
                        activeClassName="btn-dark">
                        Login
                </NavLink>}
            </div>
        </div>
    </nav>)
}

export default withRouter(Header);
