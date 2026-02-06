const michelinData = [
    { name: "평양집", cat: "PYONYANG NAEGMYEON", grade: "SELECTED", img: "../img/01-pyongyangjib.jpg" },
    { name: "울트라바이트", cat: "CONTEMPORARY", grade: "SELECTED", img: "../img/02-ultrabite.jpg" },
    { name: "토오루", cat: "KAISEKI", grade: "SELECTED", img: "../img/03-toru.jpg" },
    { name: "담미옥", cat: "KOREAN TRADITIONAL", grade: "1 STAR", img: "../img/04-dammiok.jpg" }
];

// 잠금 해제 함수
function unlock() {
    console.log("Unlock Function Called"); // 작동 확인용
    const layer = document.getElementById('access-layer');
    if (!layer) return;

    layer.classList.add('unlocked');
    
    setTimeout(() => {
        document.getElementById('main-header').classList.add('active');
        document.getElementById('archive').classList.add('active');
        renderCards(); 
        
        setTimeout(() => { 
            layer.style.visibility = 'hidden'; 
        }, 1500);
    }, 600);
}

function renderCards() {
    const container = document.getElementById('card-container');
    if (!container || container.children.length > 0) return;

    container.innerHTML = michelinData.map((item, index) => {
        const delay = index * 0.12; 
        return `
            <article class="card" style="transition-delay: ${delay}s">
                <div class="img-box" style="transition-delay: ${delay}s">
                    <img src="${item.img}" alt="${item.name}" style="transition-delay: ${delay + 0.05}s">
                </div>
                <div class="card-meta">
                    <span class="card-category">${item.cat}</span>
                    <span style="font-family: 'Space Mono'; font-size: 0.55rem; font-weight: 800;">${item.grade}</span>
                </div>
                <h3 class="card-title">${item.name}</h3>
            </article>
        `;
    }).join('');

    requestAnimationFrame(observeScroll);
}

function observeScroll() {
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
}