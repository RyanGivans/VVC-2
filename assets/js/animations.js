const items=document.querySelectorAll('[data-reveal]');
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')});
},{threshold:.1});
items.forEach(item=>observer.observe(item));
