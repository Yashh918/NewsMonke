import React, { useEffect, useState} from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

let News = (props) => {
    let [data, setData] = useState([])
    let [loading, setLoading] = useState(false)
    let [page, setPage] = useState(1)
    let [pageSize, setPageSize] = useState(9)
    let [totalResults, setTotalResults] = useState(0)
    

    let capitalizeFirst = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    document.title = `${capitalizeFirst(props.category)} - NewsMonke`;

    // both async,,,await and promises methods work just fine
    // async componentDidMount() {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${state.page}&pageSize=${props.pageSize}`;
    //     setState({loading: true});
    //     let res = await fetch(url); 
    //     let result = await (res.json());
    //     console.log(result.articles);
    // setState({
    //     page: state.page,
    //     totalResults: result.totalResults,
    //     data: result.articles ,
    //     loading: false
    // })
    // }

    let updateNews = () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        fetch(url).then((res) => {
            props.setProgress(30);
            res.json().then((result) => {
                props.setProgress(40);
                console.log(result.articles);
                console.log(result.totalResults);
                setTotalResults(result.totalResults)
                setData(result.articles)
                setLoading(false)
            })
            props.setProgress(100);
        })
        
    }

    useEffect(() => {
      updateNews();
    }, [])

    let handlePrevClick = () => {
        setPage(--page, () => {updateNews()})
    }

    let handleNextClick = () => {
        setPage(++page, () => {updateNews()})
    }

    let fetchMoreData = () => {
        setPage(++page)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        fetch(url).then((res) => {
            props.setProgress(10);
            res.json().then((result) => {
                props.setProgress(30);
                console.log(result.articles);
                console.log(result.totalResults);
                setTotalResults(result.totalResults)
                setData(data.concat(result.articles))
                setLoading(false)
            })
            props.setProgress(100);
        })

    }


   
        return (
            
                <div className='container my-3'>
                    <h2 className='text-center p-3'>
                        NewsMonke - Top {capitalizeFirst(props.category)} headlines
                    </h2>

                    {loading && <Spinner/>}

                    <InfiniteScroll
                        dataLength={data.length}
                        next={fetchMoreData}
                        hasMore={data.length !== totalResults}
                        loader={<Spinner/>}
                    >
                        <div className="row row-col-3 g-4 p-3">
                            {data ? data.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            }) : null}
                        </div>
                    </InfiniteScroll>
                </div>
            
        )
    
}

News.defaultProps = {
    country: 'in',
    pageSize: '9',
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    catergory: PropTypes.string
}

export default News;