var express = require('express');
var router = express.Router();
var novedadesModel = require('../models/novedadesModel');
var cloudinary = require('cloudinary').v2;

/* GET home page. */
router.get('/', async function (req, res, next) {
  // var novedades = await novedadesModel.getNovedades();
  var novedades;
  if (req.query.q === undefined) {
    novedades = await novedadesModel.getNovedades();
  } else {
    novedades = await novedadesModel.buscarNovedades(req.query.q);
  }
  novedades = novedades.map((novedad) => {
    if (novedad.img_id) {
      const imagen = cloudinary.url(novedad.img_id, {
        width: 960,
        height: 200,
        crop: 'fill',
      });
      return {
        ...novedad,
        imagen,
      };
    } else {
      return {
        ...novedad,
        imagen: '',
      };
    }
  });
  res.render('novedades', {
    isNovedades: true,
    novedades,
    is_search: req.query.q != undefined,
  });
});

module.exports = router;
