import path from "path";

const createPath = (page) => {
    return path.join(path.resolve(), "views", `${page}.ejs`);
}

export default createPath