import React, { useState, useEffect, useContext } from 'react';
import useFetch from '../useFetch';
import Spinner from 'react-bootstrap/Spinner';
import 'swiper/swiper-bundle.css';
import ListTemplate from './ListTemplate';




const Movies = () => {

    const { data, loading, isErr } = useFetch([
        `https://api.themoviedb.org/3/list/7077601?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
        `https://api.themoviedb.org/3/list/7078334?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
        `https://api.themoviedb.org/3/list/7078244?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
    ]);
    const [poster, setPoster] = useState(`giphy (1).gif`);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [summary, setSummary] = useState('')
    const [modal, setModal] = useState(false);
    const [videoTrailer, setVideoTrailer] = useState(null);
    const [ytError, setYTError] = useState(null);
    const [genre, setGenre] = useState(['Action', 'Comedy', 'Award-Winning'])

    const stopAtPeriod = () => {
        const summary = description.split('.');
        if (summary[0].length <= 15) {

            setSummary(summary[0] + summary[1] + summary[2] + summary[3])
        } else {
            setSummary(summary[0])
        }
    }

    const getYTVideo = (title) => {
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${title}%20trailer&key=${process.env.REACT_APP_API_YT_KEY}`)
            .then(res => {
                if (!res.ok) {
                    throw Error('The resource can not be displayed at this time');
                }
                return res.json();
            }).then(data => {
                setVideoTrailer(`https://www.youtube.com/embed/${data.items[0].id.videoId}`);
                setModal(true)
            }).catch(err => {
                setYTError(err.message)
            })
    }
    const closeModal = () => {
        setModal(false)
    }

    useEffect(() => {
        if (data) {
            stopAtPeriod();
        }

    }, [description])



    const styles = {
        backgroundImage: `url(${poster})`
    };


    return (
        <div className='show-container'>
            {isErr && <div className="error">{isErr}</div>}
            {loading && <Spinner animation="border" variant="secondary" className="spinner" >
                <span>Loading...</span>
            </Spinner>}
            <div className='hero'>
                <div className='show-hero' style={styles}></div>
                <div className="contains-descriptions">
                    <h2 className="hero-show-title show-movie">{title}</h2>
                    <p className="hero-show-description show-movie">{summary === undefined ? '' : summary}</p>
                </div>
            </div>
            <div className="show-modal">
                {ytError && <div className="yt-error">{ytError}</div>}
                {modal &&
                    <div className='modal' onClick={closeModal}>
                        <iframe className="video" disablekb={0} controls={1} src={videoTrailer}></iframe>
                    </div>
                }
            </div>

            {data &&
                <ListTemplate
                    data={data[0]}
                    setPoster={setPoster}
                    setTitle={setTitle}
                    setDescription={setDescription}
                    genre={genre[0]}
                    getYTVideo={getYTVideo}
                />}

            {data &&
                <ListTemplate
                    data={data[1]}
                    setPoster={setPoster}
                    setTitle={setTitle}
                    setDescription={setDescription}
                    genre={genre[1]}
                    getYTVideo={getYTVideo}
                />}

            {data &&
                <ListTemplate
                    data={data[2]}
                    setPoster={setPoster}
                    setTitle={setTitle}
                    setDescription={setDescription}
                    genre={genre[2]}
                    getYTVideo={getYTVideo}
                />}


        </div >
    )
}

export default Movies
