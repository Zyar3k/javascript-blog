'use strict';
const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
console.log('clickedElement:', clickedElement);
  /*[DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
    console.log('efekt ', articleSelector);
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector)
    console.log('targetArticle', targetArticle);
  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}



const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){
  let html = '';
  /*  remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
      //console.log(titleList);

  /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
      console.log(articles);
    
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
      console.log(html);
}   
    titleList.innerHTML = html;  

    const links = document.querySelectorAll('.titles a');
    console.log(links);
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }   
}

generateTitleLinks();