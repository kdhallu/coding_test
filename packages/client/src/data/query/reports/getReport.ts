export const getReportByMeterId = async function (meterId: string, range: (string | undefined)[] | undefined) {
    let url = `http://localhost:3000/meter/measurements?muid=${meterId}&measurement=energy`;

    // Check if both start and stop are available and append them to the URL
    if (range && range[0] && range[1]) {
        url += `&start=${range[0]}&stop=${range[1]}`;
    }

    let response = await fetch(url);
    const result = await response.json();
    return result.data;
};

export default getReportByMeterId;
