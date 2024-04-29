import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: '9',
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        catergory: PropTypes.string
    }

    capitalizeFirst = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            page: 1,
            pageSize: 9,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirst(this.props.category)} - NewsMonke`;
    }

    // both async,,,await and promises methods work just fine
    // async componentDidMount() {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=72b0f94439d9432fb4e9272229db1330&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading: true});
    //     let res = await fetch(url); 
    //     let result = await (res.json());
    //     console.log(result.articles);
    // this.setState({
    //     page: this.state.page,
    //     totalResults: result.totalResults,
    //     data: result.articles ,
    //     loading: false
    // })
    // }

    updateNews = () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=72b0f94439d9432fb4e9272229db1330&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        fetch(url).then((res) => {
            res.json().then((result) => {
                console.log(result.articles);
                console.log(result.totalResults);
                this.setState({
                    totalResults: result.totalResults,
                    data: result.articles,
                    loading: false
                })
            })
        })
    }

    componentDidMount() {
        this.updateNews();
    }

    handlePrevClick = () => {
        this.setState({ page: --this.state.page }, () => { this.updateNews() })
    }

    handleNextClick = () => {
        this.setState({ page: ++this.state.page }, () => { this.updateNews() })
    }

    fetchMoreData = () => {
        this.setState({ page: ++this.state.page })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=72b0f94439d9432fb4e9272229db1330&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        fetch(url).then((res) => {
            res.json().then((result) => {
                console.log(result.articles);
                console.log(result.totalResults);
                this.setState({
                    totalResults: result.totalResults,
                    data: this.state.data.concat(result.articles),
                    loading: false
                })
            })
        })

    }


    render() {
        return (
            <>
                <div className='container my-3'>
                    <h2 className='text-center p-3'>
                        NewsMonke - Top {this.capitalizeFirst(this.props.category)} headlines
                    </h2>

                    {this.state.loading && <Spinner/>}

                    <InfiniteScroll
                        dataLength={this.state.data.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.data.length !== this.state.totalResults}
                        loader={<Spinner/>}
                    >
                        <div className="row row-col-3 g-4 p-3">
                            {this.state.data ? this.state.data.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            }) : null}
                        </div>

                    </InfiniteScroll>
                </div>
            </>
        )
    }
}


export default News;