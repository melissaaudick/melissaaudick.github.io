$(function() {
  $.getJSON('./data/product.json', function(product) {
    // ALL YOUR CODE GOES BELOW HERE //



    const thumbs = "https://melissaaudick-github-io-melissaaudick.c9users.io/projects/product-project/img/product/thumbs/";
    const pic = "https://melissaaudick-github-io-melissaaudick.c9users.io/projects/product-project/img/product/";


    //////////////////////////search


    var searchable = [];
    var searchable2;
    _.each(product, function(value, key, object) {
      searchable2 = [];
      searchable2.push(value.id + value.type, value.color.concat(value.specs.join(' '), value.availableColors.join(' '), value.desc));
      searchable.push(searchable2);
    });

    $('#container').append($('<div>').attr('id', 'search').attr('class', 'search')

      .append($('<form>').attr('id', 'searchform')
        .append($('<input>').attr('type', 'text').attr('id', 'searchterm'))
        .append($('<button>').text('Search!').attr('class', 'search-button').attr('id', 'submit'))
      ).append($('<button>').text('Clear').attr('class', 'search-button').click(function() {
        location.reload();
      }))
    );

    ///this works now!!!!
    var searchtest = [];
    $('#searchform').submit(function() {
      event.preventDefault();
      _.each(searchable, function(element, index, collection) {

        if ((element[1]).indexOf(searchterm.value) !== -1) {

          searchtest.push(element[0]);
        }
      });

      _.each(searchtest, function(element, index, collection) {

        //this is spitting out the right args but productmaker isn't working
        productmaker((element.charAt(0)), (element.slice(1)));
        console.log(element);
      });
    });


    /*ok this is the product maker function that search, sort, etc will feed stuff to
    pls note that because two of the products have the same id number it's necessary to distinguish them
    by id+type fields*/


    function productmaker(findid, findtype) {

      if (findid === undefined && findtype === undefined) {
        _.each(product, function(value, key, object) {

          // if (findid === value.id && findtype === value.type)
          //this abbreviates the specs text to a maneageable length  
          {
            var specscut = value.specs.join('\n');
            if (specscut.length > 119) {
              specscut = (specscut.substring(0, 120) + '...');
            }
            var lowstock;
            if (value.stock < 10) {
              lowstock = ('Hurry! Only ' + value.stock + ' left in stock!');
            }

            //this creates the small product info thingys 
            $('#image-lrg').append($('<img>').attr('src', pic + value.image));
            $('#container').append($('<div>').attr('id', value.id + value.type).attr('class', 'product'))
            $('#' + value.id + value.type).append($('<h4>').text(value.desc).attr('class', 'product-head'))
            $('#' + value.id + value.type).append($('<img>')
                .attr('src', thumbs + value.image).attr('class', 'thumbnail')
              )
              .append($('<p>').text('$' + value.price).attr('class', 'product-price'))
              .append($('<p>').text(specscut).attr('class', 'product-text'))
              .append($('<p>').text('Shown in: ' + value.color).attr('class', 'product-text'))
              .append($('<p>').text('Available in ' + value.availableColors.length + ' colors.').attr('class', 'product-text'))
              .append($('<button>').text('More Info').attr('class', 'product-button')

                //this pops open the 'more info' layer
                .click(function() {
                  $("#container").prepend($('<div>').attr('class', 'product-expand').attr('id', 'product-expand')
                    .append($('<img>').attr('src', pic + value.image).attr('title', 'click image to zoom').attr('class', 'img-expand')

                      .click(function() {
                        ///zoom window
                        $("#product-expand").prepend($('<div>').attr('class', 'product-zoom').attr('id', 'product-zoom').fadeIn()
                          .append($('<img>').attr('src', pic + value.image).height('540px').attr('title', 'click to close image')
                            //close zoom div
                            .click(function() {
                              $('#product-zoom').fadeOut();
                            })
                          )
                        );
                      }))

                    .append($('<p>').text(value.desc).attr('class', 'product-expand-header'))
                    .append($('<p>').text('$' + value.price).attr('class', 'product-expand-header'))
                    .append($('<p>').text(value.specs).attr('class', 'product-expand-text'))
                    .append($('<p>').text('Shown in: ' + value.color).attr('class', 'product-expand-text'))
                    .append($('<p>').text('Available in ' + value.availableColors + '.').attr('class', 'product-expand-text'))
                    .append($('<p>').text(lowstock).attr('class', 'product-expand-header'))
                    .append($('<button>').text('Close').attr('class', 'contract-button')
                      //close 'more info' div
                      .click(function() {
                        $('#product-expand').fadeOut();
                      })
                    )
                    //end paren for close button
                  );
                  //end paren for floating div

                })
              );
            ///return false;
          }
        });
      }
    }

    productmaker();


    // ALL YOUR CODE GOES ABOVE HERE //
  });
});