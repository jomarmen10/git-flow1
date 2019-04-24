//Login route get route and post
router.get('/themoneyteam', async(req,res) => {
    try{
        //first to render before anything else
        res.render('user/prompt.ejs', {
        //if clicked on
        res.redirect('user/index.ejs'
    
            });
    }catch(error){
            res.send(error);
        }
});
router.post('/themoneyteam', async(req, res)=>{
    try{
        //once submit login info as realtor
        res.redirect('/realtor/._id/show.ejs')
    //try
        //if not current realtor, register now by clicking "register"
        res.redirect('/join')
        res.render('/user/join.ejs')
    //try 
        //if not a realtor and clicks on "click here"
        res.redirect('/houses/index.ejs')
    }catch(err){
        res.send(err)
    }
})