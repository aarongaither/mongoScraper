const router = require("express").Router();
const Article = require('../models/Article.js')
const Comment = require('../models/Comment.js')
const scraper = require('../scraping/scraper.js')

router.get('/', (req, res) => {
	scraper(data => {
		data.filter(e => Article.findOne({title: e.title}))
			.forEach(e => Article.create(e, err => {
			if (err.code === 11000) {
				console.log(err.message)
			} else if (err) {
				console.log(err)
			}
		}))
		Article.find({}).sort({created_at: -1}).exec((err, doc) => {
			err ? console.log(err) : res.render('index', {articles: doc});
		})
	})
});

router.get('/:id', (req, res) => {
	if (req.params.id == 'favicon.ico') {
		res.send('./favicon.ico')
	} else {
		Article.findOne({_id: req.params.id}).populate('comment').exec((err, doc) => {
			err ? console.log(err) : res.render('article', {article: doc})
		})
	}
});

module.exports = router;