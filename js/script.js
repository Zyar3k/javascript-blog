'use strict';
const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;

  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  clickedElement.classList.add('active');
                                                          //console.log('clickedElement:', clickedElement);
   const activeArticles = document.querySelectorAll('.posts article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
                                                          //console.log('.posts article.active: ', activeArticles)
  const articleSelector = clickedElement.getAttribute('href');
                                                          //console.log('efekt', articleSelector);
  const targetArticle = document.querySelector(articleSelector);
                                                          //console.log('targetArticle', targetArticle);

  targetArticle.classList.add('active');
};



const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';


  function generateTitleLinks(customSelector = ''){
  let html = '';
                                                          /*  remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
                                                          //console.log(titleList);
                                                          /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
                                                          //console.log('artykuly', articles);
                                                          /* find the title element */
  for(let article of articles){
    article.classList.contains('id');
                                                            //console.log('artykul', article)
                                                            /* get the article id */
    const articleId = article.getAttribute('id');
                                                            /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
                                                            //console.log(articleTitle);
                                                            /* create HTML of the link */
    let linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
                                                            //console.log(linkHTML);
    titleList.innerHTML = titleList.innerHTML + linkHTML;
                                                            //console.log(titleList.innerHTML);
                                                            /* insert link into titleList */
    html = html + linkHTML;
                                                            //console.log(html);
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
                                                          //console.log(links);
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

//////////------------------------------------------//////////

function generateTags(){

                                                          /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
                                                          //console.log(articles);

                                                          /* [DONE] START LOOP: for every article: */
  for(let article of articles){
                                                            //console.log(article);
                                                            /* [DONE] find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);
                                                            //console.log(tagWrapper);
                                                            /* make html variable with empty string */
    let html = '';
                                                            /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
                                                            //console.log('tagi:', articleTags);
                                                            /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
                                                            //console.log('podzielone tagi: ', articleTagsArray);
                                                            /* START LOOP: for each `tag` */
    for(let tag of articleTagsArray){
                                                              //console.log('pojedynczy tag: ', tag);
                                                              /* generate HTML of the link */
      let linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
                                                              //console.log(linkHTML);
                                                              /* add generated code to html variable */
      html = html + linkHTML;
                                                              //console.log('pojedynczy html: ', html);
                                                            /* END LOOP: for each tag */
    };
    tagWrapper.innerHTML = html;
    //console.log(tagWrapper);
                                                            /* insert HTML of all the links into the tags wrapper */
                                                            /* END LOOP: for every article: */
    //CHYBA DZIAŁA
  }
}
generateTags();

function tagClickHandler(event){
                                                          /*[DONE] prevent default action for this event */
  event.preventDefault();
                                                          /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
                                                          /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  //console.log(href)
                                                          /*[DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  //console.log(tag)
                                                          /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
                                           /* START LOOP: for each active tag link */
  for(let activeTagLink of activeTagLinks){
                                                          /* remove class active */
    activeTagLink.classList.remove('active')
  };
                                                          /* END LOOP: for each active tag link */
                                                          /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  //console.log(hrefTagLinks)
                                                          /* START LOOP: for each found tag link */
    for(let hrefTagLink of hrefTagLinks){
                                                          /* add class active */
      hrefTagLink.classList.add('active')
      console.log(hrefTagLink)
    };
                                                          /* END LOOP: for each found tag link */
                                                          /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
    console.log(generateTitleLinks)
}

function addClickListenersToTags(){
                                                          /* find all links to tags */
  const allTagLinks = document.querySelectorAll('a[href^="#tag-"]');
  //console.log(allTagLinks)
                                                          /* START LOOP: for each link */
  for(let allTagLink of allTagLinks){
                                                          /* add tagClickHandler as event listener for that link */
    allTagLink.addEventListener('click', tagClickHandler);
    //console.log(allTagLink)
                                                          /* END LOOP: for each link */
  }

}
addClickListenersToTags()

//////////------------------------------------------//////////


function generateAuthors(){

  const articles = document.querySelectorAll(optArticleSelector);

    for(let article of articles){

      const authorWrapper = article.querySelector(optArticleAuthorSelector);

      let html = '';

      const authorNames = article.getAttribute('data-author');

      let linkHTML = '<li><a href="by ' + authorNames + '">' + authorNames + '</a></li>';
      //console.log(linkHTML);
      html = html + linkHTML;
      //console.log(html)
      authorWrapper.innerHTML = html;
    }
}

generateAuthors();

function authorClickHandler(event){

  event.preventDefault();

  const clickedElement = this;

  const href = clickedElement.getAttribute('href');
  //console.log(href);

  const author = href.replace('by', '');
  //console.log(author);

  const activeAuthorLinks = document.querySelectorAll('a.active[href^="by "]');

  for(let activeAuthorLink of activeAuthorLinks){

    activeAuthorLink.classList.remove('active');

  }

  const hrefAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  //console.log(hrefAuthorLinks);

  for(let hrefAuthorLink of hrefAuthorLinks){

    hrefAuthorLink.classList.add('active');
    //console.log(hrefAuthorLink);
  };

  generateTitleLinks('[data-author="' + author + '"]');
    console.log(generateTitleLinks);
}

function addClickListenersToAuthors(){

  const allAuthorsLinks = document.querySelectorAll('a[href^="by "]');
  //console.log(allAuthorsLinks);

    for(let allAuthorLink of allAuthorsLinks){

    allAuthorLink.addEventListener('click', authorClickHandler);
    //console.log(allAuthorLink);

}
}

addClickListenersToAuthors();
