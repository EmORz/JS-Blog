const Article = require('../models').Article;
const User = require('../models').User;

module.exports = {
     createGet: (req, res) => {
         res.render('article/create');
     },
    createPost: (req, res)=> {
        let articleArg = req.body;

        let errorMsq = '';
        
        if (!req.isAuthenticated()) {
            errorMsq = 'You shoud logged in to make articles!';
        }else if(!articleArg.title){
            errorMsq = 'Invalid title!';
        }else if(!articleArg.content){
            errorMsq = 'Invalid title!';
        }

        if (errorMsq){
            return res.render('article/create', {error: errorMsq})
        }
        let userId = req.user.id;
        articleArg.authorId = userId;

        Article.create(articleArg).then(() => {res.redirect('/');}).catch(err => {console.log(err.message); res.render('article/create', {error: err.message})})

    },
    details: (req, res) => {
         let articleId = req.params.id;
         Article.findById(articleId)
             .then(article =>{
                 res.render('article/details', article.dataValues)
             })
    },

    editGet: function (req, res) {
        let articleId = req.params.id;
        Article.
        findById(articleId)
            .then(article => {
                res.render('article/edit', article.dataValues)
            });
    },
    editPost: function (req, res) {
         let articleArgs = req.body;
         let articleId = req.params.id;

         Article.
             findById(articleId)
             .then(article =>{
                 article
                     .update(articleArgs)
                     .then(() => {
                         res.redirect('/');
                     })
             })
    },

    deleteGet: function (req, res) {
        let articleId = req.params.id;
        Article.
        findById(articleId)
            .then(article => {
                res.render('article/delete', article.dataValues)
            });
    },
    deletePost: function (req, res) {
        let articleId = req.params.id;

        Article.
        findById(articleId)
            .then(article =>{
                article
                    .destroy()
                    .then(() => {
                        res.redirect('/');
                    })
            })

    }


};