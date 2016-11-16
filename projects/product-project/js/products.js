/*global $*/
/*global _*/

$(function() {
  $.getJSON('./data/product.json', function(product) {
    // ALL YOUR CODE GOES BELOW HERE //



    const thumbs = "https://melissaaudick.github.io/projects/product-project/img/product/thumbs/";
    const pic = "https://melissaaudick.github.io/projects/product-project/img/product/";



    //////////////////////////search


    var searchable = [];
    var searchable2;
    
    //here we create an array of arrays, which pairs our ids with related searchable fields
    //idk why i didn't just use an object
    _.each(product, function(value, key, object) {
      searchable2 = [];
      searchable2.push(value.id + value.type, value.color.concat(value.specs.join(' '), value.availableColors.join(' '), value.desc).toLowerCase(), value.price);
      searchable.push(searchable2);

    });


    $('#container').append($('<div>').attr('id', 'search').attr('class', 'search')

      .append($('<form>').attr('id', 'searchform')
        .append($('<input>').attr('type', 'text').attr('id', 'searchterm'))
        .append($('<button>').text('Search!').attr('class', 'search-button').attr('id', 'submit')))
        .click(function() { $('#product').show();})

      ////here comes the code for the sort by type/price

      .append($('<span>').attr('id', 'sortform').css('float', 'left')
        .append($('<form>')
          .append($('<input>').attr('type', 'radio').attr('name', 'sort').attr('id', 'showcases').click(function() {
            if (showcases.checked) {
              _.each(caseFilter, function(element, index, collection) {
                $("#" + element[0]).show();
              });
              _.each(phoneFilter, function(element, index, collection) {
                $("#" + element[0]).toggle();
              });
            }
          }))
          .append($('<span>').text('Show only cases'))

          .append($('<input>').attr('type', 'radio').attr('name', 'sort').attr('id', 'showphones').click(function() {
            if (showphones.checked) {
             _.each(phoneFilter, function(element, index, collection) {
                $("#" + element[0]).show()});
              _.each(caseFilter, function(element, index, collection) {
                $("#" + element[0]).toggle();
              });
            }
          }))
          .append($('<span>').text('Show only phones'))


          //sort by price high
          .append($('<span>').attr('id', 'sortform').css('float', 'right'))
          .append($('<button>').text('Prices high to low').click(function() {
            event.preventDefault();
            _.each(priceTestHi, function(element, index, collection) {

              $("#" + element).insertBefore($('.footer'));

            });
          }))

          //sort by price loooooowww
          .append($('<span>').attr('id', 'sortform').css('float', 'right'))
          .append($('<button>').text('Prices low to high').click(function() {
            event.preventDefault();
            _.each(priceTestLo, function(element, index, collection) {

              $("#" + element).insertBefore($('.footer'));

            });
          }))

          .append($('<button>').text('Clear').attr('class', 'search-button').click(function() {
            //location.reload();
             $('#product').show();
             console.log('ok');
          }))
        ))

    )

    //diappearing/reappearing search results div 
    .append($('<div>').attr('id', 'searchresultdiv').attr('class', 'resulttxt').css("visibility", "hidden"))


    //empty div to mark the bottom of the page
    .append($('<div>').attr('id', 'footer').attr('class', 'footer').css("visibility", "hidden"));

    //vars for sort by type
    var phoneFilter = _.filter(searchable, function(element, index, collection) {
      if ((element[0]).indexOf('phone') !== -1)
        return element[0];
    });

    var caseFilter = _.filter(searchable, function(element, index, collection) {
      if ((element[0]).indexOf('case') !== -1)
        return element[0];
    });


    //variables for sort by price
    var priceList = {};
    var priceTestHi = [];
    var priceTestLo = [];

    //this creates priceList,  an object that contains only prices and product ids
    _.map(searchable, function(element, index, collection) {
      priceList[element[0]] = element[2];
    });

    function sortProperties(obj) {
      // here we convert our priceList object into an array sorted by price
      var sortable = [];
      for (var key in obj)
        if (obj.hasOwnProperty(key))
          sortable.push([key, obj[key]]); // in which each item is an array in format [id, price]

        // this sorts items by value (aka price)
      sortable.sort(function(a, b) {
        return b[1] - a[1]; // we then compare the prices, arranging from high to low
      });
      
      _.each(sortable, function(element, index, collection) {
        priceTestHi.push(element[0]); //then we push the associated product id into an array which'll be used to reorder our divs
      });
      sortable.sort(function(a, b) {
        return a[1] - b[1]; // comparing prices from low to high
      });
     
      _.each(sortable, function(element, index, collection) {
        priceTestLo.push(element[0]); //and then pushing the associated product id into an array which'll be used to reorder our divs
      });
    }
    sortProperties(priceList);


    ///this works now!!!! it's where search results come from

    var searchresult = [];
    
    $('#searchform').submit(function() {
     
      event.preventDefault();
      _.each(searchable, function(element, index, collection) {

        if ((element[1]).indexOf((searchterm.value).toLowerCase()) === -1) {

          searchresult.push(element[0]);
        ///so that up there is pushing div ids for UNsuccessful search results into a new array
        }
        
        //toggle result div, set searchterm display var to searchterm.value
       
        if (searchresult.length === 11) {
         $('#searchresultdiv').text('Sorry, no results found for "' + searchterm.value + '"').css("visibility", "visible");  
        }
        else {
        $('#searchresultdiv').text('Displaying search results for "' + searchterm.value + '"').css("visibility", "visible");
        }
      });
      

      ///and this will toggle all div ids WITHOUT the search terms from view
      _.each(searchresult, function(element, index, collection) {
        $("#" + element).toggle();
      });
    });





    /*ok this is our productmaking function below
    pls note that because two of the products have the same id number it's necessary to distinguish them
    by id+type fields*/


    ///oi you need to put this in a div that'll be hidden when you sort by price

    _.each(product, function(value, key, object) {

      // if (findid === value.id && findtype === value.type)
      //this abbreviates the specs text to a maneageable length  
      {
        var specscut = value.specs.join('\n');
        if (specscut.length > 119) {
          specscut = (specscut.substring(0, 120) + '...');
        }
        //this appears if there are less than 10 items in stock
        var lowstock;
        if (value.stock < 10) {
          lowstock = ('Hurry! Only ' + value.stock + ' left in stock!');
        }

        //this creates the small product info thingys 
        $('#image-lrg').append($('<img>').attr('src', pic + value.image));
        $('#container').append($('<div>').attr('id', value.id + value.type).attr('class', 'product'));
        $('#' + value.id + value.type).append($('<h4>').text(value.desc).attr('class', 'product-head'));
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
                .append($('<div>').attr('class', 'div-expand').css('border', '2px')
                  .append($('<img>').attr('src', pic + value.image).attr('class', 'img-expand'))
                  .click(function() {
                    ///zoom window
                    $("#product-expand").prepend($('<div>').attr('class', 'product-zoom').attr('id', 'product-zoom').fadeIn()
                      .append($('<img>').attr('src', pic + value.image).height('540px')
                        //close zoom div
                        .click(function() {
                          $('#product-zoom').fadeOut();
                        })
                      )
                      .append($('<div>').text('click image to close').attr('class', 'zoom-caption'))
                    );

                  })
                  .append($('<div>').text('click image to zoom').attr('class', 'zoom-caption'))
                )


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



    // ALL YOUR CODE GOES ABOVE HERE //
  });
});