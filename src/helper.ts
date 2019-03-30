const impureMakeId = () => {
    return Date.now(); //impure shit, bro
};

export const createClient = (name:string, makeId = impureMakeId) => {
    return {
        id: makeId(),
        name: name,
    }
}