
const cache: any = {};

let req = 1;

self.onmessage = async function (event: any) {
    console.log(event);
    const { page, pageSize, forceRefresh } = event.data;

    console.log(page);
    const chunkSize = 10;
    const chunkNumber = Math.ceil(page * pageSize / chunkSize);
    const startIdx = (chunkNumber - 1) * chunkSize + 1;
    const endIdx = chunkNumber * chunkSize;


    const cacheKey = `https://codeforces.com/api/problemset.problems`;

    if (!forceRefresh && cache[cacheKey]) {
        const sendData = cache[cacheKey].slice(startIdx, chunkSize);
        self.postMessage({ data: sendData, fromCache: true });
        return;
    }


    try {
        const apiUrl = `https://codeforces.com/api/problemset.problems`;
        const response = await fetch(apiUrl);

        console.log(response.status);
        if (response.status !== 200) return;
        const data = await response.json();
        cache[cacheKey] = data.result.problems;

        const sendData = data.result.problems.slice(0, chunkSize);
        console.log("Worker Side", sendData);
        self.postMessage({ data: sendData, fromCache: false });
    } catch (error: any) {
        self.postMessage({ error: error.message });
    }
};
