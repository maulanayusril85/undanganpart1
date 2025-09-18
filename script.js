// Countdown sederhana
(function(){
  const el = document.getElementById('countdown');
  const t = document.getElementById('eventDate');
  if(!el || !t) return;
  const pad = n => String(n).padStart(2,'0');
  function render(){
    const target = new Date(t.getAttribute('datetime')).getTime();
    const now = Date.now();
    const diff = Math.max(0, target - now);
    const d = Math.floor(diff / (1000*60*60*24));
    const h = Math.floor((diff / (1000*60*60)) % 24);
    const m = Math.floor((diff / (1000*60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    el.innerHTML = ['', '', '', ''].map((_,i)=>`
      <div class="cell">
        <div class="num">${[d,h,m,s].map(pad)[i]}</div>
        <div class="lbl">${['Hari','Jam','Menit','Detik'][i]}</div>
      </div>
    `).join('');
  }
  render(); setInterval(render, 1000);
})();

// Scroll-reveal sederhana (IntersectionObserver)
(function(){
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !items.length){
    // Fallback: tampilkan semua
    items.forEach(el => el.classList.add('show'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('show');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => io.observe(el));
  // Tampilkan elemen di atas fold cepat
  window.addEventListener('load', ()=>{
    items.forEach(el=>{
      const rect = el.getBoundingClientRect();
      if(rect.top < window.innerHeight * 0.9) el.classList.add('show');
    });
  });
})();


// ===== Galeri static (5 foto): fade-up on scroll only =====
(function(){
  const section = document.getElementById('gallery');
  const title = document.getElementById('galleryTitle');
  const items = document.querySelectorAll('#gallery .g');
  if(!section) return;
  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      if(entries.some(e=> e.isIntersecting)){
        title && title.classList.add('show');
        items.forEach((el,i)=> setTimeout(()=> el.classList.add('show'), 120*i));
        io.disconnect();
      }
    }, { threshold:.2 });
    io.observe(section);
  } else {
    title && title.classList.add('show');
    items.forEach(el=> el.classList.add('show'));
  }
})();

const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Tambah delay biar muncul bergiliran
        setTimeout(() => {
          entry.target.classList.add('show');
        }, index * 200);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
