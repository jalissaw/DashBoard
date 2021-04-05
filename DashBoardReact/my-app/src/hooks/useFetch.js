import { useEffect, useState } from 'react';



const useFetch = (urls) => {

    const abortCont = new AbortController()

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isErr, setIsErr] = useState(null)

    useEffect(() => {

        let requests = urls.map(url => fetch(url, { signal: abortCont.signal }, {
            type: "GET",
            dataType: 'json',
        }))
        Promise.all(requests)
            .then(res => {
                const responseOK = res.map(r => r.ok)
                if (!responseOK) {
                    throw Error('The resource can not be displayed at this time');
                }
                return Promise.all(res.map(res => res.json()));
            }).then(data => {
                setData(data)
                setLoading(false)
            }).catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                } else {
                    setLoading(false)
                    setIsErr(err.message)
                }

            })

        return () => abortCont.abort()
    }, [urls]);


    return { data, loading, isErr, setData }
}

export default useFetch