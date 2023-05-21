const optionsValueCategory = (options) => {
    return options.map((item) => {
        const value = item.id;
        return { value, label: item.title };
    })
};

const optionsValueAuthor = (options) => {
    return options.map((item) => {
        const value = item.id;
        return { value, label: item.fullName };
    })
};

const optionsValueLevel = (options) => {
    return options.map((item) => {
        const value = item.id;
        return { value, label: item.title };
    })
}

export default {
    optionsValueCategory,
    optionsValueAuthor,
    optionsValueLevel,
}