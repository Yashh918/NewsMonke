import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';


export class News extends Component {
    constructor() {
        super();
        // console.log("Hello, this is a constructor from news class");
        this.state = {
            data: null,
            loading: false,
            page: 1,
            pageSize : 9
        }
    }

    // componentDidMount() {
    //     let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=72b0f94439d9432fb4e9272229db1330";
    //     fetch(url).then((res) => {
    //         res.json().then((result) => {
    //             console.log(result.articles)
    //             this.setState({data: result.articles})
    //         })
    //     })
    // }

    
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=72b0f94439d9432fb4e9272229db1330&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let res = await fetch(url);
        let result = await (res.json());
        console.log(result.articles);
        this.setState({
            page: this.state.page,
            data: result.articles ,
            loading: false
        })

    }

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=72b0f94439d9432fb4e9272229db1330&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let res = await fetch(url);
        let result = await (res.json());       
        this.setState({
            page: this.state.page-1,
            data: result.articles ,
            loading: false
        })
    }
    
    handleNextClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=72b0f94439d9432fb4e9272229db1330&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let res = await fetch(url);
        let result = await (res.json());       
        this.setState({
            page: this.state.page+1,
            data: result.articles,
            loading: false 
        })
    }


    render() {
        return (
            <>
                <div className='container my-3'>
                    <h2 className='text-center p-3'>
                        NewMonke - Top headlines
                    </h2>
                    {this.state.loading && <Spinner/>}

                    <div className="row row-cols-3 row-cols-md-2 g-4 p-3">
                        {!this.state.loading && this.state.data ? this.state.data.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                            </div>
                        }) : null}
                    </div>
                </div>
                <div className="d-flex justify-content-around p-3">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Prev</button>
                    <button disabled={this.state.page >= this.state.totalResults/this.props.pageSize} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </>
        )
    }
}


export default News;