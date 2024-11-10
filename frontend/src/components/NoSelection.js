const NoSelection = () => {
    return (
            <div>
                <div className = "d-flex justify-content-center">
                    <h2> Pick your poison </h2>
                </div>
                <div className = "d-flex justify-content-center px-2">
                    <h5> Pick a horror story on the left hand side. As you go down the rabbithole (top to bottom), the stories get scarier ... </h5>
                </div>
                <div className = "d-flex justify-content-center px-4">
                    <h5> You want to spook someone? Add your own stories here.</h5>
                </div>
                <div className = "d-flex justify-content-center">
                    <button className = "btn btn-outline-light" onClick = {() => window.location.href = "http://localhost:3000/publish"}> Post here </button>
                </div>

            </div>
    )
}

export default NoSelection;