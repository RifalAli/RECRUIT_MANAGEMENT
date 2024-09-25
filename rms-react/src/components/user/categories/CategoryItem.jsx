import React from 'react';
import catIcon from '../../../assets/images/default.png'
import { Link } from 'react-router-dom';

const CategoryItem = ({ name, icon, slug }) => {
    return (
        <Link to={`/categories/jobs/${slug}`} >
            <div className="category-container--card-wrapper__card">
                <img src={icon} alt="Category-icon" width="100px" height="100px"/>
                <h1>{name}</h1>
            </div>
        </Link>
    );
};

export default CategoryItem;