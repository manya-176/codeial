//controller is basically a set of actions

 module.exports.home =  function(req, res){

  console.log(req.cookies);
  //we can update the value of cookie from here
  res.cookie('user_id', 25);
   

   //  return res.end('<h1>Express is up for Codeial!!</h1>');
   return res.render('home',{
      title:"Home"
   });
 }