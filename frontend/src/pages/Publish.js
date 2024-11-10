import {useState} from "react";
import Modal from "../components/Modal";
import Spinner from "../components/Spinner";

const Publish = () => {
    const [title, set_title] = useState("");
    const [story, set_story] = useState("");
    const [feedback, set_feedback] = useState("");
    const [rank, set_rank] = useState(0);
    const [fix_bool, set_fix_bool] = useState(false);
    const [error, set_error] = useState("");
    const [loading, set_loading] = useState(false);

    const on_submit = async () => {
        if (title.length < 8){
            set_error("Titles must be at least 8 characters");
            return;
        }else if (story.length < 500){
            set_error("Stories must be at least 500 characters");
            return;
        } else if (story.length > 3000 || title.length > 100){
            set_error("Story length cannot exceed 3000 characters and title length cannot exceed 100 characters");
            return;
        }

        set_loading(true);
        const response = await fetch("http://localhost:8080/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({story})
        })

        let judge_verdict = await response.json();

        set_loading(false);

        if ("error" in judge_verdict){
            set_error(judge_verdict.error);
        }else{
            judge_verdict = JSON.parse(judge_verdict.response);
            set_error("");
            set_rank(judge_verdict["rank"]);
            set_feedback(judge_verdict["feedback"]);
            set_fix_bool(true);
        }

    };

    return (
        <>
            {loading && <Spinner />}
            { fix_bool && <Modal rank = {rank} feedback = {feedback} handle_click={set_fix_bool} story={story} title={title}/>}
            <div className="w-100 h-100 px-5 mt-0 pt-0 mt-md-5 pt-md-5">
                <div className="row w-100 h-100">
                    <div className="col-12 col-md-6 pt-3">
                        <div className="container-fluid d-flex justify-content-center">
                            <h2> Create your own horror stories </h2>
                        </div>
                        <div className="container-fluid d-flex justify-content-center">
                            <h5> Our AI will analyze your horror story and automatically rate its scariness on a scale from 1 (least scary) to 5 (most scary).
                                The AI leverages RAG (Retrieval-Augmented Generation) results from past data to evaluate factors such as suspense,
                                fear, and tension for an accurate score. </h5>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 pb-5">
                        <div className = "w-100 bg-black p-3 px-5 rounded-2">
                            {error.length > 0 &&  <div className="alert alert-danger" role = "alert"> {error} </div>}
                            <div className = "w-100">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title"
                                           placeholder="Enter the title of your tale" onChange = {(e) => set_title(e.target.value)}></input>
                                </div>
                                <div className="mb-3 w-100">
                                    <label className="form-label">Type out your tale</label>
                                    <textarea className="form-control" rows="10" onChange = {(e) => set_story(e.target.value)}></textarea>
                                </div>
                            </div>
                            <div className = "w-100 d-flex justify-content-end">
                                <button className = "btn btn-outline-light" onClick = {on_submit}> Judge </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Publish;