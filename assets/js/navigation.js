const navToggle=document.querySelector('.nav-toggle');
const siteNav=document.querySelector('.site-nav');
if(navToggle&&siteNav){
  navToggle.addEventListener('click',()=>{
    const open=siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded',String(open));
  });
}
const dropdown=document.querySelector('.nav-dropdown');
const dropdownToggle=document.querySelector('.nav-dropdown-toggle');
if(dropdown&&dropdownToggle){
  dropdownToggle.addEventListener('click',()=>{
    const open=dropdown.classList.toggle('open');
    dropdownToggle.setAttribute('aria-expanded',String(open));
  });
}
