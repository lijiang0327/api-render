const isServerSide = () => {
    return !process.browser;
}

export default isServerSide;
