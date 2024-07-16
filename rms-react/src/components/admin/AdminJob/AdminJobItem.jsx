import React, { useState } from "react";
import { Link } from "react-router-dom";
import sampleIcon from '../../../assets/images/default.png'

const AdminJobItem = ({index, id, title, type, slug, icon, status, company}) => {
    const [dropdownState, setDropdownState] = useState(false)

    const toggleDropdown = () => {
        let dropdown = document.getElementsByClassName('job__wrapper__card--right__dropdown')[index];
        if (dropdownState) {
            dropdown.style.display = 'none';
        }else {
            dropdown.style.display = 'block';
        }

        setDropdownState(!dropdownState);
    }

    return (
        // <div className="job__wrapper__card">
        //     <div className="job__wrapper__card--left">
        //         <img src={ icon } alt="icon" />
        //     </div>
        //     <div className="job__wrapper__card--line"></div>
        //     <div className="job__wrapper__card--right">
        //         <div className="job__wrapper__card--right__part-1">
        //             <h1>{title}</h1>
        //             <p>{job}</p>
        //             <Link className={type === "full time" ? "full-time" : "half-time"} to={`/job-details/${slug}`}>{type}</Link>
        //         </div>
        //         <div className="job__wrapper__card--right__part-2">
        //             <i className="fa fa-heart-o"></i>
        //         </div>
        //     </div>
        // </div>
        <div className="job__wrapper__card">
            <div className="job__wrapper__card--left">
                <img src={ icon } alt="icon" />
            </div>
            <div className="job__wrapper__card--line"></div>
            <div className="job__wrapper__card--right">
                <div className="job__wrapper__card--right__part-1">
                    <h1>{title}</h1>
                    <p>{company.name}</p>
                    <Link className={status === "active" ? "full-time" : "half-time"} to={`/job-details/${slug}`}>{status} - {type}</Link>
                </div>
                <div className="job__wrapper__card--right__part-2">
                    <i className="fa fa-caret-down" onClick={toggleDropdown}></i>
                </div>
                <ul className="job__wrapper__card--right__dropdown">
                    <li>
                        <button type="button"  className="job__wrapper__card--right__dropdown_item"><i className="fa fa-pencil fa-fw"></i><span>Edit</span></button>
                    </li>
                    <li>
                        <button type="button"  className="job__wrapper__card--right__dropdown_item"><i className="fa fa-trash-o fa-fw"></i><span>Delete</span></button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default AdminJobItem