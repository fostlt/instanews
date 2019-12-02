// const articleContainer = document.getElementById('article-container');

const articleContainer = $("#articles-id");

$("#mySelection").on("change", function() {
  const selected = $(this).val();
  articleContainer.html("");
  $(".loading").show();
  $(".footer").hide();

  $.ajax({
    method: "GET",
    url:
      "https://api.nytimes.com/svc/topstories/v2/" +
      selected +
      ".json?api-key=J8sMhVXrPLhNhh3VVtfmr9IwARTVBjPV",
    dataType: "json"
  })
    .done(function(data) {
      $("#main-media").removeClass("main-media-hidden");

      const articleFilter = data.results.filter(function(dataSet) {
        return dataSet.multimedia[4] !== undefined;
      });

      const slicedArticle = articleFilter.slice(0, 12);

      $.each(slicedArticle, function(index, object) {
        const apiUrl = object.multimedia[4].url;
        const picUrl = object.url;

        $("#articles-id").append(`

        <a href="${picUrl}"></a>
        <article class="article-container"> 
        <div class="article"   style="background:url(${apiUrl}); background-size: cover; background-position: center; ">  
        <p class="nytAbstract">${object.abstract}</p> 
        <a href="${picUrl}"target="_blank" style="width: 100%; text-decoration: none; ">&nbsp</a>
        
        </div> 
        </article>
        `);
      });
    })
    .fail(function() {
      $("#articles-id").append(
        '<div class="nytError"> <p> We are experiencing difficulties. Try again please!</p></div>'
      );
    })

    // $(window).on("load",function(){
    //   $(".loading").fadeOut("slow");

    .always(function() {
      $(".loading").hide();
    });
});
