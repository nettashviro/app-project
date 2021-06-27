const Item = require("../models/item.model");
const mongoose = require("mongoose");

// for testing only
// const connection = require("../utils/database");

const calculateTree = () => {
  if (global.start) {
    return global.start;
  }
  global.start = {};

  Item.find({}, (err, items) => {
    if (err) {
      console.error(err);
      throw err;
    }

    items.map((item) => {
      let current = global.start;
      for (let ch of item.name) {
        if (!current[ch]) {
          current[ch] = {};
        }

        current = current[ch];
      }

      current['isWord'] = true
      current['count'] = current['count'] ? current['count'] + 1 : 1


      for(let color of item.colors) {
        current = global.start;
        for (let ch of color) {
          if (!current[ch]) {
            current[ch] = {};
          }

          current = current[ch];
        }

        current['isWord'] = true
        current['count'] = current['count'] ? current['count'] + 1 : 1
      }


    })


    // console.log(global.start)
  });
};

const getLeaf = (start, word) => {
  let current = start
  for (let ch of word) {
    if (!current[ch]) {
      current[ch] = {}
    }

    current = current[ch];
  }

  return current;
}

const search = (word) => {
  if(!global.start) {
    throw {err: 'global.start not found'}
  }

  let current = getLeaf(global.start, word)

  console.log(current['count'])
  return current['isWord']
}

const addWord = (word) => {
  if (!global.start) {
    throw { err: "global.start not found" };
  }

  let current = getLeaf(global.start, word)
  // let current = global.start
  // for(let ch of word) {
  //   if (!current[ch]) {
  //     current[ch] = { }
  //   }
  //
  //   current = current[ch]
  // }

  current['isWord'] = true;
  current['count'] = current['count'] ? current['count'] + 1 : 1
}

const removeWord = (word) => {
  if(!global.start) {
    throw {err: 'global.start not found'}
  }

  let current = getLeaf(global.start, word)

  current['count'] -= 1
  if(current['count'] <= 0) {
    current['isWord'] = false;
  }

}

const update = (prevName, newName, prevColors, newColors) => {
  removeWord(prevName)
  addWord(newName)

  for(let color of prevColors) {
    removeWord(color)
  }

  for(let color of newColors) {
    addWord(color)
  }
}


// class AhoCorasick {
//   static instance;
//
//   constructor(){
//     if(AhoCorasick.instance){
//       console.log('exists!')
//       return AhoCorasick.instance;
//     }
//     console.log('not exists!')
//     this.start = { }
//     Item.find({}, (err, items) => {
//       if(err) {
//         console.error(err)
//         throw err
//       }
//
//       items.map(item => {
//         let current = this.start
//         for(let ch of item.name) {
//           if(!current[ch]) {
//             current[ch] = { }
//           }
//
//           current = current[ch]
//         }
//         current['isWord'] = true
//       })
//
//       console.log(this.start)
//     })
//
//     ahoCorasick.instance = this;
//   }
//
//   search = (word) => {
//     let current = ahoCorasick.instance.start
//     for(let ch of word) {
//       if(!current[ch]) {
//         return false
//       }
//
//       current = current[ch]
//     }
//
//     return current['isWord']
//   }
// }
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
// let ahoCorasick = new AhoCorasick()

module.exports = {
  calculateTree,
  addWord,
  search,
  update
};