module.exports = pipeC;

const pipeC = (...fns) => (a, b) => {
    const compare = (a, b, f = 0) => fns[f](a, b) ? fns[f](a, b) : fns[f](b, a) ? fns[f](b, a) : (f !== fns.length - 1) ? compare(a, b, f + 1) : 0;
    return compare(a, b);
};
