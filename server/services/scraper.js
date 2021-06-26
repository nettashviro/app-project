const rp = require('request-promise');
const cheerio = require('cheerio');
const mongoose = require("mongoose");
const download = require('../utils/downloadFileUtil').download;
const Item = require("../models/item.model");
const connection = require("../utils/database");
const headers = {
    'User-Agent': 'Request-Promise'
}

const connectToClothesStore = (url, category, i) => {
  rp({url: url, headers: headers})
      .then((html) => {
        let $ = cheerio.load(html);
        let productsImages = $(".product-element-top");

        let products = productsImages.get().map((productImage) => {
          let name = productImage.parent.children[1].children[0].children[0].data;
          let colors = getColors(productImage)
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
            colors: colors,
            category: category,
            imageFileName
          };
        });

        products.map(product => {
          let newItem = new Item({
            _id: new mongoose.Types.ObjectId(),
            name: product.name,
            price: product.price,
            colors: product.colors,
            category: product.category,
            image: product.imageFileName
          });

          newItem.save((err, doc) => {
            if (err) console.log(err)
          });
        })
      })
      .catch((err) => {
        console.log(`fetch error ${category} page ${i}`)
        // console.error(err)
      })
}

const getColors = (productImage) => {
  let colors = []
  let currentColor = productImage?.children[4]?.children[1]?.children[0]?.children[0]?.data
  let i = 1
  while (currentColor) {
    colors.push(currentColor);
    currentColor = productImage?.children[4]?.children[1]?.children[i]?.children[0]?.data;
    i++;
  }

  return colors
}


const runner = () => {
  // connection.once("open", () => {
  //   let womenUrl = (i) => `https://tamnoon.com/product-category/women/%D7%98%D7%95%D7%A4%D7%99%D7%9D/page/${i}/`
  //   let menUrl = (i) => `https://tamnoon.com/product-category/men/page/${i}/`
  //
  //   for(let i = 1; i <= 24; i++) {
  //     setTimeout( () => connectToClothesStore(womenUrl(i),i), i * 1500)
  //   }
  //
  //   for(let i = 2; i <= 4; i++) {
  //     connectToClothesStore(menUrl(i),i)
  //   }
  // })


  let urls = [{
    url: 'https://tamnoon.com/product-category/women/%D7%A9%D7%9E%D7%9C%D7%95%D7%AA/page',
    category: 'dresses',
    maxPage: 4//6
  }
  // , {
  //   url:'https://tamnoon.com/product-category/women/%D7%A9%D7%9E%D7%9C%D7%95%D7%AA/page',
  //   category:'4-in-100',
  //   maxPage: 4//5
  // }
  // , {
  //   url:'https://tamnoon.com/product-category/women/%D7%A7%D7%95%D7%9C%D7%A7%D7%A6%D7%99%D7%94-%D7%97%D7%93%D7%A9%D7%94/page',
  //   category:'new',
  //   maxPage: 4//6
  // }
  , {
    url:'https://tamnoon.com/product-category/women/%D7%98%D7%95%D7%A4%D7%99%D7%9D/page',
    category:'tops',
    maxPage: 4 // max is 9 but this is enough
  }, {
    url: 'https://tamnoon.com/product-category/women/%D7%9E%D7%9B%D7%A0%D7%A1%D7%99%D7%99%D7%9D/page',
    category: 'pants',
    maxPage: 4//5
  }, {
    url: 'https://tamnoon.com/product-category/women/%D7%97%D7%A6%D7%90%D7%99%D7%95%D7%AA/page',
    category: 'skirts',
    maxPage: 2
  }]

  connection.once("open", () => {
    let fetchCount = 1;
    for(let urlObj of urls) {
      for(let i = 1; i <= urlObj.maxPage; i++) {
        setTimeout(() => connectToClothesStore(`${urlObj.url}/${i}/`, urlObj.category, i), i * 1500)
        fetchCount++;
      }
    }
  })

}

runner()
