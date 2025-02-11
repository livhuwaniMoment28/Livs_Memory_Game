document.addEventListener("DOMContentLoaded", function () {
    let light = document.getElementById("get-light"),
        night = document.getElementById("get-dark");

    light.addEventListener("click", function () {
        document.body.setAttribute("class", "light");
        light.style.display = "none";
        night.style.display = "block";
    });

    night.addEventListener("click", function () {
        document.body.setAttribute("class", "dark");
        night.style.display = "none";
        light.style.display = "block";
    });

    let game = document.getElementById("game");

    class Item {
        constructor(id) {
            this.id = id;
        }

        generate() {
            let click = false;
            let div = document.createElement("div");
            let span = document.createElement("span");
            span.setAttribute("id", String(this.id));
            div.appendChild(span);
            div.setAttribute("class", "item");
            game.appendChild(div);
        }
    }

    const countryFlags = [
        'NW', 'FR', 'ZW', '🇫🇷', '🇩🇪', '\🇮🇳', '\🇯🇵', '\🇦🇺',
        '🇨🇳', '🇷🇺', '🇿🇦', '\🇮🇹', '\🇲🇽', '\🇪🇸', '\🇹🇷', '\🇬🇧'
    ];

    const alpha = new Set();
    let content = [];

    while (alpha.size !== 8) {
        alpha.add(countryFlags[Math.floor(Math.random() * countryFlags.length)]);
    }

    let x = [],
        y = [];

    let pos1 = new Set();
    while (pos1.size !== 8) {
        pos1.add(Math.floor(Math.random() * 8 + 1));
    }

    for (let item of pos1) {
        x.push(item);
    }

    let min = 9,
        max = 17;

    let pos2 = new Set();
    while (pos2.size !== 8) {
        pos2.add(Math.floor(Math.random() * (max - min)) + min);
    }

    for (let item of pos2) {
        y.push(item);
    }

    for (let item of alpha) {
        content.push(item);
    }

    for (let index = 1; index <= 16; index++) {
        let object = new Item(index);
        object.generate();
    }

    const setContent = (id1, id2, src) => {
        let x = document.getElementById(id1),
            y = document.getElementById(id2);
        x.innerHTML = src;
        y.innerHTML = src;
    };

    for (let i = 0; i < x.length; i++) {
        setContent(x[i], y[i], content[i]);
    }

    let items = document.getElementsByClassName("item");
    let value = 10;

    const interval = setInterval(function () {
        value--;
        countdown.innerHTML = value;

        if (value === 0) {
            clearInterval(interval);
            countdown.style.visibility = "hidden";

            for (let index = 0; index < items.length; index++) {
                items[index].classList.add("cover");
                items[index].firstChild.style.display = "none";
            }
        }
    }, 1000);

    let parents = [];
    let cab = [];
    let val = [];
    let cor = 0;

    for (let item = 0; item < items.length; item++) {
        items[item].addEventListener("click", function () {
            if (items[item].classList.contains("cover")) {
                items[item].classList.remove("cover");
                items[item].firstChild.style.display = "block";
                parents.push(items[item]);
                cab.push(items[item].firstChild);
                val.push(items[item].firstChild.innerHTML);
            } else {
                items[item].classList.add("cover");
                items[item].firstChild.style.display = "none";
            }
        })
    }

    let final = document.getElementById("final");

    const check = setInterval(() => {
        if (parents.length === 2) {
            for (let item of parents) {
                item.classList.add("cover");
            }
            for (let item of cab) {
                item.style.display = "none";
            }

            if (val[0] === val[1]) {
                cor++;
                parents[0].style.opacity = ".6";
                parents[0].classList.remove("cover");
                parents[0].style.pointerEvents = 'none';
                cab[0].style.display = "block";
                parents[1].style.opacity = ".6";
                cab[1].style.display = "block";
                parents[1].classList.remove("cover");
                parents[1].style.pointerEvents = 'none';
                cab.length = 0;
                parents.length = 0;
                val.length = 0;
            }

            cab.length = 0;
            parents.length = 0;
            val.length = 0;

            if (cor === 8) {
                clearInterval(check);
                final.innerHTML = "Congrats!🎉";
                final.style.whiteSpace = "nowrap";
                final.style.textAlign = "center"; 
                final.style.position = "absolute";
                final.style.top = "50%";
                final.style.left = "50%";
                final.style.transform = "translate(-50%, -50%)"; 
            }
        }
    }, 250);
});
