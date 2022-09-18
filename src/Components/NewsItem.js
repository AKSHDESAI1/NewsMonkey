import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, description, urlToImage, url, author, publishedAt, source } = this.props;
        return (
            <div className="card my-3 mx-auto" style={{ width: "18rem" }}>
                <img src={urlToImage} className="card-img-top" alt="news pic" />
                <div className="card-body">
                    <h5 className="card-title">{title}... <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ right: "-20%" }}>
                        {source} </span></h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">Last updated by {author} on {new Date(publishedAt).toGMTString()}</small></p>
                    <a href={url} rel="noreferrer" target="_blank" className="btn btn-danger">Read More</a>
                </div>
            </div>
        )

    }
}
