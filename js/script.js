'use strict';
const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  //console.log('Link was clicked!');
  //console.log(event);
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  //console.log('clickedElement:', clickedElement);
  /*[DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  //console.log('efekt', articleSelector);
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  //console.log('targetArticle', targetArticle);
  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
};



const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(){
  let html = '';
  /*  remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  //console.log(titleList);
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  //console.log(articles);
  /* find the title element */
  for(let article of articles){
    article.classList.contains('id');
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
    //console.log(articleTagsArray);
    /* START LOOP: for each `tag` */
    for(let tag of articleTagsArray){
      //console.log(tag);

      /* generate HTML of the link */
      let linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      //console.log(linkHTML);
      /* add generated code to html variable */
      html = html + linkHTML;
      //console.log(html);
    /* END LOOP: for each tag */
    }
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
  //console.log('dziala');
  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');    //kod

  console.log('dupa', href);

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');        //kod
  //console.log(tag);


  /* find all tag links with class active */
  const activeTags = document.querySelectorAll();
 // console.log(activeTags);

  /* START LOOP: for each active tag link */

  //for(activeTag of activeTags){
  /* remove class active */
  //activeTag.classList.remove('active');

  /* END LOOP: for each active tag link */
  //}

  /* find all tag links with "href" attribute equal to the "href" constant */
  //const tagLinks = href.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
    //for(tagLink of tagLinks){
    /* add class active */
    //tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  //}
  generateTitleLinks('[data-tags~="' + tag + '"]');
  console.log(generateTitleLinks)
  /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToTags(){
  /* find all links to tags */
  const allTagLinks = document.querySelectorAll('.post-tags a');
  //console.log('efekt', allTagLinks)
  /* START LOOP: for each link */
  for(let allTagLink of allTagLinks){
    /* add tagClickHandler as event listener for that link */
    allTagLink.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }

}
addClickListenersToTags();
