// require('dotenv').config()
// const express = require('express')
// const app = express()
// const path = require('path')
// const port = 3000

// console.log(process.env.PRISMIC_ENDPOINT)

// const Prismic = require('@prismicio/client')
// const PrismicH = require('@prismicio/helpers');
// const fetch = require('node-fetch');
// // const PrismicH = require('@prismicio/helpers')
// // import fetch from 'node-fetch'
// // const { log } = require('console')
// // const PrismicDOM = require('prismic-dom')

// // const client = Prismic.Client(process.env.PRISMIC_ENDPOINT)

// const initApi = req => {
//     return Prismic.createClient(process.env.PRISMIC_ENDPOINT, {
//         accessToken: process.env.PRISMIC_ACCESS_TOKEN,
//         req,
//         fetch
//     })
// }

// const handleRequest = async (api) => {
//     const [preloader, navigation, home, about, { results: collections }] =
//       await Promise.all([
//         // api.getSingle('meta'),
//         api.getSingle('preloader'),
//         api.getSingle('navigation'),
//         api.getSingle('home'),
//         api.getSingle('about'),
//         api.query(Prismic.Predicates.at('document.type', 'collection'), {
//           fetchLinks: 'product.image',
//         }),
//       ]);
// // const handleLinkResolver = (doc) => {

// //     return '/'
// // }


// // app.use((req, res, next) => {
// //     res.locals.ctx = {
// //         endpoint: process.env.PRISMIC_ENDPOINT,
// //         linkResolver: handleLinkResolver
// //     }
// //     res.locals.PrismicDOM = PrismicDOM
// //     next()
// // })

// // app.use((req, res, next) => {
// //     res.locals.ctx = {
// //        PrismicH,
// //     };
// //     next()
// // })


// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'pug')

// app.get('/', async (req, res) => {
//     //!   res.send('Hello World!')

//     res.render('pages/home')
// })

// app.get('/about', async (req, res) => {
//     // initApi(req).then(api => {
//     //     api.query(
//     //         Prismic.Predicates.at('document.type', 'about')
//     //     ).then(response => {
//     //         // const { results } = response
//     //         // const [about] = results

//     //          console.log(response)

//     //         res.render('pages/about',{
//     //             document: response.results[0]
//     //         })
//     //     })
//     // })
//     // const document = await client.getSingle('About')
//     // log(document);
//     // res.render('pages/about')
//     // // const document = await client.getFirst()
//     // // res.render('page', { document })

//     const api = await initApi(req);
//     const defaults = await handleRequest(api);

//     res.render('pages/about', {
//         ...defaults,
//     });
// })

// app.get('/detail/:uid', async (req, res) => {
//     res.render('pages/detail')
// })

// app.get('/collection', async (req, res) => {
//     res.render('pages/collection')
// })

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

// //*Creazione del backend che gestisce l'indirizzamento delle pagine



/* eslint-disable no-unused-vars */
require('dotenv').config();

const fetch = require('node-fetch');
const logger = require('morgan');
const path = require('path');
const express = require('express');
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
const port = process.env.PORT || 3000;

const Prismic = require('@prismicio/client');
const PrismicH = require('@prismicio/helpers');
const { application } = require('express');
const UAParser = require('ua-parser-js');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(errorHandler());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize the prismic.io api
const initApi = (req) => {
  return Prismic.createClient(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req,
    fetch,
  });
};

// Link Resolver
const HandleLinkResolver = (doc) => {
  if (doc.type === 'product') {
    return `/detail/${doc.slug}`;
  }

  if (doc.type === 'collections') {
    return '/collections';
  }

  if (doc.type === 'about') {
    return `/about`;
  }

  // Default to homepage
  return '/';
};

// Middleware to inject prismic context
app.use((req, res, next) => {
  const ua = UAParser(req.headers['user-agent']);

  res.locals.isDesktop = ua.device.type === undefined;
  res.locals.isPhone = ua.device.type === 'mobile';
  res.locals.isTablet = ua.device.type === 'tablet';

  res.locals.Link = HandleLinkResolver;
  res.locals.PrismicH = PrismicH;
  res.locals.Numbers = (index) => {
    return index === 0
      ? 'One'
      : index === 1
      ? 'Two'
      : index === 2
      ? 'Three'
      : index === 3
      ? 'Four'
      : '';
  };

  next();
});

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.locals.basedir = app.get('views');

const handleRequest = async (api) => {
  const [preloader, navigation, home, about, { results: collections }] =
    await Promise.all([
      // api.getSingle('meta'),
      api.getSingle('preloader'),
      api.getSingle('navigation'),
      api.getSingle('home'),
      api.getSingle('about'),
      api.query(Prismic.Predicates.at('document.type', 'collection'), {
        fetchLinks: 'product.image',
      }),
    ]);

  //   console.log(about, home, collections);

  const assets = [];

  // home.data.gallery.forEach((item) => {
  //   assets.push(item.image.url);
  // });

  // about.data.gallery.forEach((item) => {
  //   assets.push(item.image.url);
  // });

  // about.data.body.forEach((section) => {
  //   if (section.slice_type === 'gallery') {
  //     section.items.forEach((item) => {
  //       assets.push(item.image.url);
  //     });
  //   }
  // });

  // collections.forEach((collection) => {
  //   collection.data.products.forEach((item) => {
  //     assets.push(item.products_product.data.image.url);
  //   });
  // });

  // console.log(assets);

  return {
    assets,
    // meta,
    home,
    collections,
    about,
    navigation,
    preloader,
  };
};

app.get('/', async (req, res) => {
  const api = await initApi(req);
  const defaults = await handleRequest(api);

  res.render('pages/home', {
    ...defaults,
  });
});

app.get('/about', async (req, res) => {
  const api = await initApi(req);
  const defaults = await handleRequest(api);

  res.render('pages/about', {
    ...defaults,
  });
});

app.get('/collection', async (req, res) => {
  const api = await initApi(req);
  const defaults = await handleRequest(api);
// console.log(defaults.preloader.data)
  res.render('pages/collection', {
    ...defaults,
  });
});



app.get('/detail/:uid', async (req, res) => {
  const api = await initApi(req);
  const defaults = await handleRequest(api);

  const product = await api.getByUID('product', req.params.uid, {
    fetchLinks: 'collection.title',
  });

  res.render('pages/detail', {
    ...defaults,
    product,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// "start": "concurrently --kill-others \"npm run backend:development\" \"npm run frontend:development\""
