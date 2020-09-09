import sublinks from "./data.js";

const toggleBtn = document.querySelector(".toggle-btn");
const linkBtns = [...document.querySelectorAll(".link-btn")];
const closeBtn = document.querySelector(".close-btn");
const sideBarWrapper = document.querySelector(".sidebar-wrapper");
const sideBarLinks = document.querySelector(".sidebar-links");
const hero = document.querySelector(".hero");
const nav = document.querySelector(".nav");
const submenu = document.querySelector(".submenu");

//sidebar toggle
toggleBtn.addEventListener("click", function () {
  sideBarWrapper.classList.add("show");
});

closeBtn.addEventListener("click", function () {
  sideBarWrapper.classList.remove("show");
});

//display sublinks item
const displaySublinks = sublinks
  .map((item) => {
    const { page, links } = item;
    return `
  <article>
  <h4>${page}</h4>
  <div class="sidebar-sublinks">
  ${links
    .map((link) => {
      return `<a href="${link.url}">
      <i class="${link.icon}"></i> ${link.label}
      </a>`;
    })
    .join("")}
  </div>
  </article>
  `;
  })
  .join("");

sideBarLinks.innerHTML = displaySublinks;

//nav button mouseover

linkBtns.forEach((btn) => {
  btn.addEventListener("mouseover", function (e) {
    const text = e.currentTarget.textContent;
    const tempBtn = e.currentTarget.getBoundingClientRect();
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom - 3;

    const tempPage = sublinks.find(({ page }) => page === text);

    if (tempPage) {
      const { page, links } = tempPage;
      submenu.classList.add("show");
      submenu.style.left = `${center}px`;
      submenu.style.top = `${bottom}px`;

      // OPTIONS
      let columns = "col-2";
      if (links.length === 3) {
        columns = "col-3";
      }
      if (links.length > 3) {
        columns = "col-4";
      }
      submenu.innerHTML = `
      <section>
        <h4>${page}</h4>
        <div class="submenu-center ${columns}">
        ${links
          .map((link) => {
            return `<a href="${link.url}">
          <i class="${link.icon}"></i> ${link.label}
          </a>`;
          })
          .join("")}
        </div>
        </section>`;
    }
  });
});

hero.addEventListener("mouseover", function (e) {
  submenu.classList.remove("show");
});

nav.addEventListener("mouseover", function (e) {
  if (!e.target.classList.contains("link-btn"))
    submenu.classList.remove("show");
});
