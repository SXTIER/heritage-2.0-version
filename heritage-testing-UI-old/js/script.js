document.addEventListener("mousemove", (e) => {
        const g = document.getElementById("glow");
        if (g) {
          g.style.left = e.clientX + "px";
          g.style.top = e.clientY + "px";
        }
      });
      const nav = document.getElementById("nav");
      window.addEventListener("scroll", () => {
        nav.classList.toggle("scrolled", window.scrollY > 80);
      });
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("vis");
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
      );
      document.querySelectorAll(".rv").forEach((el) => obs.observe(el));
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          const t = document.querySelector(a.getAttribute("href"));
          if (t) t.scrollIntoView({ behavior: "smooth" });
        });
      });
      const ham = document.querySelector(".ham");
      const sidebar = document.getElementById("sidebar");
      const sbClose = document.getElementById("sb-close");
      
      if (ham && sidebar && sbClose) {
        ham.addEventListener("click", () => {
          sidebar.classList.add("active");
        });
        
        sbClose.addEventListener("click", () => {
          sidebar.classList.remove("active");
        });
        
        document.querySelectorAll(".sb-link").forEach((link) => {
          link.addEventListener("click", () => {
            sidebar.classList.remove("active");
          });
        });
      }

      const introVideo = document.getElementById("intro-video");
      if (introVideo) {
        const videoObs = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                introVideo.play();
              } else {
                introVideo.pause();
              }
            });
          },
          { threshold: 0.2 }
        );
        videoObs.observe(introVideo);
      }