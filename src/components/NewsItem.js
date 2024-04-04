import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl } = this.props;
        return (
            <div className="card h-100">
                <img src={imageUrl ? imageUrl : "https://cdn4.iconfinder.com/data/icons/picture-sharing-sites/32/No_Image-1024.png"} className="card-img-top" alt="..." />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary mt-auto">Read more</a>
                </div>
            </div>
        )
    }
}

export default NewsItem;