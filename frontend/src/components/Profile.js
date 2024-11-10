const Profile = ({user}) => {
    console.log(user);
    return (
        <>
            <div className="ms-2 dropdown">
                {
                    user == null ? <button className="btn btn-outline-light mt-1" onClick={() => window.location.href = "http://localhost:8080/login"}> Login </button>
                        :
                        <a className="btn btn-secondary dropdown-toggle h-100 d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown"
                           aria-expanded="false">
                            {user}
                        </a>

                }

                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="/myprofile">My posts</a></li>
                    <li><a className="dropdown-item" href="http://localhost:8080/logout">Logout</a></li>
                </ul>
            </div>
        </>
    )
}

export default Profile;