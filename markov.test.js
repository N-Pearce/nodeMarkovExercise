const { MarkovMachine } = require('./markov')

let mm;

describe('MarkovMachine class', () => {
    beforeAll(() => {
        mm = new MarkovMachine("the cat in the hat");
        mm.makeText()
    })

    test("'There are words and last one is 'hat'", () => {
        let words = mm.text.split(' ')
        console.log(words)
        console.log(words.length)
        let lastWord = words[words.length-1]
        
        expect(words.length).not.toBeLessThan(1)
        expect(lastWord).toEqual('hat')
    });

    test("Chains lead to next word or 'null'", () => {
        console.log(mm.chains)
        expect(mm.chains['the']).toEqual(['cat', 'hat'])
        expect(mm.chains['cat']).toEqual(['in'])
        expect(mm.chains['in']).toEqual(['the'])
        expect(mm.chains['hat']).toEqual([null])
    });
});