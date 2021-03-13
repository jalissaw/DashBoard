import { useContext } from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { WatchListContext } from '../Contexts/WatchListContext';
import { SearchContext } from '../Contexts/SearchContext';
import 'swiper/swiper-bundle.css';

const ListTemplate = (props) => {

    const {
        data,
        genre,
        setPoster,
        setTitle,
        setDescription,
        getYTVideo
    } = props


    const { watchList, handleClick } = useContext(WatchListContext);
    const { searchInput } = useContext(SearchContext)

    SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


    return (


        <section className="movies">
            <h2 style={{ color: 'white', marginLeft: '20px' }}>{genre} </h2>
            {data && <Swiper
                spaceBetween={5}
                slidesPerView={2}
                width={600}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}

                breakpoints={{
                    480: {
                        slidesPerView: 2,
                    },
                }}
            >
                {data && data.items.filter(item => {
                    if (searchInput === '') {
                        return item
                    } else if (item.original_title.toLowerCase().includes(searchInput.toLowerCase())) {

                        return <div className="filtered" >{item}</div>
                    }
                }).map(movie =>
                    <SwiperSlide key={movie.id}>
                        <div className='movie' >
                            <img
                                onMouseOver={() => {
                                    setPoster(`${"https://image.tmdb.org/t/p/original" + movie.poster_path}`);
                                    setTitle(movie.original_title);
                                    setDescription(movie.overview);
                                }}
                                src={'https://image.tmdb.org/t/p/original' + movie.poster_path} width='250px' height='300px'
                                alt='Promotional Poster For Movie'
                            />
                            <button className="watchlist-btn"
                                onClick={() => handleClick(movie.original_title)}>
                                {watchList.includes(movie.original_title) ?
                                    <i className="fas fa-minus-circle"></i> :
                                    <i className="fas fa-plus-circle"></i>}
                            </button>
                            <button className="watch-trailer-btn"
                                onClick={() => getYTVideo(movie.original_title)}>
                                Watch Trailer
                            </button>
                        </div>
                    </SwiperSlide>
                )
                }
            </Swiper>}
        </section>);
}

export default ListTemplate;