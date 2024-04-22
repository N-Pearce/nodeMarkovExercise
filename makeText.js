const fs = require('fs')
const axios = require('axios')
const { MarkovMachine } = require('./markov')

let mm;

function generateText(path){
    fs.readFile(path, 'utf8', (err, data) => {
        if (err){
            console.error(`Error: ${err}`)
            process.exit(1)
        }
        mm = new MarkovMachine(data)
        mm.makeText()
        // console.log(mm.text)
    })
}

async function webGenerateText(url){
    try {
        let resp = await axios.get(url);
        mm = new MarkovMachine(resp.data.text)
        mm.makeText()
    } catch (err){
        console.error(`Error reading ${url}: ${err}`)
        process.exit(1)
    }
}

source = process.argv[2]
arg = process.argv[3]

if (source === 'url'){
    webGenerateText(arg)
} else if (source === 'file') {
    generateText(arg)
}