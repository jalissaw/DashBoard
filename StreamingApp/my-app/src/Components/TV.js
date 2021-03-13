import React, { useState, useContext, useEffect } from 'react';
import { WatchListContext } from '../Contexts/WatchListContext'
import { SearchContext } from '../Contexts/SearchContext'
import useFetch from '../useFetch';
import Spinner from 'react-bootstrap/Spinner';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';



const TV = () => {

    const { data, loading, isErr } = useFetch([
        `https://api.themoviedb.org/3/list/7079309?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
        `https://api.themoviedb.org/3/list/7079316?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
        `https://api.themoviedb.org/3/list/7079317?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    ]);


    const [tvPoster, setTVPoster] = useState(`giphy (1).gif`);
    const [tvTitle, setTVTitle] = useState('');
    const [tvDescription, setTVDescription] = useState('');
    const { watchList, handleClick } = useContext(WatchListContext);
    const { searchInput } = useContext(SearchContext);
    const [summary, setSummary] = useState('')

    const styles = {
        backgroundImage: `url(${tvPoster})`
    };

    SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

    const stopAtPeriod = () => {
        const summary = tvDescription.split('.');

        if (summary[0].length <= 15) {

            setSummary(summary[0] + summary[1] + summary[2] + summary[3])
        } else {
            setSummary(summary[0])
        }
    }

    useEffect(() => {
        if (data) {
            stopAtPeriod()
        }
    }, [tvDescription])


    return (

        <div className='show-container'>
            {isErr && <div className="error">{isErr}</div>}
            {loading && <Spinner animation="border" variant="secondary" className="spinner" >
                <span>Loading...</span>
            </Spinner>}

            <div className='hero'>
                <div className='show-hero' style={styles}></div>
                <div className="contains-descriptions">
                    <h2 className="hero-show-title show-movie">{tvTitle}</h2>
                    <p className="hero-show-description show-movie">{summary}</p>
                </div>
            </div>

            <section className="movies">
                <h2 style={{ color: 'white', marginLeft: '20px' }}>Cartoons </h2>

                {data && <Swiper
                    spaceBetween={5}
                    slidesPerView={2}
                    width={600}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                >
                    {data && data[0].items.filter(item => {
                        if (searchInput === '') {
                            return item
                        } else if (item.original_name.toLowerCase().includes(searchInput.toLowerCase())) {

                            return <div className="filtered" >{item}</div>
                        }
                    }).map(tv =>
                        <SwiperSlide key={tv.id}>
                            <div className='movie' >
                                <img onMouseOver={() => {
                                    setTVPoster(`${"https://image.tmdb.org/t/p/original" + tv.poster_path}`);
                                    setTVTitle(tv.original_name);
                                    setTVDescription(tv.overview);
                                }}
                                    src={'https://image.tmdb.org/t/p/original' + tv.poster_path} width='250' height='300'
                                    alt='Promotional Poster For Movie'
                                />
                                <button className="watchlist-btn"
                                    onClick={() => handleClick(tv.original_name)}>
                                    {watchList.includes(tv.original_name) ?
                                        <i className="fas fa-minus-circle"></i> :
                                        <i className="fas fa-plus-circle"></i>}
                                </button>
                            </div>
                        </SwiperSlide>
                    )
                    }
                </Swiper>}
            </section>

            <section className="movies">
                <h2 style={{ color: 'white', marginLeft: '20px' }}>90s Sitcoms </h2>

                {data && <Swiper
                    spaceBetween={5}
                    slidesPerView={2}
                    width={600}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                >
                    {data && data[1].items.filter(item => {
                        if (searchInput === '') {
                            return item
                        } else if (item.original_name.toLowerCase().includes(searchInput.toLowerCase())) {

                            return <div className="filtered" >{item}</div>
                        }
                    }).map(tv =>
                        <SwiperSlide key={tv.id}>
                            <div className='movie' >
                                <img onMouseOver={() => {
                                    setTVPoster(`${"https://image.tmdb.org/t/p/original" + tv.poster_path}`);
                                    setTVTitle(tv.original_name);
                                    setTVDescription(tv.overview);

                                }}
                                    src={'https://image.tmdb.org/t/p/original' + tv.poster_path} width='250' height='300'
                                    alt='Promotional Poster For Movie'
                                />
                                <button className="watchlist-btn"
                                    onClick={() => handleClick(tv.original_name)}>
                                    {watchList.includes(tv.original_name) ?
                                        <i className="fas fa-minus-circle"></i> :
                                        <i className="fas fa-plus-circle"></i>}
                                </button>
                            </div>
                        </SwiperSlide>
                    )
                    }
                </Swiper>}
            </section>

            <section className="movies">
                <h2 style={{ color: 'white', marginLeft: '20px' }}>Popular Shows </h2>

                {data && <Swiper
                    spaceBetween={5}
                    slidesPerView={2}
                    width={600}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                >
                    {data && data[2].items.filter(item => {
                        if (searchInput === '') {
                            return item
                        } else if (item.original_name.toLowerCase().includes(searchInput.toLowerCase())) {

                            return <div className="filtered" >{item}</div>
                        }
                    }).map(tv =>
                        <SwiperSlide key={tv.id}>
                            <div className='movie' >
                                <img onMouseOver={() => {
                                    setTVPoster(`${"https://image.tmdb.org/t/p/original" + tv.poster_path}`);
                                    setTVTitle(tv.original_name);
                                    setTVDescription(tv.overview);
                                }}
                                    src={'https://image.tmdb.org/t/p/original' + tv.poster_path} width='250' height='300'
                                    alt='Promotional Poster For Movie'
                                />
                                <button className="watchlist-btn"
                                    onClick={() => handleClick(tv.original_name)}>
                                    {watchList.includes(tv.original_name) ?
                                        <i className="fas fa-minus-circle"></i> :
                                        <i className="fas fa-plus-circle"></i>}
                                </button>
                            </div>
                        </SwiperSlide>
                    )
                    }
                </Swiper>}
            </section>

        </div>
    )
}

export default TV
