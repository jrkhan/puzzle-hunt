

export default function LookupViewbox(puzzleId) {
    switch (puzzleId) {
        case "1":
            return "0 0 1800 1200"
        case "2":
            return "0 0 1800 1989"
        default:
            return "0 0 1800 1200"
    }
}