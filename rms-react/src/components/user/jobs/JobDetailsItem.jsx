import React from 'react'
import { Link } from 'react-router-dom'

const JobDetailsItem = () => {
    return (
        <section className="details_info">
            <div className="container">
                <div className="row">
                    <div className="left">
                        <h1>Job Description</h1>
                        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas unde ex nam at incidunt impedit, vero accusamus obcaecati eaque delectus similique harum et, quia adipisci aliquid. Ex officiis accusantium at assumenda aperiam vel laudantium iste! Neque ab iste quod nobis consectetur molestiae tempore architecto illo! Fuga asperiores vitae quos esse, nihil expedita neque quam maiores cum eius praesentium iure recusandae. Tempore dolore cum quisquam eius distinctio excepturi voluptatum consequuntur laboriosam magnam enim reprehenderit, laborum itaque consequatur aliquam ab impedit, ipsum, placeat eos non architecto inventore illum quas. Dicta ipsa sint delectus culpa tempora magni ipsam voluptatem et excepturi unde aliquid voluptatibus, voluptates neque provident rerum, expedita quaerat, quidem facilis? Mollitia molestias reiciendis inventore perspiciatis est illo. Incidunt dolorem quam officiis mollitia non ab! Eius, ipsum aspernatur alias impedit culpa blanditiis ipsa voluptate mollitia dolorem tenetur. Accusantium maiores perferendis impedit odio illum rerum soluta, reprehenderit accusamus fuga dolore sequi id! Maxime ad quibusdam unde dicta impedit fuga! Quam perspiciatis aspernatur eius culpa alias obcaecati quibusdam vitae quod perferendis ad modi iusto quis ipsa dolorem, ullam aliquam nobis dicta? Perferendis sapiente eius temporibus quasi nostrum itaque autem id dolorum nobis magni esse minima saepe repellendus sunt maiores amet odit veritatis, a odio. Quasi magnam saepe enim! Nisi, dignissimos. Enim exercitationem sapiente excepturi laudantium architecto delectus, expedita rem nobis, eaque saepe placeat est recusandae laboriosam vero reprehenderit magni aut nulla. Odio vitae quibusdam nobis totam tenetur quod, maxime repellendus, eveniet, molestias dolorum assumenda quasi maiores eius nostrum? Sed itaque perspiciatis sint recusandae non?</div>
                        <Link className='button' to='/'>Apply Job</Link>
                    </div>
                    <div className="right">
                        <h1>Job Location</h1>
                        <div className="location-map">Map will be rendered here</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default JobDetailsItem