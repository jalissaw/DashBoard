import useFetch from '../useFetch'

const Youtube = () => {

    const { data: video } = useFetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=captain%20marvel%20trailer`)
    console.log(video)

    return ('hello');
}

export default Youtube;