import React, { Component } from 'react'
import NewsItem from './NewsItem';

export class News extends Component {
    render() {
        return (
            <div className='container my-3'>
                <h2>
                    NewMonke - Top headlines
                </h2>
                <div className="row">
                    <div className="col-md-4">
                        <NewsItem title='hehehe' description='i gotcha' />
                    </div>
                    <div className="col-md-4">
                        <NewsItem title='hehehe' description='i gotcha homie' />
                    </div>
                    <div className="col-md-4">
                        <NewsItem title='hehehe' description='i gotcha homie' />
                    </div>
                </div>
            </div>

        )
    }
}


export default News;