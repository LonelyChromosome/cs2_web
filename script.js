const itemsData = [
    { name: "P250 | Sand Dune", rarity: "common", chance: 45 },
    { name: "MP7 | Urban Hazard", rarity: "common", chance: 25 },

    { name: "AK-47 | Elite Build", rarity: "rare", chance: 18 },
    { name: "AWP | Atheris", rarity: "rare", chance: 7 },

    { name: "M4A4 | The Emperor", rarity: "legendary", chance: 4 },
    { name: "★ Karambit", rarity: "mythic", chance: 1 }
];

const itemsEl = document.getElementById("items");
const openBtn = document.getElementById("openCase");

const TOTAL_ITEMS = 30;
const WIN_INDEX = 20;

let winItem = null;

/* ===== RANDOM BY CHANCE ===== */
function getRandomItem() {
    const total = itemsData.reduce((s, i) => s + i.chance, 0);
    let r = Math.random() * total;

    for (const item of itemsData) {
        if (r < item.chance) return item;
        r -= item.chance;
    }
}

/* ===== RENDER IDLE ===== */
function renderIdle() {
    itemsEl.innerHTML = "";

    for (let i = 0; i < 15; i++) {
        const data = itemsData[Math.floor(Math.random() * itemsData.length)];
        const div = document.createElement("div");
        div.className = `item ${data.rarity}`;
        div.innerHTML = "<span></span>";
        itemsEl.appendChild(div);
    }
}

/* ===== RENDER ROLL ===== */
function renderRoll() {
    itemsEl.innerHTML = "";
    winItem = getRandomItem();

    for (let i = 0; i < TOTAL_ITEMS; i++) {
        const data = i === WIN_INDEX
            ? winItem
            : getRandomItem();

        const div = document.createElement("div");
        div.className = `item ${data.rarity}`;
        div.dataset.name = data.name;
        div.innerHTML = `<span>${data.name}</span>`;
        itemsEl.appendChild(div);
    }
}

/* ===== OPEN CASE ===== */
openBtn.onclick = () => {
    openBtn.disabled = true;
    renderRoll();

    const item = document.querySelector(".item");
    const itemWidth = item.offsetWidth + 12;
    const wrapperWidth = document.querySelector(".case-wrapper").offsetWidth;

    const offset =
        WIN_INDEX * itemWidth + itemWidth / 2 - wrapperWidth / 2;

    itemsEl.style.transition = "none";
    itemsEl.style.transform = "translateX(0)";
    itemsEl.offsetHeight;

    itemsEl.style.transition =
        "transform 7.5s cubic-bezier(0.08, 0.82, 0.15, 1)";
    itemsEl.style.transform = `translateX(-${offset}px)`;

    setTimeout(() => {
        const winDiv = document.querySelectorAll(".item")[WIN_INDEX];
        winDiv.classList.add("win");
        alert("🎉 Bạn trúng: " + winDiv.dataset.name);
        openBtn.disabled = false;
    }, 7800);
};

/* ===== INIT ===== */
renderIdle();
