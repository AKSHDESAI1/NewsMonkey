import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
    cap = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1,)
    }

    constructor(props) {
        super(props);
        this.state = {
            arr1: [],
            arr2: [],
            start: 0,
            end: 5,
            totalResults: 0,
            loading: true
        }
        document.title = `${this.cap(this.props.category)} News -  Aksh Desai`
    }

    articles = [
        {
            "source": {
                "id": null,
                "name": "Livemint"
            },
            "author": "Livemint",
            "title": "Long Covid More Severe In Women Than Men, Suggests Study - Mint",
            "description": "The study found that 91% of patients, who were followed up for five months on average, continued to experience Covid-19 symptoms. Breathlessness was the most common symptom of long Covid-19, followed by fatigue",
            "url": "https://www.livemint.com/news/india/long-covid-more-severe-in-women-than-men-suggests-study-11650538683775.html",
            "urlToImage": "https://images.livemint.com/img/2022/04/21/600x338/long_covid_symptoms_1650540839356_1650540839488.jpg",
            "publishedAt": "2022-04-21T11:37:19Z",
            "content": "Post-coronavirus complications, also called long Covid syndrome, induce more symptoms in women than men, a new study has found. \r\nThe new research, published in the Journal of Women's Health, reveale… [+2402 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "The European Scientist"
            },
            "author": "Alex Reis",
            "title": "Air pollution increases risk of getting COVID-19 in young adults - The European Scientist",
            "description": "Exposure to air pollutants increases the risk of a COVID infection in young adults, according to a study published in the scientific journal JAMA Network Open.",
            "url": "https://www.europeanscientist.com/en/environment/air-pollution-increases-risk-of-getting-covid-19-in-young-adults/",
            "urlToImage": "https://www.europeanscientist.com/wp-content/uploads/2022/04/46385A43-4ABE-46E7-8556-37B944126F7F.jpeg",
            "publishedAt": "2022-04-21T11:22:43Z",
            "content": "Exposure to air pollutants increases the risk of a COVID infection in young adults, according to a study published in the scientific journal JAMA Network Open.\r\nAs pollutants can increase the risk of… [+2206 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Thewire.in"
            },
            "author": "Prakash Nagarkatti and Mitzi Nagarkatti",
            "title": "Why We Can't 'Boost' Our Way Out of the COVID-19 Pandemic in the Long Term – The Wire Science - The Wire Science",
            "description": "While current vaccines are effective at preventing severe disease, the next phase of vaccine development will need to focus on triggering long-lived antibody response.",
            "url": "https://science.thewire.in/health/we-cannot-boost-our-way-out-of-covid-19-pandemic-in-long-term/",
            "urlToImage": "https://cdn.thewire.in/wp-content/uploads/2022/04/21164421/2022-04-13T080134Z_1_LYNXNPEI3C09C_RTROPTP_4_HEALTH-CORONAVIRUS-TAIWAN-scaled.jpg",
            "publishedAt": "2022-04-21T11:20:35Z",
            "content": "A woman receives a booster shot of a COVID-19 vaccine at Taipei main station, Taiwan, January 24, 2022. Photo: Reuters/Ann Wang/File Photo\r\n<ul><li>mRNA vaccines have failed to provide long-term prot… [+7979 chars]"
        }
    ]

    async componentDidMount() {
        this.props.setProgress(10);
        console.log("news cdm");
        let url = `https://saurav.tech/NewsAPI/top-headlines/category/${this.props.category}/in.json`;
        let res = await fetch(url);
        this.props.setProgress(60);
        let data = await res.json();
        await this.setState({
            arr1: data.articles.slice(this.state.start, this.state.end + 1),
            loading: false,
            totalResults: data.totalResults
        })
        this.props.setProgress(100);
        console.log('aksh', this.state.arr1);
    }

    fetchMoreData = async () => {
        await this.setState({
            start: this.state.start + 6,
            end: this.state.end + 6
        })
        console.log("fetchmoredata");
        let url = `https://saurav.tech/NewsAPI/top-headlines/category/${this.props.category}/in.json`;
        let res = await fetch(url);
        let data = await res.json();
        await this.setState({
            arr1: this.state.arr1.concat(data.articles.slice(this.state.start, this.state.end + 1)),
            loading: false,
            totalResults: data.totalResults
        })
    }

    render() {
        console.log("this.state.arr1.length", this.state.arr1.length)
        console.log("this.state.totalResults", this.state.totalResults);
        return (
            <>
                <div className="container">
                    <h1 className='text-center'>Aksh Desai - Top Headlines( {this.cap(this.props.category)} )</h1>
                    {this.state.loading && <Spinner />}

                    <InfiniteScroll
                        dataLength={this.state.arr1.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.arr1.length+1 <= this.state.totalResults}
                        loader={<Spinner />}
                    >
                        <div className="container">
                            <div className="row">
                                {this.state.arr1.map((item, index) => {
                                    return <div className="col-md-4" key={index}>
                                        <NewsItem title={item.title ? item.title.slice(0, 25) : "Aksh Desai"} description={item.description ? item.description.slice(0, 80) : "Welcome to Aksh Desai Youtube Channel"} author={item.author ? item.author : "Aksh Desai"} urlToImage={item.urlToImage ? item.urlToImage : "https://i.ytimg.com/vi/B2d-7LDA0BY/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDcpjdXUDC_0CG7lkBkTe1xPxSmaQ"} url={item.url ? item.url : "https://www.youtube.com/c/ULTIMATEPROGRAMMING"} publishedAt={item.publishedAt ? item.publishedAt : "2022-04-21T11:22:43Z"} source={item.source ? item.source.name : 'Aksh Desai'} />
                                    </div>
                                })}
                            </div>
                        </div>
                    </InfiniteScroll>
                </div>
            </>
        )
    }
}
