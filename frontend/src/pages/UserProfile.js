import {useEffect, useState} from "react";

const UserProfile = ({user}) => {
    const [post, set_posts] = useState([]);
    const [selected_post, set_selected_post] = useState(null);

    useEffect(() => {
        const get_user_posts = async () => {
            const response = await fetch("http://localhost:8080/get_user_post", {
                method: "POST",
                headers : {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({user})
            });

            const stories = await response.json();
            set_posts(stories);
        }

        if(user != null) {
            get_user_posts();
        }
    }, [user]);
    return (
        <div className="row w-100 h-100">
            <div className = "col-12 col-md-3 mt-2 ps-0 ps-md-5">
                <h1 className = "mb-0" style = {{fontSize: "50px"}}> Your tales </h1>
                <hr></hr>
                {
                   post.map((value, index) => <h4 id = "nav-text" key = {index} onClick={() => set_selected_post(post[index])}> {value.title} </h4>)
                }
            </div>
            <div className="col-12 col-md-9">
                <div className = "rounded-2 bg-black w-100 mt-2" style = {{height: "39rem", backgroundImage: "url('/profile_bg.jpg')", backgroundRepeat: "no-repeat", position: "sticky", top: "10px"}}>
                    <div className = "w-100 h-100 d-flex justify-content-center align-items-center pb-5 rounded-2" style = {{backgroundColor: "rgba(0, 0, 0, .75)"}}>
                        {
                            selected_post == null ?
                                <div>
                                    <div className = "d-flex justify-content-center">
                                        <h2> Read your tales </h2>
                                    </div>
                                    <div className = "d-flex justify-content-center px-2">
                                        <h5> Pick a horror story on the left hand side. </h5>
                                    </div>
                                    <div className = "d-flex justify-content-center px-4">
                                        <h5> Want to write some more? </h5>
                                    </div>
                                    <div className = "d-flex justify-content-center">
                                        <button className = "btn btn-outline-light" onClick = {() => window.location.href = "http://localhost:8080/publish"}> Start writing </button>
                                    </div>
                                </div>
                                :
                                <div className="overflow-y-auto">
                                    <div className = "d-flex justify-content-center">
                                        <h2> {selected_post["title"]} </h2>
                                    </div>
                                    <div className = "d-flex justify-content-center px-5">
                                        <h5> {selected_post["story"]} </h5>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;