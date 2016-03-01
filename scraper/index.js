var request = require('request');
var cheerio = require('cheerio');

module.exports = function(req, res) {

    const BASE_URL = 'http://www.aesopfables.com';
    const TOTAL_SECTIONS = 4;
    var fablesRemaining = 404;
    var fables = [];

    for(var i = 1; i <= TOTAL_SECTIONS; i++)
    {
        request(BASE_URL + '/aesop' + i + '.html', function(error, response, html) {
        
            if(error)
                console.log(error);
            else {
                var $ = cheerio.load(html);
                
                $('body > ul > center > p > table tr').each(function(){

                    var _anchorTag = $(this).find('td > a');
                    var title = _anchorTag.text();
                    var moral = $(this).children().last().text();
                    var _href = ''+_anchorTag.attr('href');
                    var link = BASE_URL + _href.substring(2,_href.length);

                    request(link, function(error, response, html) {

                        if(error) 
                        {
                            console.log('Error with ' + title);
                        }
                        else {
                            
                            $ = cheerio.load(html);

                            var body = $('body > ul > center > table tr > td pre').text();

                            fables.push({
                                title: title,
                                moral: moral,
                                body: body
                            });

                        }
    
                        fablesRemaining--;
                        console.log(fablesRemaining);

                        if(fablesRemaining == 0)
                        {
                            res.status(200).json(fables);
                            return;
                        }
                    });
                })

            }

        });
                
    }



};
