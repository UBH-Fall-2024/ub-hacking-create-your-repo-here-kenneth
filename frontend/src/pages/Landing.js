const Landing = () => {
    return (
        <div className = "h-100 w-100" style = {{backgroundImage: "url('/landing_bg.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center"}}>
            <div className="h-100 w-100 d-flex justify-content-center align-items-center pb-5" style = {{backgroundColor: "rgb(0, 0, 0, .5)"}}>
                <div className = "pb-5 mb-5">
                    <h1 className = "d-flex justify-content-center" style = {{fontSize: "50px"}}> Welcome to Down The Rabbithole</h1>
                    <h3 className = "d-flex justify-content-center"> Jump down the rabbithole for your daily dose on horror stories </h3>
                    <div className = "d-flex justify-content-center">
                        <button className = "btn btn-outline-light" onClick = {() => window.location.href = "http://localhost:3000/stories"}> Start reading </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing;