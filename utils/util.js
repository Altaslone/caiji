const formatTime = date => {
    const hour = date.getHours()
    const minute = fillZero(date.getMinutes());
    const second = fillZero(date.getSeconds());

    return [hour, minute, second].join(':');
}

const formatDate = date => {
    const year = date.getFullYear();
    const month = fillZero(date.getMonth() + 1);
    const day = fillZero(date.getDate());

    return [year, month, day].join('-');
}

let fillZero = function(t) {
    if (parseInt(t) < 10) {
        t = '0' + t;
    }
    return t;
};

module.exports = {
    formatTime: formatTime,
    formatDate: formatDate
}