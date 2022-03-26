function displayData() {
    document.querySelectorAll('.card').forEach((elem) => {
        let data = elem.dataset;
        elem.querySelector('.timeframe').textContent = `${data.timeframe}hrs`;
        let timeIndicator;
        if (data.mode === 'daily') timeIndicator = "Day";
        else if (data.mode === 'weekly') timeIndicator = "Week";
        else if (data.mode === 'monthly') timeIndicator = "Month";
        elem.querySelector('.previous').textContent = `Last ${timeIndicator} - ${data.previous}hrs`
    })
}

function setData(data, mode) {
    document.querySelectorAll('.card').forEach((elem, idx) => {
        elem.dataset.mode = mode;
        elem.dataset.timeframe = data[idx].timeframes[mode].current;
        elem.dataset.previous = data[idx].timeframes[mode].previous;
    })
}

window.onload = async () => {
    let data = await fetch('./data.json')
    .then(res => res.json())
    console.log(data);
    let mode = "daily";
    setData(data, mode);
    displayData();
    document.querySelectorAll('.nav-item').forEach((elem) => {
        elem.onclick = () => {
            document.querySelectorAll('.nav-item').forEach((e) => {
                e.dataset.isActive = 'false';
            });
            elem.dataset.isActive = 'true';
            mode = elem.dataset.id;
            setData(data, mode);
            displayData();

        }
    })
}




