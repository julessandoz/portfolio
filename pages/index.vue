<script setup>
import { onMounted } from "vue";
import TheNav from "~/components/TheNav.vue";
import TheSkills from "~/components/TheSkills.vue";
import TheProjects from "~/components/TheProjects.vue";
const changeTheme = ref(null);

onMounted(() => {
  /* THEME MANAGEMENT */
  const isDarkModePreferred = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");
  !savedTheme
    ? localStorage.setItem("theme", isDarkModePreferred ? "dark" : "light")
    : null;
  const theme = ref(localStorage.getItem("theme") || "light");
  if (theme.value === "dark") {
    document.body.classList = "app dark";
  } else {
    document.body.classList = "app light";
  }

  changeTheme.value = () => {
    if (theme.value === "dark") {
      theme.value = "light";
      document.body.classList = "app light";
      localStorage.setItem("theme", "light");
    } else {
      theme.value = "dark";
      document.body.classList = "app dark";
      localStorage.setItem("theme", "dark");
    }
  };

  /* HEAD MANAGEMENT */
  const titleContent = ref(
    "Portfolio | Jules Sandoz | Media Engineer - Fullstack - Frontend Developer - Montana"
  );
  watch(titleContent, () => {
    document.title = titleContent.value;
  });
  useHead({
    title: titleContent.value,
    meta: [
      {
        charset: "utf-8",
      },
    ],
    meta: [
      {
        description:
          "Welcome to my portfolio! I'm Jules Sandoz, Fullstack and Frontend Developer with experience in UX/UI Design. I'm from Switzerland and based in Kalispell, Montana.",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/jpg",
        href: "/logo-JS-dark.jpg",
      },
    ],
  });
  document.addEventListener("visibilitychange", () => {
    document.visibilityState === "hidden"
      ? (titleContent.value = "See you later! | Jules Sandoz")
      : (titleContent.value = "Welcome back! | Jules Sandoz");
  });

  /* ANIMATIONS MANAGEMENT */
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  function callback(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        switch (entry.target.id) {
          case "home":
            titleContent.value = "Home | Jules Sandoz";
            history.pushState(null, null, "#home");
            break;

          case "about":
            titleContent.value = "About | Jules Sandoz";
            history.pushState(null, null, "#about");
            break;

          case "skills":
            titleContent.value = "Skills | Jules Sandoz";
            history.pushState(null, null, "#skills");
            break;

          case "projects":
            titleContent.value = "Projects | Jules Sandoz";
            history.pushState(null, null, "#projects");
            break;

          case "contact":
            titleContent.value = "Contact | Jules Sandoz";
            history.pushState(null, null, "#contact");
            break;
          default:
            break;
        }
        if (entry.target.classList.contains("skill-bar")) {
          entry.target.classList.add("full");
          observer.unobserve(entry.target);
        }
        if (
          entry.target.classList.contains("link") ||
          entry.target.classList.contains("text-container") ||
          entry.target.classList.contains("cta-container") ||
          entry.target.classList.contains("img-container") ||
          entry.target.classList.contains("tile-container")
        ) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }
    });
  }
  const observer = new IntersectionObserver(callback, options);

  const sections = document.querySelectorAll("section");
  const skillBars = document.querySelectorAll(".skill-bar");
  const homeTextCta = document.querySelectorAll(
    "#home .text-container, #home .cta-container"
  );
  const imgContainer = document.querySelector("#about .img-container");
  const projectTiles = document.querySelectorAll(
    "#projects .projects-container .tile-container"
  );

  // projectTiles.forEach((tile) => {
  //     observer.observe(tile);
  // });

  observer.observe(imgContainer);
  homeTextCta.forEach((el) => {
    observer.observe(el);
  });

  skillBars.forEach((skillBar) => {
    observer.observe(skillBar);
  });
  sections.forEach((section) => {
    observer.observe(section);
  });
});
</script>

<template>
  <main>
    <client-only>
      <TheNav @change-theme="changeTheme" />
    </client-only>
    <section id="home">
      <div class="text-container">
        <h1>
          Hello there, <br />
          I'm Jules Sandoz
        </h1>
        <p class="subtitle">Digital Swiss Army Knife</p>
      </div>
      <div class="cta-container">
        <p>Scroll or</p>
        <div class="cta-link-wrapper">
          <a class="cta" href="#projects">Discover my projects</a>
        </div>
      </div>
    </section>
    <section id="about">
      <div class="text-container">
        <h2>About me</h2>
        <p>
          Having recently obtained my green card and graduated with a Bachelor's degree in
          Communication and Media Engineering from Switzerland, I'm excited to enter the
          US job market. My passion lies in website development, UI, and UX.
        </p>
        <p>
          I’m a very curious person and love learning while solving problems. Great fan of
          the outdoors and amateur photographer, I like spending my free time in the
          mountains, hiking in the summer and snowboarding in the winter.
        </p>
        <p>
          Always interested in working on new projects with motivated people. Currently
          looking for positions as UX Engineer or Fullstack Developer!
        </p>
        <a href="#contact">Let's work together!</a>
      </div>
      <div class="img-container">
        <nuxt-img
          class="portrait-photo"
          format="webp"
          src="/jules-sandoz-5.jpg"
          alt="Jules Sandoz"
        />
      </div>
    </section>
    <section id="skills">
      <div class="title-container">
        <h2>Skills</h2>
      </div>
      <div class="skills-bars">
        <TheSkills />
      </div>
    </section>
    <section id="projects">
      <div class="title-container">
        <h2>Projects</h2>
      </div>
      <TheProjects />
    </section>
    <section id="contact">
      <div class="title-container">
        <h2>Let's make something great together!</h2>
      </div>
      <div class="text-container">
        <p>
          I'm currently accepting job offers, don't hesitate to reach out through my
          socials!
        </p>
        <div class="socials">
          <div class="link">
            <a
              href="https://www.linkedin.com/in/jules-sandoz"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="mdi:linkedin" size="60px" />
            </a>
            <a
              class="contact-link"
              href="https://www.linkedin.com/in/jules-sandoz"
              target="_blank"
              rel="noopener noreferrer"
              >/jules-sandoz</a
            >
          </div>
          <div class="link">
            <a
              class="contact-link"
              href="https://github.com/julessandoz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="mdi:github" size="60px" /></a
            ><a
              class="contact-link"
              href="https://github.com/julessandoz/"
              target="_blank"
              rel="noopener noreferrer"
              >/julessandoz</a
            >
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  margin: 0;
  display: flex;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
}

.title-container {
  padding-left: 15vw;
  width: 60vw;
}

/*************************** HOME ***************************/
#home {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: row;
  overflow-x: hidden;
}

#home .text-container {
  min-width: 35vw;
  max-width: 40vw;
  padding: 30vh 5vw 3vh 15vw;
  overflow: hidden;
  transform: translate(0, 200px);
  transition: transform 1s ease;
}

#home .text-container.visible {
  transform: translate(0, 0);
}

#home .cta-container {
  max-width: 60vw;
  min-width: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transform: translate(0, -200px);
  transition: transform 1s ease;
}

#home .cta-container.visible {
  transform: translate(0, 0);
}

#home .cta-link-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: 2px solid #f06449;
  border-radius: 5px;
  padding: 0.5rem;
  margin: 0;
  cursor: pointer;
  max-width: 50%;
  transition: 0.5s ease;
}

#home .cta-link-wrapper:hover {
  padding: 0.6rem;
}

.dark #home .cta-link-wrapper:hover {
  background-color: #3c6799;
}

.light #home .cta-link-wrapper:hover {
  background-color: #f3f1ef;
}

@media only screen and (max-width: 768px) {
  #home {
    height: 100vh;
    padding-top: 13vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #home .text-container {
    min-width: 80vw;
    max-width: 80vw;
    padding: 0;
    overflow: hidden;
  }

  #home .cta-container {
    max-width: 80vw;
    min-width: 80vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  #home .cta-container p {
    margin-top: 20vh;
  }

  #home .cta-container .cta {
    font-size: clamp(1.3rem, 1.5rem, 2rem);
  }
}

/******** TEXT ********/
h1 {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: bold;
  line-height: 1.2;
  margin: 0 0 4vh 0;
  padding: 0;
}

.subtitle {
  font-size: clamp(1.5rem, 2vw, 3rem);
  font-weight: medium;
  line-height: 1.5;
  margin: 0;
  padding: 0;
}

.cta-container p {
  font-size: clamp(1rem, 1.3vw, 2rem);
  font-weight: medium;
  line-height: 1.5;
  margin: 40vh 0 2vh 0;
  padding: 0;
}

a.cta {
  width: fit-content;
  font-size: clamp(1.5rem, 1.5vw, 2rem);
  text-align: center;
}

/*************************** ABOUT ***************************/
#about {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  overflow-x: hidden;
  overflow-y: hidden;
  margin-bottom: 10vh;
  padding-top: 13vh;
}

#about .text-container {
  padding-left: 15vw;
  width: 40vw;
}

#about .img-container {
  width: 60vw;
  opacity: 0;
  transform: translate(200px, 0);
  transition: opacity 2s, transform 1s ease;
}

#about .img-container.visible {
  transform: translate(0, 0);
  opacity: 1;
}

#about p,
#about a,
#contact p {
  font-size: clamp(16px, 1.2vw, 2rem);
  font-weight: medium;
  line-height: 1.5;
  margin: 0 0 2vh 0;
  padding: 0;
  text-align: justify;
}

h2 {
  font-size: clamp(1.8rem, 2.5vw, 3.5rem);
  font-weight: bold;
  line-height: 1.2;
  margin: 0 0 4vh 0;
  padding: 0;
}

a {
  text-decoration: none;
  color: #f06449;
}

a:hover {
  text-decoration: underline;
}

.portrait-photo {
  width: 35vw;
  border-radius: 400% 0 0 400%;
  aspect-ratio: 5/4;
  object-fit: cover;
  object-position: 0 35%;
  margin-top: 8%;
  float: right;
}

@media only screen and (max-width: 768px) {
  #about {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    overflow-y: hidden;
    margin-bottom: 10vh;
    padding-top: 5vh;
  }

  #about .text-container {
    padding: 0 5vw;
    width: auto;
  }

  #about .img-container {
    width: auto;
    opacity: 1 !important;
    transform: translate(0, 0) !important;
  }

  #about p,
  #about a,
  #contact p {
    font-size: clamp(16px, 1.2vw, 2rem);
    font-weight: medium;
    line-height: 1.5;
    margin: 0 0 2vh 0;
    padding: 0;
    text-align: left;
  }

  h2 {
    font-size: clamp(1.8rem, 2.5vw, 3.5rem);
    font-weight: bold;
    line-height: 1.2;
    margin: 0 0 4vh 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: #f06449;
  }

  a:hover {
    text-decoration: underline;
  }

  .portrait-photo {
    width: 80vw;
    height: 80vw;
    margin-top: 5vh;
    border-radius: 50%;
  }
}

/*************************** SKILLS ***************************/
#skills {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: hidden;
  padding-top: 13vh;
}

#skills .skills-bars {
  width: 100%;
}

@media only screen and (max-width: 768px) {
  #skills {
    padding-top: 5vh;
  }
}

/*************************** PROJECTS ***************************/
#projects {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  padding-top: 13vh;
}

@media only screen and (max-width: 768px) {
  #projects {
    padding-top: 5vh;
  }
}

/*************************** CONTACT ***************************/
#contact {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-top: 13vh;
}

#contact .text-container {
  padding-left: 15vw;
  width: 45vw;
}

.socials {
  margin-top: 10vh;
  width: 45vw;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 20vh;
}

.socials .link {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3vh;
}

.socials a {
  font-size: clamp(16px, 1.2vw, 2rem);
  line-height: 1.5;
}

.socials svg {
  font-size: 4em;
  margin-bottom: 0.5vh;
}

.dark svg {
  color: #ede6e3 !important;
}

.light svg {
  color: #3c6799 !important;
}

@media only screen and (max-width: 768px) {
  #contact {
    padding-top: 8vh;
  }

  #contact .text-container {
    width: 78vw;
    padding-inline: 15vw;
  }

  #contact .text-container .socials {
    width: auto;
    justify-content: flex-start;
    gap: 25%;
  }
}
</style>
