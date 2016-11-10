/* global $ _ opspark */
$(document).ready(function() {
    $.getJSON('data.json', function (data) {
        // YOUR CODE BELOW HERE //
    
        $('nav').css('border', '2px solid').css('border-radius', '25px').css('font-size', '16px').css('font-weight', 'bold');

        $('body').css('background', 'rgb(150, 150, 150)').css('color', 'rgb(45, 45, 45)');
        $('p').css('font-family', 'arial').css('font-size', '12px');
        $('div').css('font-family', 'arial').css('font-size', '12px');

        $('.heading-quotes').css('color', 'white').css('padding-left', '5px').css('padding-top', '5px');
        $('.quote').css('color', 'white').css('font-style', 'italic').css('font-size', '14px');
        $('#quotes').css('padding-right', '10px').css('padding-left', '10px');
        $('#quotes:last-child').css('padding-bottom', '4px');
        $('#section-quotes').prependTo('#sections');
        $('#section-quotes').css('background-color', 'grey').css('padding-left', '4px').css('border', '1px solid').css('border-radius', '15px');


        $('section-bio').css('background-color', 'grey').css('padding-left', '5px');

        $('<header>')
            .attr('class', 'header-recordings')
            .attr('id', 'header-recordings')
            .text('Recordings')
            .appendTo($('#sidebar'));

        $('<section>')
            .attr('id', 'section-recordings')
            .appendTo($('#sidebar'));

        $('<ul>')
            .attr('id', 'ul-recordings')
            .appendTo($('#section-recordings'));

        $('<div>')
            .attr('id', 'image-container-recordings')
            .appendTo($('#header-recordings'));

        $('<div>')
            .attr('id', 'image-container-toprated')
            .appendTo($('#header-top-rated'));

        // uncomment this to inspect all available data; delete when done //
        // console.log(data);

        //toprated section
        
        let topRated = data.discography.topRated;

        var first_loop1 = true;
        _.forEach(topRated, function(value, key, object) {
            if (first_loop1) {
                $('#image-container-toprated').append($('<img src=' + value.art + '>').attr('id', 'image-toprated'));
                first_loop1 = false;
            }
        });

        _.map(topRated, function(value, key, object) {
            //$('#list-top-rated')
                var listtop = ($('<li>').click(function() {
                        $('#image-toprated').attr('src', value.art);
                    }))
                    .append($('<div>').text('Title' + ': ' + value.title).click(function() {
                        $('#image-toprated').attr('src', value.art);
                    }))
                    .append($('<div>').text('Artist' + ': ' + value.artist).click(function() {
                        $('#image-toprated').attr('src', value.art);
                    }))
                    .append($('<div>').text('Release' + ': ' + value.release).click(function() {
                        $('#image-toprated').attr('src', value.art);
                    }))
                    .append($('<div>').text('Year' + ': ' + value.year).click(function() {
                        $('#image-toprated').attr('src', value.art);
                    }));
                     $('#list-top-rated').append(listtop);
        });
        
        //recordings section

        let recordings = data.discography.recordings;
        _.forEach(recordings, function(value, key, object) {
            var listrec = $('<li>').attr('id', 'recording').click(function() { $('#image-recordings').attr('src', value.art);});
            listrec.append($('<div>').attr('class', 'title').text('Title' + ': ' + value.title)).click(function() { $('#image-recordings').attr('src', value.art);})
                .append($('<div>').attr('class', 'artist').text('Artist' + ': ' + value.artist)).click(function() { $('#image-recordings').attr('src', value.art);})
                .append($('<div>').attr('class', 'release').text('Release' + ': ' + value.release)).click(function() { $('#image-recordings').attr('src', value.art);})
                .append($('<div>').attr('class', 'year').text('Year' + ': ' + value.year)).click(function() { $('#image-recordings').attr('src', value.art);});
            $('#ul-recordings').append(listrec)

        });


        let recordingsImg = data.discography.recordings;
        var first_loop = true;
        _.forEach(recordings, function(value, key, object) {
            if (first_loop) {
                $('#image-container-recordings').append($('<img src=' + value.art + '>').attr('id', 'image-recordings').attr('width', '200px').attr('height', '200px'));
                first_loop = false;
            }
        });

        //flipping billy pictures
        
        let images = data.images.billy;
        var i = 0;
        $('#image-container-billy').click(function() {
            i = (i + 1) % images.length;
            _.forEach(images, function(element, index, collection) {
                $('#image-billy').attr('src', images[i]).fadeIn('slow');
            });
        });

        ////////makin a table
        
        const $section = $('<section>').attr('id', 'section-rider');
        const $header = $('<h3>').text('Billy\'s Rider');
        $section.append($header);
        $section.appendTo($('#sections'));

        let rider = data.rider;

        var createTable = function(rider) {
            var createRow = function(item) {
                var $row = $("<tr>");
                var $nameFirst = $("<td>").text(item.type);
                var $nameLast = $("<td>").text(item.desc);
                $row.append($nameFirst);
                $row.append($nameLast);
                return $row;
            };
            var $table = $("<table>");
            var $rows = rider.map(createRow);
            $table.append($rows);
            return $table;
        };

        createTable(rider).appendTo('#section-rider');
        
        // YOUR CODE ABOVE HERE //
    })
    .fail(function() { console.log('getJSON on discography failed!'); });
});


