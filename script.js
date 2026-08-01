// ============ navegação entre fases ============
function goToFase(id){
  document.querySelectorAll('.fase-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.remove('active'));
  var panel = document.getElementById('fase-'+id);
  var nav = document.getElementById('nav-'+id);
  if(panel) panel.classList.add('active');
  if(nav) nav.classList.add('active');
  document.getElementById('main-scroll').scrollTo(0,0);
  window.scrollTo(0,0);
  closeSidebar();
  try{ history.replaceState(null,'','#'+id); }catch(e){}
}

document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('.nav-item').forEach(function(btn){
    btn.addEventListener('click', function(){
      goToFase(btn.getAttribute('data-fase'));
    });
  });

  // abrir pela hash da URL
  var hash = location.hash.replace('#','');
  if(hash && document.getElementById('fase-'+hash)){
    goToFase(hash);
  }

  // ============ acordeões de subpasso ============
  document.querySelectorAll('.acc-head').forEach(function(head){
    head.addEventListener('click', function(){
      var acc = head.closest('.acc');
      var body = acc.querySelector('.acc-body');
      var isOpen = acc.classList.contains('open');
      if(isOpen){
        acc.classList.remove('open');
        body.style.maxHeight = 0;
      } else {
        acc.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 40 + 'px';
      }
    });
  });

  // ============ acordeão "exemplo" ============
  document.querySelectorAll('.exemplo-head').forEach(function(head){
    head.addEventListener('click', function(){
      var wrap = head.closest('.exemplo');
      var body = wrap.querySelector('.exemplo-body');
      var isOpen = wrap.classList.contains('open');
      if(isOpen){
        wrap.classList.remove('open');
        body.style.maxHeight = 0;
      } else {
        wrap.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 40 + 'px';
      }
    });
  });

  // ============ tooltip tap (mobile) ============
  document.querySelectorAll('.term').forEach(function(t){
    t.addEventListener('click', function(e){
      if(window.innerWidth <= 960){
        e.stopPropagation();
        document.querySelectorAll('.term.tapped').forEach(function(o){ if(o!==t) o.classList.remove('tapped'); });
        t.classList.toggle('tapped');
      }
    });
  });
  document.addEventListener('click', function(){
    document.querySelectorAll('.term.tapped').forEach(function(o){ o.classList.remove('tapped'); });
  });

  // ============ menu mobile ============
  var menuBtn = document.getElementById('menu-btn');
  if(menuBtn){
    menuBtn.addEventListener('click', function(){
      document.querySelector('.sidebar').classList.add('open');
      document.querySelector('.overlay').classList.add('show');
    });
  }
  var overlay = document.querySelector('.overlay');
  if(overlay){
    overlay.addEventListener('click', closeSidebar);
  }
});

function closeSidebar(){
  var sb = document.querySelector('.sidebar');
  var ov = document.querySelector('.overlay');
  if(sb) sb.classList.remove('open');
  if(ov) ov.classList.remove('show');
}
