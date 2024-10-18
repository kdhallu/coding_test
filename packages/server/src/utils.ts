//{"id":5433,"measurement":"energy","timestamp":"2023-02-28T23:45:00.000Z","key":"0100021D00FF","value":0,"tags":{"muid":"1db7649e-9342-4e04-97c7-f0ebb88ed1f8","quality":"measured"}}

const mapResponse = (response: any) => {
    return ({data : response.map((data: any) => {
        return ({
            measurement: data.measurement,
            timestamp: data.timestamp,
            [data.key]: data.value,
            tags: data.tags,
        })
    })})
}

export {
    mapResponse
}
