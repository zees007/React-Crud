
import React from "react"
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus} from "@fortawesome/free-solid-svg-icons";



const TaskList = (props) => {

    return (
        props.taskList.map((val, idx) => {
            let achievementPara = `achievementPara-${idx}`;
            return (
                <tr key={val.index}>
                    <td>
                        <input type="text" name="achievementPara" placeholder="Enter Achievement point.." data-id={idx} id={achievementPara} className="form-control " />
                    </td>

                    <td>
                        {
                            idx===0?<button onClick={()=>props.add()} type="button" className="btn btn-primary text-center"><FontAwesomeIcon icon={faPlus}/></button>
                                : <button className="btn btn-danger" onClick={(() => props.delete(val))} ><FontAwesomeIcon icon={faMinus}/></button>
                        }
                    </td>
                </tr >
            )
        })
    )
};
export default TaskList
