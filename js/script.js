'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagsLink: Handlebars.compile(document.querySelector('#template-tags-link').innerHTML),
  authorPostLink: Handlebars.compile(document.querySelector('#template-authorPost-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloudLink').innerHTML),
  authorsLink: Handlebars.compile(document.querySelector('#template-authors-link').innerHTML),
};

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;

  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  clickedElement.classList.add('active');

  const activeArticles = document.querySelectorAll('.posts article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  const articleSelector = clickedElement.getAttribute('href');

  const targetArticle = document.querySelector(articleSelector);

  targetArticle.classList.add('active');
};


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';




function generateTitleLinks(customSelector = ''){

  let html = '';

  const titleList = document.querySelector(optTitleListSelector);

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  for(let article of articles){
    article.classList.contains('id');

    const articleId = article.getAttribute('id');

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    titleList.innerHTML = titleList.innerHTML + linkHTML;

    html += linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();



function calculateTagsParams(tags){

  const tagsParams = {'max': 0, 'min': 999999};

  for(let tag in tags){
    if(tagsParams.max < tags[tag]){
      tagsParams.max = tags[tag];
    }
    if(tagsParams.min > tags[tag]){
      tagsParams.min = tags[tag];
    }
  }

  return tagsParams;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;

  const normalizedMax = params.max - params.min;

  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

  const tagClass = optCloudClassPrefix + classNumber;

  return tagClass;
}



function generateTags(){

  let allTags = {};

  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){

    const tagWrapper = article.querySelector(optArticleTagsSelector);

    let html = '';

    const articleTags = article.getAttribute('data-tags');

    const articleTagsArray = articleTags.split(' ');

    for(let tag of articleTagsArray){

      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.tagsLink(linkHTMLData);

      html += linkHTML;


      if(!allTags.hasOwnProperty(tag)){

        allTags[tag] = 1;
      } else{
        allTags[tag]++;
      }
    }
    tagWrapper.innerHTML = html;

    const tagList = document.querySelector('.tags');

    const tagsParams = calculateTagsParams(allTags);

    const allTagsData = {tags: []};

    for(let tag in allTags){

      //const linkHTMLData = {allTags: tag,};

      //const linkHTML = templates.tagCloudLink(linkHTMLData);

      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    }

    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  }
}
generateTags();



function tagClickHandler(event){

  event.preventDefault();

  const clickedElement = this;

  const href = clickedElement.getAttribute('href');

  const tag = href.replace('#tag-', '');

  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  for(let activeTagLink of activeTagLinks){

    activeTagLink.classList.remove('active');
  }

  const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"]');

  for(let hrefTagLink of hrefTagLinks){

    hrefTagLink.classList.add('active');

  }

  generateTitleLinks('[data-tags~="' + tag + '"]');

}



function addClickListenersToTags(){

  const allTagLinks = document.querySelectorAll('a[href^="#tag-"]');

  for(let allTagLink of allTagLinks){

    allTagLink.addEventListener('click', tagClickHandler);

  }

}
addClickListenersToTags();



function generateAuthors(){
  let allAuthors = {};

  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){

    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    let html = '';

    const authorNames = article.getAttribute('data-author');


    const linkHTMLData = {id: authorNames, title: authorNames};
    const linkHTML = templates.authorPostLink(linkHTMLData);

    html += linkHTML;

    if(!allAuthors.hasOwnProperty(authorNames)){
      allAuthors[authorNames] = 1;
    } else {
      allAuthors[authorNames]++;
    }
    authorWrapper.innerHTML = html;
  }

  const authorList = document.querySelector('.authors');

  const allAuthorsData = {allAuthors: []};

  for(let authorName in allAuthors){

    allAuthorsData.allAuthors.push({
      authorName: authorName,
      count: allAuthors[authorName],
      className: allAuthors[authorName]
    });
  }
  authorList.innerHTML = templates.authorsLink(allAuthorsData);

}
generateAuthors();



function authorClickHandler(event){

  event.preventDefault();

  const clickedElement = this;

  const href = clickedElement.getAttribute('href');


  const author = href.replace('#by ', '');


  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#by"]');

  for(let activeAuthorLink of activeAuthorLinks){

    activeAuthorLink.classList.remove('active');

  }

  const hrefAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');

  for(let hrefAuthorLink of hrefAuthorLinks){

    hrefAuthorLink.classList.add('active');

  }
  generateTitleLinks('[data-author="' + author + '"]');
  console.log(generateTitleLinks);
}



function addClickListenersToAuthors(){

  const allAuthorsLinks = document.querySelectorAll('a[href^="#by "]');

  for(let allAuthorLink of allAuthorsLinks){

    allAuthorLink.addEventListener('click', authorClickHandler);


  }
}

addClickListenersToAuthors();
