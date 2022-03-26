const api_key='api_key=618bf014fc778d9917fc4b90191f8021';

const baseurl='https://api.themoviedb.org/3';

const popularmovies=baseurl+'/discover/movie?sort_by=popularity.desc&'+api_key;


const imgurl='http://image.tmdb.org/t/p/w500';

const searchurl=baseurl+`/search/movie?${api_key}`;

var htmlString="";

const genres = 
[
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
]


var setgenre="";

var choosegenre=[];

var pagecount=10;


var morepagecount=1;



$(document).ready(function()
{
    
    
    $.get(popularmovies,function(data,status){
        
        
        console.log(data);
        

        creategenre();

        fillhtml(popularmovies,data);


        console.log(htmlString.substring('undefined'.length));


    });

    

       
    $("#search").on('keypress',function (e) {
        
    
        var keycode = (e.keyCode ? e.keyCode : e.which);

        var search =searchurl+'&query='+$("#search").val();

        if(keycode == 13) 
        {

            $("#more").hide();
            
            $.get(search,function(data,status){
        
                htmlString="";
        
              $("#main").html('');

              fillhtml(search,data);
       
              console.log(htmlString.substring('undefined'.length));
            });


        }

    });


    $("#more").click(function (e) { 

        e.preventDefault();


        morepagecount++;
        
       

            $.get(popularmovies+`&page=${morepagecount}`,function(data,status){
            
    
                // alert(morepagecount);
    
    
              fillhtml(popularmovies+`&page=${morepagecount}`,data);
       
              console.log(htmlString.substring('undefined'.length));
            });
        


                
        
    });

    
    function fillhtml(popularmovies,data)
    {

        
        $.each(data, function() 
        {
        
            $.each(this, function(index, movie)
            {
            

                const {title,poster_path, vote_average, overview}=movie;
    
                
    
                if(poster_path!=null)
                {

                    htmlString+=
                    `
                    <div class="movie">
    
                    <img src="${imgurl+poster_path}" alt="${title}">
        
                    <div class="movie-info">
        
                      <h3>${title}</h3>
                      <span class="${getcolor(vote_average)}">${vote_average}</span>
        
                    </div>
        
                    <div class="overview">
        
                        <div class="movie-info">
        
                            <h3>${title}</h3>
                            <span class="${getcolor(vote_average)}">${vote_average}</span>
       
                        </div>
                    
                       ${overview}
        
                    </div>
        
                    </div>
                    `;

                }


                else
                {

                    htmlString+=
                    `
                    <div class="movie">
    
                      <img src="../images/default image.png" alt="${title}">
        
                        <div class="movie-info">
         
                           <h3>${title}</h3>
                           <span class="${getcolor(vote_average)}">${vote_average}</span>
        
                        </div>
        
                        <div class="overview">
        
                             <div class="movie-info">
        
                              <h3>${title}</h3>
                              <span class="${getcolor(vote_average)}">${vote_average}</span>
       
                             </div>
                    
                           ${overview}
        
                        </div>
        
                    </div>
                    `;
                }
    
            });
                
        
        });



        $("#main").html(htmlString.substring('undefined'.length));

    }
    



    
    const tagsEl = document.getElementById('genres');

    function creategenre(){

        

        tagsEl.innerHTML= '';
        genres.forEach(genre => {
            const t = document.createElement('div');
            t.classList.add('genre');
            t.id=genre.id;
            t.innerText = genre.name;
            t.addEventListener('click', () => {

                if(choosegenre.length == 0)
                {
                    choosegenre.push(genre.id);
                }

                else{

                    if(choosegenre.includes(genre.id))
                    {

                        choosegenre.forEach((id, idx) => {

                            if(id == genre.id)
                            {
                                choosegenre.splice(idx, 1);
                            }
                        })
                    }
                    else
                    {
                        choosegenre.push(genre.id);
                    }
                }

                console.log(choosegenre);
                main.innerHTML = '';

               var myInterval= setInterval(() => {
                    
                    if(pagecount>0)
                    {

                        getGenreMovies(popularmovies+`&page=${pagecount}` + '&with_genres='+encodeURI(choosegenre.join(',')));
                        
                        pagecount--;
                    }

                    
                }, 50);
                
                if(pagecount==0){

                    pagecount=10;

                    // alert(pagecount);

                    clearInterval(myInterval);
                }

                highlightSelection(choosegenre);

                $("#more").hide();
     
            })
            tagsEl.append(t);

        });


    };


    function getGenreMovies(url) {
        lastUrl = url;
          fetch(url).then(res => res.json()).then(data => {
              console.log(data.results)
              if(data.results.length !== 0){
                  
                showMovies(data.results);
                 
              }
              else{
    
                //   main.innerHTML= `<h1 class="no-results">No Results Found</h1>`
    
              }
             
          })
      
      };
    
    
      function showMovies(data) {
          
       
    
        data.forEach(movie => {
            const {title, poster_path, vote_average, overview, id} = movie;
            const movieEl = document.createElement('div');
            movieEl.classList.add('movie');
    
    
            
            if(poster_path!=null)
            {
    
                movieEl.innerHTML = `
                <img src="${imgurl+poster_path}" alt="${title}">
               <div class="movie-info">
                   <h3>${title}</h3>
                   <span class="${getcolor(vote_average)}">${vote_average}</span>
               </div>
               
               <div class="overview">
            
                    <div class="movie-info">
    
                       <h3>${title}</h3>
                       <span class="${getcolor(vote_average)}">${vote_average}</span>
    
                    </div>
      
                   ${overview}
    
                </div>
               
           
                `;
    
            }
    
    
            else
            {
    
                movieEl.innerHTML = `
                <img src="../images/default image.png" alt="${title}">
               <div class="movie-info">
                   <h3>${title}</h3>
                   <span class="${getcolor(vote_average)}">${vote_average}</span>
               </div>
        
               <div class="overview">
    
                   <h3>${title}</h3>
                   <br/> 
                   ${overview}
           
    
               </div>
           
                 `;
            }
    
            main.appendChild(movieEl);
    
     
        })
    }
    
    
    function highlightSelection(choosegenre) {
        const tags = document.querySelectorAll('.genre');
    
        tags.forEach(tag => {
            tag.classList.remove('highlight')
        })
        
        clearBtn();
        if(choosegenre.length !=0){   
    
            choosegenre.forEach(id => 
            {
                const hightlightedTag = document.getElementById(id);
                hightlightedTag.classList.add('highlight');
            })
        }
    
    }
    


    function clearBtn(){

        const tagsEl = $('#genres');
    
        let clearBtn = document.getElementById('clear');
        
        if(clearBtn){
            clearBtn.classList.add('highlight')
        }else{
                
            let clear = $(`<div id="clear">Clear x</div>`);

        
            $(clear).addClass('genre','highlight');

      
            $(clear).click(function (e) { 

                e.preventDefault();

                choosegenre = [];
                creategenre();            



                main.innerHTML = '';

                choosegenre = [];
                creategenre();            
                getGenreMovies(popularmovies);

                $("#more").show();
                morepagecount=1;
            });

    
   

            $(tagsEl).append(clear);

            hasclear=true;

        }
        

        
    }
    
        function getcolor(vote)
        {
            if(vote>=8)
            {
                return 'green'
            }
    
            if(vote>=5)
            {
                return 'orange'
            }
    
            else
            {
                return 'red'
            }
            
        }

});




