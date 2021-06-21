const Item = require("../models/item.model");
const mongoose = require("mongoose");

// for testing only
// const connection = require("../utils/database");

start = { }
Item.find({}, (err, items) => {
  if(err) {
    console.error(err)
    throw err
  }

  items.map(item => {
    let current = start
    for(let ch of item.name) {
      if(!current[ch]) {
        current[ch] = { }
      }

      current = current[ch]
    }
    current['isWord'] = true
  })

  console.log(start)
})

const search = (word) => {
  let current = start
  for(let ch of word) {
    if(!current[ch]) {
      return false
    }

    current = current[ch]
  }

  return current['isWord']
}

module.exports = {
  search
}