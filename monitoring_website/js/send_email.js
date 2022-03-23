$( document ).ready(function(){
    $('#submitButton').click(function (e) {
        e.preventDefault();
        var fullName = $('#name').val();
        var email = $('#email').val();
        var message = $('#message').val();
        if (fullName!="" && message!="" && email!=""){
            sendEmail(fullName, email, message,e);
        }     
    });
  });

function sendEmail(fullName, email, message,e) {
    var our_email= "beeg.br4in@gmail.com";
    var text = '<h1>Hello dear group!</h1>\
           There is a guy whose name is <b>'+ fullName +'</b> and his email is <b>'+email+'</b> with the following doubt:<br> \
           '+message+'<br>\
           Please be sure you answer to him/her!<br>\
           Best Regards<br>\
           🧠<b>BeegBrain</b>';
    Email.send({
        Host: "smtp.gmail.com",
        Username : our_email,
        Password : "beeg.brain2021",
        To : 'joaobernardo0@ua.pt, joaoreis16@ua.pt, marianarosa@ua.pt, ricardorodriguez@ua.pt',
        From : our_email,
        Subject : "Dúvida BeegBrain!",
        Body : text,
    })
}