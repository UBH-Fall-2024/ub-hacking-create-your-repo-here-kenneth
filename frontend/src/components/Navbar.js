import {useEffect} from "react";

const Navbar = () => {

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
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;