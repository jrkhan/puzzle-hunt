

export default function GetPiece(id) {
    if (id === "1") {
        return Promise.resolve({
            id: 1,
            x: 0,
            y: 0
        })
    }
    if (id === "2") {
        return Promise.resolve({
            id: 1,
            x: 0, 
            y: 1,
        })
    }
    if (id === "3") {
        return Promise.resolve({
            id: 1,
            x: 0, 
            y: 2,
        })
    }
    return Promise.reject("no piece found")
}
