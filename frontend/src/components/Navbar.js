import {useEffect, useState} from "react";
import Profile from "./Profile";

const Navbar = ({user, set_user}) => {
    useEffect(() => {
        const get_user = async () => {
            let response = await fetch("http://localhost:8080/get_auth", {
                method: "GET"
            });

            const is_logged = await response.json();

            console.log(is_logged);

            if(is_logged.status === "Logged out"){
                set_user(null);
                return;
            }

            response = await fetch("http://localhost:8080/profile", {
                method: "GET"
            });

            const profile = JSON.parse(await response.json());

            set_user(profile["nickname"]);
        }

        get_user();
    }, [])
    return (
        <nav className="navbar navbar-expand-lg px-4 wonderland-theme rounded-bottom-2 bg-black">
            <div className="container-fluid">
                <a className="navbar-brand" id = "nav-text"  href="/" style = {{color: "white", fontSize: "25px"}}> DOWN THE RABBITHOLE </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse w-100" id="navbarNavDropdown">
                    <div className = "w-100 d-flex justify-content-end">
                        <ul className="navbar-nav" style = {{fontSize: "20px"}}>
                            <li className="nav-item" id = "nav-text" >
                                <a className="nav-link" href="/" style = {{color: "white"}}> Home </a>
                            </li>
                            <li className="nav-item" id = "nav-text" >
                                <a className="nav-link" href="/stories" style = {{color: "white"}}> Stories </a>
                            </li>
                            <li className="nav-item" id = "nav-text" >
                                <a className="nav-link" href="/publish" style = {{color: "white"}}> Post your own story </a>
                            </li>
                            <Profile user = {user} />
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;