document.documentElement.classList.remove("no-js");

// شريط تقدم التمرير
window.addEventListener("scroll", function () {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";

  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.style.background = "var(--header-bg)";
    header.style.boxShadow = "var(--shadow)";
  } else {
    header.style.background = "var(--header-bg)";
    header.style.boxShadow = "var(--shadow)";
  }

  // إظهار أو إخفاء زر العودة لأعلى
  const backToTop = document.getElementById("backToTop");
  if (window.scrollY > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

// تبديل اللغة
document
  .getElementById("languageSwitcher")
  .addEventListener("click", function (e) {
    if (e.target.classList.contains("language-option")) {
      const lang = e.target.dataset.lang;

      // تحديث حالة الأزرار
      document.querySelectorAll(".language-option").forEach((opt) => {
        opt.classList.remove("language-active");
      });
      e.target.classList.add("language-active");

      // تغيير لغة الصفحة
      if (lang === "en") {
        document.body.classList.add("english");
        document.documentElement.setAttribute("dir", "ltr");
      } else {
        document.body.classList.remove("english");
        document.documentElement.setAttribute("dir", "rtl");
      }

      // حفظ التفضيل في localStorage
      localStorage.setItem("preferredLanguage", lang);
    }
  });

// تبديل الوضع الداكن
document.getElementById("themeSwitcher").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark-mode")
  );
});

// زر العودة لأعلى
document.getElementById("backToTop").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// قائمة الجوال
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");

mobileMenuBtn.addEventListener("click", function () {
  navLinks.classList.toggle("active");

  if (navLinks.classList.contains("active")) {
    mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
  } else {
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  }
});

// إغلاق القائمة عند النقر على رابط
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.classList.remove("active");
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// نموذج الاتصال
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

document
  .getElementById("contactForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // منع إعادة تحميل الصفحة
    const form = e.target;
    const formMessage = document.getElementById("formMessage");

    // الحصول على اللغة الحالية
    const isEnglish = document.body.classList.contains("english");

    // إظهار رسالة تحميل
    formMessage.textContent = isEnglish ? "Sending..." : "جاري الإرسال...";
    formMessage.className = "form-message";
    formMessage.style.display = "block";

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        formMessage.textContent = isEnglish
          ? "Your message has been sent successfully!"
          : "تم إرسال رسالتك بنجاح!";
        formMessage.classList.add("success");
        formMessage.style.display = "block";
        form.reset();
      } else {
        formMessage.textContent = isEnglish
          ? "There was a problem sending your message."
          : "حدثت مشكلة أثناء إرسال رسالتك.";
        formMessage.classList.add("error");
        formMessage.style.display = "block";
      }
    } catch (error) {
      formMessage.textContent = "⚠️ مشكلة في الاتصال.";
      formMessage.classList.add("error");
      formMessage.style.display = "block";
    }
  });

// تحميل التفضيلات عند بدء التحميل
document.addEventListener("DOMContentLoaded", function () {
  const preferredLanguage = localStorage.getItem("preferredLanguage") || "en";
  const darkMode = localStorage.getItem("darkMode") === "true";

  if (preferredLanguage === "en") {
    document.querySelector('[data-lang="en"]').click();
  }

  if (darkMode) {
    document.body.classList.add("dark-mode");
  }

  // تهيئة الرسوم المتحركة للعناصر
  initAnimations();
});

// تأثيرات التمرير والرسوم المتحركة
function initAnimations() {
  // تأثير التمرير للأقسام
  const sections = document.querySelectorAll("section");
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  const skillLevels = document.querySelectorAll(".skill-level");

  // مراقبة ظهور الأقسام
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          // إذا كان القسم هو المهارات، نشغل أشرطة التقدم
          if (entry.target.id === "about") {
            setTimeout(() => {
              skillLevels.forEach((skill) => {
                const level = skill.getAttribute("data-level");
                skill.style.width = level;
              });
            }, 300);
          }

          // إذا كان قسم البورتفوليو، نظهر العناصر بتتابع
          if (entry.target.id === "portfolio") {
            portfolioItems.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add("visible");
              }, index * 200);
            });
          }
        }
      });
    },
    { threshold: 0.1 }
  );

  // مراقبة كل قسم
  sections.forEach((section) => {
    observer.observe(section);
  });

  // تأثيرات للعناصر عند التمرير
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;

    // تأثير التحرك للصورة في قسم البداية
    const heroImage = document.querySelector(".hero-image");
    if (heroImage) {
      heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
  });

  // إضافة التنقل السلس للروابط
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}
