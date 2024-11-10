import Categories from "../components/Categories";
import {useEffect, useState} from "react";
import NoSelection from "../components/NoSelection";


const Main = () => {
    const [data, set_data] = useState([]);
    const [selected_story, set_selected_story] = useState();
    console.log(selected_story);

    useEffect(() => {
        const get_data = async () => {
            const response = await fetch("http://localhost:8080/retrieve_stories", {
                method: "GET"
            });

            const data = (await response.json()).stories;
            set_data(data);
        }

        get_data();
    }, [])

    return (
        <div className = "row h-100 overflow-y-auto">
            <div className = "col-12 col-lg-3 mt-2 ps-0 ps-lg-5 " style = {{paddingBottom: "4.5rem"}}>
                {
                    data.map((value, index) => {
                        const _id = index.toString();
                        const target_id = `#${index}`;
                        const name = value.category.substring(0, value.category.indexOf(";"));

                        return <div key = {index} className = "row">
                            <Categories target_id={target_id} _id={_id} name = {name} data = {value} set_selected_story={set_selected_story}/>
                        </div>
                    })
                }

            </div>
            <div className = "col-12 col-lg-9 d-flex justify-content-center mt-2">
                <div className = "rounded-2 bg-black w-100" style = {{height: "39rem", backgroundImage: "url('/bg.jpg')", backgroundRepeat: "no-repeat", position: "sticky", top: "10px"}}>
                    <div className = "w-100 h-100 d-flex justify-content-center align-items-center pb-5 rounded-2" style = {{backgroundColor: "rgba(0, 0, 0, .75)"}}>
                        {
                            !selected_story ? <NoSelection /> : <div className="h-100 overflow-y-auto pt-5">
                                <div className = "d-flex justify-content-center">
                                    <h2> {selected_story["title"]} </h2>
                                </div>
                                <div className = "d-flex justify-content-center px-5">
                                    <h5> {selected_story["story"]} </h5>
                                </div>

                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;