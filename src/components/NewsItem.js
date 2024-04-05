import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl } = this.props;
        return (
            <div className="card h-100">
                <img src={imageUrl ? imageUrl : "https://th.bing.com/th/id/OIP.0dzPl0BUoR9sKlirIPvhBAHaEb?w=322&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7"} className="card-img-top" alt="..." />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark mt-auto">Read more</a>
                </div>
            </div>
        )
    }
}

export default NewsItem;