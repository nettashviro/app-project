const rp = require('request-promise');
const cheerio = require('cheerio');
const mongoose = require("mongoose");
const download = require('../utils/downloadFileUtil').download;
const Item = require("../models/item.model");
const connection = require("../utils/database");

const connectToClothesStore = (url) => {
    rp(url)
      .then((html) => {
        let $ = cheerio.load(html);
        let productsImages = $(".product-element-top");

        let products = productsImages.get().map((productImage) => {
          let name = productImage.parent.children[1].children[0].children[0].data;
          let imageUrl = productImage.children[1].children[1].attribs['data-wood-src'];
          let price = productImage?.parent?.children[3]?.children[0]?.children[0]?.children[1]?.data
                          ?? productImage?.parent?.children[3]?.children[0]?.children[0]?.children[0]?.children[1]?.data;
          let imageFileSplit = productImage.children[1].children[1].attribs['data-wood-src'].split('/')
          let imageFileName = imageFileSplit[imageFileSplit.length -1]
          let filename = `${__dirname}\\..\\..\\client\\src\\assets\\images\\${imageFileName}`
          download(imageUrl, filename,() => {})

          return {
            name,
            price,
            category: 'general',
            imageFileName
          };
        });

        products.map(product => {
          let newItem = new Item({
            _id: new mongoose.Types.ObjectId(),
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.imageFileName
          });

          newItem.save((err, doc) => {
            if (err) console.log(err)
          });
        })
      })
      .catch((err) => {
        console.log(`fetch error ${i} page`)
        console.error(err)
      })
}

const runner = () => {
  let womenUrl = (i) => `https://tamnoon.com/product-category/women/page/${i}/`
  let menUrl = (i) => `https://tamnoon.com/product-category/men/page/${i}/`

  for(let i = 1; i <= 24; i++) {
    connectToClothesStore(womenUrl(i))
  }

  for(let i = 2; i <= 4; i++) {
    connectToClothesStore(menUrl(i))
  }
}

runner()
