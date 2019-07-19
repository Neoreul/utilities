$(document).ready(function(){
    var token = '<YOUR_TOKEN>', 
        userid = '<YOUR_USERID>',
        num_photos = 10; // how much photos do you want to get

    $.ajax({
        url: 'https://api.instagram.com/v1/users/' + userid + '/media/recent',
        dataType: 'jsonp',
        type: 'GET',
        data: {access_token: token, count: num_photos},
        success: function(data){
            console.log(data);
            var galleryElm = $('#gallery');

            for(let i of data.data ){

                switch(i.type){
                    case 'image': 
                        galleryElm.append('<div><img class="img" src="'+i.images.standard_resolution.url+'"></div>');
                        break;
                    case 'video':
                        galleryElm.append('<div class="video"><span class="controls btn"></span><img class="img" src="'+i.images.standard_resolution.url+'"><video controls><source src="'+i.videos.standard_resolution.url+'"></video></div>');
                        break;
                }

            }

            $('#gallery > div.video .controls').click(function(event){
                var parentElm = $(this).parent();
                var sourceUrl = $(parentElm).find('video > source').attr("src");

                var targetElm = $("#target_video");
                
                $('#frame_video').addClass("show");
                targetElm.attr("src", sourceUrl);

                $('#close_video').click(function(){
                    $(this).parent().removeClass("show");
                });
            });
        },
        error: function(err){
            console.log(err);
        }
    });
});