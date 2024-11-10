import {useState} from "react";
import Spinner from "./Spinner";

const Modal = ({rank, feedback, handle_click, title, story, user}) => {
    const [error, set_error] = useState("");
    const [loading, set_loading] = useState(false);

    let score = ""
    if (rank === 1){
        score = "Shadow Tales; ranking of 1 (The queen of hearts is not impressed)"
    }else if (rank === 2){
        score = "Whispered Warnings; ranking of 2 (The queen of hearts thinks your story telling is weak)"
    }else if (rank === 3){
        score = "Cursed Relics; ranking of 3 (The queen of hearts thinks this is just okay)"
    }else if (rank === 4){
        score = "Demonic Encounters; ranking of 4 (The queen of hearts thinks its pretty good)"
    }else{
        score = "Eldritch Horrors; ranking of 5 (The queen of hearts thinks this is great)"
    }

    const on_submit = async () => {
        set_loading(true);
        const response = await fetch("http://localhost:8080/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({rank: score, title: title, story: story, user: user})
        });

        const data = await response.json();

        set_loading(false);
        if ("error" in data){
            set_error(data.error);
        }else{
            set_error("");
            handle_click(false);
        }
    }

    return (
        <>
            {loading && <Spinner />}
            <div className = "position-fixed d-flex justify-content-center vh-100 vw-100" style = {{backgroundColor: "rgba(0, 0, 0, .5)"}}>
                <div className = "w-75 h-75 bg-black rounded-5 mt-5 overflow-auto">
                    <div className = "p-3 px-5">
                        {error.length > 0 &&  <div className="alert alert-danger" role = "alert"> {error} </div>}
                        <div className="d-flex justify-content-between">
                            <h1> The judge has spoken </h1>
                            <button className = "btn bi bi-arrows-angle-contract" style = {{color: "white"}} onClick={() => handle_click(false)}> </button>
                        </div>
                        <h3> Here are your results:</h3>
                        <h4> You have received a score of: {score}</h4>
                        <h4> {feedback} </h4>
                        <div className = "w-100 d-flex justify-content-end">
                            <button className = "btn btn-outline-light" onClick={on_submit}> Submit anyways </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;