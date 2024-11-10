const Categories = ({target_id, _id, name, data, set_selected_story}) => {
    return (
        <>
            <button className="navbar-toggler rounded-2" type="button" data-bs-toggle="collapse"
                    data-bs-target={target_id} aria-controls="navbarNavDropdown" aria-expanded="false"
                    aria-label="Toggle navigation" style = {{backgroundColor: "rgba(0, 0, 0, .5)", border: "1px solid black"}}>
                <h2 className = "p-2"> {name} </h2>
            </button>

            <div className="collapse navbar-collapse" id={_id} style = {{backgroundColor: "rgba(0, 0, 0, .25)"}}>
                {
                    data["stories"].length === 0 && <div className="container-fluid p-0 d-flex justify-content-center my-1"><h4 className = "p-0 m-0"> No stories at the moment </h4></div>
                }
                {
                    data["stories"].map((value, index) => <div onClick = {() => set_selected_story(value)} key={index} className="container-fluid p-0 my-1 d-flex justify-content-center">
                        <h4 className = "p-0 m-0" id="nav-text"> {value.title} </h4>
                    </div>)
                }
            </div>
        </>
    )
}

export default Categories;