const fs = require('fs').promises;

const injector = async ({ file, replacements = [] }) => {
    return new Promise(async (resolve, reject) => {
        await fs.readFile(file, 'utf8').then(async (content) => {
            if (content) {
                replacements.forEach((replacement) => {
                    content = content.replace(replacement.search, replacement.replace)
                })
                await fs.writeFile(file, content, 'utf8').then(() => resolve()).catch((err) => reject(err));
            }
        }).catch((err) => reject(err));
    })
}

export default injector