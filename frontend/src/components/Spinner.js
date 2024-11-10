const Spinner = () => {
    return (
        <div className="position-fixed h-100 w-100 pb-5  d-flex justify-content-center align-items-center bg-secondary opacity-75">
            <div className="spinner-border mb-5" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner;