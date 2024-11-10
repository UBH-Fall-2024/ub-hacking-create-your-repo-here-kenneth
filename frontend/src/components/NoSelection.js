const NoSelection = () => {
    return (
            <div>
                <div className = "d-flex justify-content-center">
                    <h2> Pick your poison </h2>
                </div>
                <div className = "d-flex justify-content-center px-2">
                    <h5> Pick a horror story on the left hand side. As you go down the rabbithole, the stories get scarier </h5>
                </div>
                <div className = "d-flex justify-content-center px-2">
                    <h5> As you go down from shadow tales to eldritch horrors, the stories get scarier</h5>
                </div>
                <div className = "d-flex justify-content-center px-4">
                    <h5> You want to spook someone? Add your own stories here.</h5>
                </div>
                <div className = "d-flex justify-content-center">
                    <button className = "btn btn-outline-light" onClick = {() => window.location.href = "http://localhost:8080/publish"}> Start writing </button>
                </div>
            </div>
    )
}

export default NoSelection;