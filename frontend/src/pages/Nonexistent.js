const Nonexistent = () => {
    return (
        <div className = "w-100 h-50 mt-5" style = {{backgroundImage: "url('/404.gif')", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
            <div className = "container-fluid d-flex justify-content-center vh-100 align-items-center pt-5">
                <h1 style = {{fontSize: "50px"}}> 404 NOT FOUND </h1>
            </div>
        </div>
    )
}

export default Nonexistent;