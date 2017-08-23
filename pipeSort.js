const pipeC = (...fns) => (a, b) => {
    const compare = (a, b, f = 0) => fns[f](a, b) ? fns[f](a, b) : fns[f](b, a) ? fns[f](b, a) : (f !== fns.length - 1) ? compare(a, b, f + 1) : 0;
    return compare(a, b);
};

const comparator = fn => (a, b) => fn(a, b) ? 1 : fn(b, a) ? -1 : 0;

const pipeSort = {
    comparator,
    pipeC    
};

module.exports = pipeSort;
