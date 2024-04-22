/** Textual markov chain generator */


class MarkovMachine {

    /** build markov machine; read in text.*/
  
    constructor(text) {
      let words = text.split(/[ \r\n]+/);
      this.words = words.filter(c => c !== "");
      console.log(this.words)
      this.makeChains();
    }
  
    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
  
    makeChains() {
      let chains = {}
      for (let i=0; i<this.words.length; i++){
        let wordChain = chains[this.words[i]] || []
        wordChain.push(this.words[i+1] || null)
        chains[this.words[i]] = wordChain;
      }
      this.chains = chains
    //   console.log(chains)
    }
  
  
    /** return random text from chains */
  
    makeText(numWords = 100) {
      let text = ''
      // get first word
      let possibleNexts = Object.keys(this.chains).length
      let curWordIdx = Math.floor(Math.random() * possibleNexts)
      let curWord = Object.keys(this.chains)[curWordIdx]
      text += `${curWord}`
    //   console.log(text)

      for (let i=0; i<numWords; i++){
        possibleNexts = this.chains[curWord].length
        curWordIdx = Math.floor(Math.random() * possibleNexts)
        curWord = this.chains[curWord][curWordIdx]
        if (!curWord){
            break
        }
        text += ` ${curWord}`
      }

      this.text = text
      console.log(this.text)
    }
  }

let mm = new MarkovMachine("the cat in the hat");
mm.makeText()

module.exports = {MarkovMachine}