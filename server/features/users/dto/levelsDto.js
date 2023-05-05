const beginner = (points) => { 
    return {
    level: 'Beginner',
    points: points ? points : 0,
    }
}

const preIntermediate = (points) => { 
    return {
    level: 'Pre-Intermediate',
    points: points ? points : 500,
    }
}

const intermediate = (points) => { 
    return {
    level: 'Intermediate',
    points: points ? points : 1200,
    }
}

const upperIntermediate = (points) => { 
    return {
    level: 'Upper-Intermediate',
    points: points ? points : 2500,
    }
}

const advanced = (points) => { 
    return {
    level: 'Advanced',
    points: points ? points : 5000,
    }
}


module.exports = {
    beginner,
    preIntermediate,
    intermediate,
    upperIntermediate,
    advanced
};