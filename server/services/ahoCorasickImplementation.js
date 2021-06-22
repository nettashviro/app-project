const Item = require("../models/item.model");
const mongoose = require("mongoose");

// for testing only
// const connection = require("../utils/database");
class AhoCorasick {
  static instance;

  constructor(){
    if(AhoCorasick.instance){
      return AhoCorasick.instance;
    }

    this.start = { }
    Item.find({}, (err, items) => {
      if(err) {
        console.error(err)
        throw err
      }

      items.map(item => {
        let current = this.start
        for(let ch of item.name) {
          if(!current[ch]) {
            current[ch] = { }
          }

          current = current[ch]
        }
        current['isWord'] = true
      })

      console.log(this.start)
    })

    ahoCorasick.instance = this;
  }

  search = (word) => {
    let current = start
    for(let ch of word) {
      if(!current[ch]) {
        return false
      }

      current = current[ch]
    }

    return current['isWord']
  }
}

// start = { }
// Item.find({}, (err, items) => {
//   if(err) {
//     console.error(err)
//     throw err
//   }
//
//   items.map(item => {
//     let current = start
//     for(let ch of item.name) {
//       if(!current[ch]) {
//         current[ch] = { }
//       }
//
//       current = current[ch]
//     }
//     current['isWord'] = true
//   })
//
//   console.log(start)
// })
//
// const search = (word) => {
//   let current = start
//   for(let ch of word) {
//     if(!current[ch]) {
//       return false
//     }
//
//     current = current[ch]
//   }
//
//   return current['isWord']
// }
let ahoCorasick = new AhoCorasick()

module.exports = {
  ahoCorasick
}