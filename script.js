$(document).ready(function() {
    //lay du lieu
    getData();

    //Close Modal
    $(".search-modal").hide();

    //button close
    $(".close").click(function() {
        //close Modal
        $(".search-modal").hide();
    });
    $("#btn-search").click(function() {
        // open Modal
        $(".search-modal").show();
        //tag input empty
        $("input").val('');
    });
    searchInformation();
});


function Articles(title, description, content, url, image, publishedAt) {
    this.title = title;
    this.description = description;
    this.content = content;
    this.url = url;
    this.image = image;
    this.publishedAt = publishedAt;
}

//Get data
function getData() {
    $.ajax({
        url: "https://gnews.io/api/v4/top-headlines?&token=6cb822a3517c05a3938eea08b49191e9&lang=en",
        type: "get",
        dateType: Articles,
        success: function(listArticles) {
            console.log(listArticles);

            createArticles(listArticles);
        },
    });
}

//create articles
function createArticles(listArticles) {
    var htmlText = "";
    console.log(listArticles)
    listArticles.articles.forEach((item) => {
        console.log(item);

        htmlText += '<div class="col-12 col-md-6 col-lg-3 col-img" id="card">' +
            '<div class="card">' +
            '<img class="card-img-top" src="' + item.image + '" alt="Card image cap">' +
            '<div class="card-body">' +
            '<a href="' + item.url + '" target="_blank">' +
            '<h5 class="card-title">' + item.title + '</h5>' +
            '</a>' +
            '<p class="datetime">' + item.publishedAt + '</p>' +
            '<p class="card-text">' + item.content + '</p>' +
            '</div>' +
            '</div>' +
            '</div>'
    });
    //add htmlText in #list-card
    $("#list-card").append(htmlText);
}

function searchInformation() {
    $(".btn-modal-search").click(function() {
        //get value from tag input
        var keyword = $("input").val();
        console.log(keyword);

        //#list-card is empty => delete content in page
        $("#list-card").empty();
        $.ajax({
            url: "https://gnews.io/api/v4/search?q=" + keyword + "&token=6cb822a3517c05a3938eea08b49191e9&lang=en",
            type: "get",
            dateType: Articles,
            success: function(listArticles) {
                console.log(listArticles);
                createArticles(listArticles);
            },
        });
    })
}