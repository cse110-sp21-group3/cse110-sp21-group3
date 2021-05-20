let add = document.getElementById("add");
add.addEventListener("click", () => {addHabit()});

function addHabit() {
    alert("add habit");
}

document.addEventListener("DOMContentLoaded", () => {
    let water = document.createElement("tracker-elem");
    water.habit = "water";
    water.color = "#599fe0";
    let habitGrid = water.shadowRoot.querySelector(".habit-grid");
    for (let i = 1; i <= 31; i++) {
        let habitCircle = document.createElement("div");
        habitCircle.id = "circle"+i;
        habitCircle.style.borderRadius = "100%";
        habitCircle.style.border = "none";
        habitCircle.style.backgroundColor = water.color;
        habitGrid.appendChild(habitCircle);
    }
    let grid1 = document.getElementById("grid1");
    grid1.prepend(water);
});
